document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.getElementById('navIndicator');
    const tooltip = document.createElement('div');
    tooltip.className = 'nav-tooltip';
    document.body.appendChild(tooltip);

    let hideTooltipTimer;

    function moveIndicator(link) {
        if (!link || !navIndicator) return;
        navIndicator.style.width = `${link.offsetWidth}px`;
        navIndicator.style.height = `${link.offsetHeight}px`;
        navIndicator.style.left = `${link.offsetLeft}px`;
        navIndicator.style.top = `${link.offsetTop}px`;
    }

    function updateIndicator() {
        const active = document.querySelector('.nav-link.active');
        moveIndicator(active);
    }

    function setActiveLinkByUrl() {
        const currentPath = window.location.pathname;

        navLinks.forEach(link => link.classList.remove('active'));

        const nonHashLinks = Array.from(navLinks).filter(link => !link.href.endsWith('#') && link.getAttribute('href') !== '#' );
        nonHashLinks.forEach(link => {
            const linkUrl = new URL(link.href);
            const linkPath = linkUrl.pathname;
            const normalizedCurrent = currentPath.replace(/\/index\.html$/, '').replace(/\/$/, '').toLowerCase();
            const normalizedLink = linkPath.replace(/\/index\.html$/, '').replace(/\/$/, '').toLowerCase();
            if (normalizedLink === normalizedCurrent) { link.classList.add('active'); }
        });

        updateIndicator();
        updateColor();
    }

    // Fix stuck hover/active
    function clearHoverStates() {
        navLinks.forEach(link => {
            link.blur();
            link.classList.remove('hover');
        });
        updateColor();
    }

    function updateColor() {
        navLinks.forEach(link => {
            const icon = link.querySelector('.nav-icon'), text = link.querySelector('.nav-text');
            const activeColor = '#e0c1a7', defaultColor = '#ffffffcc';
            if (icon) icon.style.color = link.classList.contains('active') ? activeColor : defaultColor;
            if (text) text.style.color = link.classList.contains('active') ? activeColor : defaultColor;
        });
    }

    // Tooltip
    function shouldUseTooltip() { return window.matchMedia('(max-width: 480px)').matches; }

    function positionTooltipBelow(link) {
        const rect = link.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.bottom + 8 + 'px';
    }

    function showTooltipFor(link) {
        if (!shouldUseTooltip()) return;
        const text = link.querySelector('.nav-text')?.textContent?.trim();
        if (!text) return;

        tooltip.textContent = text;
        positionTooltipBelow(link);
        clearTimeout(hideTooltipTimer);
        tooltip.classList.add('show');
        hideTooltipTimer = setTimeout(() => tooltip.classList.remove('show'), 1000);
    }

    // Click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.classList.contains('active') || this.href === window.location.href) {  e.preventDefault(); return; }

            e.preventDefault();

            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            moveIndicator(this);
            updateColor();
            showTooltipFor(this);

            setTimeout(() => {  window.location.href = this.href; }, 350);
        });

        link.addEventListener('mouseenter', () => showTooltipFor(link), { passive: true });
        link.addEventListener('touchstart', () => showTooltipFor(link), { passive: true });
    });

   
    window.addEventListener('pageshow', function (event) { if (event.persisted) { setTimeout(() => { setActiveLinkByUrl(); clearHoverStates(); }, 50); } });
    document.addEventListener('touchstart', clearHoverStates, { passive: true });
    document.addEventListener('pointercancel', clearHoverStates);

     // Fallback / orientationchange
    let resizeTimer;
    ['resize', 'orientationchange'].forEach(evt => {
        window.addEventListener(evt, () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateIndicator, 100);
        });
    });

    // ResizeObserver для динамических изменений
    if (window.ResizeObserver) {
        const navContainer = document.querySelector('.nav-glass');
        const observer = new ResizeObserver(updateIndicator);
        if (navContainer) observer.observe(navContainer);
    }

    function repositionTooltipIfVisible() {
        if (tooltip.classList.contains('show')) {
            const active = document.querySelector('.nav-link.active');
            if (active) positionTooltipBelow(active);
        }
    }

    window.addEventListener('resize', repositionTooltipIfVisible);
    window.addEventListener('scroll', repositionTooltipIfVisible);

    setActiveLinkByUrl();
});
