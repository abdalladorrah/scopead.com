/**
 * UI Components Library
 * Reusable HTML components generated via template literals.
 */

export const UI = {
    /**
     * Renders standard section header
     */
    SectionHeader: (title, subtitle) => `
        <div class="section-header">
            ${subtitle ? `<div class="section-subtitle">${subtitle}</div>` : ''}
            <h1 class="section-title">${title}</h1>
        </div>
    `,

    /**
     * Renders a primary core message box highlighted 
     */
    CoreMessage: (message) => `
        <div class="glass-card core-message-card" style="margin-top: 3rem; border-color: var(--primary-light); background: linear-gradient(135deg, var(--bg-surface), hsla(164, 88%, 25%, 0.1));">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;"><i class="fa-solid fa-lightbulb"></i> الرسالة الأساسية</h3>
            <p style="font-size: 1.3rem; font-weight: 500; line-height: 1.8;">"${message}"</p>
        </div>
    `,

    /**
     * Standard Feature Card (Icon, Title, Description)
     */
    FeatureCard: (icon, title, desc) => `
        <div class="glass-card feature-card text-center" style="text-align: center;">
            <div class="icon-wrapper" style="font-size: 2.5rem; color: var(--primary-light); margin-bottom: 1.5rem;">
                <i class="${icon}"></i>
            </div>
            <h3 style="margin-bottom: 1rem; font-size: 1.4rem;">${title}</h3>
            <p style="color: var(--text-secondary);">${desc}</p>
        </div>
    `,

    /**
     * Person/Squad Card 
     */
    PersonCard: (role, name, title, icon) => `
        <div class="glass-card person-card" style="position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--primary-color);"></div>
            <div style="font-size: 3rem; color: var(--accent-color); margin: 1rem 0;">
                <i class="${icon}"></i>
            </div>
            <div class="badge badge-warning" style="margin-bottom: 1rem;">${role}</div>
            <h3 style="margin-bottom: 0.5rem; color: var(--primary-light);">${name}</h3>
            <p style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary);">${title}</p>
        </div>
    `,

    /**
     * Workflow Step Card
     */
    StepCard: (number, name, detail, icon) => `
        <div class="glass-card step-card" style="position: relative; z-index: 1;">
            <div style="position: absolute; top: -20px; right: -20px; font-size: 6rem; font-weight: 900; color: var(--border-subtle); z-index: -1;">
                0${number}
            </div>
            <div style="font-size: 2rem; color: var(--primary-color); margin-bottom: 1.5rem;">
                <i class="${icon}"></i>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${name}</h3>
            <p style="color: var(--text-secondary); font-size: 1.1rem;">${detail}</p>
        </div>
    `,

    /**
     * Engine Background Animation (Gears/Arrows)
     */
    EngineBackground: () => `
        <div class="engine-bg">
            <div class="gear gear-1"><i class="fa-solid fa-gear"></i></div>
            <div class="gear gear-2"><i class="fa-solid fa-gear"></i></div>
            <div class="gear gear-3"><i class="fa-solid fa-gear"></i></div>
            <div class="floating-arrows">
                <i class="fa-solid fa-chevron-up"></i>
                <i class="fa-solid fa-chevron-up" style="margin-right: -10px; opacity: 0.7"></i>
                <i class="fa-solid fa-chevron-up" style="margin-right: -10px; opacity: 0.4"></i>
            </div>
        </div>
    `,

    /**
     * Primary CTA Button
     */
    CTAButton: (text, targetId) => `
        <button class="cta-button" onclick="document.getElementById('${targetId}').scrollIntoView({behavior: 'smooth'})">
            ${text}
        </button>
    `
};
