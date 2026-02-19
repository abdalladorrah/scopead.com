// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Market Chart removed in favor of CSS infographic for better scaling

// Use of Funds Chart
const fundsCtx = document.getElementById('fundsChart').getContext('2d');
new Chart(fundsCtx, {
    type: 'doughnut',
    data: {
        labels: ['تطوير تقني (60%)', 'بنية تحتية (20%)', 'تأسيس وتشغيل (20%)'],
        datasets: [{
            data: [60, 20, 20],
            backgroundColor: [
                '#00f2ff',
                '#bd00ff',
                '#ffffff'
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#ffffff',
                    font: {
                        family: 'Cairo'
                    }
                }
            }
        }
    }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
