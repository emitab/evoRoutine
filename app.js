// ===========================
// STATE MANAGEMENT
// ===========================
const AppState = {
    user: null,
    currentTab: 'today',
    tasks: [],
    routines: [],
    stats: {
        completedTasks: 0,
        completionRate: 0,
        currentStreak: 0
    }
};

// ===========================
// DEMO DATA
// ===========================
const DEMO_TASKS = [
    {
        id: 1,
        name: 'Entrenamiento de piernas',
        category: 'fitness',
        duration: 45,
        completed: false,
        categoryIcon: '💪'
    },
    {
        id: 2,
        name: 'Estudiar JavaScript avanzado',
        category: 'study',
        duration: 60,
        completed: false,
        categoryIcon: '📚'
    },
    {
        id: 3,
        name: 'Meditación matinal',
        category: 'wellness',
        duration: 15,
        completed: true,
        categoryIcon: '🧘'
    }
];

const DEMO_ROUTINES = [
    {
        id: 1,
        name: 'Entrenamiento matinal',
        goal: 'fitness',
        goalIcon: '🏋️',
        frequency: 5,
        tasksCount: 4,
        completedToday: true
    },
    {
        id: 2,
        name: 'Estudio diario',
        goal: 'learning',
        goalIcon: '🎓',
        frequency: 7,
        tasksCount: 3,
        completedToday: false
    },
    {
        id: 3,
        name: 'Bienestar nocturno',
        goal: 'wellness',
        goalIcon: '🌟',
        frequency: 7,
        tasksCount: 2,
        completedToday: false
    }
];

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateTodayDate();
});

function initializeApp() {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('evoRoutineUser');
    const savedTasks = localStorage.getItem('evoRoutineTasks');
    const savedRoutines = localStorage.getItem('evoRoutineRoutines');
    
    if (savedUser) {
        AppState.user = JSON.parse(savedUser);
        AppState.tasks = savedTasks ? JSON.parse(savedTasks) : DEMO_TASKS;
        AppState.routines = savedRoutines ? JSON.parse(savedRoutines) : DEMO_ROUTINES;
        showMainApp();
    }
}

// ===========================
// EVENT LISTENERS
// ===========================
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('btnGetStarted')?.addEventListener('click', scrollToApp);
    document.getElementById('btnHeroStart')?.addEventListener('click', scrollToApp);
    document.getElementById('btnDemo')?.addEventListener('click', showDemo);
    
    // Auth buttons
    document.getElementById('authForm')?.addEventListener('submit', handleAuth);
    document.getElementById('btnDemoMode')?.addEventListener('click', enterDemoMode);
    document.getElementById('btnRegister')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Registro completo disponible próximamente. Por ahora, prueba el modo demo.');
    });
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Task creation
    document.getElementById('btnAddTask')?.addEventListener('click', () => openModal('modalCreateTask'));
    document.getElementById('formCreateTask')?.addEventListener('submit', handleCreateTask);
    
    // Routine creation
    document.getElementById('btnCreateRoutine')?.addEventListener('click', () => openModal('modalCreateRoutine'));
    document.getElementById('formCreateRoutine')?.addEventListener('submit', handleCreateRoutine);
    
    // Settings
    document.getElementById('btnSettings')?.addEventListener('click', () => {
        alert('Configuración disponible próximamente.');
    });
}

// ===========================
// NAVIGATION
// ===========================
function scrollToApp() {
    document.getElementById('app')?.scrollIntoView({ behavior: 'smooth' });
}

function showDemo() {
    scrollToApp();
    setTimeout(() => {
        enterDemoMode();
    }, 500);
}

function switchTab(tabName) {
    AppState.currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(`tab${capitalize(tabName)}`);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
    
    // Load tab content
    if (tabName === 'today') {
        renderTasks();
    } else if (tabName === 'routines') {
        renderRoutines();
    } else if (tabName === 'progress') {
        renderProgress();
    }
}

// ===========================
// AUTHENTICATION
// ===========================
function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple demo authentication
    if (email && password) {
        AppState.user = { email, name: email.split('@')[0] };
        localStorage.setItem('evoRoutineUser', JSON.stringify(AppState.user));
        AppState.tasks = DEMO_TASKS;
        AppState.routines = DEMO_ROUTINES;
        saveTasks();
        saveRoutines();
        showMainApp();
    }
}

function enterDemoMode() {
    AppState.user = { email: 'demo@evoroutine.app', name: 'Usuario Demo' };
    AppState.tasks = [...DEMO_TASKS];
    AppState.routines = [...DEMO_ROUTINES];
    showMainApp();
}

function showMainApp() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    document.getElementById('userName').textContent = AppState.user.name || 'Usuario';
    switchTab('today');
}

// ===========================
// TASKS MANAGEMENT
// ===========================
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    if (!tasksList) return;
    
    if (AppState.tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h3>No hay actividades para hoy</h3>
                <p>Crea tu primera actividad para comenzar</p>
            </div>
        `;
        return;
    }
    
    tasksList.innerHTML = AppState.tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
            <div class="task-content">
                <div class="task-name">${task.name}</div>
                <div class="task-meta">
                    <span class="task-category">${task.categoryIcon} ${getCategoryName(task.category)}</span>
                    <span>⏱️ ${task.duration} min</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-icon" onclick="deleteTask(${task.id})" title="Eliminar">🗑️</button>
            </div>
        </div>
    `).join('');
}

function toggleTask(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function deleteTask(taskId) {
    if (confirm('¿Eliminar esta actividad?')) {
        AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function handleCreateTask(e) {
    e.preventDefault();
    
    const name = document.getElementById('taskName').value;
    const category = document.getElementById('taskCategory').value;
    const duration = parseInt(document.getElementById('taskDuration').value);
    
    const newTask = {
        id: Date.now(),
        name,
        category,
        duration,
        completed: false,
        categoryIcon: getCategoryIcon(category)
    };
    
    AppState.tasks.push(newTask);
    saveTasks();
    renderTasks();
    closeModal('modalCreateTask');
    e.target.reset();
}

// ===========================
// ROUTINES MANAGEMENT
// ===========================
function renderRoutines() {
    const routinesGrid = document.getElementById('routinesGrid');
    if (!routinesGrid) return;
    
    if (AppState.routines.length === 0) {
        routinesGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>No hay rutinas creadas</h3>
                <p>Crea tu primera rutina personalizada</p>
            </div>
        `;
        return;
    }
    
    routinesGrid.innerHTML = AppState.routines.map(routine => `
        <div class="routine-card" onclick="selectRoutine(${routine.id})">
            <div class="routine-icon">${routine.goalIcon}</div>
            <div class="routine-name">${routine.name}</div>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-top: 0.5rem;">
                ${getGoalName(routine.goal)}
            </p>
            <div class="routine-stats">
                <span>📊 ${routine.tasksCount} actividades</span>
                <span>🗓️ ${routine.frequency}x/semana</span>
            </div>
            ${routine.completedToday ? '<div style="margin-top: 1rem; color: var(--success); font-size: 0.875rem;">✓ Completada hoy</div>' : ''}
        </div>
    `).join('');
}

function selectRoutine(routineId) {
    alert('Visualización detallada de rutina disponible próximamente.');
}

function handleCreateRoutine(e) {
    e.preventDefault();
    
    const name = document.getElementById('routineName').value;
    const goal = document.getElementById('routineGoal').value;
    const frequency = parseInt(document.getElementById('routineFrequency').value);
    
    const newRoutine = {
        id: Date.now(),
        name,
        goal,
        goalIcon: getGoalIcon(goal),
        frequency,
        tasksCount: 0,
        completedToday: false
    };
    
    AppState.routines.push(newRoutine);
    saveRoutines();
    renderRoutines();
    closeModal('modalCreateRoutine');
    e.target.reset();
}

// ===========================
// PROGRESS TRACKING
// ===========================
function renderProgress() {
    updateStats();
    
    document.getElementById('completedTasks').textContent = AppState.stats.completedTasks;
    document.getElementById('completionRate').textContent = AppState.stats.completionRate + '%';
    document.getElementById('currentStreak').textContent = AppState.stats.currentStreak;
    
    // Simple chart placeholder
    const canvas = document.getElementById('progressChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        // Draw simple bar chart
        ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.fillRect(50, 50, 100, 200);
        ctx.fillRect(200, 100, 100, 150);
        ctx.fillRect(350, 80, 100, 170);
        ctx.fillRect(500, 120, 100, 130);
        ctx.fillRect(650, 60, 100, 190);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = '14px Inter';
        ctx.fillText('Lun', 70, 270);
        ctx.fillText('Mar', 220, 270);
        ctx.fillText('Mié', 370, 270);
        ctx.fillText('Jue', 520, 270);
        ctx.fillText('Vie', 670, 270);
    }
}

function updateStats() {
    const completed = AppState.tasks.filter(t => t.completed).length;
    const total = AppState.tasks.length;
    
    AppState.stats.completedTasks = completed;
    AppState.stats.completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    AppState.stats.currentStreak = 3; // Mock streak data
}

// ===========================
// MODALS
// ===========================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===========================
// UTILITIES
// ===========================
function updateTodayDate() {
    const dateElement = document.getElementById('todayDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('es-ES', options);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCategoryIcon(category) {
    const icons = {
        fitness: '💪',
        study: '📚',
        work: '💼',
        wellness: '🧘'
    };
    return icons[category] || '📌';
}

function getCategoryName(category) {
    const names = {
        fitness: 'Fitness',
        study: 'Estudio',
        work: 'Trabajo',
        wellness: 'Bienestar'
    };
    return names[category] || category;
}

function getGoalIcon(goal) {
    const icons = {
        fitness: '🏋️',
        productivity: '⚡',
        learning: '🎓',
        wellness: '🌟'
    };
    return icons[goal] || '🎯';
}

function getGoalName(goal) {
    const names = {
        fitness: 'Mejorar fitness',
        productivity: 'Aumentar productividad',
        learning: 'Aprender nuevas habilidades',
        wellness: 'Bienestar general'
    };
    return names[goal] || goal;
}

function saveTasks() {
    localStorage.setItem('evoRoutineTasks', JSON.stringify(AppState.tasks));
}

function saveRoutines() {
    localStorage.setItem('evoRoutineRoutines', JSON.stringify(AppState.routines));
}

// ===========================
// SMOOTH SCROLL FOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
