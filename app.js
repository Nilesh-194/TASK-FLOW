// Application State
let currentUser = null;
let currentPage = 'dashboard';
let tasks = [];
let projects = [];
let users = [];
let comments = [];
let activities = [];
let analytics = {};

// Sample data from the provided JSON
const sampleData = {
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@company.com",
      "role": "admin",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      "department": "Engineering",
      "joinDate": "2023-01-15"
    },
    {
      "id": 2,
      "name": "Sarah Wilson",
      "email": "sarah@company.com",
      "role": "manager",
      "avatar": "https://images.unsplash.com/photo-1494790108755-2616b9e1e1d3e?w=100",
      "department": "Design",
      "joinDate": "2023-03-10"
    },
    {
      "id": 3,
      "name": "Mike Chen",
      "email": "mike@company.com",
      "role": "user",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      "department": "Engineering",
      "joinDate": "2023-06-22"
    },
    {
      "id": 4,
      "name": "Emily Rodriguez",
      "email": "emily@company.com",
      "role": "user",
      "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      "department": "Marketing",
      "joinDate": "2023-08-05"
    }
  ],
  "projects": [
    {
      "id": 1,
      "name": "Website Redesign",
      "description": "Complete overhaul of company website",
      "status": "active",
      "progress": 75,
      "dueDate": "2025-09-30",
      "teamMembers": [1, 2, 3],
      "color": "#3b82f6"
    },
    {
      "id": 2,
      "name": "Mobile App Launch",
      "description": "Develop and launch new mobile application",
      "status": "active",
      "progress": 45,
      "dueDate": "2025-12-15",
      "teamMembers": [1, 3, 4],
      "color": "#10b981"
    },
    {
      "id": 3,
      "name": "Q4 Marketing Campaign",
      "description": "Comprehensive marketing strategy for Q4",
      "status": "planning",
      "progress": 20,
      "dueDate": "2025-10-01",
      "teamMembers": [2, 4],
      "color": "#f59e0b"
    }
  ],
  "tasks": [
    {
      "id": 1,
      "title": "Design new homepage layout",
      "description": "Create wireframes and mockups for the new homepage design including hero section, features, and testimonials",
      "priority": "high",
      "status": "in-progress",
      "projectId": 1,
      "assigneeId": 2,
      "createdBy": 1,
      "dueDate": "2025-09-15",
      "createdDate": "2025-08-01",
      "tags": ["design", "homepage", "ui"],
      "attachments": ["homepage-wireframes.fig", "design-specs.pdf"],
      "timeEstimate": 8,
      "timeSpent": 5.5
    },
    {
      "id": 2,
      "title": "Implement user authentication",
      "description": "Set up JWT-based authentication system with login, logout, and protected routes",
      "priority": "critical",
      "status": "to-do",
      "projectId": 2,
      "assigneeId": 3,
      "createdBy": 1,
      "dueDate": "2025-09-10",
      "createdDate": "2025-08-05",
      "tags": ["backend", "auth", "security"],
      "attachments": ["auth-flow.png"],
      "timeEstimate": 12,
      "timeSpent": 0
    },
    {
      "id": 3,
      "title": "Write blog post about new features",
      "description": "Create comprehensive blog post highlighting the new features and improvements in version 2.0",
      "priority": "medium",
      "status": "completed",
      "projectId": 3,
      "assigneeId": 4,
      "createdBy": 2,
      "dueDate": "2025-08-25",
      "createdDate": "2025-08-10",
      "completedDate": "2025-08-24",
      "tags": ["content", "marketing", "blog"],
      "attachments": ["blog-draft.docx", "feature-screenshots.zip"],
      "timeEstimate": 4,
      "timeSpent": 3.5
    },
    {
      "id": 4,
      "title": "Database optimization",
      "description": "Optimize database queries and implement caching for better performance",
      "priority": "high",
      "status": "in-review",
      "projectId": 1,
      "assigneeId": 3,
      "createdBy": 1,
      "dueDate": "2025-09-20",
      "createdDate": "2025-08-15",
      "tags": ["backend", "performance", "database"],
      "attachments": [],
      "timeEstimate": 6,
      "timeSpent": 6
    },
    {
      "id": 5,
      "title": "Set up CI/CD pipeline",
      "description": "Configure automated testing and deployment pipeline using GitHub Actions",
      "priority": "medium",
      "status": "blocked",
      "projectId": 2,
      "assigneeId": 1,
      "createdBy": 1,
      "dueDate": "2025-09-30",
      "createdDate": "2025-08-20",
      "tags": ["devops", "automation", "ci-cd"],
      "attachments": ["pipeline-config.yml"],
      "timeEstimate": 8,
      "timeSpent": 2
    }
  ],
  "comments": [
    {
      "id": 1,
      "taskId": 1,
      "userId": 1,
      "content": "Great progress on the design! The wireframes look solid. Can we add a section for customer testimonials?",
      "createdDate": "2025-08-10T14:30:00Z",
      "mentions": [2]
    },
    {
      "id": 2,
      "taskId": 1,
      "userId": 2,
      "content": "@john Absolutely! I'll add the testimonials section to the mockup and share an update by end of day.",
      "createdDate": "2025-08-10T15:45:00Z",
      "mentions": [1]
    },
    {
      "id": 3,
      "taskId": 2,
      "userId": 3,
      "content": "Starting work on this today. Planning to use JWT with refresh tokens for better security.",
      "createdDate": "2025-08-15T09:15:00Z",
      "mentions": []
    }
  ],
  "activities": [
    {
      "id": 1,
      "type": "task_created",
      "userId": 1,
      "taskId": 1,
      "description": "Created task 'Design new homepage layout'",
      "timestamp": "2025-08-01T10:00:00Z"
    },
    {
      "id": 2,
      "type": "task_assigned",
      "userId": 1,
      "taskId": 1,
      "assigneeId": 2,
      "description": "Assigned task to Sarah Wilson",
      "timestamp": "2025-08-01T10:05:00Z"
    },
    {
      "id": 3,
      "type": "task_completed",
      "userId": 4,
      "taskId": 3,
      "description": "Completed task 'Write blog post about new features'",
      "timestamp": "2025-08-24T16:30:00Z"
    }
  ],
  "analytics": {
    "taskCompletionRate": [
      {"date": "2025-08-01", "completed": 5, "total": 15},
      {"date": "2025-08-02", "completed": 7, "total": 16},
      {"date": "2025-08-03", "completed": 8, "total": 18},
      {"date": "2025-08-04", "completed": 6, "total": 17},
      {"date": "2025-08-05", "completed": 9, "total": 19},
      {"date": "2025-08-06", "completed": 11, "total": 21},
      {"date": "2025-08-07", "completed": 8, "total": 20}
    ],
    "priorityDistribution": {
      "critical": 1,
      "high": 2,
      "medium": 2,
      "low": 0
    },
    "statusDistribution": {
      "to-do": 1,
      "in-progress": 1,
      "in-review": 1,
      "completed": 1,
      "blocked": 1
    },
    "projectProgress": [
      {"project": "Website Redesign", "progress": 75},
      {"project": "Mobile App Launch", "progress": 45},
      {"project": "Q4 Marketing Campaign", "progress": 20}
    ]
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    loadDataFromStorage();
    if (!currentUser) {
        showLoginPage();
    } else {
        showApp();
    }
    setupEventListeners();
    initializeTheme();
}

// Data Management
function loadDataFromStorage() {
    try {
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            console.log('Loaded user from storage:', currentUser);
        }

        // Load or initialize data
        tasks = JSON.parse(localStorage.getItem('tasks')) || sampleData.tasks;
        projects = JSON.parse(localStorage.getItem('projects')) || sampleData.projects;
        users = JSON.parse(localStorage.getItem('users')) || sampleData.users;
        comments = JSON.parse(localStorage.getItem('comments')) || sampleData.comments;
        activities = JSON.parse(localStorage.getItem('activities')) || sampleData.activities;
        analytics = JSON.parse(localStorage.getItem('analytics')) || sampleData.analytics;

        // Save to localStorage if not exists
        if (!localStorage.getItem('tasks')) {
            saveToStorage();
        }
    } catch (error) {
        console.error('Error loading data from storage:', error);
        // Fallback to sample data
        tasks = sampleData.tasks;
        projects = sampleData.projects;
        users = sampleData.users;
        comments = sampleData.comments;
        activities = sampleData.activities;
        analytics = sampleData.analytics;
        saveToStorage();
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('projects', JSON.stringify(projects));
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('comments', JSON.stringify(comments));
        localStorage.setItem('activities', JSON.stringify(activities));
        localStorage.setItem('analytics', JSON.stringify(analytics));
    } catch (error) {
        console.error('Error saving data to storage:', error);
    }
}

// Authentication
function login(email) {
    try {
        console.log('Attempting login for email:', email);
        const user = users.find(u => u.email === email);
        console.log('Found user:', user);
        
        if (user) {
            currentUser = user;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            console.log('User authenticated, showing app...');
            
            // Use setTimeout to ensure the showToast completes before transitioning
            showToast('Login successful!', 'success');
            
            setTimeout(() => {
                showApp();
            }, 500);
            
            return true;
        }
        showToast('User not found', 'error');
        return false;
    } catch (error) {
        console.error('Login error:', error);
        showToast('Login failed', 'error');
        return false;
    }
}

function logout() {
    try {
        currentUser = null;
        sessionStorage.removeItem('currentUser');
        showLoginPage();
        showToast('Logged out successfully', 'success');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// UI Management
function showLoginPage() {
    console.log('Showing login page...');
    const loginPage = document.getElementById('login-page');
    const app = document.getElementById('app');
    if (loginPage && app) {
        loginPage.style.display = 'flex';
        app.style.display = 'none';
        loginPage.classList.remove('hidden');
        app.classList.add('hidden');
    }
}

function showApp() {
    console.log('Showing app...');
    const loginPage = document.getElementById('login-page');
    const app = document.getElementById('app');
    if (loginPage && app) {
        loginPage.style.display = 'none';
        app.style.display = 'grid';
        loginPage.classList.add('hidden');
        app.classList.remove('hidden');
        
        updateUserInfo();
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            showPage('dashboard');
        }, 100);
    }
}

function updateUserInfo() {
    if (currentUser) {
        console.log('Updating user info for:', currentUser);
        const userAvatar = document.getElementById('user-avatar');
        const userName = document.getElementById('user-name');
        const userRole = document.getElementById('user-role');
        
        if (userAvatar) userAvatar.src = currentUser.avatar;
        if (userName) userName.textContent = currentUser.name;
        if (userRole) userRole.textContent = currentUser.role;
    }
}

function showPage(pageId) {
    try {
        console.log('Showing page:', pageId);
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.classList.add('hidden');
            page.style.display = 'none';
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.classList.remove('hidden');
            targetPage.style.display = 'block';
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeNavLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }

        currentPage = pageId;

        // Load page-specific content
        setTimeout(() => {
            switch (pageId) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'tasks':
                    loadTasks();
                    break;
                case 'kanban':
                    loadKanban();
                    break;
                case 'projects':
                    loadProjects();
                    break;
                case 'calendar':
                    loadCalendar();
                    break;
                case 'analytics':
                    loadAnalytics();
                    break;
                case 'settings':
                    loadSettings();
                    break;
            }
        }, 50);
    } catch (error) {
        console.error('Error showing page:', error);
    }
}

// Dashboard
function loadDashboard() {
    try {
        console.log('Loading dashboard...');
        updateDashboardStats();
        setTimeout(() => {
            renderCompletionChart();
            renderPriorityChart();
        }, 200);
        renderRecentActivity();
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

function updateDashboardStats() {
    try {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === 'completed').length;
        const progressTasks = tasks.filter(t => t.status === 'in-progress').length;
        const overdueTasks = tasks.filter(t => {
            if (!t.dueDate) return false;
            const dueDate = new Date(t.dueDate);
            const today = new Date();
            return dueDate < today && t.status !== 'completed';
        }).length;

        const totalTasksEl = document.getElementById('total-tasks');
        const completedTasksEl = document.getElementById('completed-tasks');
        const progressTasksEl = document.getElementById('progress-tasks');
        const overdueTasksEl = document.getElementById('overdue-tasks');

        if (totalTasksEl) totalTasksEl.textContent = totalTasks;
        if (completedTasksEl) completedTasksEl.textContent = completedTasks;
        if (progressTasksEl) progressTasksEl.textContent = progressTasks;
        if (overdueTasksEl) overdueTasksEl.textContent = overdueTasks;
        
        console.log('Dashboard stats updated:', { totalTasks, completedTasks, progressTasks, overdueTasks });
    } catch (error) {
        console.error('Error updating dashboard stats:', error);
    }
}

function renderCompletionChart() {
    try {
        const ctx = document.getElementById('completion-chart');
        if (!ctx) {
            console.log('Completion chart canvas not found');
            return;
        }
        
        console.log('Rendering completion chart...');
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: analytics.taskCompletionRate.map(d => new Date(d.date).toLocaleDateString()),
                datasets: [{
                    label: 'Completed Tasks',
                    data: analytics.taskCompletionRate.map(d => d.completed),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Total Tasks',
                    data: analytics.taskCompletionRate.map(d => d.total),
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error rendering completion chart:', error);
    }
}

function renderPriorityChart() {
    try {
        const ctx = document.getElementById('priority-chart');
        if (!ctx) {
            console.log('Priority chart canvas not found');
            return;
        }

        console.log('Rendering priority chart...');
        new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(analytics.priorityDistribution),
                datasets: [{
                    data: Object.values(analytics.priorityDistribution),
                    backgroundColor: ['#B4413C', '#FFC185', '#1FB8CD', '#ECEBD5']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    } catch (error) {
        console.error('Error rendering priority chart:', error);
    }
}

function renderRecentActivity() {
    try {
        const activityFeed = document.getElementById('activity-feed');
        if (!activityFeed) return;

        const recentActivities = activities.slice(-5).reverse();
        
        activityFeed.innerHTML = recentActivities.map(activity => {
            const user = users.find(u => u.id === activity.userId);
            const timeAgo = getTimeAgo(activity.timestamp);
            return `
                <div class="activity-item">
                    <strong>${user ? user.name : 'Unknown User'}</strong> ${activity.description}
                    <span style="float: right; color: var(--color-text-secondary);">${timeAgo}</span>
                </div>
            `;
        }).join('');
        
        console.log('Recent activity rendered');
    } catch (error) {
        console.error('Error rendering recent activity:', error);
    }
}

// Tasks Management
function loadTasks() {
    try {
        console.log('Loading tasks...');
        renderTasks();
        populateTaskSelects();
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function renderTasks() {
    try {
        const tasksGrid = document.getElementById('tasks-grid');
        if (!tasksGrid) return;

        const statusFilter = document.getElementById('filter-status')?.value || '';
        const priorityFilter = document.getElementById('filter-priority')?.value || '';
        
        let filteredTasks = tasks;
        if (statusFilter) {
            filteredTasks = filteredTasks.filter(t => t.status === statusFilter);
        }
        if (priorityFilter) {
            filteredTasks = filteredTasks.filter(t => t.priority === priorityFilter);
        }

        tasksGrid.innerHTML = filteredTasks.map(task => {
            const project = projects.find(p => p.id === task.projectId);
            const assignee = users.find(u => u.id === task.assigneeId);
            const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
            
            return `
                <div class="task-card" onclick="editTask(${task.id})">
                    <div class="task-card-header">
                        <h4 class="task-title">${task.title}</h4>
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <div class="task-meta">
                        <span class="task-status ${task.status}">${task.status.replace('-', ' ')}</span>
                        <span>${dueDate}</span>
                    </div>
                    ${assignee ? `<div style="margin-top: 8px; font-size: 12px; color: var(--color-text-secondary);">Assigned to ${assignee.name}</div>` : ''}
                    ${project ? `<div style="margin-top: 4px; font-size: 12px; color: var(--color-text-secondary);">Project: ${project.name}</div>` : ''}
                </div>
            `;
        }).join('');
        
        console.log('Tasks rendered:', filteredTasks.length);
    } catch (error) {
        console.error('Error rendering tasks:', error);
    }
}

function addTask() {
    openTaskModal();
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        openTaskModal(task);
    }
}

function openTaskModal(task = null) {
    try {
        const modal = document.getElementById('task-modal');
        const form = document.getElementById('task-form');
        const title = document.getElementById('task-modal-title');
        
        if (!modal || !form || !title) return;

        // Populate form
        if (task) {
            title.textContent = 'Edit Task';
            document.getElementById('task-title').value = task.title || '';
            document.getElementById('task-description').value = task.description || '';
            document.getElementById('task-priority').value = task.priority || 'medium';
            document.getElementById('task-status').value = task.status || 'to-do';
            document.getElementById('task-project').value = task.projectId || '';
            document.getElementById('task-assignee').value = task.assigneeId || '';
            document.getElementById('task-due-date').value = task.dueDate || '';
            document.getElementById('task-tags').value = task.tags ? task.tags.join(', ') : '';
            form.dataset.taskId = task.id;
        } else {
            title.textContent = 'Add Task';
            form.reset();
            form.removeAttribute('data-task-id');
        }
        
        modal.classList.remove('hidden');
    } catch (error) {
        console.error('Error opening task modal:', error);
    }
}

function saveTask(formData) {
    try {
        const taskId = document.getElementById('task-form').dataset.taskId;
        const task = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            priority: document.getElementById('task-priority').value,
            status: document.getElementById('task-status').value,
            projectId: parseInt(document.getElementById('task-project').value) || null,
            assigneeId: parseInt(document.getElementById('task-assignee').value) || null,
            dueDate: document.getElementById('task-due-date').value,
            tags: document.getElementById('task-tags').value.split(',').map(t => t.trim()).filter(t => t),
            createdBy: currentUser.id,
            createdDate: new Date().toISOString()
        };

        if (taskId) {
            // Edit existing task
            const index = tasks.findIndex(t => t.id === parseInt(taskId));
            if (index !== -1) {
                tasks[index] = { ...tasks[index], ...task };
                showToast('Task updated successfully!', 'success');
            }
        } else {
            // Add new task
            task.id = Math.max(...tasks.map(t => t.id), 0) + 1;
            tasks.push(task);
            showToast('Task created successfully!', 'success');
        }

        saveToStorage();
        closeModal('task-modal');
        
        // Refresh current page
        if (currentPage === 'tasks') {
            renderTasks();
        } else if (currentPage === 'kanban') {
            renderKanban();
        } else if (currentPage === 'dashboard') {
            loadDashboard();
        }
    } catch (error) {
        console.error('Error saving task:', error);
        showToast('Error saving task', 'error');
    }
}

// Kanban Board
function loadKanban() {
    try {
        console.log('Loading kanban...');
        renderKanban();
        setTimeout(() => setupDragAndDrop(), 100);
    } catch (error) {
        console.error('Error loading kanban:', error);
    }
}

function renderKanban() {
    try {
        const columns = ['to-do', 'in-progress', 'in-review', 'completed', 'blocked'];
        
        columns.forEach(status => {
            const column = document.querySelector(`[data-status="${status}"] .column-content`);
            const countElement = document.querySelector(`[data-status="${status}"] .task-count`);
            
            if (!column || !countElement) return;

            const statusTasks = tasks.filter(task => task.status === status);
            
            // Update task count
            countElement.textContent = statusTasks.length;
            
            column.innerHTML = statusTasks.map(task => {
                const project = projects.find(p => p.id === task.projectId);
                const assignee = users.find(u => u.id === task.assigneeId);
                
                return `
                    <div class="kanban-task" draggable="true" data-task-id="${task.id}" onclick="editTask(${task.id})">
                        <div class="task-card-header">
                            <h5 class="task-title">${task.title}</h5>
                            <span class="task-priority ${task.priority}">${task.priority}</span>
                        </div>
                        <p class="task-description">${task.description.substring(0, 100)}...</p>
                        ${assignee ? `<div style="font-size: 12px; color: var(--color-text-secondary);">👤 ${assignee.name}</div>` : ''}
                        ${project ? `<div style="font-size: 12px; color: var(--color-text-secondary);">📁 ${project.name}</div>` : ''}
                        ${task.dueDate ? `<div style="font-size: 12px; color: var(--color-text-secondary);">📅 ${new Date(task.dueDate).toLocaleDateString()}</div>` : ''}
                    </div>
                `;
            }).join('');
        });
        
        console.log('Kanban rendered');
    } catch (error) {
        console.error('Error rendering kanban:', error);
    }
}

function setupDragAndDrop() {
    try {
        const kanbanTasks = document.querySelectorAll('.kanban-task');
        const columns = document.querySelectorAll('.column-content');

        kanbanTasks.forEach(task => {
            task.addEventListener('dragstart', handleDragStart);
            task.addEventListener('dragend', handleDragEnd);
        });

        columns.forEach(column => {
            column.addEventListener('dragover', handleDragOver);
            column.addEventListener('drop', handleDrop);
            column.addEventListener('dragenter', handleDragEnter);
            column.addEventListener('dragleave', handleDragLeave);
        });
        
        console.log('Drag and drop setup complete');
    } catch (error) {
        console.error('Error setting up drag and drop:', error);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('column-content')) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('column-content') && !e.target.contains(e.relatedTarget)) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    try {
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData('text/plain'));
        const newStatus = e.target.dataset.status;
        
        if (newStatus && taskId) {
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].status = newStatus;
                saveToStorage();
                renderKanban();
                setTimeout(() => setupDragAndDrop(), 100);
                showToast('Task status updated!', 'success');
            }
        }
        
        e.target.classList.remove('drag-over');
    } catch (error) {
        console.error('Error handling drop:', error);
    }
}

// Projects Management
function loadProjects() {
    try {
        console.log('Loading projects...');
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects() {
    try {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = projects.map(project => {
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            const completedTasks = projectTasks.filter(t => t.status === 'completed').length;
            const progressPercent = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;
            
            const teamMembers = project.teamMembers.map(id => {
                const user = users.find(u => u.id === id);
                return user ? user.name : '';
            }).filter(name => name).join(', ');
            
            const dueDate = project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'No due date';
            
            return `
                <div class="project-card">
                    <div class="project-header">
                        <div class="project-color" style="background-color: ${project.color}"></div>
                        <h4 class="project-name">${project.name}</h4>
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-progress">
                        <div class="progress-label">
                            <span>Progress</span>
                            <span>${progressPercent}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                    </div>
                    <div class="project-meta">
                        <span>${projectTasks.length} tasks</span>
                        <span>Due: ${dueDate}</span>
                    </div>
                    <div style="margin-top: 8px; font-size: 12px; color: var(--color-text-secondary);">
                        Team: ${teamMembers}
                    </div>
                </div>
            `;
        }).join('');
        
        console.log('Projects rendered');
    } catch (error) {
        console.error('Error rendering projects:', error);
    }
}

function openProjectModal() {
    try {
        const modal = document.getElementById('project-modal');
        const form = document.getElementById('project-form');
        if (modal && form) {
            form.reset();
            modal.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error opening project modal:', error);
    }
}

function saveProject(formData) {
    try {
        const project = {
            id: Math.max(...projects.map(p => p.id), 0) + 1,
            name: document.getElementById('project-name').value,
            description: document.getElementById('project-description').value,
            dueDate: document.getElementById('project-due-date').value,
            color: document.getElementById('project-color').value,
            status: 'planning',
            progress: 0,
            teamMembers: [currentUser.id]
        };

        projects.push(project);
        saveToStorage();
        closeModal('project-modal');
        renderProjects();
        populateTaskSelects();
        showToast('Project created successfully!', 'success');
    } catch (error) {
        console.error('Error saving project:', error);
        showToast('Error saving project', 'error');
    }
}

// Calendar
function loadCalendar() {
    try {
        console.log('Loading calendar...');
        renderCalendar();
    } catch (error) {
        console.error('Error loading calendar:', error);
    }
}

function renderCalendar() {
    try {
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthElement = document.getElementById('current-month');
        
        if (!calendarGrid || !currentMonthElement) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        
        currentMonthElement.textContent = new Date(year, month).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Generate calendar days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        let html = '';
        
        // Calendar headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            html += `<div class="calendar-header">${day}</div>`;
        });
        
        // Calendar days
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.toDateString() === now.toDateString();
            const dayTasks = tasks.filter(task => {
                if (!task.dueDate) return false;
                return new Date(task.dueDate).toDateString() === currentDate.toDateString();
            });
            
            let dayClass = 'calendar-day';
            if (!isCurrentMonth) dayClass += ' other-month';
            if (isToday) dayClass += ' today';
            
            html += `
                <div class="${dayClass}">
                    <div class="day-number">${currentDate.getDate()}</div>
                    <div class="day-tasks">
                        ${dayTasks.map(task => `
                            <div class="day-task" onclick="editTask(${task.id})" title="${task.title}">${task.title}</div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        calendarGrid.innerHTML = html;
        console.log('Calendar rendered');
    } catch (error) {
        console.error('Error rendering calendar:', error);
    }
}

// Analytics
function loadAnalytics() {
    try {
        console.log('Loading analytics...');
        setTimeout(() => {
            renderProjectProgressChart();
            renderStatusChart();
        }, 200);
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

function renderProjectProgressChart() {
    try {
        const ctx = document.getElementById('project-progress-chart');
        if (!ctx) return;

        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: analytics.projectProgress.map(p => p.project),
                datasets: [{
                    label: 'Progress %',
                    data: analytics.projectProgress.map(p => p.progress),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
        console.log('Project progress chart rendered');
    } catch (error) {
        console.error('Error rendering project progress chart:', error);
    }
}

function renderStatusChart() {
    try {
        const ctx = document.getElementById('status-chart');
        if (!ctx) return;

        new Chart(ctx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: Object.keys(analytics.statusDistribution),
                datasets: [{
                    data: Object.values(analytics.statusDistribution),
                    backgroundColor: ['#ECEBD5', '#FFC185', '#1FB8CD', '#5D878F', '#B4413C']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        console.log('Status chart rendered');
    } catch (error) {
        console.error('Error rendering status chart:', error);
    }
}

// Settings
function loadSettings() {
    try {
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            const currentTheme = localStorage.getItem('theme') || 'system';
            themeSelect.value = currentTheme;
        }
        console.log('Settings loaded');
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Utility Functions
function populateTaskSelects() {
    try {
        const projectSelect = document.getElementById('task-project');
        const assigneeSelect = document.getElementById('task-assignee');
        
        if (projectSelect) {
            projectSelect.innerHTML = '<option value="">Select Project</option>' +
                projects.map(project => `<option value="${project.id}">${project.name}</option>`).join('');
        }
        
        if (assigneeSelect) {
            assigneeSelect.innerHTML = '<option value="">Select Assignee</option>' +
                users.map(user => `<option value="${user.id}">${user.name}</option>`).join('');
        }
    } catch (error) {
        console.error('Error populating task selects:', error);
    }
}

function closeModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

function showToast(message, type = 'info') {
    try {
        const toast = document.getElementById('toast');
        const messageElement = toast?.querySelector('.toast-message');
        
        if (toast && messageElement) {
            messageElement.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.remove('hidden');
            
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    } catch (error) {
        console.error('Error showing toast:', error);
    }
}

function getTimeAgo(timestamp) {
    try {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch (error) {
        console.error('Error calculating time ago:', error);
        return 'Unknown';
    }
}

function initializeTheme() {
    try {
        const savedTheme = localStorage.getItem('theme') || 'system';
        applyTheme(savedTheme);
    } catch (error) {
        console.error('Error initializing theme:', error);
    }
}

function applyTheme(theme) {
    try {
        const root = document.documentElement;
        
        if (theme === 'system') {
            root.removeAttribute('data-color-scheme');
        } else {
            root.setAttribute('data-color-scheme', theme);
        }
        
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    } catch (error) {
        console.error('Error applying theme:', error);
    }
}

function toggleSidebar() {
    try {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    } catch (error) {
        console.error('Error toggling sidebar:', error);
    }
}

function performSearch(query) {
    try {
        if (!query.trim()) return;
        
        const searchResults = tasks.filter(task => 
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase()) ||
            task.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        showToast(`Found ${searchResults.length} results for "${query}"`, 'info');
    } catch (error) {
        console.error('Error performing search:', error);
    }
}

// Event Listeners
function setupEventListeners() {
    try {
        console.log('Setting up event listeners...');
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('email')?.value;
                if (email) {
                    login(email);
                }
            });
        }

        // Demo login buttons
        document.querySelectorAll('.demo-login').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Demo login clicked:', this.dataset.email);
                const email = this.dataset.email;
                if (email) {
                    login(email);
                }
            });
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.dataset.page;
                if (page) {
                    showPage(page);
                }
            });
        });

        // Sidebar toggle
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const currentTheme = localStorage.getItem('theme') || 'system';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(newTheme);
            });
        }

        // User menu
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.addEventListener('click', function(e) {
                e.stopPropagation();
                const dropdown = document.querySelector('.user-dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('hidden');
                }
            });
        }

        // Logout
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

        // Search
        const globalSearch = document.getElementById('global-search');
        if (globalSearch) {
            globalSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }

        // Task management
        const addTaskBtn = document.getElementById('add-task-btn');
        const quickTaskBtn = document.getElementById('quick-task-btn');
        const kanbanAddTask = document.getElementById('kanban-add-task');
        
        if (addTaskBtn) addTaskBtn.addEventListener('click', addTask);
        if (quickTaskBtn) quickTaskBtn.addEventListener('click', addTask);
        if (kanbanAddTask) kanbanAddTask.addEventListener('click', addTask);

        // Project management
        const addProjectBtn = document.getElementById('add-project-btn');
        if (addProjectBtn) {
            addProjectBtn.addEventListener('click', openProjectModal);
        }

        // Task form
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
            taskForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                saveTask(formData);
            });
        }

        // Project form
        const projectForm = document.getElementById('project-form');
        if (projectForm) {
            projectForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                saveProject(formData);
            });
        }

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        });

        // Toast close
        const toastClose = document.querySelector('.toast-close');
        if (toastClose) {
            toastClose.addEventListener('click', function() {
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.classList.add('hidden');
                }
            });
        }

        // Filters
        const filterStatus = document.getElementById('filter-status');
        const filterPriority = document.getElementById('filter-priority');
        
        if (filterStatus) filterStatus.addEventListener('change', renderTasks);
        if (filterPriority) filterPriority.addEventListener('change', renderTasks);

        // Settings
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.addEventListener('change', function() {
                applyTheme(this.value);
            });
        }

        // Click outside to close dropdowns
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-menu')) {
                const dropdown = document.querySelector('.user-dropdown');
                if (dropdown) {
                    dropdown.classList.add('hidden');
                }
            }
        });

        console.log('Event listeners setup complete');
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

// Make functions globally available for onclick handlers
window.editTask = editTask;
window.addTask = addTask;