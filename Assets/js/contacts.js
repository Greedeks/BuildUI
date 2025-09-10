function selectCity(card) {
    // Убираем активный класс у всех карточек
    document.querySelectorAll('.city-card').forEach(c => {
        c.classList.remove('active');
    });
    
    // Добавляем активный класс выбранной карточке
    card.classList.add('active');
    
    // Обновляем отображаемый адрес
    const address = card.getAttribute('data-value');
    document.getElementById('selectedAddress').textContent = address;
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const cityCards = document.querySelectorAll('.city-card');
    
    // Назначаем обработчики клика на карточки городов
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            selectCity(this);
        });
    });
    
    // Активируем первую карточку по умолчанию
    if (cityCards.length > 0) {
        selectCity(cityCards[0]);
    }
});