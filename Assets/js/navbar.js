document.addEventListener('DOMContentLoaded', function() 
{
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
        showTooltipFor(this);
      });
    });

    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) moveIndicator(activeLink);

    window.addEventListener('resize', () => {
      const active = document.querySelector('.nav-link.active');
      if (active) moveIndicator(active);
    });

    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'nav-tooltip';
    document.body.appendChild(tooltip);

    let hideTimer;

    function shouldUseTooltip() {
      return window.matchMedia('(max-width: 480px)').matches;
    }

    function positionTooltipBelow(link) {
      const rect = link.getBoundingClientRect();
      const left = rect.left + rect.width / 2;
      const top = rect.bottom + 8;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }

    function showTooltipFor(link) {
     if (!shouldUseTooltip()) return;

     const text = link.querySelector('.nav-text')?.textContent?.trim();
     if (!text) return;

     tooltip.textContent = text;
     positionTooltipBelow(link);

     clearTimeout(hideTimer);
     tooltip.classList.add('show');
     hideTimer = setTimeout(() => {
       tooltip.classList.remove('show');
     }, 1000);
    }

    navLinks.forEach(link => {
     link.addEventListener('mouseenter', () => showTooltipFor(link), { passive: true });
     link.addEventListener('touchstart', () => showTooltipFor(link), { passive: true });
    });

    function repositionIfVisible() {
     if (!tooltip.classList.contains('show')) return;
     const active = document.querySelector('.nav-link.active');
     if (active) positionTooltipBelow(active);
    }
    
  window.addEventListener('resize', repositionIfVisible);
  window.addEventListener('scroll', repositionIfVisible);
});
