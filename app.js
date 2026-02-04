// ============================================
// EvoRoutine - Intelligent Routine Adaptation System
// ============================================

class EvoRoutine {
    constructor() {
        this.state = {
            user: null,
            tasks: [],
            routines: [],
            history: [],
            settings: {
                theme: 'light',
                adaptiveMode: true
            }
        };

        this.init();
    }

    // === Initialization ===
    init() {
        this.loadState();
        this.setupEventListeners();
        this.checkUserStatus();
    }

    loadState() {
        const savedState = localStorage.getItem('evoRoutine');
        if (savedState) {
            this.state = { ...this.state, ...JSON.parse(savedState) };
            this.applyTheme();
        }
    }

    saveState() {
        localStorage.setItem('evoRoutine', JSON.stringify(this.state));
    }

    // === User Management ===
    checkUserStatus() {
        if (this.state.user) {
            this.showDashboard();
        } else {
            this.showWelcome();
        }
    }

    showWelcome() {
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';

        // Update user profile
        const userName = document.querySelector('.user-name');
        if (userName) {
            userName.textContent = this.state.user.name;
        }

        // Render initial data
        this.updateDateDisplay();
        this.renderTodaysTasks();
        this.renderRoutines();
        this.renderProgress();
        this.generateAdaptiveSuggestions();
    }

    createUser(name, category) {
        this.state.user = {
            name,
            primaryCategory: category,
            createdAt: new Date().toISOString(),
            stats: {
                streak: 0,
                totalCompleted: 0,
                totalTime: 0
            }
        };

        // Create initial routine based on category
        this.createInitialRoutine(category);
        this.saveState();
        this.showDashboard();
    }

    createInitialRoutine(category) {
        const templates = {
            fitness: [
                { name: 'Calentamiento', duration: 10, priority: 'medium' },
                { name: 'Entrenamiento principal', duration: 30, priority: 'high' },
                { name: 'Estiramiento', duration: 10, priority: 'medium' }
            ],
            estudio: [
                { name: 'Revisión de contenido', duration: 25, priority: 'high' },
                { name: 'Práctica de ejercicios', duration: 30, priority: 'high' },
                { name: 'Descanso activo', duration: 5, priority: 'low' }
            ],
            trabajo: [
                { name: 'Planificación del día', duration: 15, priority: 'high' },
                { name: 'Trabajo concentrado', duration: 45, priority: 'high' },
                { name: 'Revisión de progreso', duration: 10, priority: 'medium' }
            ],
            bienestar: [
                { name: 'Meditación matinal', duration: 15, priority: 'high' },
                { name: 'Ejercicio ligero', duration: 20, priority: 'medium' },
                { name: 'Lectura o journaling', duration: 15, priority: 'medium' }
            ]
        };

        const tasks = templates[category] || templates.fitness;
        const routine = {
            id: this.generateId(),
            name: `Rutina ${this.getCategoryName(category)}`,
            category,
            days: [1, 2, 3, 4, 5], // Mon-Fri
            tasks: tasks.map(task => ({
                ...task,
                id: this.generateId(),
                category
            })),
            createdAt: new Date().toISOString(),
            isActive: true
        };

        this.state.routines.push(routine);
        this.generateTodaysTasks();
    }

    // === Task Management ===
    generateTodaysTasks() {
        const today = new Date().getDay();
        const todayRoutines = this.state.routines.filter(r =>
            r.isActive && r.days.includes(today)
        );

        const newTasks = [];
        todayRoutines.forEach(routine => {
            routine.tasks.forEach(task => {
                // Check if task already exists for today
                const existingTask = this.state.tasks.find(t =>
                    t.routineId === routine.id &&
                    t.name === task.name &&
                    this.isToday(t.createdAt)
                );

                if (!existingTask) {
                    newTasks.push({
                        ...task,
                        id: this.generateId(),
                        routineId: routine.id,
                        completed: false,
                        createdAt: new Date().toISOString()
                    });
                }
            });
        });

        this.state.tasks = this.state.tasks.filter(t => this.isToday(t.createdAt));
        this.state.tasks.push(...newTasks);
        this.saveState();
    }

    addTask(taskData) {
        const task = {
            id: this.generateId(),
            name: taskData.name,
            duration: parseInt(taskData.duration),
            category: taskData.category,
            priority: taskData.priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.state.tasks.push(task);
        this.saveState();
        this.renderTodaysTasks();
        this.generateAdaptiveSuggestions();
    }

    toggleTask(taskId) {
        const task = this.state.tasks.find(t => t.id === taskId);
        if (!task) return;

        task.completed = !task.completed;

        if (task.completed) {
            task.completedAt = new Date().toISOString();
            this.recordCompletion(task);
        } else {
            delete task.completedAt;
        }

        this.saveState();
        this.renderTodaysTasks();
        this.updateDailyScore();
        this.generateAdaptiveSuggestions();
    }

    deleteTask(taskId) {
        this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
        this.saveState();
        this.renderTodaysTasks();
        this.updateDailyScore();
    }

    recordCompletion(task) {
        this.state.history.push({
            taskId: task.id,
            taskName: task.name,
            category: task.category,
            duration: task.duration,
            completedAt: task.completedAt,
            date: new Date().toISOString().split('T')[0]
        });

        // Update user stats
        this.state.user.stats.totalCompleted++;
        this.state.user.stats.totalTime += task.duration;
        this.updateStreak();
        this.saveState();
    }

    // === Routine Management ===
    createRoutine(routineData) {
        const routine = {
            id: this.generateId(),
            name: routineData.name,
            category: routineData.category,
            days: routineData.days,
            tasks: [],
            createdAt: new Date().toISOString(),
            isActive: true
        };

        this.state.routines.push(routine);
        this.saveState();
        this.renderRoutines();
    }

    deleteRoutine(routineId) {
        this.state.routines = this.state.routines.filter(r => r.id !== routineId);
        this.saveState();
        this.renderRoutines();
    }

    // === Adaptive Intelligence ===
    generateAdaptiveSuggestions() {
        const suggestions = [];
        const completedTasks = this.state.tasks.filter(t => t.completed).length;
        const totalTasks = this.state.tasks.length;
        const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

        // Time of day analysis
        const hour = new Date().getHours();

        if (hour >= 18 && completionRate < 0.5) {
            suggestions.push({
                id: 'evening-push',
                icon: '🌙',
                title: 'Hora de cerrar el día',
                content: `Tenés ${totalTasks - completedTasks} tareas pendientes. Considerá priorizar las más importantes para mañana.`
            });
        }

        if (hour >= 6 && hour < 9 && completionRate === 0) {
            suggestions.push({
                id: 'morning-start',
                icon: '☀️',
                title: 'Buen momento para empezar',
                content: 'Las mañanas suelen ser ideales para tareas que requieren concentración. ¿Empezamos?'
            });
        }

        // Task duration analysis
        const totalDuration = this.state.tasks.reduce((sum, t) => sum + (t.duration || 0), 0);
        const completedDuration = this.state.tasks
            .filter(t => t.completed)
            .reduce((sum, t) => sum + (t.duration || 0), 0);

        if (totalDuration > 180 && completionRate < 0.3) {
            suggestions.push({
                id: 'overload-warning',
                icon: '⚠️',
                title: 'Día demandante detectado',
                content: `Tu rutina suma ${totalDuration} minutos. Podés reorganizar o posponer tareas menos urgentes.`
            });
        }

        // Completion pattern analysis
        const recentHistory = this.getRecentHistory(7);
        const avgCompletionRate = this.calculateAverageCompletionRate(recentHistory);

        if (avgCompletionRate > 0.8 && completionRate > 0.8) {
            suggestions.push({
                id: 'streak-celebration',
                icon: '🎉',
                title: '¡Excelente racha!',
                content: `Mantuviste más del 80% de cumplimiento esta semana. Considerá agregar un nuevo desafío.`
            });
        }

        // Category imbalance detection
        const categoryDistribution = this.analyzeCategoryDistribution();
        const primaryCategory = this.state.user?.primaryCategory;

        if (primaryCategory && categoryDistribution[primaryCategory] < 0.3) {
            suggestions.push({
                id: 'category-reminder',
                icon: '🎯',
                title: 'Recordá tu objetivo principal',
                content: `Dijiste que querías enfocarte en ${this.getCategoryName(primaryCategory)}. Asegurate de tener tareas relacionadas.`
            });
        }

        this.renderSuggestions(suggestions);
    }

    analyzeCategoryDistribution() {
        const distribution = {};
        const totalTasks = this.state.tasks.length;

        if (totalTasks === 0) return {};

        this.state.tasks.forEach(task => {
            distribution[task.category] = (distribution[task.category] || 0) + 1;
        });

        Object.keys(distribution).forEach(category => {
            distribution[category] /= totalTasks;
        });

        return distribution;
    }

    calculateAverageCompletionRate(history) {
        const dayGroups = {};

        history.forEach(record => {
            const day = record.date;
            if (!dayGroups[day]) {
                dayGroups[day] = { completed: 0, total: 0 };
            }
            dayGroups[day].completed++;
            dayGroups[day].total++;
        });

        const rates = Object.values(dayGroups).map(g => g.completed / g.total);
        return rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
    }

    // === Progress Tracking ===
    updateStreak() {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        const hasCompletedToday = this.state.history.some(h => h.date === today);
        const hasCompletedYesterday = this.state.history.some(h => h.date === yesterday);

        if (hasCompletedToday) {
            if (hasCompletedYesterday || this.state.user.stats.streak === 0) {
                this.state.user.stats.streak++;
            }
        } else if (!hasCompletedYesterday && this.state.user.stats.streak > 0) {
            this.state.user.stats.streak = 0;
        }
    }

    getRecentHistory(days) {
        const cutoffDate = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
        return this.state.history.filter(h => h.date >= cutoffDate);
    }

    getWeeklyActivity() {
        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const today = new Date();
        const weekData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const dayTasks = this.state.history.filter(h => h.date === dateStr);
            const totalMinutes = dayTasks.reduce((sum, h) => sum + (h.duration || 0), 0);

            weekData.push({
                day: daysOfWeek[date.getDay()],
                value: totalMinutes,
                date: dateStr
            });
        }

        return weekData;
    }

    generateInsights() {
        const insights = [];
        const recentHistory = this.getRecentHistory(30);

        // Most productive time analysis
        const hourDistribution = {};
        recentHistory.forEach(record => {
            const hour = new Date(record.completedAt).getHours();
            hourDistribution[hour] = (hourDistribution[hour] || 0) + 1;
        });

        const mostProductiveHour = Object.entries(hourDistribution)
            .sort(([, a], [, b]) => b - a)[0];

        if (mostProductiveHour) {
            const [hour, count] = mostProductiveHour;
            insights.push({
                icon: '⏰',
                title: 'Tu mejor momento',
                description: `Completás más tareas alrededor de las ${hour}:00hs. Programá tus actividades más importantes en ese horario.`
            });
        }

        // Category expertise
        const categoryStats = {};
        recentHistory.forEach(record => {
            if (!categoryStats[record.category]) {
                categoryStats[record.category] = { count: 0, time: 0 };
            }
            categoryStats[record.category].count++;
            categoryStats[record.category].time += record.duration;
        });

        const topCategory = Object.entries(categoryStats)
            .sort(([, a], [, b]) => b.count - a.count)[0];

        if (topCategory) {
            const [category, stats] = topCategory;
            insights.push({
                icon: this.getCategoryIcon(category),
                title: 'Tu fuerte',
                description: `Has dedicado ${stats.time} minutos a ${this.getCategoryName(category)} en el último mes. ¡Seguí así!`
            });
        }

        // Improvement trend
        const firstWeek = this.getRecentHistory(30).slice(0, 7);
        const lastWeek = this.getRecentHistory(7);

        if (firstWeek.length > 0 && lastWeek.length > 0) {
            const firstWeekAvg = firstWeek.length / 7;
            const lastWeekAvg = lastWeek.length / 7;
            const improvement = ((lastWeekAvg - firstWeekAvg) / firstWeekAvg) * 100;

            if (improvement > 10) {
                insights.push({
                    icon: '📈',
                    title: 'Tendencia positiva',
                    description: `Tu productividad aumentó un ${improvement.toFixed(0)}% comparado con hace 3 semanas.`
                });
            }
        }

        return insights;
    }

    // === Rendering ===
    updateDateDisplay() {
        const dateDisplay = document.getElementById('dateDisplay');
        if (!dateDisplay) return;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date().toLocaleDateString('es-AR', options);
        dateDisplay.textContent = date.charAt(0).toUpperCase() + date.slice(1);
    }

    renderTodaysTasks() {
        const container = document.getElementById('tasksToday');
        if (!container) return;

        if (this.state.tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-title">No hay tareas para hoy</div>
                    <div class="empty-state-description">Creá una nueva tarea o configurá una rutina</div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.state.tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-task-id="${task.id}">
                    ${task.completed ? `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    ` : ''}
                </div>
                <div class="task-content">
                    <div class="task-title">${task.name}</div>
                    <div class="task-meta">
                        <span class="task-category">
                            ${this.getCategoryIcon(task.category)}
                            ${this.getCategoryName(task.category)}
                        </span>
                        ${task.duration ? `
                            <span class="task-duration">
                                ⏱️ ${task.duration} min
                            </span>
                        ` : ''}
                        ${task.priority ? `
                            <span class="priority-badge ${task.priority}">${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}</span>
                        ` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn" data-action="delete" data-task-id="${task.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');

        this.updateDailyScore();
        this.attachTaskEventListeners();
    }

    renderSuggestions(suggestions) {
        const container = document.getElementById('suggestions');
        if (!container || suggestions.length === 0) {
            if (container) container.innerHTML = '';
            return;
        }

        container.innerHTML = `
            <h3 style="margin-bottom: var(--spacing-lg); font-size: 1.125rem; font-weight: 600;">
                💡 Sugerencias adaptativas
            </h3>
            ${suggestions.map(s => `
                <div class="suggestion-card">
                    <div class="suggestion-header">
                        <span class="suggestion-icon">${s.icon}</span>
                        <span class="suggestion-title">${s.title}</span>
                    </div>
                    <div class="suggestion-content">${s.content}</div>
                </div>
            `).join('')}
        `;
    }

    renderRoutines() {
        const container = document.getElementById('routinesGrid');
        if (!container) return;

        if (this.state.routines.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📅</div>
                    <div class="empty-state-title">No tenés rutinas creadas</div>
                    <div class="empty-state-description">Creá tu primera rutina para organizar tu evolución</div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.state.routines.map(routine => `
            <div class="routine-card">
                <div class="routine-header">
                    <div class="routine-icon">${this.getCategoryIcon(routine.category)}</div>
                </div>
                <div class="routine-name">${routine.name}</div>
                <div class="routine-stats">
                    <span>${routine.tasks.length} tareas</span>
                    <span>${routine.tasks.reduce((sum, t) => sum + (t.duration || 0), 0)} min</span>
                </div>
                <div class="routine-days">
                    ${['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => `
                        <div class="day-indicator ${routine.days.includes(i === 6 ? 0 : i + 1) ? 'active' : ''}">
                            ${day}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    renderProgress() {
        // Render stats
        document.getElementById('streakValue').textContent = this.state.user?.stats.streak || 0;
        document.getElementById('completedValue').textContent = this.state.user?.stats.totalCompleted || 0;

        const hours = Math.floor((this.state.user?.stats.totalTime || 0) / 60);
        const minutes = (this.state.user?.stats.totalTime || 0) % 60;
        document.getElementById('timeValue').textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

        const recentHistory = this.getRecentHistory(7);
        const oldHistory = this.state.history.filter(h => {
            const cutoff = new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0];
            const twoWeeksAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
            return h.date >= cutoff && h.date < twoWeeksAgo;
        });

        const improvement = oldHistory.length > 0
            ? ((recentHistory.length - oldHistory.length) / oldHistory.length * 100)
            : (recentHistory.length > 0 ? 100 : 0);

        document.getElementById('improvementValue').textContent = `${improvement > 0 ? '+' : ''}${improvement.toFixed(0)}%`;

        // Render activity chart
        this.renderActivityChart();

        // Render insights
        this.renderInsights();
    }

    renderActivityChart() {
        const container = document.getElementById('activityChart');
        if (!container) return;

        const weekData = this.getWeeklyActivity();
        const maxValue = Math.max(...weekData.map(d => d.value), 1);

        container.innerHTML = weekData.map(day => {
            const height = (day.value / maxValue) * 100;
            return `
                <div class="chart-bar" style="height: ${height}%" title="${day.day}: ${day.value} min">
                    <div class="chart-bar-label">${day.day}</div>
                </div>
            `;
        }).join('');
    }

    renderInsights() {
        const container = document.getElementById('insightsList');
        if (!container) return;

        const insights = this.generateInsights();

        if (insights.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <div class="empty-state-description">Completá más tareas para ver insights personalizados</div>
                </div>
            `;
            return;
        }

        container.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-content">
                    <div class="insight-title">${insight.title}</div>
                    <div class="insight-description">${insight.description}</div>
                </div>
            </div>
        `).join('');
    }

    updateDailyScore() {
        const scoreCircle = document.getElementById('scoreCircle');
        const scoreValue = document.getElementById('scoreValue');

        if (!scoreCircle || !scoreValue) return;

        const completed = this.state.tasks.filter(t => t.completed).length;
        const total = this.state.tasks.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        const circumference = 282.7;
        const offset = circumference - (percentage / 100) * circumference;

        scoreCircle.style.strokeDashoffset = offset;
        scoreValue.textContent = `${percentage}%`;
    }

    // === Event Listeners ===
    setupEventListeners() {
        // Welcome screen
        document.getElementById('startBtn')?.addEventListener('click', () => {
            const name = document.getElementById('userName')?.value.trim();
            const selectedCategory = document.querySelector('.category-btn.active');

            if (!name) {
                alert('Por favor, ingresá tu nombre');
                return;
            }

            if (!selectedCategory) {
                alert('Por favor, seleccioná una categoría');
                return;
            }

            this.createUser(name, selectedCategory.dataset.category);
        });

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Tab navigation
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Add task button
        document.getElementById('addTaskBtn')?.addEventListener('click', () => {
            this.openTaskModal();
        });

        // Task modal
        document.getElementById('closeTaskModal')?.addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('cancelTaskBtn')?.addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('saveTaskBtn')?.addEventListener('click', () => {
            this.saveTask();
        });

        // Priority buttons
        document.querySelectorAll('.priority-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Create routine button
        document.getElementById('createRoutineBtn')?.addEventListener('click', () => {
            this.openRoutineModal();
        });

        // Routine modal
        document.getElementById('closeRoutineModal')?.addEventListener('click', () => {
            this.closeRoutineModal();
        });

        document.getElementById('cancelRoutineBtn')?.addEventListener('click', () => {
            this.closeRoutineModal();
        });

        document.getElementById('saveRoutineBtn')?.addEventListener('click', () => {
            this.saveRoutine();
        });

        // Day buttons
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
            });
        });

        // Period selector
        document.getElementById('periodSelector')?.addEventListener('change', (e) => {
            // Could implement different time ranges for progress
            this.renderProgress();
        });

        // Close modals on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Generate tasks daily
        this.checkAndGenerateDailyTasks();
    }

    attachTaskEventListeners() {
        // Task checkboxes
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const taskId = checkbox.dataset.taskId;
                this.toggleTask(taskId);
            });
        });

        // Task actions
        document.querySelectorAll('.task-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const taskId = btn.dataset.taskId;

                if (action === 'delete') {
                    if (confirm('¿Eliminar esta tarea?')) {
                        this.deleteTask(taskId);
                    }
                }
            });
        });
    }

    checkAndGenerateDailyTasks() {
        const lastGenerated = localStorage.getItem('lastTaskGeneration');
        const today = new Date().toISOString().split('T')[0];

        if (lastGenerated !== today && this.state.user) {
            this.generateTodaysTasks();
            localStorage.setItem('lastTaskGeneration', today);
        }

        // Check again tomorrow
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilTomorrow = tomorrow - now;

        setTimeout(() => {
            this.checkAndGenerateDailyTasks();
        }, timeUntilTomorrow);
    }

    // === Modal Management ===
    openTaskModal() {
        document.getElementById('taskModal').classList.add('active');
        document.getElementById('taskName').focus();
    }

    closeTaskModal() {
        document.getElementById('taskModal').classList.remove('active');
        document.getElementById('taskName').value = '';
        document.getElementById('taskDuration').value = '';
    }

    saveTask() {
        const name = document.getElementById('taskName').value.trim();
        const duration = document.getElementById('taskDuration').value;
        const category = document.getElementById('taskCategory').value;
        const priority = document.querySelector('.priority-btn.active')?.dataset.priority || 'medium';

        if (!name) {
            alert('Por favor, ingresá el nombre de la tarea');
            return;
        }

        this.addTask({ name, duration, category, priority });
        this.closeTaskModal();
    }

    openRoutineModal() {
        document.getElementById('routineModal').classList.add('active');
        document.getElementById('routineName').focus();
    }

    closeRoutineModal() {
        document.getElementById('routineModal').classList.remove('active');
        document.getElementById('routineName').value = '';
        document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
    }

    saveRoutine() {
        const name = document.getElementById('routineName').value.trim();
        const category = document.getElementById('routineCategory').value;
        const days = Array.from(document.querySelectorAll('.day-btn.active'))
            .map(btn => parseInt(btn.dataset.day));

        if (!name) {
            alert('Por favor, ingresá el nombre de la rutina');
            return;
        }

        if (days.length === 0) {
            alert('Por favor, seleccioná al menos un día');
            return;
        }

        this.createRoutine({ name, category, days });
        this.closeRoutineModal();
    }

    // === UI Helpers ===
    switchTab(tabName) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        document.getElementById(`${tabName}Pane`)?.classList.add('active');

        if (tabName === 'progress') {
            this.renderProgress();
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        this.state.settings.theme = newTheme;
        this.applyTheme();
        this.saveState();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.state.settings.theme);
    }

    // === Utility Functions ===
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    isToday(dateString) {
        const today = new Date().toISOString().split('T')[0];
        const date = new Date(dateString).toISOString().split('T')[0];
        return date === today;
    }

    getCategoryName(category) {
        const names = {
            fitness: 'Fitness',
            estudio: 'Estudio',
            trabajo: 'Trabajo',
            bienestar: 'Bienestar'
        };
        return names[category] || category;
    }

    getCategoryIcon(category) {
        const icons = {
            fitness: '💪',
            estudio: '📚',
            trabajo: '💼',
            bienestar: '🧘'
        };
        return icons[category] || '📌';
    }
}

// Initialize app
const app = new EvoRoutine();
