const MAP_MESSAGES = {
  loading: "Подождите, карта расставляет дороги…",
  offline: "Проблемы с сетью - интернет убежал",
  error: "Технические шоколадки"
};

let currentMapUrl = "contact.html"; 
let loadTimeout = null;
let mapLoaded = false;

function showPlaceholder(message) {
  const placeholder = document.getElementById('mapPlaceholder');
  const text = document.getElementById('mapPlaceholderText');
  text.textContent = message;
  placeholder.style.display = 'flex';
}

function hidePlaceholder() {
  const placeholder = document.getElementById('mapPlaceholder');
  placeholder.style.display = 'none';
}

function loadMap(url) {
  const mapFrame = document.getElementById('mapFrame');
  let mapLoaded = false;

  if (!navigator.onLine) { 
    showPlaceholder(MAP_MESSAGES.offline); 
    return; 
  }

  showPlaceholder(MAP_MESSAGES.loading);
  mapFrame.src = url;

  mapFrame.onload = () => {
    mapLoaded = true;
    hidePlaceholder();
  };

  loadTimeout = setTimeout(() => {
    if (navigator.onLine && !mapLoaded) {
      showPlaceholder(MAP_MESSAGES.error);
    }
  }, 7000);
}

function selectCity(card) {
  if (card.classList.contains('active')) return;

  document.querySelectorAll('.city-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');

  const address = card.getAttribute('data-value');
  document.getElementById('selectedAddress').textContent = address;

  currentMapUrl = card.getAttribute('data-map');
  loadMap(currentMapUrl);
}

window.addEventListener('online', () => {  if (currentMapUrl) loadMap(currentMapUrl); });
window.addEventListener('offline', () => {  showPlaceholder(MAP_MESSAGES.offline);  if (loadTimeout) clearTimeout(loadTimeout); });

document.addEventListener('DOMContentLoaded', () => { 
  setTimeout(() => { const map = document.querySelector('.map-container');  if (map) map.classList.add('visible'); }, 300);
  setTimeout(() => { document.querySelectorAll('.contact-info').forEach(el => { el.classList.add('visible'); }); }, 500);

  const cityCards = document.querySelectorAll('.city-card');
  cityCards.forEach(card => { card.addEventListener('click', () => selectCity(card));});

  const firstCard = document.querySelector('.city-card');

  if (firstCard) { currentMapUrl = firstCard.getAttribute('data-map');
    if (navigator.onLine) { loadMap(currentMapUrl); } 
    else { showPlaceholder(MAP_MESSAGES.offline); }
  }
});
