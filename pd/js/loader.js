document.addEventListener('DOMContentLoaded', () => {
    const includedElements = document.querySelectorAll('[data-include]');
    let loadedCount = 0;
    const totalToLoad = includedElements.length;

    if (totalToLoad === 0) {
        // If nothing to load, dispatch event immediately
        document.dispatchEvent(new Event('slides-loaded'));
        return;
    }

    includedElements.forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Could not load ${file}`);
                return response.text();
            })
            .then(html => {
                el.innerHTML = html;
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    document.dispatchEvent(new Event('slides-loaded'));
                }
            })
            .catch(error => {
                console.error('Error loading slide:', error);
                el.innerHTML = `<p style="color:red">Error loading content: ${file}</p>`;
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    document.dispatchEvent(new Event('slides-loaded'));
                }
            });
    });
});
