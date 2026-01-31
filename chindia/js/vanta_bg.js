/**
 * vanta_bg.js
 * Initializes Vanta.js FOG effect for a Prestige Dark background.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (window.VANTA) {
            window.VANTA.FOG({
                el: "body",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                clickFixed: true, // Fix for mouse interactions on some devices
                highlightColor: 0xd32f2f, // Chilli Red
                midtoneColor: 0xf59e0b,   // Gold
                lowlightColor: 0x0f172a,  // Midnight Slate
                baseColor: 0x020617,      // Deepest Dark
                blurFactor: 0.60,
                speed: 1.20,
                zoom: 1.30
            });

            // Ensure canvas is behind
            const canvas = document.querySelector('.vanta-canvas');
            if (canvas) {
                canvas.style.position = 'fixed';
                canvas.style.zIndex = '-1';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.opacity = '0.4'; // Reduce opacity so text pops more
            }
        }
    } catch (e) {
        console.warn("Vanta JS failed to load:", e);
    }
});
