// ============================================
// EvoRoutine - Internationalization System
// ============================================

const translations = {
    es: {
        // Header
        'header.settings': 'Ajustes',
        'header.profile': 'Perfil',

        // Welcome Screen
        'welcome.title': 'Tu evolución,',
        'welcome.titleHighlight': 'día a día',
        'welcome.subtitle': 'Rutinas personalizadas que se adaptan a tu ritmo de vida real',
        'welcome.nameLabel': '¿Cómo te llamás?',
        'welcome.namePlaceholder': 'Tu nombre',
        'welcome.environmentLabel': '¿Dónde vas a entrenar?',
        'welcome.gym': 'Gimnasio',
        'welcome.home': 'Casa',
        'welcome.levelLabel': '¿Cuál es tu nivel?',
        'welcome.beginner': 'Principiante',
        'welcome.intermediate': 'Intermedio',
        'welcome.advanced': 'Avanzado',
        'welcome.goalLabel': '¿Cuál es tu objetivo?',
        'welcome.strength': 'Fuerza',
        'welcome.hypertrophy': 'Hipertrofia',
        'welcome.endurance': 'Resistencia',
        'welcome.startButton': 'Empezar mi evolución',
        'welcome.trust1': 'Tasa de cumplimiento',
        'welcome.trust2': 'Setup inicial',
        'welcome.trust3': 'Gratis',

        // Tabs
        'tabs.today': 'Hoy',
        'tabs.routines': 'Rutinas',
        'tabs.progress': 'Progreso',
        'tabs.exercises': 'Ejercicios',

        // Today View
        'today.title': 'Tu rutina de hoy',
        'today.noTasks': 'No hay tareas para hoy',
        'today.noTasksDesc': 'Creá una nueva tarea o configurá una rutina',
        'today.addTask': 'Nueva tarea',
        'today.suggestions': 'Sugerencias adaptativas',

        // Task Properties
        'task.duration': 'min',
        'task.sets': 'series',
        'task.reps': 'reps',
        'task.weight': 'kg',
        'task.rest': 'Descanso',
        'task.replace': 'Reemplazar',
        'task.edit': 'Editar',
        'task.delete': 'Eliminar',
        'task.completed': 'Completada',

        // Routines
        'routines.title': 'Mis Rutinas',
        'routines.create': 'Crear rutina',
        'routines.noRoutines': 'No tenés rutinas creadas',
        'routines.noRoutinesDesc': 'Creá tu primera rutina para organizar tu evolución',
        'routines.tasks': 'ejercicios',
        'routines.duration': 'min',
        'routines.active': 'Activa',
        'routines.edit': 'Editar',
        'routines.delete': 'Eliminar',

        // Progress
        'progress.title': 'Tu Progreso',
        'progress.period': 'Período',
        'progress.week': 'Última semana',
        'progress.month': 'Último mes',
        'progress.quarter': 'Últimos 3 meses',
        'progress.streak': 'Días consecutivos',
        'progress.completed': 'Tareas completadas',
        'progress.time': 'Tiempo invertido',
        'progress.improvement': 'Mejora promedio',
        'progress.activity': 'Actividad semanal',
        'progress.insights': 'Insights adaptativos',
        'progress.noInsights': 'Completá más tareas para ver insights personalizados',

        // Days
        'day.sun': 'Dom',
        'day.mon': 'Lun',
        'day.tue': 'Mar',
        'day.wed': 'Mié',
        'day.thu': 'Jue',
        'day.fri': 'Vie',
        'day.sat': 'Sáb',

        // Settings
        'settings.title': 'Ajustes',
        'settings.language': 'Idioma',
        'settings.theme': 'Tema',
        'settings.themeDark': 'Oscuro',
        'settings.themeLight': 'Claro',
        'settings.profile': 'Perfil',
        'settings.name': 'Nombre',
        'settings.environment': 'Entorno de entrenamiento',
        'settings.level': 'Nivel',
        'settings.goal': 'Objetivo',
        'settings.preferences': 'Preferencias',
        'settings.restTime': 'Tiempo de descanso predeterminado',
        'settings.notifications': 'Notificaciones',
        'settings.sound': 'Sonidos',
        'settings.data': 'Datos',
        'settings.export': 'Exportar datos',
        'settings.import': 'Importar datos',
        'settings.deleteAccount': 'Eliminar cuenta',
        'settings.deleteConfirm': 'Esta acción eliminará permanentemente todos tus datos, rutinas y progreso. No se puede deshacer.',
        'settings.deleteWarning': '¿Estás absolutamente seguro?',
        'settings.save': 'Guardar cambios',
        'settings.cancel': 'Cancelar',

        // Modals
        'modal.close': 'Cerrar',
        'modal.save': 'Guardar',
        'modal.cancel': 'Cancelar',
        'modal.delete': 'Eliminar',
        'modal.confirm': 'Confirmar',

        // Task Modal
        'taskModal.create': 'Nueva Tarea',
        'taskModal.edit': 'Editar Tarea',
        'taskModal.name': 'Nombre del ejercicio',
        'taskModal.namePlaceholder': 'Ej: Sentadillas',
        'taskModal.sets': 'Series',
        'taskModal.reps': 'Repeticiones',
        'taskModal.weight': 'Peso (kg)',
        'taskModal.rest': 'Descanso (seg)',
        'taskModal.notes': 'Notas',

        // Routine Modal
        'routineModal.create': 'Nueva Rutina',
        'routineModal.edit': 'Editar Rutina',
        'routineModal.name': 'Nombre de la rutina',
        'routineModal.namePlaceholder': 'Ej: Rutina de piernas',
        'routineModal.environment': 'Entorno',
        'routineModal.level': 'Nivel',
        'routineModal.goal': 'Objetivo',
        'routineModal.days': 'Días de la semana',
        'routineModal.exercises': 'Ejercicios',
        'routineModal.addExercise': 'Agregar ejercicio',

        // Exercise Library
        'exercises.title': 'Biblioteca de Ejercicios',
        'exercises.search': 'Buscar ejercicios...',
        'exercises.filterEnvironment': 'Entorno',
        'exercises.filterMuscle': 'Grupo muscular',
        'exercises.all': 'Todos',
        'exercises.noResults': 'No se encontraron ejercicios',

        // Muscle Groups
        'muscle.chest': 'Pecho',
        'muscle.back': 'Espalda',
        'muscle.legs': 'Piernas',
        'muscle.shoulders': 'Hombros',
        'muscle.arms': 'Brazos',
        'muscle.core': 'Core',
        'muscle.cardio': 'Cardio',

        // Insights (ML)
        'insight.bestTime.title': 'Tu mejor momento',
        'insight.bestTime.desc': 'Completás más tareas alrededor de las {time}hs. Programá tus actividades más importantes en ese horario.',
        'insight.consistency.title': 'Excelente constancia',
        'insight.consistency.desc': 'Mantuviste más del {rate}% de cumplimiento esta semana. ¡Seguí así!',
        'insight.topCategory.title': 'Tu fuerte',
        'insight.topCategory.desc': 'Has dedicado {time} minutos a entrenamientos de {type} en el último mes.',
        'insight.improvement.title': 'Tendencia positiva',
        'insight.improvement.desc': 'Tu productividad aumentó un {improvement}% comparado con hace 3 semanas.',
        'insight.overload.title': 'Día demandante detectado',
        'insight.overload.desc': 'Tu rutina suma {duration} minutos. Considerá reorganizar o posponer tareas menos urgentes.',
        'insight.morningStart.title': 'Buen momento para empezar',
        'insight.morningStart.desc': 'Las mañanas suelen ser ideales para entrenamientos que requieren energía. ¿Empezamos?',
        'insight.eveningPush.title': 'Hora de cerrar el día',
        'insight.eveningPush.desc': 'Tenés {pending} tareas pendientes. Considerá priorizar las más importantes para mañana.',
        'insight.restDay.title': 'Considerá un día de descanso',
        'insight.restDay.desc': 'Has entrenado {days} días consecutivos. El descanso es esencial para la recuperación muscular.',
        'insight.progressive.title': 'Momento de incrementar carga',
        'insight.progressive.desc': 'Has completado este ejercicio {times} veces con el mismo peso. Considerá aumentar {amount}kg.',

        // Notifications
        'notif.taskCompleted': 'Tarea completada',
        'notif.routineCreated': 'Rutina creada exitosamente',
        'notif.settingsSaved': 'Ajustes guardados',
        'notif.dataExported': 'Datos exportados',
        'notif.accountDeleted': 'Cuenta eliminada',

        // Errors
        'error.invalidName': 'Por favor, ingresá tu nombre',
        'error.selectEnvironment': 'Por favor, seleccioná un entorno',
        'error.selectLevel': 'Por favor, seleccioná tu nivel',
        'error.selectGoal': 'Por favor, seleccioná tu objetivo',
        'error.generic': 'Ocurrió un error. Intentá nuevamente.',
    },

    en: {
        // Header
        'header.settings': 'Settings',
        'header.profile': 'Profile',

        // Welcome Screen
        'welcome.title': 'Your evolution,',
        'welcome.titleHighlight': 'day by day',
        'welcome.subtitle': 'Personalized routines that adapt to your real life pace',
        'welcome.nameLabel': 'What\'s your name?',
        'welcome.namePlaceholder': 'Your name',
        'welcome.environmentLabel': 'Where will you train?',
        'welcome.gym': 'Gym',
        'welcome.home': 'Home',
        'welcome.levelLabel': 'What\'s your level?',
        'welcome.beginner': 'Beginner',
        'welcome.intermediate': 'Intermediate',
        'welcome.advanced': 'Advanced',
        'welcome.goalLabel': 'What\'s your goal?',
        'welcome.strength': 'Strength',
        'welcome.hypertrophy': 'Hypertrophy',
        'welcome.endurance': 'Endurance',
        'welcome.startButton': 'Start my evolution',
        'welcome.trust1': 'Completion rate',
        'welcome.trust2': 'Initial setup',
        'welcome.trust3': 'Free',

        // Tabs
        'tabs.today': 'Today',
        'tabs.routines': 'Routines',
        'tabs.progress': 'Progress',
        'tabs.exercises': 'Exercises',

        // Today View
        'today.title': 'Today\'s routine',
        'today.noTasks': 'No tasks for today',
        'today.noTasksDesc': 'Create a new task or set up a routine',
        'today.addTask': 'New task',
        'today.suggestions': 'Adaptive suggestions',

        // Task Properties
        'task.duration': 'min',
        'task.sets': 'sets',
        'task.reps': 'reps',
        'task.weight': 'lbs',
        'task.rest': 'Rest',
        'task.replace': 'Replace',
        'task.edit': 'Edit',
        'task.delete': 'Delete',
        'task.completed': 'Completed',

        // Routines
        'routines.title': 'My Routines',
        'routines.create': 'Create routine',
        'routines.noRoutines': 'No routines created',
        'routines.noRoutinesDesc': 'Create your first routine to organize your evolution',
        'routines.tasks': 'exercises',
        'routines.duration': 'min',
        'routines.active': 'Active',
        'routines.edit': 'Edit',
        'routines.delete': 'Delete',

        // Progress
        'progress.title': 'Your Progress',
        'progress.period': 'Period',
        'progress.week': 'Last week',
        'progress.month': 'Last month',
        'progress.quarter': 'Last 3 months',
        'progress.streak': 'Day streak',
        'progress.completed': 'Completed tasks',
        'progress.time': 'Time invested',
        'progress.improvement': 'Average improvement',
        'progress.activity': 'Weekly activity',
        'progress.insights': 'Adaptive insights',
        'progress.noInsights': 'Complete more tasks to see personalized insights',

        // Days
        'day.sun': 'Sun',
        'day.mon': 'Mon',
        'day.tue': 'Tue',
        'day.wed': 'Wed',
        'day.thu': 'Thu',
        'day.fri': 'Fri',
        'day.sat': 'Sat',

        // Settings
        'settings.title': 'Settings',
        'settings.language': 'Language',
        'settings.theme': 'Theme',
        'settings.themeDark': 'Dark',
        'settings.themeLight': 'Light',
        'settings.profile': 'Profile',
        'settings.name': 'Name',
        'settings.environment': 'Training environment',
        'settings.level': 'Level',
        'settings.goal': 'Goal',
        'settings.preferences': 'Preferences',
        'settings.restTime': 'Default rest time',
        'settings.notifications': 'Notifications',
        'settings.sound': 'Sounds',
        'settings.data': 'Data',
        'settings.export': 'Export data',
        'settings.import': 'Import data',
        'settings.deleteAccount': 'Delete account',
        'settings.deleteConfirm': 'This action will permanently delete all your data, routines, and progress. It cannot be undone.',
        'settings.deleteWarning': 'Are you absolutely sure?',
        'settings.save': 'Save changes',
        'settings.cancel': 'Cancel',

        // Modals
        'modal.close': 'Close',
        'modal.save': 'Save',
        'modal.cancel': 'Cancel',
        'modal.delete': 'Delete',
        'modal.confirm': 'Confirm',

        // Task Modal
        'taskModal.create': 'New Task',
        'taskModal.edit': 'Edit Task',
        'taskModal.name': 'Exercise name',
        'taskModal.namePlaceholder': 'E.g: Squats',
        'taskModal.sets': 'Sets',
        'taskModal.reps': 'Reps',
        'taskModal.weight': 'Weight (lbs)',
        'taskModal.rest': 'Rest (sec)',
        'taskModal.notes': 'Notes',

        // Routine Modal
        'routineModal.create': 'New Routine',
        'routineModal.edit': 'Edit Routine',
        'routineModal.name': 'Routine name',
        'routineModal.namePlaceholder': 'E.g: Leg day',
        'routineModal.environment': 'Environment',
        'routineModal.level': 'Level',
        'routineModal.goal': 'Goal',
        'routineModal.days': 'Days of the week',
        'routineModal.exercises': 'Exercises',
        'routineModal.addExercise': 'Add exercise',

        // Exercise Library
        'exercises.title': 'Exercise Library',
        'exercises.search': 'Search exercises...',
        'exercises.filterEnvironment': 'Environment',
        'exercises.filterMuscle': 'Muscle group',
        'exercises.all': 'All',
        'exercises.noResults': 'No exercises found',

        // Muscle Groups
        'muscle.chest': 'Chest',
        'muscle.back': 'Back',
        'muscle.legs': 'Legs',
        'muscle.shoulders': 'Shoulders',
        'muscle.arms': 'Arms',
        'muscle.core': 'Core',
        'muscle.cardio': 'Cardio',

        // Insights (ML)
        'insight.bestTime.title': 'Your best time',
        'insight.bestTime.desc': 'You complete more tasks around {time}. Schedule your most important activities at that time.',
        'insight.consistency.title': 'Excellent consistency',
        'insight.consistency.desc': 'You maintained over {rate}% completion this week. Keep it up!',
        'insight.topCategory.title': 'Your strength',
        'insight.topCategory.desc': 'You\'ve dedicated {time} minutes to {type} workouts in the last month.',
        'insight.improvement.title': 'Positive trend',
        'insight.improvement.desc': 'Your productivity increased by {improvement}% compared to 3 weeks ago.',
        'insight.overload.title': 'Demanding day detected',
        'insight.overload.desc': 'Your routine totals {duration} minutes. Consider reorganizing or postponing less urgent tasks.',
        'insight.morningStart.title': 'Good time to start',
        'insight.morningStart.desc': 'Mornings are usually ideal for workouts that require energy. Shall we start?',
        'insight.eveningPush.title': 'Time to wrap up',
        'insight.eveningPush.desc': 'You have {pending} pending tasks. Consider prioritizing the most important ones for tomorrow.',
        'insight.restDay.title': 'Consider a rest day',
        'insight.restDay.desc': 'You\'ve trained {days} consecutive days. Rest is essential for muscle recovery.',
        'insight.progressive.title': 'Time to increase load',
        'insight.progressive.desc': 'You\'ve completed this exercise {times} times with the same weight. Consider increasing {amount}lbs.',

        // Notifications
        'notif.taskCompleted': 'Task completed',
        'notif.routineCreated': 'Routine created successfully',
        'notif.settingsSaved': 'Settings saved',
        'notif.dataExported': 'Data exported',
        'notif.accountDeleted': 'Account deleted',

        // Errors
        'error.invalidName': 'Please enter your name',
        'error.selectEnvironment': 'Please select an environment',
        'error.selectLevel': 'Please select your level',
        'error.selectGoal': 'Please select your goal',
        'error.generic': 'An error occurred. Please try again.',
    }
};

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('evoRoutine_lang') || 'es';
    }

    t(key, params = {}) {
        let text = translations[this.currentLang][key] || key;

        // Replace parameters
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });

        return text;
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('evoRoutine_lang', lang);
            return true;
        }
        return false;
    }

    getLanguage() {
        return this.currentLang;
    }

    getAvailableLanguages() {
        return Object.keys(translations);
    }
}

// Export for use in app
const i18n = new I18n();
