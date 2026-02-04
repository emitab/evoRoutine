/**
 * EvoRoutine - Main Application Logic
 * Handles state management, UI rendering, user interaction, and adaptive logic.
 */

class EvoRoutineApp {
    constructor() {
        this.state = {
            user: null, // name, environment, level, goal, createdAt
            settings: {
                theme: 'light',
                language: 'es',
                restTime: 60,
                soundEnabled: true,
                notifications: true
            },
            routines: [], // { id, name, days: [], exercises: [] }
            tasks: [], // tasks for specific dates
            history: [] // record of completed tasks
        };

        // Initialize helpers
        this.i18n = new I18n();
        this.exercises = new ExerciseManager();

        // DOM Elements cache
        this.elements = {};

        this.init();
    }

    async init() {
        this.loadState();
        this.cacheElements();
        this.setupEventListeners();
        this.applyTheme(this.state.settings.theme);
        this.i18n.setLanguage(this.state.settings.language);
        this.updateUIText();

        if (this.state.user) {
            this.showDashboard();
            this.checkAndGenerateDailyTasks();
        } else {
            this.showWelcomeScreen();
        }
    }

    cacheElements() {
        // Screens
        this.elements.welcomeScreen = document.getElementById('welcomeScreen');
        this.elements.dashboard = document.getElementById('dashboard');

        // Navigation
        this.elements.tabs = document.querySelectorAll('.tab');
        this.elements.tabPanes = document.querySelectorAll('.tab-pane');
        this.elements.header = document.querySelector('.header');

        // User & Settings
        this.elements.userProfile = document.getElementById('userProfile');
        this.elements.userNameDisplay = this.elements.userProfile.querySelector('.user-name');
        this.elements.settingsBtn = document.getElementById('settingsBtn');
        this.elements.dateDisplay = document.getElementById('dateDisplay');

        // Inputs (Welcome)
        this.elements.startBtn = document.getElementById('startBtn');
        this.elements.userNameInput = document.getElementById('userName');
        this.elements.optionBtns = document.querySelectorAll('.option-btn');

        // Dashboard Content
        this.elements.tasksContainer = document.getElementById('tasksToday');
        this.elements.routinesGrid = document.getElementById('routinesGrid');
        this.elements.scoreValue = document.getElementById('scoreValue');
        this.elements.scoreCircle = document.getElementById('scoreCircle');

        // Modals
        this.elements.settingsModal = document.getElementById('settingsModal');
        this.elements.taskModal = document.getElementById('taskModal');
        this.elements.routineModal = document.getElementById('routineModal');
        this.elements.deleteAccountModal = document.getElementById('deleteAccountModal');
    }

    setupEventListeners() {
        // Global clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                // Don't close delete confirmation on click outside for safety
                if (e.target.id !== 'deleteAccountModal') {
                    this.closeAllModals();
                }
            }
        });

        // Welcome Screen Options
        this.elements.optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const group = btn.closest('.option-selector');
                group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        this.elements.startBtn.addEventListener('click', () => this.handleOnboarding());

        // Tabs
        this.elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Settings
        this.elements.settingsBtn.addEventListener('click', () => this.openSettingsModal());
        document.getElementById('closeSettingsModal').addEventListener('click', () => this.closeModal('settingsModal'));
        document.getElementById('cancelSettingsBtn').addEventListener('click', () => this.closeModal('settingsModal'));
        document.getElementById('saveSettingsBtn').addEventListener('click', () => this.saveSettings());
        document.getElementById('deleteAccountBtn').addEventListener('click', () => this.openDeleteConfirmation());
        document.getElementById('exportDataBtn').addEventListener('click', () => this.exportData());

        // Delete Confirmation Modal Events
        document.getElementById('closeDeleteModal').addEventListener('click', () => this.closeModal('deleteAccountModal'));
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeModal('deleteAccountModal'));
        document.getElementById('confirmDeleteAccountBtn').addEventListener('click', () => this.confirmDeleteAccount());

        // Theme Toggles in Settings
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.previewTheme(btn.dataset.theme);
            });
        });

        // Tasks
        document.getElementById('addTaskBtn').addEventListener('click', () => this.openTaskModal());
        document.getElementById('closeTaskModal').addEventListener('click', () => this.closeModal('taskModal'));
        document.getElementById('cancelTaskBtn').addEventListener('click', () => this.closeModal('taskModal'));
        document.getElementById('saveTaskBtn').addEventListener('click', () => this.saveTask());

        // Routines
        document.getElementById('createRoutineBtn').addEventListener('click', () => this.openRoutineModal());
        document.getElementById('closeRoutineModal').addEventListener('click', () => this.closeModal('routineModal'));
        document.getElementById('cancelRoutineBtn').addEventListener('click', () => this.closeModal('routineModal'));
        document.getElementById('saveRoutineBtn').addEventListener('click', () => this.saveRoutine());
        document.getElementById('addExerciseToRoutineBtn').addEventListener('click', () => this.addExerciseFieldToRoutineModal());

        // Routine Days Selector
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.addEventListener('click', () => btn.classList.toggle('active'));
        });

        // Progress Period Selector
        document.getElementById('periodSelector').addEventListener('change', (e) => this.renderStats(parseInt(e.target.value)));
    }

    // === State Management ===
    loadState() {
        const saved = localStorage.getItem('evoRoutine');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
                // Ensure settings exist if loading from old state
                if (!this.state.settings) {
                    this.state.settings = { theme: 'light', language: 'es', restTime: 60 };
                }
            } catch (e) {
                console.error('Error loading state:', e);
                localStorage.removeItem('evoRoutine');
            }
        }
    }

    saveState() {
        localStorage.setItem('evoRoutine', JSON.stringify(this.state));
    }

    exportData() {
        const dataStr = JSON.stringify(this.state, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `evoroutine_backup_${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        alert(this.i18n.t('notif.dataExported'));
    }

    deleteAccount() {
        // Legacy method replaced by openDeleteConfirmation for 2-step verification
        this.openDeleteConfirmation();
    }

    openDeleteConfirmation() {
        // Close settings modal first to focus on safety warning
        this.closeModal('settingsModal');
        this.elements.deleteAccountModal.classList.add('active');
    }

    confirmDeleteAccount() {
        localStorage.clear();
        location.reload();
    }

    // === UI & Theming ===
    updateUIText() {
        // Updates all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerText = this.i18n.t(el.dataset.i18n);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = this.i18n.t(el.dataset.i18nPlaceholder);
        });

        // Update date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const locale = this.state.settings.language === 'es' ? 'es-ES' : 'en-US';
        if (this.elements.dateDisplay) {
            this.elements.dateDisplay.innerText = new Date().toLocaleDateString(locale, options);
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.state.settings.theme = theme;
    }

    previewTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    switchTab(tabName) {
        this.elements.tabs.forEach(tab => {
            if (tab.dataset.tab === tabName) tab.classList.add('active');
            else tab.classList.remove('active');
        });

        this.elements.tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tabName}Pane`).classList.add('active');

        if (tabName === 'progress') {
            this.renderStats();
        }
    }

    // === Onboarding ===
    handleOnboarding() {
        const name = this.elements.userNameInput.value.trim();
        const environment = document.querySelector('[data-option="environment"].active')?.dataset.value;
        const level = document.querySelector('[data-option="level"].active')?.dataset.value;
        const goal = document.querySelector('[data-option="goal"].active')?.dataset.value;

        if (!name) return alert(this.i18n.t('error.invalidName'));
        if (!environment) return alert(this.i18n.t('error.selectEnvironment'));
        if (!level) return alert(this.i18n.t('error.selectLevel'));
        if (!goal) return alert(this.i18n.t('error.selectGoal'));

        this.state.user = {
            name,
            environment,
            level,
            goal,
            createdAt: new Date().toISOString()
        };

        // Create initial routine based on selection
        this.createInitialRoutine();

        this.saveState();
        this.showDashboard();
    }

    createInitialRoutine() {
        const { environment, level, goal } = this.state.user;
        const workoutExercises = this.exercises.createWorkout(environment, level, goal);

        // Map to task format
        const tasks = workoutExercises.map(ex => {
            const adjusted = this.exercises.adjustForLevel(ex, level);
            return {
                id: this.generateId(),
                name: adjusted.name,
                sets: adjusted.sets,
                reps: adjusted.reps,
                weight: 0, // start with bodyweight or 0
                rest: adjusted.rest,
                muscle: adjusted.muscle,
                completed: false
            };
        });

        const routine = {
            id: this.generateId(),
            name: `${this.i18n.t('welcome.' + goal)} - ${this.i18n.t('welcome.' + level)}`,
            days: [1, 3, 5], // Mon, Wed, Fri default
            exercises: tasks,
            isActive: true
        };

        this.state.routines.push(routine);
    }

    showWelcomeScreen() {
        this.elements.welcomeScreen.style.display = 'flex';
        this.elements.dashboard.style.display = 'none';
        this.elements.userProfile.style.display = 'none';
    }

    showDashboard() {
        this.elements.welcomeScreen.style.display = 'none';
        this.elements.dashboard.style.display = 'block';
        this.elements.userProfile.style.display = 'flex';
        this.elements.userNameDisplay.innerText = this.state.user.name;

        this.checkAndGenerateDailyTasks();
        this.renderRoutines();
    }

    // === Logic: Tasks & Routines ===
    checkAndGenerateDailyTasks() {
        const today = new Date().toISOString().split('T')[0];
        const dayOfWeek = new Date().getDay(); // 0 = Sun, 1 = Mon...

        // Check if tasks already exist for today
        const existingTasks = this.state.tasks.some(t => t.date === today);

        if (!existingTasks) {
            // Find active routines for today
            const activeRoutines = this.state.routines.filter(r =>
                r.isActive && r.days.includes(dayOfWeek)
            );

            activeRoutines.forEach(routine => {
                routine.exercises.forEach(ex => {
                    this.state.tasks.push({
                        ...ex,
                        id: this.generateId(),
                        date: today,
                        completed: false,
                        routineId: routine.id
                    });
                });
            });

            this.saveState();
        }

        this.renderTodayTasks();
    }

    renderTodayTasks() {
        const today = new Date().toISOString().split('T')[0];
        const tasksToday = this.state.tasks.filter(t => t.date === today);

        this.elements.tasksContainer.innerHTML = '';

        if (tasksToday.length === 0) {
            this.elements.tasksContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">💤</div>
                    <div class="empty-state-title">${this.i18n.t('today.noTasks')}</div>
                    <p class="empty-state-desc">${this.i18n.t('today.noTasksDesc')}</p>
                </div>
            `;
            this.updateDailyScore(0, 0);
            return;
        }

        tasksToday.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskEl.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-id="${task.id}">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="task-content">
                    <div class="task-title">${task.name}</div>
                    <div class="task-meta">
                        ${task.sets ? `<span class="task-badge">${task.sets} ${this.i18n.t('task.sets')}</span>` : ''}
                        ${task.reps ? `<span class="task-badge">${task.reps} ${this.i18n.t('task.reps')}</span>` : ''}
                        ${task.weight > 0 ? `<span class="task-badge">${task.weight} ${this.i18n.t('task.weight')}</span>` : ''}
                        ${task.muscle ? `<span class="task-badge">${this.i18n.t('muscle.' + task.muscle)}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn edit-task" data-id="${task.id}">✎</button>
                    <button class="task-action-btn delete-task" data-id="${task.id}">✕</button>
                </div>
            `;

            // Interaction Listeners
            taskEl.querySelector('.task-checkbox').addEventListener('click', () => this.toggleTaskCompletion(task.id));
            taskEl.querySelector('.delete-task').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTask(task.id);
            });
            taskEl.querySelector('.edit-task').addEventListener('click', (e) => {
                e.stopPropagation();
                this.editTask(task.id);
            });

            this.elements.tasksContainer.appendChild(taskEl);
        });

        // Update Score
        const completedCount = tasksToday.filter(t => t.completed).length;
        this.updateDailyScore(completedCount, tasksToday.length);

        // Generate Adaptive Suggestions
        this.generateAdaptiveSuggestions(tasksToday);
    }

    toggleTaskCompletion(taskId) {
        const task = this.state.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;

            if (task.completed) {
                // Add to history
                this.state.history.push({
                    taskId: task.id,
                    name: task.name,
                    completedAt: new Date().toISOString(),
                    weight: task.weight,
                    sets: task.sets,
                    reps: task.reps
                });
            } else {
                // Remove last entry from history for this task
                // For simplicity, we just filter it out logic here could be more complex
                this.state.history = this.state.history.filter(h => h.taskId !== taskId || h.completedAt.split('T')[0] !== new Date().toISOString().split('T')[0]);
            }

            this.saveState();
            this.renderTodayTasks(); // Re-render to update UI and stats
        }
    }

    deleteTask(taskId) {
        if (confirm(this.i18n.t('modal.confirm'))) {
            this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
            this.saveState();
            this.renderTodayTasks();
        }
    }

    updateDailyScore(completed, total) {
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        this.elements.scoreValue.innerText = `${percentage}%`;

        // Update circle stroke offset (282.7 is usually full circumference for r=45)
        const circumference = 282.7;
        const offset = circumference - (percentage / 100) * circumference;
        this.elements.scoreCircle.style.strokeDashoffset = offset;
    }

    // === Helpers ===
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    }

    // === Modals: Settings ===
    openSettingsModal() {
        const modal = this.elements.settingsModal;

        // Load current values
        document.getElementById('settingsName').value = this.state.user.name;
        document.getElementById('languageSelector').value = this.state.settings.language;
        document.getElementById('settingsEnvironment').value = this.state.user.environment;
        document.getElementById('settingsLevel').value = this.state.user.level;
        document.getElementById('settingsGoal').value = this.state.user.goal;
        document.getElementById('restTime').value = this.state.settings.restTime;

        // Set Theme active state
        document.querySelectorAll('.theme-btn').forEach(btn => {
            if (btn.dataset.theme === this.state.settings.theme) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        modal.classList.add('active');
    }

    saveSettings() {
        const newLang = document.getElementById('languageSelector').value;
        const newTheme = document.querySelector('.theme-btn.active').dataset.theme;

        // Save Settings
        this.state.settings.language = newLang;
        this.state.settings.theme = newTheme;
        this.state.settings.restTime = parseInt(document.getElementById('restTime').value);

        // Save User Data
        this.state.user.name = document.getElementById('settingsName').value;
        this.state.user.environment = document.getElementById('settingsEnvironment').value;
        this.state.user.level = document.getElementById('settingsLevel').value;
        this.state.user.goal = document.getElementById('settingsGoal').value;

        this.saveState();
        this.applyTheme(newTheme);
        this.i18n.setLanguage(newLang);
        this.updateUIText();
        this.elements.userNameDisplay.innerText = this.state.user.name;

        this.closeModal('settingsModal');
    }

    // === Routines UI ===
    renderRoutines() {
        const container = this.elements.routinesGrid;
        container.innerHTML = '';

        if (this.state.routines.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>${this.i18n.t('routines.noRoutinesDesc')}</p>
                </div>
            `;
            return;
        }

        this.state.routines.forEach(routine => {
            const card = document.createElement('div');
            card.className = 'routine-card';

            const daysHtml = [1, 2, 3, 4, 5, 6, 0].map(day => {
                const dayName = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][day];
                const isActive = routine.days.includes(day);
                return `<span class="day-indicator ${isActive ? 'active' : ''}">${this.i18n.t('day.' + dayName).charAt(0)}</span>`;
            }).join('');

            card.innerHTML = `
                <div class="routine-header">
                    <div class="routine-icon">💪</div>
                    ${routine.isActive ? `<span class="routine-status">${this.i18n.t('routines.active')}</span>` : ''}
                </div>
                <div class="routine-name">${routine.name}</div>
                <div class="routine-stats">
                    <span>${routine.exercises.length} ${this.i18n.t('routines.tasks')}</span>
                    <span>${routine.exercises.reduce((acc, ex) => acc + (ex.rest || 60) * (ex.sets || 3), 0) / 60 | 0} ${this.i18n.t('routines.duration')}</span>
                </div>
                <div class="routine-days">${daysHtml}</div>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                     <button class="btn-sm btn-secondary delete-routine-btn" data-id="${routine.id}">${this.i18n.t('routines.delete')}</button>
                </div>
            `;

            card.querySelector('.delete-routine-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(this.i18n.t('modal.confirm'))) {
                    this.state.routines = this.state.routines.filter(r => r.id !== routine.id);
                    this.saveState();
                    this.renderRoutines();
                    this.checkAndGenerateDailyTasks(); // update tasks if routine deleted
                }
            });

            container.appendChild(card);
        });
    }

    openRoutineModal() {
        document.getElementById('routineName').value = '';
        document.getElementById('routineExercisesList').innerHTML = '';
        document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
        this.elements.routineModal.classList.add('active');
    }

    saveRoutine() {
        const name = document.getElementById('routineName').value;
        const selectedDays = Array.from(document.querySelectorAll('.day-btn.active')).map(b => parseInt(b.dataset.day));

        // This is a simplified version - in a real app better exercise picking UI is needed
        // Here we just use what was in the list inputs
        const exercises = [];
        document.querySelectorAll('.routine-exercise-item').forEach(item => {
            exercises.push({
                name: item.querySelector('.ex-name').value,
                sets: parseInt(item.querySelector('.ex-sets').value) || 3,
                reps: parseInt(item.querySelector('.ex-reps').value) || 12,
                weight: parseInt(item.querySelector('.ex-weight').value) || 0,
                rest: this.state.settings.restTime
            });
        });

        if (!name) return alert(this.i18n.t('error.invalidName'));

        const newRoutine = {
            id: this.generateId(),
            name,
            days: selectedDays,
            exercises,
            isActive: true
        };

        this.state.routines.push(newRoutine);
        this.saveState();
        this.renderRoutines();
        this.checkAndGenerateDailyTasks();
        this.closeModal('routineModal');
    }

    addExerciseFieldToRoutineModal() {
        const container = document.getElementById('routineExercisesList');
        const div = document.createElement('div');
        div.className = 'exercise-item';
        div.innerHTML = `
            <input type="text" class="input-field ex-name" placeholder="${this.i18n.t('taskModal.name')}" style="flex:2">
            <input type="number" class="input-field ex-sets" placeholder="${this.i18n.t('taskModal.sets')}" style="flex:1">
            <input type="number" class="input-field ex-reps" placeholder="${this.i18n.t('taskModal.reps')}" style="flex:1">
            <input type="number" class="input-field ex-weight" placeholder="kg" style="flex:1">
        `;
        container.appendChild(div);
    }

    // === Task Modal ===
    openTaskModal() {
        document.getElementById('taskName').value = '';
        document.getElementById('taskSets').value = '';
        document.getElementById('taskReps').value = '';
        document.getElementById('taskWeight').value = '';
        document.getElementById('taskRest').value = this.state.settings.restTime;
        document.getElementById('taskNotes').value = '';
        this.elements.taskModal.classList.add('active');
    }

    saveTask() {
        const task = {
            id: this.generateId(),
            date: new Date().toISOString().split('T')[0],
            name: document.getElementById('taskName').value,
            sets: parseInt(document.getElementById('taskSets').value) || 3,
            reps: parseInt(document.getElementById('taskReps').value) || 10,
            weight: parseFloat(document.getElementById('taskWeight').value) || 0,
            rest: parseInt(document.getElementById('taskRest').value) || 60,
            completed: false
        };

        if (!task.name) return;

        this.state.tasks.push(task);
        this.saveState();
        this.renderTodayTasks();
        this.closeModal('taskModal');
    }

    // === Progress & Insights (ML Simple based on Rules) ===
    renderStats(period = 7) {
        // Simple analytics logic
        const now = new Date();
        const stats = {
            streak: 0,
            completed: 0,
            minutes: 0,
            improvement: 0
        };

        // Calculate Streak
        // (Simplified streak logic for demo) 
        let currentStreak = 0;
        // Logic would iterate backwards checking history dates
        // For UI demo purposes we just count unique days in history
        const uniqueDays = new Set(this.state.history.map(h => h.completedAt.split('T')[0]));
        stats.streak = uniqueDays.size;

        // Stats for Period
        const historyInPeriod = this.state.history.filter(h => {
            const date = new Date(h.completedAt);
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= period;
        });

        stats.completed = historyInPeriod.length;
        // Estimate minutes (avg task 10 min if not tracked) or sum rest + time under tension
        stats.minutes = historyInPeriod.length * 10;

        // Update DOM
        document.getElementById('streakValue').innerText = stats.streak;
        document.getElementById('completedValue').innerText = stats.completed;
        document.getElementById('timeValue').innerText = `${stats.minutes}m`;
        document.getElementById('improvementValue').innerText = `+${Math.min(100, stats.completed * 5)}%`;

        this.renderActivityChart(period);
        this.renderInsights(historyInPeriod);
    }

    renderActivityChart(period) {
        const container = document.getElementById('activityChart');
        container.innerHTML = '';

        // Generate last 7 days keys
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }

        days.forEach(day => {
            const count = this.state.history.filter(h => h.completedAt.startsWith(day)).length;
            const max = 10; // scale
            const height = Math.min(100, (count / max) * 100);

            const dayLabel = new Date(day).toLocaleDateString(
                this.state.settings.language === 'es' ? 'es-ES' : 'en-US',
                { weekday: 'short' }
            );

            const bar = document.createElement('div');
            bar.style.display = 'flex';
            bar.style.flexDirection = 'column';
            bar.style.alignItems = 'center';
            bar.style.flex = '1';

            bar.innerHTML = `
                <div class="chart-bar" style="height: ${height || 5}%; width: 20px;"></div>
                <div class="chart-label">${dayLabel}</div>
            `;
            container.appendChild(bar);
        });
    }

    renderInsights(history) {
        const container = document.getElementById('insightsList');
        container.innerHTML = '';

        const insights = [];

        // Rules Engine
        // 1. Time of Day
        if (history.length > 5) {
            const hours = history.map(h => new Date(h.completedAt).getHours());
            const avgHour = hours.reduce((a, b) => a + b, 0) / hours.length;
            insights.push({
                title: this.i18n.t('insight.bestTime.title'),
                desc: this.i18n.t('insight.bestTime.desc', { time: Math.round(avgHour) + ':00' })
            });
        }

        // 2. Strong Category
        if (history.length > 0) {
            insights.push({
                title: this.i18n.t('insight.topCategory.title'),
                desc: this.i18n.t('insight.topCategory.desc', {
                    time: history.length * 15,
                    type: this.state.user.goal
                })
            });
        }

        // 3. Consistency
        if (this.state.user.level === 'beginner' && history.length > 3) {
            insights.push({
                title: this.i18n.t('insight.consistency.title'),
                desc: this.i18n.t('insight.consistency.desc', { rate: 90 })
            });
        }

        if (insights.length === 0) {
            container.innerHTML = `<p class="text-muted">${this.i18n.t('progress.noInsights')}</p>`;
            return;
        }

        insights.forEach(item => {
            const div = document.createElement('div');
            div.className = 'insight-card';
            div.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
            container.appendChild(div);
        });
    }

    generateAdaptiveSuggestions(todaysTasks) {
        const container = document.getElementById('suggestions');
        container.innerHTML = '';

        if (todaysTasks.length === 0) return;

        // Simple suggestion logic
        const hour = new Date().getHours();
        const pending = todaysTasks.filter(t => !t.completed).length;

        if (hour < 10) {
            this.addSuggestion(container, 'insight.morningStart', { icon: '🌅' });
        } else if (hour > 20 && pending > 0) {
            this.addSuggestion(container, 'insight.eveningPush', { pending, icon: '🌙' });
        }
    }

    addSuggestion(container, key, params) {
        const div = document.createElement('div');
        div.className = 'suggestion-card';
        div.innerHTML = `
            <div class="suggestion-header">
                <span class="suggestion-icon">${params.icon || '💡'}</span>
                <span class="suggestion-title">${this.i18n.t(key + '.title')}</span>
            </div>
            <div class="suggestion-content">${this.i18n.t(key + '.desc', params)}</div>
        `;
        container.appendChild(div);
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EvoRoutineApp();
});
