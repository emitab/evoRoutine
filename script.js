/**
 * EvoRoutine v5.0 - Market Ready / Mobile First
 * Architecture: MVC with Async Store Simulation (DB Ready)
 */

// --- 1. CONFIG & UTILS ---
const Config = {
    version: '5.0',
    env: 'production', // 'dev' or 'production'
    themeColor: '#8bc34a'
};

const Utils = {
    wait: (ms) => new Promise(r => setTimeout(r, ms)),
    guid: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
    dateStr: () => new Date().toLocaleDateString()
};

// --- 2. I18N MODULE ---
const I18n = {
    lang: 'en',
    data: {
        en: {
            "app.title": "EvoRoutine", "app.tagline": "Evolve Locally.",
            "auth.join": "Join the Evolution", "auth.name": "Your Name", "auth.email": "Your Email", "auth.start": "Start Journey", "auth.rec": "Have an account?", "auth.login": "Login",
            "auth.credit": "App made with ♥️ by emitab",
            "hub.hi": "Welcome back,", "hub.streak": "Streak", "hub.sess": "Sessions", "hub.gen": "Generate Workout", "hub.history": "Recent Activity",
            "sess.set": "Set", "sess.finish": "Finish Workout", "sess.copy": "Workout Copied!",
            "sess.next": "NEXT", "sess.ready": "READY", "sess.recover": "RECOVER", "sess.add": "+ Set", "sess.sub": "- Set",
            "rpe.title": "How did that feel?", "rpe.1": "Too Easy", "rpe.2": "Good", "rpe.3": "Hard", "rpe.4": "Failure",
            "sett.title": "Settings", "sett.lang": "Language", "sett.theme": "Theme",
            "sett.privacy": "Privacy & Data", "sett.support": "Support", "sett.export": "Export My Data", "sett.clear": "Clear Cache",
            "sett.tutorial": "Replay Tutorial", "sett.about": "About / Help", "sett.logout": "Logout", "sett.delete": "Delete Account",
            "msg.welcome": "Welcome to EvoRoutine!",
            "msg.email_sent": "Email sent!", "msg.deleted": "Account deleted successfully.", "msg.data_exported": "Data exported!",
            "msg.cache_cleared": "Cache cleared successfully.",
            "confirm.delete": "Are you sure you want to delete your account? This action cannot be undone.",
            "confirm.delete2": "This will permanently delete all your data. Type DELETE to confirm:",
            "confirm.clear": "Clear all your workout history and settings?",
            "tip.inc": "Increasing weight based on your easy RPE last time.",
            "tip.dec": "Reducing load slightly to help recovery.",
            "lbl.goal": "Goal", "lbl.lvl": "Level",
            "goal.hyp": "Hypertrophy", "goal.hyp.d": "Muscle Growth",
            "goal.str": "Strength", "goal.str.d": "Max Power",
            "goal.end": "Endurance", "goal.end.d": "Stamina",
            "lvl.beg": "Beginner", "lvl.int": "Intermediate", "lvl.adv": "Advanced",
            "unit.kg": "KG", "unit.reps": "REPS", "unit.sec": "SEC",
            "tut.welcome.title": "Welcome to EvoRoutine!",
            "tut.welcome.desc": "Your personal AI-powered workout companion. Let's take a quick tour.",
            "tut.welcome.tip": "This tutorial takes less than 1 minute",
            "tut.goals.title": "Set Your Goals",
            "tut.goals.desc": "Choose your training objective: Hypertrophy for muscle growth, Strength for max weight, or Endurance for stamina.",
            "tut.goals.tip": "You can change this anytime in Settings",
            "tut.generate.title": "Generate Your Workout",
            "tut.generate.desc": "Tap the GENERATE button to create a personalized routine based on your goals and level.",
            "tut.generate.tip": "The AI adapts to your progress automatically",
            "tut.session.title": "Track Your Sessions",
            "tut.session.desc": "Log your weight, reps, and effort (RPE) for each set. The app learns from your feedback.",
            "tut.session.tip": "RPE helps the AI adjust difficulty",
            "tut.progress.title": "Intelligent Progression",
            "tut.progress.desc": "The app automatically increases weight when exercises feel too easy, or reduces load if you're struggling.",
            "tut.progress.tip": "No more guesswork on progressive overload",
            "tut.settings.title": "Customize Everything",
            "tut.settings.desc": "Change language, theme, export your data, or adjust your training preferences in Settings.",
            "tut.settings.tip": "Your privacy matters - all data stays local",
            "tut.ready.title": "You're Ready!",
            "tut.ready.desc": "Start your first workout and watch your progress evolve. Train smart, not just hard.",
            "tut.ready.tip": "You can replay this tutorial anytime from Settings",
            "tut.next": "Next", "tut.prev": "Back", "tut.finish": "Start Training", "tut.skip": "Skip Tutorial",
            "login.subtitle": "Your intelligent training companion",
            "login.feature1": "Sync across all your devices",
            "login.feature2": "ML that learns from your progress",
            "login.feature3": "Your data secure in the cloud",
            "login.google": "Continue with Google",
            "login.or": "or",
            "login.local": "Continue in local mode",
            "login.disclaimer": "Local mode: your data is only saved on this device",
            "login.privacy": "By continuing, you accept our",
            "login.terms": "Terms",
            "login.policy": "Policy",
            "login.loading": "Signing in...",
            "env.gym": "Gym Routine", "env.home": "Home Routine",
            "cust.title": "New Exercise", "cust.desc": "Create your own exercise.",
            "cust.name": "Name (e.g. Box Jumps)", "cust.type": "Tracking Type",
            "cust.t.load": "Weights & Reps", "cust.t.body": "Reps Only (Bodyweight)", "cust.t.time": "Time / Duration",
            "cust.create": "Create", "cust.cancel": "Cancel", "cust.btn": "+ Create Custom Exercise", "cust.sub": "Custom"
        },
        es: {
            "app.title": "EvoRoutine", "app.tagline": "Evoluciona Localmente.",
            "auth.join": "Únete a la Evolución", "auth.name": "Tu Nombre", "auth.email": "Tu Correo", "auth.start": "Comenzar", "auth.rec": "¿Ya tienes cuenta?", "auth.login": "Entrar",
            "auth.credit": "Aplicación hecha con ♥️ por emitab",
            "hub.hi": "Hola,", "hub.streak": "Racha", "hub.sess": "Sesiones", "hub.gen": "Generar Rutina", "hub.history": "Actividad Reciente",
            "sess.set": "Serie", "sess.finish": "Terminar Rutina", "sess.copy": "¡Rutina copiada!",
            "sess.next": "SIGUIENTE", "sess.ready": "LISTO", "sess.recover": "RECUPERACIÓN", "sess.add": "+ Serie", "sess.sub": "- Serie",
            "rpe.title": "¿Qué tal se sintió?", "rpe.1": "Muy Fácil", "rpe.2": "Bien", "rpe.3": "Duro", "rpe.4": "Fallo",
            "sett.title": "Ajustes", "sett.lang": "Idioma", "sett.theme": "Tema",
            "sett.privacy": "Privacidad y Datos", "sett.support": "Soporte", "sett.export": "Exportar Mis Datos", "sett.clear": "Limpiar Caché",
            "sett.tutorial": "Repetir Tutorial", "sett.about": "Acerca de / Ayuda", "sett.logout": "Cerrar Sesión", "sett.delete": "Eliminar Cuenta",
            "msg.welcome": "¡Bienvenido a EvoRoutine!",
            "msg.deleted": "Cuenta eliminada exitosamente.", "msg.data_exported": "¡Datos exportados!",
            "msg.cache_cleared": "Caché limpiado exitosamente.",
            "confirm.delete": "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
            "confirm.delete2": "Esto eliminará permanentemente todos tus datos. Escribe ELIMINAR para confirmar:",
            "confirm.clear": "¿Limpiar todo tu historial de entrenamientos y configuraciones?",
            "tip.inc": "Subiendo peso por tu buen rendimiento anterior.",
            "tip.dec": "Bajando carga para priorizar la técnica hoy.",
            "lbl.goal": "Objetivo", "lbl.lvl": "Nivel",
            "goal.hyp": "Hipertrofia", "goal.hyp.d": "Volumen Muscular",
            "goal.str": "Fuerza", "goal.str.d": "Potencia Máxima",
            "goal.end": "Resistencia", "goal.end.d": "Fondo Físico",
            "lvl.beg": "Principiante", "lvl.int": "Intermedio", "lvl.adv": "Avanzado",
            "unit.kg": "KG", "unit.reps": "REPS", "unit.sec": "SEG",
            "tut.welcome.title": "¡Bienvenido a EvoRoutine!",
            "tut.welcome.desc": "Tu compañero personal de entrenamiento potenciado por IA. Hagamos un recorrido rápido.",
            "tut.welcome.tip": "Este tutorial dura menos de 1 minuto",
            "tut.goals.title": "Define Tus Objetivos",
            "tut.goals.desc": "Elige tu objetivo de entrenamiento: Hipertrofia para crecimiento muscular, Fuerza para potencia máxima, o Resistencia para fondo físico.",
            "tut.goals.tip": "Puedes cambiar esto en Ajustes cuando quieras",
            "tut.generate.title": "Genera Tu Rutina",
            "tut.generate.desc": "Toca el botón GENERAR para crear una rutina personalizada basada en tus objetivos y nivel.",
            "tut.generate.tip": "La IA se adapta a tu progreso automáticamente",
            "tut.session.title": "Registra Tus Sesiones",
            "tut.session.desc": "Anota tu peso, repeticiones y esfuerzo (RPE) para cada serie. La app aprende de tu feedback.",
            "tut.session.tip": "El RPE ayuda a la IA a ajustar la dificultad",
            "tut.progress.title": "Progresión Inteligente",
            "tut.progress.desc": "La app aumenta automáticamente el peso cuando los ejercicios se sienten muy fáciles, o reduce la carga si estás teniendo dificultades.",
            "tut.progress.tip": "No más dudas sobre la sobrecarga progresiva",
            "tut.settings.title": "Personaliza Todo",
            "tut.settings.desc": "Cambia idioma, tema, exporta tus datos o ajusta tus preferencias de entrenamiento en Ajustes.",
            "tut.settings.tip": "Tu privacidad importa - todos los datos quedan locales",
            "tut.ready.title": "¡Estás Listo!",
            "tut.ready.desc": "Comienza tu primer entrenamiento y observa cómo evoluciona tu progreso. Entrena inteligente, no solo duro.",
            "tut.ready.tip": "Puedes repetir este tutorial desde Ajustes cuando quieras",
            "tut.next": "Siguiente", "tut.prev": "Atrás", "tut.finish": "Comenzar a Entrenar", "tut.skip": "Saltar Tutorial",
            "login.subtitle": "Tu compañero inteligente de entrenamiento",
            "login.feature1": "Sincroniza en todos tus dispositivos",
            "login.feature2": "ML que aprende de tu progreso",
            "login.feature3": "Tus datos seguros en la nube",
            "login.google": "Continuar con Google",
            "login.or": "o",
            "login.local": "Continuar en modo local",
            "login.disclaimer": "Modo local: tus datos solo se guardan en este dispositivo",
            "login.privacy": "Al continuar, aceptas nuestros",
            "login.terms": "Términos",
            "login.policy": "Política de Privacidad",
            "login.loading": "Iniciando sesión...",
            "env.gym": "Gimnasio", "env.home": "Casa",
            "cust.title": "Nuevo Ejercicio", "cust.desc": "Crea tu propio ejercicio.",
            "cust.name": "Nombre (ej. Saltos al Cajón)", "cust.type": "Tipo de Registro",
            "cust.t.load": "Peso y Reps", "cust.t.body": "Solo Reps (Corporal)", "cust.t.time": "Tiempo / Duración",
            "cust.create": "Crear", "cust.cancel": "Cancelar", "cust.btn": "+ Crear Personalizado", "cust.sub": "Personalizado"
        }
    },
    t: (k) => I18n.data[I18n.lang][k] || k,
    setLang: (l) => { I18n.lang = l; document.documentElement.lang = l; }
};

// --- 3. SERVICES (MOCK BACKEND) ---
const Api = {
    // Simulates an email service
    sendWelcomeEmail: async (email, name) => {
        await Utils.wait(800); // Network delay simulation
        console.log(`[EMAIL SERVICE] To: ${email} | Subject: Welcome to EvoRoutine, ${name}! | Body: Train smart, track progress...`);
        return true;
    },
    syncUserData: async (user) => {
        await Utils.wait(500);
        localStorage.setItem('evo_sync_' + user.email, Date.now());
        return true;
    }
};

// --- 4. DATA STORE (DB LAYER) ---
const Store = {
    _get: () => { try { return JSON.parse(localStorage.getItem('evo_v4_users') || '[]'); } catch { return []; } },
    _set: (d) => localStorage.setItem('evo_v4_users', JSON.stringify(d)),

    // Async methods to mimic Real DB calls
    findUser: async (email) => {
        const users = Store._get();
        return users.find(u => u.email === email) || null;
    },
    saveUser: async (user) => {
        const users = Store._get();
        const idx = users.findIndex(u => u.email === user.email);
        if (idx >= 0) users[idx] = user; else users.push(user);
        Store._set(users);
        return user;
    },
    deleteUser: async (email) => {
        const users = Store._get().filter(u => u.email !== email);
        Store._set(users);
    },
    // Session Helper
    session: {
        get: () => localStorage.getItem('evo_active_v4'),
        set: (e) => localStorage.setItem('evo_active_v4', e),
        clear: () => localStorage.removeItem('evo_active_v4')
    },
    // History Helper
    lastLog: (user, exId) => {
        if (!user.history) return null;
        for (let i = user.history.length - 1; i >= 0; i--) {
            const row = user.history[i].routine.find(e => e.id === exId);
            if (row) return row;
        }
        return null;
    }
};

// --- 5. DOMAIN: EXERCISES & TRAINING ENGINE ---
const CATALOG = {
    // Tier 1: Basic / Low Neuro / Bodyweight Easy
    "squat_bw": { muscle: "legs", mode: "body", tier: 1, en: "Air Squat", es: "Sentadilla (Peso Corporal)" },
    "lunge_bw": { muscle: "legs", mode: "body", tier: 1, en: "Lunges (Bodyweight)", es: "Estocadas (Peso Corporal)" },
    "pushup": { muscle: "push", mode: "body", tier: 1, en: "Pushups", es: "Flexiones" },
    "knees_pushup": { muscle: "push", mode: "body", tier: 1, en: "Knee Pushups", es: "Flexiones (Rodillas)" },
    "plank": { muscle: "core", mode: "time", tier: 1, en: "Plank", es: "Plancha" },
    "crunch": { muscle: "core", mode: "body", tier: 1, en: "Crunches", es: "Abdominales" },
    "superman": { muscle: "pull", mode: "body", tier: 1, en: "Superman", es: "Superman (Lumbares)" },
    "glute_bridge": { muscle: "legs", mode: "body", tier: 1, en: "Glute Bridge", es: "Puente de Glúteos" },

    // Tier 2: Weighted Isolation / Moderate Compound / Skilled BW
    "lunge": { muscle: "legs", mode: "load", tier: 2, req: ["dumbbells"], en: "Weighted Lunges", es: "Estocadas con Carga" },
    "row": { muscle: "pull", mode: "load", tier: 2, req: ["dumbbells"], en: "Dumbbell Row", es: "Remo Mancuerna" },
    "pullup": { muscle: "pull", mode: "body", tier: 2, req: ["bar"], en: "Pull Ups", es: "Dominadas" },
    "dip": { muscle: "push", mode: "body", tier: 2, req: ["bars"], en: "Dips", es: "Fondos" },
    "curl": { muscle: "pull", mode: "load", tier: 2, req: ["dumbbells"], en: "Bicep Curl", es: "Curl Bíceps" },
    "ext": { muscle: "push", mode: "load", tier: 2, req: ["dumbbells"], en: "Tricep Ext", es: "Ext. Tríceps" },
    "weighted_crunch": { muscle: "core", mode: "load", tier: 2, req: ["dumbbells"], en: "Weighted Crunch", es: "Crunch con Carga" },
    "diamond_pushup": { muscle: "push", mode: "body", tier: 2, en: "Diamond Pushups", es: "Flexiones Diamante" },

    // Tier 3: High CNS / Heavy Compound / Advanced Calisthenics
    "squat": { muscle: "legs", mode: "load", tier: 3, req: ["dumbbells"], en: "Goblet Squat", es: "Sentadilla Goblet" },
    "deadlift": { muscle: "pull", mode: "load", tier: 3, req: ["dumbbells"], en: "DB Deadlift", es: "Peso Muerto Mancuernas" },
    "bench": { muscle: "push", mode: "load", tier: 3, req: ["dumbbells"], en: "DB Floor Press", es: "Press Mancuernas Suelo" },
    "ohp": { muscle: "push", mode: "load", tier: 3, req: ["dumbbells"], en: "DB Overhead Press", es: "Press Militar Mancuerna" },
    "hanging_raise": { muscle: "core", mode: "body", tier: 3, req: ["bar"], en: "Hanging Leg Raise", es: "Elevación de Piernas" },
    "pistol": { muscle: "legs", mode: "body", tier: 3, en: "Pistol Squat", es: "Sentadilla Pistol" },
    "archer_pushup": { muscle: "push", mode: "body", tier: 3, en: "Archer Pushups", es: "Flexiones Arqueras" },
    "jump_rope": { muscle: "cardio", mode: "time", tier: 1, req: ["rope"], en: "Jump Rope", es: "Saltar la Cuerda" }
};

const Trainer = {
    // Smart adaptation params
    getStartParams: (goal, level, mode) => {
        let sets = level === 'beginner' ? 2 : level === 'advanced' ? 4 : 3;
        let val1 = 10; // reps or sec

        if (mode === 'time') {
            val1 = (goal === 'endurance') ? 60 : 45;
        } else if (goal === 'strength') {
            val1 = 5;
        } else if (goal === 'endurance') {
            val1 = 15;
        }
        return { sets, val1 };
    },

    // The "Brain" of the operation
    getSmartTargets: (user, exId, mode) => {
        const history = Store.lastLog(user, exId);
        const base = Trainer.getStartParams(user.settings.goal, user.settings.level, mode);

        if (!history) return { ...base, val2: (mode === 'time' ? 0 : (mode === 'body' ? 0 : 20)), tip: null };

        // Analyze RPE from last time
        let targets = { sets: base.sets, val1: history.target.val1, val2: history.target.val2 };
        let tip = null;

        const rpe = history.rpe || '2'; // 1=easy, 2=good, 3=hard, 4=fail

        if (mode === 'load' || mode === 'body') {
            if (rpe === '1') { // Too Easy -> Progressive Overload
                // For advanced users, micro-loading is key. Beginners can jump more.
                const inc = user.settings.level === 'advanced' ? 1.25 : 2.5;
                targets.val2 += inc;
                tip = 'tip.inc';
            } else if (rpe === '4') { // Failed -> Deload
                targets.val2 = Math.max(targets.val2 - 5, 0);
                tip = 'tip.dec';
            }
        } else {
            // Time logic
            if (rpe === '1') targets.val1 += 5;
        }

        return { ...targets, tip };
    },

    generateRoutine: (user, env = 'gym') => {
        const g = user.settings.goal;
        const lvl = user.settings.level;
        const tools = user.settings.equip || []; // Home tools

        let schema;
        if (g === 'strength') {
            // Strength focus: Heavy compounds first
            schema = ['legs', 'push', 'pull', 'legs', 'push'];
        } else if (g === 'endurance') {
            schema = ['legs', 'push', 'pull', 'core', 'legs', 'core'];
        } else {
            // Hypertrophy
            schema = ['legs', 'push', 'pull', 'core'];
        }

        // Advanced logic: Add volume/complexity if advanced
        if (lvl === 'advanced' && g === 'hypertrophy') {
            // Add an extra compound or isolation
            schema.push('push');
        }

        // Feature: If Rope Available, inject Cardio finisher or warm-up
        if (env === 'home' && tools.includes('rope')) {
            // Avoid duplicates if endurance already has it?
            // Just append as finisher
            schema.push('cardio');
        }

        const selectedIds = new Set();

        return schema.map(m => {
            const isHome = env === 'home';

            // 1. Candidate Selection with Environment Safety & Tool Check
            const candidates = Object.keys(CATALOG).filter(k => {
                const item = CATALOG[k];
                if (item.muscle !== m) return false;

                // Environment Check
                if (isHome) {
                    // Check Tools Requirement
                    if (item.req) {
                        const hasTools = item.req.every(t => tools.includes(t));
                        if (!hasTools) return false;
                    }

                    // Strict Portability / Machine Check for items without req
                    if (!item.req) {
                        const portable = item.mode === 'body' || item.mode === 'time' || ['curl', 'lunge', 'row', 'ohp'].includes(k);
                        if (!portable) return false;
                    }
                }

                // Tier Filter
                if (lvl === 'beginner' && item.tier > 2) return false;
                if (lvl === 'advanced' && item.tier < 2) return false; // Strict advanced filter

                // Exclude already selected exercises for variety
                if (selectedIds.has(k)) return false;

                return true;
            });

            // 2. Intelligent Fallback (The Safety Net)
            let finalCandidates = candidates;

            if (candidates.length === 0) {
                // Fallback logic
                finalCandidates = Object.keys(CATALOG).filter(k => {
                    const item = CATALOG[k];
                    if (item.muscle !== m) return false;

                    if (isHome) {
                        if (item.req) {
                            return item.req.every(t => tools.includes(t));
                        }
                        const portable = item.mode === 'body' || item.mode === 'time';
                        return portable;
                    }
                    return true;
                }).sort((a, b) => CATALOG[b].tier - CATALOG[a].tier);

                finalCandidates = finalCandidates.slice(0, 3);
            }

            // Duplicate Prevention: Try to pick one not used
            let available = finalCandidates.filter(id => !selectedIds.has(id));
            if (available.length === 0) available = finalCandidates; // Fallback to duplicate if must

            // Absolute last resort
            if (available.length === 0) {
                if (m === 'legs') available = ['squat_bw'];
                else if (m === 'push') available = ['pushup'];
                else if (m === 'pull') {
                    // Fallback using Superman instead of Plank for Pull
                    if (isHome && !tools.includes('bar') && !tools.includes('dumbbells')) {
                        available = ['superman'];
                    } else {
                        available = ['pullup'];
                    }
                }
                else if (m === 'cardio') available = ['jump_rope']; // Should imply rope exists, else Burpees? We don't have burpees.
                else available = ['plank'];
            }

            // Final Safety
            if (available.length === 0) available = ['squat_bw'];

            const pick = available[Math.floor(Math.random() * available.length)];
            selectedIds.add(pick); // Mark as used

            const data = CATALOG[pick];
            const smartParams = Trainer.getSmartTargets(user, pick, data.mode);

            return {
                id: pick,
                sets: smartParams.sets,
                target: { val1: smartParams.val1, val2: smartParams.val2 },
                tip: smartParams.tip
            };
        });
    }
};

// --- 6. VIEW CONTROLLER (UI) ---
const UI = {
    // Mobile-first navigation stack
    goto: (viewId) => {
        document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        window.scrollTo(0, 0);
    },
    // Safe HTML injection
    text: (id, txt) => { const e = document.getElementById(id); if (e) e.textContent = txt; },
    val: (id, v) => { const e = document.getElementById(id); if (e) e.value = v; },

    renderApp: () => {
        // Update static text
        document.querySelectorAll('[data-bind]').forEach(el => {
            el.textContent = I18n.t(el.dataset.bind);
        });

        // Update Placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            el.placeholder = I18n.t(el.dataset.i18nPh);
        });

        // Update HTML Lang attribute
        document.documentElement.lang = I18n.lang;

        // Update Theme
        document.body.className = `theme-${window.App.user?.settings?.theme || 'dark'}`;
    },

    toast: (msg, type = 'info') => {
        const t = document.createElement('div');
        t.className = `toast toast-${type}`;
        t.textContent = I18n.t(msg); // Allow translation keys
        document.body.appendChild(t);
        setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3000);
    }
};

// --- 7. MAIN APP LOGIC ---
window.App = {
    user: null,
    activeWorkout: null,
    sess: { idx: 0, set: 1, timer: null, restTime: 90 },
    activeActionIdx: -1,
    selectorMode: 'add',

    init: async () => {
        // Ensure translations are present (hotfix)
        if (!I18n.data.en['cust.title']) {
            const en = {
                "cust.title": "New Exercise", "cust.desc": "Create your own exercise.",
                "cust.name": "Name (e.g. Box Jumps)", "cust.type": "Tracking Type",
                "cust.t.load": "Weights & Reps", "cust.t.body": "Reps Only (Bodyweight)", "cust.t.time": "Time / Duration",
                "cust.create": "Create", "cust.cancel": "Cancel", "cust.btn": "+ Create Custom Exercise", "cust.sub": "Custom"
            };
            const es = {
                "cust.title": "Nuevo Ejercicio", "cust.desc": "Crea tu propio ejercicio.",
                "cust.name": "Nombre (ej. Saltos al Cajón)", "cust.type": "Tipo de Registro",
                "cust.t.load": "Peso y Reps", "cust.t.body": "Solo Reps (Corporal)", "cust.t.time": "Tiempo / Duración",
                "cust.create": "Crear", "cust.cancel": "Cancelar", "cust.btn": "+ Crear Personalizado", "cust.sub": "Personalizado"
            };
            Object.assign(I18n.data.en, en);
            Object.assign(I18n.data.es, es);
        }

        // Hydrate
        const email = Store.session.get();
        if (email) {
            App.user = await Store.findUser(email);
            if (App.user) {
                App.loadCustomCatalog();
                I18n.setLang(App.user.settings.lang);
                App.loadHub();
                return;
            }
        }
        App.loadAuth();
    },

    loadAuth: () => {
        UI.goto('v-auth');
        UI.renderApp();
        // Render saved profiles list
        const profiles = Store._get();
        const list = document.getElementById('auth-list');
        list.innerHTML = '';
        profiles.forEach(u => {
            const btn = document.createElement('div');
            btn.className = 'profile-chip animate-in';
            btn.innerHTML = `<span class="av">${u.name[0]}</span> <span>${u.name}</span>`;
            btn.onclick = () => App.login(u.email);
            list.appendChild(btn);
        });
    },

    loadHub: () => {
        UI.goto('v-hub');
        UI.text('user-name', App.user.name);
        UI.text('sess-count', App.user.history.length);
        const goalKey = App.user.settings.goal.substring(0, 3);
        const lvlKey = App.user.settings.level.substring(0, 3);
        const goalFull = I18n.t(`goal.${goalKey}`);
        const lvlFull = I18n.t(`lvl.${lvlKey}`);

        const combinedText = `${goalFull} - ${lvlFull}`;
        const goalLabel = document.getElementById('goal-label');
        goalLabel.textContent = combinedText;

        if (combinedText.length > 15) {
            goalLabel.style.fontSize = '1.1rem';
        } else if (combinedText.length > 10) {
            goalLabel.style.fontSize = '1.3rem';
        } else {
            goalLabel.style.fontSize = '';
        }
        UI.text('goal-desc', I18n.t(`goal.${goalKey}.d`));
        UI.renderApp();

        // Render History
        const list = document.getElementById('history-list');
        const title = document.getElementById('hist-title');
        list.innerHTML = '';

        if (!App.user.history || App.user.history.length === 0) {
            title.style.display = 'none';
        } else {
            title.style.display = 'block';
            // Show last 5 sessions, newest first
            const recent = [...App.user.history].reverse().slice(0, 5);

            recent.forEach(sess => {
                const date = new Date(sess.date).toLocaleDateString();
                const totalSets = sess.routine.reduce((acc, ex) => acc + ex.sets, 0);
                const exCount = sess.routine.length;

                // Build details
                const details = sess.routine.map(ex => {
                    const info = CATALOG[ex.id];
                    const name = info ? (info[I18n.lang] || info.en) : ex.id;
                    let meta = '';
                    // Format based on mode
                    if (info.mode === 'time') meta = `${ex.target.val1}s`;
                    else if (info.mode === 'body') meta = `${ex.target.val1} reps`;
                    else meta = `${ex.target.val1} x ${ex.target.val2}kg`;

                    return `<div class="h-row"><span>${name}</span> <small>${ex.sets} x ${meta}</small></div>`;
                }).join('');

                const el = document.createElement('div');
                el.className = 'history-item animate-in';
                el.onclick = function () { this.classList.toggle('expanded'); };

                el.innerHTML = `
                    <div class="h-summary">
                        <div class="h-date">${date}</div>
                        <div class="h-info">
                            <strong>${exCount} Exercises</strong>
                            <small>${totalSets} Sets Completed</small>
                        </div>
                        <div class="h-arrow">
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                    </div>
                    <div class="h-details">${details}</div>
                `;
                list.appendChild(el);
            });
        }
    },

    loadSettings: () => {
        UI.goto('v-settings');
        const s = App.user.settings;
        UI.val('sel-lang', s.lang);
        UI.val('sel-theme', s.theme);
        UI.val('sel-goal', s.goal);
        UI.val('sel-lvl', s.level);
        UI.renderApp(); // Ensure translations are applied
    },

    updateSettings: async () => {
        const lang = document.getElementById('sel-lang').value;
        const theme = document.getElementById('sel-theme').value;
        const goal = document.getElementById('sel-goal').value;
        const lvl = document.getElementById('sel-lvl').value;

        let changed = false;
        const u = App.user;

        if (u.settings.lang !== lang) { u.settings.lang = lang; I18n.setLang(lang); changed = true; }
        if (u.settings.theme !== theme) { u.settings.theme = theme; changed = true; }
        if (u.settings.goal !== goal) { u.settings.goal = goal; changed = true; }
        if (u.settings.level !== lvl) { u.settings.level = lvl; changed = true; }

        if (changed) {
            await Store.saveUser(u);
            UI.renderApp(); // Updates text and theme class
        }
    },

    updateGoalInfo: () => {
        const g = document.getElementById('sel-goal').value;
        const l = document.getElementById('sel-lvl').value;
        // Auto-save preference
        if (App.user.settings.goal !== g || App.user.settings.level !== l) {
            App.user.settings.goal = g;
            App.user.settings.level = l;
            Store.saveUser(App.user);
        }
        UI.text('goal-desc', I18n.t(`goal.${g.substring(0, 3)}.d`));
    },

    updateLang: async () => {
        const l = document.getElementById('sel-lang').value;
        if (App.user.settings.lang !== l) {
            App.user.settings.lang = l;
            await Store.saveUser(App.user);
            I18n.setLang(l);
            UI.renderApp();
            App.updateGoalInfo(); // Refresh descriptions
        }
    },

    register: async () => {
        const n = document.getElementById('reg-name').value.trim();
        const e = document.getElementById('reg-email').value.trim();
        if (!n || !e) return UI.toast('Fill all fields');

        const newUser = {
            name: n, email: e, joined: Date.now(),
            history: [], customExercises: [],
            settings: { lang: 'es', theme: 'dark', goal: 'hypertrophy', level: 'intermediate', rTime: 90, equip: undefined }
        };

        await Store.saveUser(newUser);
        App.user = newUser;
        Store.session.set(e);

        UI.toast('msg.welcome', 'success');

        // Set user language and load hub
        I18n.setLang(newUser.settings.lang);
        App.loadHub();

        // Show tutorial for first-time users
        Tutorial.checkAndShow();
    },

    login: async (email) => {
        const u = await Store.findUser(email);
        if (u) {
            App.user = u;
            Store.session.set(email);
            App.loadCustomCatalog();
            I18n.setLang(u.settings.lang);
            App.loadHub();

            // Check if tutorial should be shown
            Tutorial.checkAndShow();
        }
    },

    logout: () => {
        Store.session.clear();
        App.user = null;
        App.loadAuth();
    },

    // Delete Account with double confirmation
    deleteAccount: async () => {
        if (!confirm(I18n.t('confirm.delete'))) return;

        // Second confirmation with text input
        const confirmText = I18n.lang === 'es' ? 'ELIMINAR' : 'DELETE';
        const userInput = prompt(I18n.t('confirm.delete2'));

        if (userInput === confirmText) {
            const email = App.user.email;
            await Store.deleteUser(email);
            Store.session.clear();
            UI.toast('msg.deleted', 'success');
            App.user = null;
            App.loadAuth();
        } else if (userInput !== null) {
            UI.toast('Deletion cancelled', 'info');
        }
    },

    // Export user data as JSON
    exportData: () => {
        if (!App.user) return;

        const dataStr = JSON.stringify(App.user, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `evoroutine-data-${App.user.email}-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        UI.toast('msg.data_exported', 'success');
    },

    // Clear all cache and data
    clearCache: async () => {
        if (!confirm(I18n.t('confirm.clear'))) return;

        // Reset user data but keep account
        App.user.history = [];
        await Store.saveUser(App.user);
        Tutorial.reset();

        UI.toast('msg.cache_cleared', 'success');
        App.loadHub();
    },

    // TRAINER ACTIONS
    openEquipSelector: () => {
        document.getElementById('equip-overlay').classList.add('active');
        document.getElementById('equip-sheet').classList.add('active');

        // Pre-check checkboxes
        const eq = App.user.settings.equip || [];
        const du = document.getElementById('eq-du');
        const ba = document.getElementById('eq-ba');
        const jr = document.getElementById('eq-jr');

        if (du) du.checked = eq.includes('dumbbells');
        if (ba) ba.checked = eq.includes('bar');
        if (jr) jr.checked = eq.includes('rope');
    },

    closeEquipSelector: () => {
        document.getElementById('equip-overlay').classList.remove('active');
        document.getElementById('equip-sheet').classList.remove('active');
    },

    saveEquipAndGen: async () => {
        const eq = [];
        if (document.getElementById('eq-du').checked) eq.push('dumbbells');
        if (document.getElementById('eq-ba').checked) eq.push('bar');
        if (document.getElementById('eq-jr').checked) eq.push('rope');

        App.user.settings.equip = eq;
        await Store.saveUser(App.user); // Save preference

        App.closeEquipSelector();
        // Force regeneration with Home mode
        App.generate('home');
    },

    generate: (env = null) => {
        // Read Env from Select if null (re-gen case) or default
        const sel = document.getElementById('plan-env');
        const currentEnv = env || (sel ? sel.value : 'gym');

        // Show/Hide Equip Button based on Env immediately
        const eqBtn = document.getElementById('btn-equip-edit');
        if (eqBtn) eqBtn.style.display = (currentEnv === 'home') ? 'inline-block' : 'none';

        // Check Logic for Home
        if (currentEnv === 'home') {
            // Explicit check for undefined to allow empty array (nothing selected) logic
            if (typeof App.user.settings.equip === 'undefined') {
                console.log('Opening Selector due to undefined equip');
                App.openEquipSelector();
                return;
            }
        }

        App.activeWorkout = Trainer.generateRoutine(App.user, currentEnv);
        App.renderPlan();

        // Ensure select matches currentEnv
        if (sel) sel.value = currentEnv;
    },

    renderPlan: () => {
        // Update Equip Button Visibility based on UI State
        const sel = document.getElementById('plan-env');
        const eqBtn = document.getElementById('btn-equip-edit');
        if (eqBtn && sel) {
            const show = sel.value === 'home';
            eqBtn.style.display = show ? 'flex' : 'none';
            if (show) console.log('Showing Equipment Button');
        }

        const list = document.getElementById('plan-list');
        list.innerHTML = '';
        App.activeWorkout.forEach((ex, i) => {
            const info = CATALOG[ex.id];
            const name = info ? (info[I18n.lang] || info.en) : ex.id;
            // Safe fallback for null info

            let meta = '';
            const mode = info ? info.mode : 'load';

            if (mode === 'time') {
                meta = `${ex.target.val1}s`;
            } else if (mode === 'body') {
                meta = `${ex.target.val1} reps`;
            } else {
                meta = `${ex.target.val1} x ${ex.target.val2}kg`;
            }

            const li = document.createElement('div');
            li.className = 'plan-item animate-in';
            li.style.animationDelay = (i * 0.05) + 's';
            li.onclick = () => App.openActionSheet(i);

            li.innerHTML = `
                <div class="pi-idx">${i + 1}</div>
                <div class="pi-body">
                    <strong>${name}</strong>
                    <small>${ex.sets} x ${meta}</small>
                    ${ex.tip ? `<span class="tip-badge">${I18n.t(ex.tip)}</span>` : ''}
                </div>
            `;
            list.appendChild(li);
        });
        UI.goto('v-plan');
    },

    openActionSheet: (idx) => {
        App.activeActionIdx = idx;
        document.getElementById('action-sheet').classList.add('active');
        document.getElementById('action-sheet-overlay').classList.add('active');
    },

    closeActionSheet: () => {
        document.getElementById('action-sheet').classList.remove('active');
        document.getElementById('action-sheet-overlay').classList.remove('active');
    },

    openExSelector: (mode) => {
        App.selectorMode = mode; // 'add' or 'replace'
        if (mode === 'replace') App.closeActionSheet();

        const list = document.getElementById('ex-select-list');
        list.innerHTML = '';

        // Add Create Button
        const createBtn = document.createElement('div');
        createBtn.className = 'ex-option';
        createBtn.style.background = 'rgba(207, 245, 104, 0.1)';
        createBtn.style.borderLeft = '4px solid var(--primary)';
        createBtn.innerHTML = `<strong>${I18n.t('cust.btn')}</strong><small>${I18n.t('cust.sub')}</small>`;
        createBtn.onclick = () => App.openCustomCreator();
        list.appendChild(createBtn);

        Object.keys(CATALOG).forEach(k => {
            const info = CATALOG[k];
            const name = info ? (info[I18n.lang] || info.en) : k;
            const el = document.createElement('div');
            el.className = 'ex-option';
            el.onclick = () => App.selectExercise(k);
            el.innerHTML = `<strong>${name}</strong><small>${info ? info.muscle : 'custom'}</small>`;
            list.appendChild(el);
        });

        document.getElementById('ex-selector-overlay').classList.add('active');
    },

    loadCustomCatalog: () => {
        if (App.user && App.user.customExercises) {
            App.user.customExercises.forEach(c => {
                CATALOG[c.id] = {
                    en: c.name, es: c.name,
                    muscle: c.muscle || 'custom',
                    mode: c.mode
                };
            });
        }
    },

    openCustomCreator: () => {
        UI.renderApp();
        document.getElementById('custom-ex-overlay').classList.add('active');
        document.getElementById('ex-selector-overlay').classList.remove('active');
        setTimeout(() => document.getElementById('cust-ex-name').focus(), 100);
    },

    closeCustomCreator: () => {
        document.getElementById('custom-ex-overlay').classList.remove('active');
        document.getElementById('ex-selector-overlay').classList.add('active');
    },

    saveCustomExercise: async () => {
        const name = document.getElementById('cust-ex-name').value.trim();
        const type = document.getElementById('cust-ex-type').value;
        if (!name) return UI.toast(I18n.lang === 'es' ? 'Nombre requerido' : 'Name required');

        const id = 'cust_' + Date.now();
        const newEx = {
            id: id,
            name: name,
            mode: type,
            muscle: 'custom'
        };

        // Add to User
        if (!App.user.customExercises) App.user.customExercises = [];
        App.user.customExercises.push(newEx);
        await Store.saveUser(App.user);

        // Add to Catalog
        CATALOG[id] = {
            en: name, es: name,
            muscle: 'custom',
            mode: type
        };

        UI.toast(I18n.lang === 'es' ? 'Ejercicio Creado' : 'Exercise Created', 'success');
        document.getElementById('custom-ex-overlay').classList.remove('active');

        // Select directly
        App.selectExercise(id);

        // Clear input
        document.getElementById('cust-ex-name').value = '';
    },

    closeExSelector: () => {
        document.getElementById('ex-selector-overlay').classList.remove('active');
    },

    selectExercise: (id) => {
        const data = CATALOG[id];
        const smartParams = Trainer.getStartParams(App.user.settings.goal, App.user.settings.level, data.mode);
        // Try history
        const histParams = Trainer.getSmartTargets(App.user, id, data.mode);

        const newEx = {
            id: id,
            sets: smartParams.sets,
            target: { val1: histParams.val1, val2: histParams.val2 },
            tip: null
        };

        if (App.selectorMode === 'add') {
            App.activeWorkout.push(newEx);
            UI.toast('Exercise Added', 'success');
        } else {
            if (App.activeActionIdx > -1) {
                App.activeWorkout[App.activeActionIdx] = newEx;
                UI.toast('Exercise Updated', 'success');
            }
        }

        App.renderPlan();
        App.closeExSelector();
    },

    removeExercise: () => {
        if (App.activeActionIdx > -1) {
            App.activeWorkout.splice(App.activeActionIdx, 1);
            App.renderPlan();
            App.closeActionSheet();
            UI.toast('Exercise Removed', 'info');
        }
    },

    regenerate: () => {
        const sel = document.getElementById('plan-env');
        if (sel) App.generate(sel.value);
    },

    startSess: () => {
        App.sess = { idx: 0, set: 1, timer: null, restTime: 90 };
        App.renderSet();
        UI.goto('v-sess');
    },

    renderSet: () => {
        const ex = App.activeWorkout[App.sess.idx];
        const info = CATALOG[ex.id];

        UI.text('ex-name', info[I18n.lang]);
        UI.text('set-badge', `${I18n.t('sess.set')} ${App.sess.set} / ${ex.sets}`);

        // Inputs
        const inp1 = document.getElementById('inp-1');
        const inp2 = document.getElementById('inp-2');
        const l1 = document.getElementById('lbl-1');
        const l2 = document.getElementById('lbl-2');

        inp2.parentElement.style.display = 'flex';

        if (info.mode === 'time') {
            l1.textContent = I18n.t('unit.sec');
            inp1.value = ex.target.val1;
            inp2.parentElement.style.display = 'none';
        } else {
            l1.textContent = (info.mode === 'body') ? I18n.t('unit.reps') : I18n.t('unit.kg');
            l2.textContent = (info.mode === 'body') ? '+KG' : I18n.t('unit.reps');

            if (info.mode === 'load') {
                inp1.value = ex.target.val2; // KG
                inp2.value = ex.target.val1; // Reps
            } else {
                inp1.value = ex.target.val1; // Reps
                inp2.value = ex.target.val2; // KG
            }
        }

        // Progress Bar
        document.getElementById('sess-bar').style.width = ((App.sess.idx / App.activeWorkout.length) * 100) + '%';

        // Reset RPE
        document.querySelectorAll('.rpe-btn').forEach(b => b.classList.remove('selected'));
    },

    finishSet: async () => {
        const ex = App.activeWorkout[App.sess.idx];
        const info = CATALOG[ex.id];

        // Capture Data
        const v1 = parseFloat(document.getElementById('inp-1').value);
        const v2 = parseFloat(document.getElementById('inp-2').value || 0);

        // Save to active object (temporary)
        if (info.mode === 'time') ex.target.val1 = v1;
        else if (info.mode === 'load') { ex.target.val2 = v1; ex.target.val1 = v2; }
        else { ex.target.val1 = v1; ex.target.val2 = v2; }

        // RPE Check
        const rpeEl = document.querySelector('.rpe-btn.selected');
        ex.rpe = rpeEl ? rpeEl.dataset.v : '2'; // Default Good (2)

        if (App.sess.set < ex.sets) {
            App.sess.set++;
            App.doRest();
        } else if (App.sess.idx < App.activeWorkout.length - 1) {
            App.sess.idx++;
            App.sess.set = 1;
            App.doRest();
        } else {
            // FINISH
            App.user.history.push({ date: Date.now(), routine: App.activeWorkout });
            await Store.saveUser(App.user);
            UI.toast('Workout Saved!', 'success');
            App.loadHub();
        }
    },

    // Timer Logic
    doRest: () => {
        UI.goto('v-rest');
        App.sess.restTime = App.user.settings.rTime || 90;
        const disp = document.getElementById('timer-disp');

        if (App.sess.timer) clearInterval(App.sess.timer);

        const tick = () => {
            if (App.sess.restTime < 0) App.sess.restTime = 0;
            const m = Math.floor(App.sess.restTime / 60);
            const s = (App.sess.restTime % 60).toString().padStart(2, '0');
            disp.textContent = `${m}:${s}`;
        };
        tick();

        App.sess.timer = setInterval(() => {
            App.sess.restTime--;
            tick();
            if (App.sess.restTime <= 0) App.skipRest();
        }, 1000);
    },

    adjustTimer: (delta) => {
        App.sess.restTime += delta;
        if (App.sess.restTime < 0) App.sess.restTime = 0;

        // Update display immediately
        const m = Math.floor(App.sess.restTime / 60);
        const s = (App.sess.restTime % 60).toString().padStart(2, '0');
        const disp = document.getElementById('timer-disp');
        if (disp) disp.textContent = `${m}:${s}`;
    },

    skipRest: () => {
        if (App.sess.timer) clearInterval(App.sess.timer);
        App.renderSet();
        UI.goto('v-sess');
    },

    // UI Helpers
    toggleReg: () => {
        document.getElementById('auth-login').classList.toggle('hidden');
        document.getElementById('auth-reg').classList.toggle('hidden');
    },

    setRPE: (val) => {
        document.querySelectorAll('.rpe-btn').forEach(b => b.classList.remove('selected'));
        document.querySelector(`.rpe-btn[data-v="${val}"]`).classList.add('selected');
    }
};

// Start
window.onload = App.init;
