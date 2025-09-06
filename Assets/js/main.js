document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
});
