import { Project, Task, RecentActivity, ChatMessage, UserAccount } from '../types';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_ACTIVITIES } from '../data/sampleData';

const STORAGE_KEYS = {
  PROJECTS: 'ai_mentor_projects_v1',
  TASKS: 'ai_mentor_tasks_v1',
  ACTIVE_PROJECT: 'ai_mentor_active_project_id_v1',
  THEME: 'ai_mentor_theme_v1',
  ACTIVITIES: 'ai_mentor_activities_v1',
  CHAT_MESSAGES: 'ai_mentor_chat_history_v1',
  SAVED_DOCS: 'ai_mentor_saved_docs_v1',
  USERS: 'ai_mentor_registered_users_v1',
  CURRENT_USER: 'ai_mentor_current_user_v1',
};

// Safe localStorage helper
function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

export const storageService = {
  // --- Projects ---
  getProjects(): Project[] {
    const projects = safeGetItem<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const filtered = projects.filter((p) => p.id !== 'proj-0');
    if (filtered.length === 0) {
      // Seed with initial demo projects
      safeSetItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    return filtered;
  },

  getProjectById(id: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id);
  },

  saveProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: 'proj-' + Date.now(),
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newProject, ...projects];
    safeSetItem(STORAGE_KEYS.PROJECTS, updated);
    this.setActiveProjectId(newProject.id);

    this.addRecentActivity({
      type: 'project_created',
      title: `Created Project: ${newProject.name}`,
      description: `New ${newProject.domain} project registered.`,
    });

    return newProject;
  },

  updateProject(project: Project): Project {
    const projects = this.getProjects();
    const updated = projects.map((p) =>
      p.id === project.id ? { ...project, updatedAt: new Date().toISOString() } : p
    );
    safeSetItem(STORAGE_KEYS.PROJECTS, updated);
    return project;
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter((p) => p.id !== id);
    safeSetItem(STORAGE_KEYS.PROJECTS, projects);

    // Also delete associated tasks
    const tasks = this.getTasks().filter((t) => t.projectId !== id);
    safeSetItem(STORAGE_KEYS.TASKS, tasks);

    // Reset active project if deleted
    if (this.getActiveProjectId() === id) {
      if (projects.length > 0) {
        this.setActiveProjectId(projects[0].id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROJECT);
      }
    }
  },

  getActiveProjectId(): string | null {
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT);
    if (activeId) return activeId;
    const projects = this.getProjects();
    if (projects.length > 0) {
      this.setActiveProjectId(projects[0].id);
      return projects[0].id;
    }
    return null;
  },

  setActiveProjectId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT, id);
  },

  getActiveProject(): Project | undefined {
    const activeId = this.getActiveProjectId();
    if (!activeId) return undefined;
    return this.getProjectById(activeId);
  },

  // --- Tasks ---
  getTasks(projectId?: string): Task[] {
    let tasks = safeGetItem<Task[]>(STORAGE_KEYS.TASKS, []);
    if (tasks.length === 0) {
      safeSetItem(STORAGE_KEYS.TASKS, INITIAL_TASKS);
      tasks = INITIAL_TASKS;
    }
    if (projectId) {
      return tasks.filter((t) => t.projectId === projectId);
    }
    return tasks;
  },

  saveTask(task: Omit<Task, 'id'>): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...task,
      id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    };
    const updated = [...tasks, newTask];
    safeSetItem(STORAGE_KEYS.TASKS, updated);
    this.recalculateProjectProgress(newTask.projectId);
    return newTask;
  },

  saveBatchTasks(newTasks: Omit<Task, 'id'>[]): Task[] {
    const existing = this.getTasks();
    const created: Task[] = newTasks.map((t, idx) => ({
      ...t,
      id: `task-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 5)}`,
    }));
    const updated = [...existing, ...created];
    safeSetItem(STORAGE_KEYS.TASKS, updated);
    if (created.length > 0) {
      this.recalculateProjectProgress(created[0].projectId);
    }
    return created;
  },

  updateTask(task: Task): Task {
    const tasks = this.getTasks();
    const updated = tasks.map((t) => (t.id === task.id ? task : t));
    safeSetItem(STORAGE_KEYS.TASKS, updated);
    this.recalculateProjectProgress(task.projectId);
    return task;
  },

  deleteTask(taskId: string): void {
    const tasks = this.getTasks();
    const target = tasks.find((t) => t.id === taskId);
    const updated = tasks.filter((t) => t.id !== taskId);
    safeSetItem(STORAGE_KEYS.TASKS, updated);
    if (target) {
      this.recalculateProjectProgress(target.projectId);
    }
  },

  toggleTaskStatus(taskId: string): Task | undefined {
    const tasks = this.getTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return undefined;

    let nextStatus: Task['status'] = 'Not Started';
    if (task.status === 'Not Started') nextStatus = 'In Progress';
    else if (task.status === 'In Progress') nextStatus = 'Completed';
    else nextStatus = 'Not Started';

    task.status = nextStatus;
    safeSetItem(STORAGE_KEYS.TASKS, tasks);
    this.recalculateProjectProgress(task.projectId);

    if (nextStatus === 'Completed') {
      this.addRecentActivity({
        type: 'task_completed',
        title: `Completed Task: ${task.title}`,
        description: `Phase: ${task.phaseName}`,
      });
    }

    return task;
  },

  recalculateProjectProgress(projectId: string): number {
    const project = this.getProjectById(projectId);
    if (!project) return 0;

    const projectTasks = this.getTasks(projectId);
    if (projectTasks.length === 0) return project.progress;

    const completed = projectTasks.filter((t) => t.status === 'Completed').length;
    const progress = Math.round((completed / projectTasks.length) * 100);

    let status = project.status;
    if (progress === 100) status = 'Completed';
    else if (progress > 60 && status === 'Planning') status = 'Testing';
    else if (progress > 0 && status === 'Planning') status = 'Development';

    this.updateProject({
      ...project,
      progress,
      status,
    });

    return progress;
  },

  // --- Theme ---
  getTheme(): 'dark' | 'light' {
    try {
      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (theme === 'dark' || theme === 'light') return theme;
    } catch {
      // ignore
    }
    return 'dark'; // Default sleek developer dark theme
  },

  setTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      }
    }
  },

  // --- Recent Activities ---
  getRecentActivities(): RecentActivity[] {
    const activities = safeGetItem<RecentActivity[]>(STORAGE_KEYS.ACTIVITIES, []);
    if (activities.length === 0) {
      safeSetItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
      return INITIAL_ACTIVITIES;
    }
    return activities;
  },

  addRecentActivity(activity: Omit<RecentActivity, 'id' | 'timestamp'>): void {
    const activities = this.getRecentActivities();
    const newActivity: RecentActivity = {
      ...activity,
      id: 'act-' + Date.now(),
      timestamp: 'Just now',
    };
    const updated = [newActivity, ...activities.slice(0, 19)]; // Keep last 20
    safeSetItem(STORAGE_KEYS.ACTIVITIES, updated);
  },

  // --- Chat Messages ---
  getChatHistory(): ChatMessage[] {
    return safeGetItem<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES, [
      {
        id: 'msg-initial',
        sender: 'mentor',
        text: "Hello! I'm your AI Project Mentor. Whether you need help framing your problem statement, designing an architecture, debugging tricky code, or preparing your final viva, I'm here to guide you step-by-step. What are you working on today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  },

  saveChatMessage(message: ChatMessage): void {
    const messages = this.getChatHistory();
    safeSetItem(STORAGE_KEYS.CHAT_MESSAGES, [...messages, message]);
  },

  clearChatHistory(): void {
    safeSetItem(STORAGE_KEYS.CHAT_MESSAGES, []);
  },

  // --- Reset All Data ---
  resetToSampleData(): void {
    safeSetItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    safeSetItem(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    safeSetItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
    safeSetItem(STORAGE_KEYS.ACTIVE_PROJECT, INITIAL_PROJECTS[0].id);
    this.clearChatHistory();
  },

  // --- User Authentication & Accounts ---
  getCurrentUser(): UserAccount | null {
    const user = safeGetItem<UserAccount | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (!user || user.fullName === 'Keerthika Yenni') {
      const defaultUser = this.getRegisteredUsers()[0]?.user || null;
      if (defaultUser) {
        this.setCurrentUser(defaultUser);
        return defaultUser;
      }
    }
    return user;
  },

  setCurrentUser(user: UserAccount | null): void {
    if (user) {
      safeSetItem(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      } catch (e) {
        console.error(e);
      }
    }
  },

  getRegisteredUsers(): Array<{ user: UserAccount; password: string }> {
    const defaultUser: UserAccount = {
      id: 'usr-default',
      fullName: 'Sridevi Yenni',
      email: 'yennisridevi6@gmail.com',
      collegeOrUniversity: 'Department of Computer Science and Engineering',
      degreeOrBranch: 'B.Tech Computer Science & Engineering',
      semesterOrYear: 'Final Year (8th Semester)',
      studentId: '21A91A0501',
      avatarInitials: 'SY',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const keerthikaUser: UserAccount = {
      id: 'usr-keerthika',
      fullName: 'Keerthika Yenni',
      email: 'keerthikayenni@gmail.com',
      collegeOrUniversity: 'Department of Computer Science and Engineering',
      degreeOrBranch: 'B.Tech Computer Science & Engineering',
      semesterOrYear: 'Final Year (8th Semester)',
      studentId: '21A91A0502',
      avatarInitials: 'KY',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const defaultList = [
      { user: defaultUser, password: 'password123' },
      { user: keerthikaUser, password: 'password123' },
    ];

    const users = safeGetItem<Array<{ user: UserAccount; password: string }>>(
      STORAGE_KEYS.USERS,
      defaultList
    );

    if (users.length === 0) {
      safeSetItem(STORAGE_KEYS.USERS, defaultList);
      return defaultList;
    }
    // Ensure Keerthika is also present if user was previously seeded with only Sridevi
    if (!users.some((u) => u.user.email.toLowerCase() === 'keerthikayenni@gmail.com')) {
      users.push({ user: keerthikaUser, password: 'password123' });
      safeSetItem(STORAGE_KEYS.USERS, users);
    }
    return users;
  },

  registerUser(details: {
    fullName: string;
    email: string;
    password: string;
    collegeOrUniversity?: string;
    degreeOrBranch?: string;
    semesterOrYear?: string;
    studentId?: string;
  }): { success: boolean; user?: UserAccount; error?: string } {
    const trimmedEmail = details.email.trim().toLowerCase();
    if (!trimmedEmail || !details.password.trim() || !details.fullName.trim()) {
      return { success: false, error: 'Full name, valid email, and password are required.' };
    }

    const users = this.getRegisteredUsers();
    const existing = users.find((u) => u.user.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please log in.' };
    }

    const initials = details.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join('') || 'ST';

    const newUser: UserAccount = {
      id: 'usr-' + Date.now(),
      fullName: details.fullName.trim(),
      email: trimmedEmail,
      collegeOrUniversity: details.collegeOrUniversity?.trim() || 'Computer Science Department',
      degreeOrBranch: details.degreeOrBranch?.trim() || 'B.Tech Computer Science',
      semesterOrYear: details.semesterOrYear?.trim() || 'Final Year Project',
      studentId: details.studentId?.trim() || `CSE-${Math.floor(1000 + Math.random() * 9000)}`,
      avatarInitials: initials,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, { user: newUser, password: details.password.trim() }];
    safeSetItem(STORAGE_KEYS.USERS, updatedUsers);

    this.addRecentActivity({
      type: 'project_created',
      title: 'Student Account Created',
      description: `${newUser.fullName} registered for AI Project Mentor suite.`,
    });

    return { success: true, user: newUser };
  },

  loginUser(email: string, password: string): { success: boolean; user?: UserAccount; error?: string } {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    const users = this.getRegisteredUsers();
    const match = users.find(
      (u) => u.user.email.toLowerCase() === trimmedEmail && u.password === trimmedPass
    );

    if (!match) {
      return {
        success: false,
        error: 'Invalid email or password. Please verify credentials or create a new student account.',
      };
    }

    const updatedUser = {
      ...match.user,
      lastLoginAt: new Date().toISOString(),
    };

    // Update in user list
    const updatedUsers = users.map((u) =>
      u.user.id === updatedUser.id ? { ...u, user: updatedUser } : u
    );
    safeSetItem(STORAGE_KEYS.USERS, updatedUsers);
    this.setCurrentUser(updatedUser);

    return { success: true, user: updatedUser };
  },

  logoutUser(): void {
    this.setCurrentUser(null);
  },
};
