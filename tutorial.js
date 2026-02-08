const Tutorial = {
    isActive: false,
    currentSlide: 0,
    hasCompleted: () => {
        return localStorage.getItem('evo_tutorial_completed') === 'true';
    },
    markCompleted: () => {
        localStorage.setItem('evo_tutorial_completed', 'true');
    },
    reset: () => {
        localStorage.removeItem('evo_tutorial_completed');
    },
    slides: [
        {
            icon: '👋',
            titleKey: 'tut.welcome.title',
            descKey: 'tut.welcome.desc',
            highlight: 'tut.welcome.tip'
        },
        {
            icon: '🎯',
            titleKey: 'tut.goals.title',
            descKey: 'tut.goals.desc',
            isGoalSlide: true // Marker for custom rendering
        },
        {
            icon: '⚡',
            titleKey: 'tut.generate.title',
            descKey: 'tut.generate.desc',
            highlight: 'tut.generate.tip'
        },
        {
            icon: '💪',
            titleKey: 'tut.session.title',
            descKey: 'tut.session.desc',
            highlight: 'tut.session.tip'
        },
        {
            icon: '📊',
            titleKey: 'tut.progress.title',
            descKey: 'tut.progress.desc',
            highlight: 'tut.progress.tip'
        },
        {
            icon: '🚀',
            titleKey: 'tut.ready.title',
            descKey: 'tut.ready.desc',
            highlight: 'tut.ready.tip'
        }
    ],
    show: () => {
        Tutorial.isActive = true;
        Tutorial.currentSlide = 0;
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.classList.add('active');
            Tutorial.renderSlide();
        }
    },
    hide: () => {
        Tutorial.isActive = false;
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    },
    skip: () => {
        Tutorial.markCompleted();
        Tutorial.hide();
    },
    next: () => {
        if (Tutorial.currentSlide < Tutorial.slides.length - 1) {
            Tutorial.currentSlide++;
            Tutorial.renderSlide();
        } else {
            Tutorial.markCompleted();
            Tutorial.hide();
            if (App.user && (!App.user.history || App.user.history.length === 0)) {
                App.loadHub();
            }
        }
    },
    prev: () => {
        if (Tutorial.currentSlide > 0) {
            Tutorial.currentSlide--;
            Tutorial.renderSlide();
        }
    },
    setGoal: (goal) => {
        if (App.user && App.user.settings) {
            App.user.settings.goal = goal;
            Store.saveUser(App.user);
            Tutorial.next();
        }
    },
    renderSlide: () => {
        const slide = Tutorial.slides[Tutorial.currentSlide];
        const container = document.getElementById('tutorial-content');
        if (!container) return;

        const isLast = Tutorial.currentSlide === Tutorial.slides.length - 1;
        const isFirst = Tutorial.currentSlide === 0;

        let html = `
            <div class="tutorial-slide animate-in">
                <div class="tutorial-icon">${slide.icon}</div>
                <h2 class="tutorial-title">${I18n.t(slide.titleKey)}</h2>
                <p class="tutorial-desc">${I18n.t(slide.descKey)}</p>
        `;

        // Render Goals Grid or Highlight Tip
        if (slide.isGoalSlide) {
            html += `
                <div class="tutorial-goals-grid" style="display:grid; gap:12px; margin-top:16px;">
                    <button class="card goal-card" onclick="Tutorial.setGoal('hypertrophy')" style="cursor:pointer; border:1px solid var(--border); padding:16px; text-align:left; background: var(--card); width: 100%;">
                        <h4 style="color:var(--primary); margin:0 0 6px 0;">${I18n.t('goal.hyp')}</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">${I18n.t('goal.hyp.exp')}</p>
                    </button>
                    <button class="card goal-card" onclick="Tutorial.setGoal('strength')" style="cursor:pointer; border:1px solid var(--border); padding:16px; text-align:left; background: var(--card); width: 100%;">
                        <h4 style="color:var(--primary); margin:0 0 6px 0;">${I18n.t('goal.str')}</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">${I18n.t('goal.str.exp')}</p>
                    </button>
                    <button class="card goal-card" onclick="Tutorial.setGoal('endurance')" style="cursor:pointer; border:1px solid var(--border); padding:16px; text-align:left; background: var(--card); width: 100%;">
                        <h4 style="color:var(--primary); margin:0 0 6px 0;">${I18n.t('goal.end')}</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">${I18n.t('goal.end.exp')}</p>
                    </button>
                </div>
            `;
        } else if (slide.highlight) {
            html += `<div class="tutorial-highlight">${I18n.t(slide.highlight)}</div>`;
        }

        html += `
                <div class="tutorial-progress">
                    ${Tutorial.slides.map((_, i) => `
                        <span class="dot ${i === Tutorial.currentSlide ? 'active' : ''}"></span>
                    `).join('')}
                </div>
                <div class="tutorial-nav">
                    <button class="btn btn-text" onclick="Tutorial.prev()" ${isFirst ? 'style="visibility:hidden"' : ''}>
                        ← ${I18n.t('tut.prev')}
                    </button>
                    <button class="btn btn-primary" onclick="Tutorial.next()">
                        ${isLast ? I18n.t('tut.finish') : I18n.t('tut.next')} →
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
    },
    checkAndShow: () => {
        if (!Tutorial.hasCompleted()) {
            setTimeout(() => Tutorial.show(), 500);
        }
    }
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('rpe-btn')) {
        document.querySelectorAll('.rpe-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
    }
});