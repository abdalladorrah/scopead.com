/**
 * components.js
 * Generic interactive logic for Tabs, Accordions, Progress Bars, and Gallery.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAccordions();
    initProgressBars();
    initGallery();
    initCounters();
    initScrollAnims();
});

/**
 * Tabs Logic
 */
function initTabs() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabId = e.target.getAttribute('data-tab');
            const container = e.target.closest('.tab-container');
            if (!container) return;

            container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            const targetContent = container.querySelector(`#${tabId}`);
            if (targetContent) targetContent.classList.add('active');
        }
    });
}

/**
 * Accordion Logic
 */
function initAccordions() {
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (header) {
            const accordion = header.closest('.accordion');
            if (accordion) {
                accordion.classList.toggle('active');
            }
        }
    });
}

/**
 * Progress Bar Logic
 */
function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.progress-bar');
                // The width is already set in style, but we can re-trigger animation if needed
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.progress-container').forEach(bar => observer.observe(bar));
}

/**
 * Stat Counter Logic
 * Animates numbers from 0 to target
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-val');
    const speed = 200;

    const animate = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc).toLocaleString();
            setTimeout(() => animate(counter), 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animate(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/**
 * Floating Hub Logic
 */
function initFloatingHub() {
    // Clear existing if any
    const existingHub = document.getElementById('main-hub');
    if (existingHub) existingHub.remove();

    const currentLang = localStorage.getItem('lenci-lang') || 'ar';
    const hubHTML = `
    <div class="floating-hub" id="main-hub">
        <button class="hub-main-btn" onclick="document.getElementById('main-hub').classList.toggle('active')">
            <span>+</span>
        </button>
        <div class="hub-menu">
            <div class="hub-item" onclick="toggleLanguage()">
                <span>🌐</span> <span class="hub-text">${currentLang === 'en' ? 'Arabic' : 'English'}</span>
            </div>
            <div class="hub-item" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                <span>🚀</span> <span class="hub-text">Top</span>
            </div>
            <div class="hub-item" onclick="location.href='strategy.html'">
                <span>⭐</span> <span class="hub-text">Strategy</span>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', hubHTML);
}

/**
 * Scroll Animations
 */
function initScrollAnims() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .hero, .metric-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

function initGallery() { }
