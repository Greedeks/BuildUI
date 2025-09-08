document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const counterElements = document.querySelectorAll('.counter-number');
    const h2 = document.querySelector(".preview h3");
    const phrases = [
        "Уют в каждой детали интерьера",
        "Создаём пространства для жизни",
        "Инновации в каждом проекте",
        "Дизайн, который вдохновляет",
        "Будущее домостроения уже здесь",
        "Реализация проектов любой сложности",
        "Мебель и освещение под ваш образ жизни"
    ];
    let index = 0;

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        cards.forEach(card => {
            if (card.getBoundingClientRect().top < triggerBottom) {
                card.classList.add('visible');
            }
        });
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
            } else {
                element.textContent = Math.round(current).toLocaleString();
            }
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

    window.addEventListener('scroll', () => {checkScroll(); animateCounters();});
    window.addEventListener('resize', checkScroll);
    checkScroll();
    setInterval(animateText, 3000);
    animateCounters();

    /* Form */
    const orderForm = document.getElementById('orderForm');
    const fields = ['firstName', 'lastName', 'phone', 'email', 'city', 'address'];
    const nameRegex = /^(?!.*(.)\1{2})[А-Яа-яЁёA-Za-z\s-]{2,}$/;
    const phoneRegex = /^\+375\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const addressRegex = /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё0-9\s.,-]{5,}$/;

    function showError(id, message) {
        const input = document.getElementById(id);
        const errorDiv = input.nextElementSibling;
        input.classList.add('input-error');
        errorDiv.textContent = message;
    }

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field);
            const errorDiv = input.nextElementSibling;
            input.classList.remove('input-error');
            errorDiv.textContent = '';
        });

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const city = document.getElementById('city').value.trim();
        const address = document.getElementById('address').value.trim();

        if (!nameRegex.test(firstName)) {
            showError('firstName', 'Введите корректное имя (только буквы, минимум 2 символа).');
            isValid = false;
        }
        if (!nameRegex.test(lastName)) {
            showError('lastName', 'Введите корректную фамилию (только буквы, минимум 2 символа).');
            isValid = false;
        }
        if (!phoneRegex.test(phone)) {
            showError('phone', 'Введите номер в формате +375 (XX) XXX-XX-XX.');
            isValid = false;
        }
        if (!emailRegex.test(email)) {
            showError('email', 'Введите корректный email (например: example@gmail.com).');
            isValid = false;
        }
        if (city.length < 2) {
            showError('city', 'Введите корректный город.');
            isValid = false;
        }
        if (!addressRegex.test(address)) {
            showError('address', 'Введите корректный адрес (улица + номер дома).');
            isValid = false;
        }

        if (!isValid) return;

        console.log('Данные формы:', Object.fromEntries( new FormData(orderForm).entries()));
        alert('Ваша заявка отправлена.');
        orderForm.reset();
        bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
    });

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function () {
        let value = phoneInput.value.replace(/\D/g, '');
        if (!value.startsWith('375')) value = '375' + value;
        let formatted = '+375 ';
        if (value.length > 3) formatted += '(' + value.slice(3, 5);
        if (value.length >= 5) formatted += ') ' + value.slice(5, 8);
        if (value.length >= 8) formatted += '-' + value.slice(8, 10);
        if (value.length >= 10) formatted += '-' + value.slice(10, 12);
        phoneInput.value = formatted;
    });
});
