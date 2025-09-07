document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const counterElements = document.querySelectorAll('.counter-number');
    const h2 = document.querySelector(".preview h3");
    let index = 0;
    const phrases = [
    "Уют в каждой детали интерьера",
    "Создаём пространства для жизни", 
    "Инновации в каждом проекте",
    "Дизайн, который вдохновляет",
    "Будущее домостроения уже здесь",
    "Реализация проектов любой сложности",
    "Мебель и освещение под ваш образ жизни" ];
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        cards.forEach(card => {  if (card.getBoundingClientRect().top < triggerBottom) { card.classList.add('visible'); } });
    }

    function animateText() {
      h2.classList.remove("p-text-slide-in");
      h2.classList.add("p-text-slide-out");

      setTimeout(() => {
        index = (index + 1) % phrases.length;
        h2.textContent = phrases[index];

        h2.classList.remove("p-text-slide-out");
        h2.classList.add("p-text-slide-in");
      }, 600);
    }


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
    setInterval(animateText, 3000);
    animateCounters();
});