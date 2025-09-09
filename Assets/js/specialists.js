document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let autoSlide;
    const team = [];

    const mainPhoto = document.getElementById('main-photo');
    const mainName = document.getElementById('main-name');
    const mainRole = document.getElementById('main-role');
    const mainDesc = document.getElementById('main-desc');
    const thumbnails = document.getElementById('thumbnails');
    const indicators = document.getElementById('indicators');
    const mainCard = document.getElementById('main-card');

    function loadTeamData() {
        const members = document.querySelectorAll('.team-member');
        
        members.forEach(member => {
            team.push({
                id: parseInt(member.getAttribute('data-id')),
                img: member.querySelector('img').src,
                name: member.querySelector('h3').textContent,
                role: member.querySelector('.role').textContent,
                desc: member.querySelector('.desc').textContent
            });
        });

        team.sort((a, b) => a.id - b.id);
    }

    function renderCarousel() {
        const current = team[currentIndex];

        mainCard.style.opacity = '0';
        mainCard.style.transform = 'translateY(20px) scale(0.95)';

        setTimeout(() => {
            mainPhoto.src = current.img;
            mainPhoto.alt = current.name;
            mainName.textContent = current.name;
            mainRole.textContent = current.role;
            mainDesc.textContent = current.desc;

            updateThumbnails();
            updateIndicators();

            scrollToActiveThumbnail();
            setTimeout(() => {  mainCard.style.opacity = '1'; mainCard.style.transform = 'translateY(0) scale(1)';  }, 50);

        }, 300);
    }

    function updateThumbnails() {
        thumbnails.innerHTML = "";

        team.forEach((member, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.className = 'thumbnail';
            thumbnail.src = member.img;
            thumbnail.alt = member.name;
            thumbnail.title = member.name;
            thumbnail.dataset.index = index;

            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }

            thumbnail.addEventListener('click', () => { changeSlide(index); });

            thumbnails.appendChild(thumbnail);

            if (!window.thumbnailsLoaded) { setTimeout(() => { thumbnail.classList.add('loaded'); }, index * 50);
            } else { thumbnail.classList.add('loaded'); }
        });

        window.thumbnailsLoaded = true;
        setTimeout(scrollToActiveThumbnail, 150);
     }


    function scrollToActiveThumbnail() {
        const activeThumbnail = thumbnails.querySelector('.thumbnail.active');
        if (activeThumbnail) {
            activeThumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    function updateIndicators() {
        indicators.innerHTML = "";

        team.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === currentIndex ? ' active' : '');
            dot.addEventListener('click', () => changeSlide(i));
            indicators.appendChild(dot);
        });
    }

    function scrollToActiveThumbnail() {
        const activeThumbnail = thumbnails.querySelector('.thumbnail.active');
        if (activeThumbnail) {  activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });}
    }

    function changeSlide(index) {
        if (index === currentIndex) return;
        
        const allThumbnails = document.querySelectorAll('.thumbnail');
        allThumbnails.forEach(thumb => { thumb.classList.remove('active'); });
        
        const selectedThumbnail = document.querySelector(`.thumbnail[data-index="${index}"]`);
        if (selectedThumbnail) { selectedThumbnail.classList.add('active'); }

        currentIndex = index;
        resetAutoSlide();
        renderCarousel();

        setTimeout(scrollToActiveThumbnail, 100);
    }

    function nextSlide() { changeSlide((currentIndex + 1) % team.length); }
    function prevSlide() { changeSlide((currentIndex - 1 + team.length) % team.length); }
    function startAutoSlide() { autoSlide = setInterval(nextSlide, 5000); }
    function resetAutoSlide() { clearInterval(autoSlide); startAutoSlide(); }

    let touchStartX = 0;
    let touchStartY = 0;

    mainCard.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; });

    mainCard.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) { prevSlide();} 
            else { nextSlide(); }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === ' ') resetAutoSlide();
    });

    loadTeamData();
    renderCarousel();
    startAutoSlide();
});