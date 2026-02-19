function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
}

// Listen for both regular load and our custom slides-loaded event
document.addEventListener('DOMContentLoaded', initObserver);
document.addEventListener('slides-loaded', initObserver);
