/**
 * nav.js
 * Handles dynamic navigation rendering and language toggling.
 * Now supports localized links and floating language button.
 */

const translations = {
    ar: {
        dashboard: 'الرئيسية',
        vision: 'الرؤية',
        persona: 'بيرسونا',
        competitors: 'المنافسون',
        strategy: 'الاستراتيجية',
        creatives: 'الإعلانات',
        plan: 'الخطة',
        journey: 'الرحلة',
        retention: 'الاحتفاظ',
        budget: 'الميزانية',
        timeline: 'تايم لاين',
        checklist: 'قائمة المهام',
        langBtn: 'Switch to English'
    },
    en: {
        dashboard: 'Dashboard',
        vision: 'Vision',
        persona: 'Persona',
        competitors: 'Competitors',
        strategy: 'Strategy',
        creatives: 'Creatives',
        plan: 'Plan',
        journey: 'Journey',
        retention: 'Retention',
        budget: 'Budget',
        timeline: 'Timeline',
        checklist: 'Checklist',
        langBtn: 'التبديل للعربية'
    }
};

const navItems = [
    { key: 'dashboard', href: 'index.html' },
    { key: 'vision', href: 'vision.html' },
    { key: 'persona', href: 'persona.html' },
    { key: 'competitors', href: 'competitors.html' },
    { key: 'strategy', href: 'Lenci.html' },
    { key: 'creatives', href: 'creatives.html' },
    { key: 'plan', href: 'plan.html' },
    { key: 'journey', href: 'journey.html' },
    { key: 'retention', href: 'retention.html' },
    { key: 'budget', href: 'budget.html' },
    { key: 'timeline', href: 'timeline.html' },
    { key: 'checklist', href: 'checklist.html' }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Language First to know what to render
    const currentLang = localStorage.getItem('lenci-lang') || 'ar';

    // 2. Render Nav
    renderNavigation(currentLang);

    // 3. Apply Language Settings (Direction, Fonts, Content Visibility)
    initLanguage();
});

function renderNavigation(lang = 'ar') {
    // Clear existing if any (for re-render)
    const existingNav = document.querySelector('.navbar');
    if (existingNav) existingNav.remove();
    const existingBtn = document.querySelector('.floating-lang-btn');
    if (existingBtn) existingBtn.remove();

    const t = translations[lang];

    // Generate Links HTML
    let linksHTML = '';
    navItems.forEach(item => {
        linksHTML += `<a href="${item.href}" class="nav-link" data-page="${item.href}">${t[item.key]}</a>`;
    });

    const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">Lenci<span class="dot">.</span></a>
            
            <div class="nav-links">
                ${linksHTML}
            </div>
            
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
        </div>
    </nav>

    <!-- Floating Language Data -->
    <button class="floating-lang-btn" onclick="toggleLanguage()">
        <span class="lang-icon">🌐</span>
        <span class="lang-text">${t.langBtn}</span>
    </button>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Set Active Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const linksContainer = document.querySelector('.nav-links');
    linksContainer.classList.toggle('mobile-visible');
}

// Language Logic
function initLanguage() {
    const savedLang = localStorage.getItem('lenci-lang') || 'ar';
    updatePageLanguage(savedLang);
}

function toggleLanguage() {
    const currentLang = localStorage.getItem('lenci-lang') || 'ar';
    const newLang = currentLang === 'ar' ? 'en' : 'ar';

    setLanguage(newLang);
}

function setLanguage(lang) {
    localStorage.setItem('lenci-lang', lang);
    updatePageLanguage(lang);
    renderNavigation(lang); // Re-render nav to update text
}

function updatePageLanguage(lang) {
    const body = document.body;

    // Content blocks specific to page content
    const arContent = document.getElementById('content-ar');
    const enContent = document.getElementById('content-en');

    if (lang === 'en') {
        body.classList.remove('lang-ar');
        body.classList.add('lang-en');
        body.setAttribute('dir', 'ltr'); // Force LTR for English

        if (arContent && enContent) {
            arContent.classList.remove('visible');
            arContent.classList.add('hidden');
            enContent.classList.remove('hidden');
            enContent.classList.add('visible');
        }
    } else {
        body.classList.remove('lang-en');
        body.classList.add('lang-ar');
        body.setAttribute('dir', 'rtl'); // Force RTL for Arabic

        if (arContent && enContent) {
            enContent.classList.remove('visible');
            enContent.classList.add('hidden');
            arContent.classList.remove('hidden');
            arContent.classList.add('visible');
        }
    }
}
