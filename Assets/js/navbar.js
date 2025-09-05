document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.getElementById('navIndicator');

    function setActiveLink(link) {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    
        navIndicator.style.width = `${link.offsetWidth}px`;
        navIndicator.style.height = `${link.offsetHeight}px`;
        navIndicator.style.left = `${link.offsetLeft}px`;
        navIndicator.style.top = `${link.offsetTop}px`;
    }
    
    function initIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            navIndicator.style.width = `${activeLink.offsetWidth}px`;
            navIndicator.style.height = `${activeLink.offsetHeight}px`;
            navIndicator.style.left = `${activeLink.offsetLeft}px`;
            navIndicator.style.top = `${activeLink.offsetTop}px`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveLink(this);
        });
    });

    initIndicator();
    window.addEventListener('resize', initIndicator);
});
