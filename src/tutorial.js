/**
 * EvoRoutine Tutorial Module
 * Interactive onboarding system with i18n support
 */

const Tutorial = {
    // Tutorial state
    isActive: false,
    currentSlide: 0,

    // Check if tutorial has been completed
    hasCompleted: () => {
        return localStorage.getItem('evo_tutorial_completed') === 'true';
    },

    // Mark tutorial as completed
    markCompleted: () => {
        localStorage.setItem('evo_tutorial_completed', 'true');
    },

    // Reset tutorial (for replay)
    reset: () => {
        localStorage.removeItem('evo_tutorial_completed');
    },

    // Tutorial slides content (i18n keys)
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
            // Custom HTML for Goal Selection
            customHtml: `
                <div class="tutorial-goals-grid" style="display:grid; gap:12px; margin-top:16px;">
                    <div class="card goal-card" onclick="Tutorial.setGoal('hypertrophy')" style="cursor:pointer; border:1px solid var(--border); padding:16px; transition:0.2s;">
                        <h4 style="color:var(--primary); margin:0 0 6px 0;">Hypertrophy (Muscle)</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">Metabolic stress focus. 8-12 reps. Maximizes muscle size.</p>
                    </div>
                    <div class="card goal-card" onclick="Tutorial.setGoal('strength')" style="cursor:pointer; border:1px solid var(--border); padding:16px; transition:0.2s;">
                        <h4 style="color:var(--primary); margin:0 0 6px 0;">Strength (Power)</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">Neuromuscular efficiency. 1-5 reps. heavy loads, long rest.</p>
                    </div>
                     <div class="card goal-card" onclick="Tutorial.setGoal('endurance')" style="cursor:pointer; border:1px solid var(--border); padding:16px; transition:0.2s;">
                        <h4 style="color:var(--primary); margin:0 0 6px 0;">Endurance (Stamina)</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">Aerobic capacity. 15+ reps. Short rest periods.</p>
                    </div>
                </div>
            `
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

    // Show tutorial
    show: () => {
        Tutorial.isActive = true;
        Tutorial.currentSlide = 0;
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.classList.add('active');
            Tutorial.renderSlide();
        }
    },

    // Hide tutorial
    hide: () => {
        Tutorial.isActive = false;
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    },

    // Skip tutorial
    skip: () => {
        Tutorial.markCompleted();
        Tutorial.hide();
    },

    // Next slide
    next: () => {
        if (Tutorial.currentSlide < Tutorial.slides.length - 1) {
            Tutorial.currentSlide++;
            Tutorial.renderSlide();
        } else {
            // Last slide - complete tutorial
            Tutorial.markCompleted();
            Tutorial.hide();

            // Refresh Hub if user has no history (to show "Generate" prompt)
            if (App.user && (!App.user.history || App.user.history.length === 0)) {
                App.loadHub();
            }
        }
    },

    // Previous slide
    prev: () => {
        if (Tutorial.currentSlide > 0) {
            Tutorial.currentSlide--;
            Tutorial.renderSlide();
        }
    },

    // Set Goal and Advance
    setGoal: (goal) => {
        if (App.user && App.user.settings) {
            App.user.settings.goal = goal;
            Store.saveUser(App.user);
            // Optional: Visual feedback or toast could go here
            Tutorial.next();
        }
    },

    // Render current slide
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

        if (slide.customHtml) {
            // Inject translated content if possible, but fallback to direct HTML structure
            // We use a small helper to replace text with I18n if we want full localization
            let content = slide.customHtml;
            // Quick-replace for localization (Hack, but effective for this structure)
            content = content.replace('Hypertrophy (Muscle)', I18n.t('goal.hyp'));
            content = content.replace('Strength (Power)', I18n.t('goal.str'));
            content = content.replace('Endurance (Stamina)', I18n.t('goal.end'));

            // Allow descriptions to be replaced by keys if we match the English text
            // Or better yet, just reconstruct the HTML in render if it's the 'goals' slide.
            // But let's keep it simple: Render the customHtml as is, but try to use keys.
            // Since we hardcoded English in the array above, we should probably construct it here dynamically
            // to support language switching properly.

            if (slide.titleKey === 'tut.goals.title') {
                html += `
                    <div class="tutorial-goals-grid" style="display:grid; gap:12px; margin-top:16px;">
                        <div class="card goal-card" onclick="Tutorial.setGoal('hypertrophy')" style="cursor:pointer; border:1px solid var(--border); padding:16px; text-align:left;">
                            <h4 style="color:var(--primary); margin:0 0 6px 0;">${I18n.t('goal.hyp')}</h4>
                            <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">${I18n.t('goal.hyp.exp')}</p>
                        </div>
                        <div class="card goal-card" onclick="Tutorial.setGoal('strength')" style="cursor:pointer; border:1px solid var(--border); padding:16px; text-align:left;">
                            <h4 style="color:var(--primary); margin:0 0 6px 0;">${I18n.t('goal.str')}</h4>
                            <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">${I18n.t('goal.str.exp')}</p>
                        </div>
                         <div class="card goal-card" onclick="Tutorial.setGoal('endurance')" style="cursor:pointer; border:1px solid var(--border); padding:16px; text-align:left;">
                            <h4 style="color:var(--primary); margin:0 0 6px 0;">${I18n.t('goal.end')}</h4>
                            <p style="font-size:0.85rem; color:var(--text-muted); margin:0; line-height:1.4;">${I18n.t('goal.end.exp')}</p>
                        </div>
                    </div>
                `;
            } else {
                html += slide.customHtml;
            }

        } else {
            if (slide.highlight) {
                html += `<div class="tutorial-highlight">${I18n.t(slide.highlight)}</div>`;
            }
        }

        html += `
                <div class="tutorial-progress">
                    ${Tutorial.slides.map((_, i) => `
                        <span class="dot ${i === Tutorial.currentSlide ? 'active' : ''}"></span>
                    `).join('')}
                </div>
                
                <div class="tutorial-nav">
                    <button class="btn btn-text" onclick="Tutorial.prev()" 
                        ${isFirst ? 'style="visibility:hidden"' : ''}>
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

    // Check and show tutorial for new users
    checkAndShow: () => {
        if (!Tutorial.hasCompleted()) {
            // Delay slightly to let the hub load
            setTimeout(() => Tutorial.show(), 500);
        }
    }
};

// RPE button click handler
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('rpe-btn')) {
        document.querySelectorAll('.rpe-btn').forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
    }
});
