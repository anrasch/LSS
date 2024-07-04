document.addEventListener('DOMContentLoaded', () => {
    const buyEnButton = document.getElementById('buy-en');
    const infoEnSection = document.getElementById('info-en');
    const buyDeButton = document.getElementById('buy-de');
    const infoDeSection = document.getElementById('info-de');

    buyEnButton.addEventListener('click', () => {
        toggleVisibility(infoEnSection);
    });

    buyDeButton.addEventListener('click', () => {
        toggleVisibility(infoDeSection);
    });

    function toggleVisibility(section) {
        const allSections = document.querySelectorAll('.info-section');
        allSections.forEach(sec => {
            if (sec !== section) {
                sec.style.display = 'none';
            }
        });
        if (section.style.display === 'none' || section.style.display === '') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    }
});
