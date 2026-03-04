import { siteData } from './data/content.js';
import { Frames } from './views/Frames.js';

class App {
    constructor() {
        this.navContainer = document.getElementById('main-nav');
        this.viewContainer = document.getElementById('view-container');
        this.breadcrumb = document.getElementById('breadcrumb');
        this.themeToggle = document.getElementById('theme-toggle');

        this.init();
    }

    init() {
        this.renderFullPage();
        this.renderNav();
        this.setupTheme();
        this.setupScrollSpy();
    }

    renderFullPage() {
        // Render the entire page at once
        this.viewContainer.innerHTML = Frames.renderFullPage(siteData.sections);
    }

    renderNav() {
        this.navContainer.innerHTML = siteData.navigation.map(item => `
            <a href="#${item.id}" class="nav-item" data-id="${item.id}">
                <i class="${item.icon}"></i>
                <span>${item.title}</span>
            </a>
        `).join('');

        // Attach smooth scroll event listeners
        const navItems = this.navContainer.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-id');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Update URL hash without jumping
                    history.pushState(null, null, `#${targetId}`);
                    this.updateNavActiveState(targetId);
                }
            });
        });
    }

    setupScrollSpy() {
        // Update active nav item based on scroll position
        const sections = document.querySelectorAll('section.frame');
        const navItems = this.navContainer.querySelectorAll('.nav-item');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                this.updateNavActiveState(current);
            }
        });

        // Initial setup
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.updateNavActiveState(hash);
            const target = document.getElementById(hash);
            if (target) {
                setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        } else {
            this.updateNavActiveState('hero');
        }
    }

    updateNavActiveState(id) {
        const navItems = this.navContainer.querySelectorAll('.nav-item');
        let currentTitle = '';

        navItems.forEach(item => {
            if (item.getAttribute('data-id') === id) {
                item.classList.add('active');
                currentTitle = siteData.navigation.find(nav => nav.id === id)?.title || '';
            } else {
                item.classList.remove('active');
            }
        });

        // Update Breadcrumb
        if (currentTitle) {
            this.breadcrumb.innerHTML = `<span style="color: var(--primary-light)">دليل العمل المرن</span> / ${currentTitle}`;
        }
    }

    setupTheme() {
        // Simple dark/light theme toggle
        let isLight = false;
        this.themeToggle.addEventListener('click', () => {
            isLight = !isLight;
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
                this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.documentElement.removeAttribute('data-theme');
                this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
