import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  FolderGit2,
  HelpCircle,
  Code2,
} from 'lucide-react';
import { Project, ChatMessage } from '../types';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';

interface MentorChatProps {
  activeProject?: Project;
}

const STARTER_PROMPTS = [
  'How should I start my project architecture?',
  'Explain REST API fundamentals with a real example.',
  'When should I use PostgreSQL vs MongoDB for this project?',
  'How can I improve my project to score top marks in viva?',
  'What should I learn next to finish the roadmap?',
];

export const MentorChat: React.FC<MentorChatProps> = ({ activeProject }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(storageService.getChatHistory());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    storageService.saveChatMessage(userMsg);
    setInputText('');
    setLoading(true);

    const res = await aiService.chatWithMentor({
      message: text,
      projectContext: activeProject,
      history: updatedMessages.slice(-6),
    });

    setLoading(false);

    const mentorReplyText =
      res.success && res.data
        ? res.data
        : "I'm currently operating in offline mode. Let's focus on structuring your module layers cleanly: prioritize clean API endpoints and boundary checks!";

    const mentorMsg: ChatMessage = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'mentor',
      text: mentorReplyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      projectContextName: activeProject?.name,
    };

    setMessages([...updatedMessages, mentorMsg]);
    storageService.saveChatMessage(mentorMsg);
  };

  const handleClear = () => {
    storageService.clearChatHistory();
    const welcomeMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'mentor',
      text: "Conversation cleared. I'm ready to help you plan, debug, or evaluate your project!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcomeMsg]);
    storageService.saveChatMessage(welcomeMsg);
  };

  return (
    <div className="space-y-4 pb-8 flex flex-col h-[calc(100vh-140px)] min-h-[550px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <MessageSquareCode className="w-6 h-6 text-indigo-400" />
            <span>AI Mentor Chat</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Your 24/7 technical mentor for code design, exam preparation, and software architecture questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeProject && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-indigo-300">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Context:</span>
              <span className="font-semibold max-w-[140px] truncate">{activeProject.name}</span>
            </div>
          )}

          <button
            onClick={handleClear}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-300'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-950/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-1.5'
                }`}
              >
                {!isUser && msg.projectContextName && (
                  <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Project: {msg.projectContextName}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>

                <div
                  className={`text-[9px] mt-1.5 text-right ${
                    isUser ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-indigo-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>AI Mentor is thinking and reviewing technical principles...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Horizontal Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 shrink-0 text-xs">
        <span className="text-slate-500 text-[11px] font-semibold whitespace-nowrap">Suggested:</span>
        {STARTER_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer text-[11px]"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 focus-within:border-indigo-500 transition-colors shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            activeProject
              ? `Ask anything about ${activeProject.name}, debugging, APIs, or viva prep...`
              : 'Ask a computer science engineering or capstone question...'
          }
          className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-40 cursor-pointer shrink-0 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default MentorChat;
