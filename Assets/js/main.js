document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const counterElements = document.querySelectorAll('.counter-number');
    
    function animateCounter(element, target) {
        let current = 0;
        const duration = Math.min(2000, 500 + target * 2);
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else { element.textContent = Math.round(current).toLocaleString();  }
        }, stepTime);
    }
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        cards.forEach(card => {  if (card.getBoundingClientRect().top < triggerBottom) { card.classList.add('visible'); }
        });
    }

	function animateCounters() {
        counterElements.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight;
            
        if (isVisible && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
        }
        });
    }

    window.addEventListener('scroll', () => { checkScroll(); animateCounters(); });
    window.addEventListener('resize', checkScroll);

    checkScroll();
    animateCounters();
});