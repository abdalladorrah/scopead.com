import { UI } from '../components/UI.js';

/**
 * Frames Rendering Functions
 * Combines data and UI components to generate complete sections for the single page.
 */
export const Frames = {

    renderHero: (data) => `
        <section id="hero" class="frame frame-hero" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; margin-bottom: 5rem; position: relative;">
            ${UI.EngineBackground()}
            <div style="position: relative; z-index: 10;">
                <h1 class="section-title" style="font-size: 3.5rem; margin-bottom: 1.5rem; line-height: 1.4;">${data.mainHeadline}</h1>
                <p style="font-size: 1.4rem; color: var(--text-secondary); max-width: 800px; margin-bottom: 2.5rem; line-height: 1.8;">
                    ${data.subHeadline}
                </p>
                <div style="text-align: center; margin-top: 3rem;">
                    ${UI.CTAButton(data.ctaText, 'values')}
                </div>
            </div>
        </section>
    `,

    renderRights: (data) => `
        <section id="rights" class="frame frame-rights" style="padding-top: 5rem; margin-bottom: 5rem; border-top: 1px solid var(--border-subtle);">
            ${UI.SectionHeader(data.title, data.tag)}
            
            <div class="grid-2" style="margin-top: 3rem;">
                ${data.items.map((item, i) => `
                    <div class="glass-card" style="display:flex; align-items:flex-start; gap: 1.5rem; border-color: var(--accent-color);">
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); flex-shrink: 0; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: hsla(164, 88%, 25%, 0.1); border-radius: 12px;">
                            ${i + 1}
                        </div>
                        <div>
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary-light);">${item.title}</h3>
                            <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6;">${item.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    renderValues: (data) => `
        <section id="values" class="frame frame-values" style="padding-top: 5rem; margin-bottom: 5rem; border-top: 1px solid var(--border-subtle);">
            ${UI.SectionHeader(data.title, data.tag)}
            
            <div style="background: hsla(164, 88%, 25%, 0.05); padding: 3rem; border-radius: 16px; border: 1px solid var(--border-subtle); margin-top: 3rem; margin-bottom: 4rem;">
                <h3 style="font-size: 1.8rem; margin-bottom: 2rem; color: var(--primary-light);"><i class="fa-solid fa-list-ol"></i> ${data.principlesTitle}</h3>
                <div class="grid-2" style="gap: 1.5rem;">
                    ${data.principles.map(p => `
                        <div style="display: flex; align-items: flex-start; gap: 0.8rem;">
                            <i class="fa-solid fa-check" style="color: var(--accent-color); margin-top: 0.4rem;"></i>
                            <span style="font-size: 1.1rem; color: var(--text-primary);">${p.replace(/^\d+\.\s*/, '')}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <h3 style="font-size: 1.8rem; margin: 4rem 0 1.5rem; color: var(--primary-light);"><i class="fa-solid fa-gem"></i> القيم الأربعة الأساسية</h3>
            <div class="grid-2" style="margin-bottom: 4rem;">
                ${data.coreValues.map(v => `
                    <div class="glass-card feature-card" style="border-color: var(--primary-light);">
                        <div style="font-size: 2.5rem; color: var(--primary-light); margin-bottom: 1.5rem;">
                            <i class="${v.icon}"></i>
                        </div>
                        <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">${v.title}</h3>
                        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6;">${v.desc}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `,

    renderBenefits: (data) => `
        <section id="benefits" class="frame frame-benefits" style="padding-top: 5rem; margin-bottom: 5rem; border-top: 1px solid var(--border-subtle);">
            ${UI.SectionHeader(data.title, data.tag)}
            
            <div class="grid-3" style="margin-top: 3rem;">
                ${data.items.map(b => UI.FeatureCard(b.icon, b.title, b.desc)).join('')}
            </div>
        </section>
    `,

    renderStructure: (data) => `
        <section id="structure" class="frame frame-structure" style="padding-top: 5rem; margin-bottom: 5rem; border-top: 1px solid var(--border-subtle);">
            ${UI.SectionHeader(data.title, data.tag)}
            
            <h3 style="font-size: 1.8rem; margin: 3rem 0 1.5rem; color: var(--primary-light);"><i class="fa-solid fa-spinner"></i> دورة العمل </h3>
            <div class="timeline-container">
                ${data.flow.map((step, index) => `
                    <div class="timeline-step">
                        <div class="step-icon-wrapper">
                            <i class="${step.icon}"></i>
                        </div>
                        <div class="step-content glass-card" style="text-align: right;">
                            <h3 style="color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; font-weight: bold;">
                                ${step.step}
                            </h3>
                            ${step.desc ? `<p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0;">${step.desc}</p>` : ''}
                        </div>
                        ${index < data.flow.length - 1 ? '<div class="timeline-connector"><i class="fa-solid fa-angles-left"></i></div>' : ''}
                    </div>
                `).join('')}
            </div>

            <h3 style="font-size: 1.8rem; margin: 4rem 0 1.5rem; color: var(--primary-light);"><i class="fa-solid fa-handshake"></i> الاجتماعات الأساسية </h3>
            <div class="grid-2">
                ${data.meetings.map(m => `
                    <div class="glass-card" style="border-left: 4px solid var(--accent-color);">
                        <div style="font-size: 2rem; color: var(--accent-color); margin-bottom: 1rem;">
                            <i class="${m.icon}"></i>
                        </div>
                        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">${m.name}</h3>
                        <p style="color: var(--text-secondary);"><i class="fa-solid fa-users-viewfinder"></i> حضور: ${m.attendees}</p>
                    </div>
                `).join('')}
            </div>

        </section>
    `,

    renderFullPage: (sectionsData) => `
        ${Frames.renderHero(sectionsData.hero)}
        ${Frames.renderValues(sectionsData.values)}
        ${Frames.renderStructure(sectionsData.structure)}
        ${Frames.renderRights(sectionsData.rights)}
        ${Frames.renderBenefits(sectionsData.benefits)}
    `
};
