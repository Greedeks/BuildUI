document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.getElementById('navIndicator');

    function moveIndicator(link) {
        navIndicator.style.width = `${link.offsetWidth}px`;
        navIndicator.style.height = `${link.offsetHeight}px`;
        navIndicator.style.left = `${link.offsetLeft}px`;
        navIndicator.style.top = `${link.offsetTop}px`;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            moveIndicator(this);
        });
    });

    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) moveIndicator(activeLink);

    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) moveIndicator(activeLink);
    });
});
