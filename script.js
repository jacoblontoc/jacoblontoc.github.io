(() => {
  const pane = document.querySelector('.scroll-pane');
  const sections = [...document.querySelectorAll('.work-section')];
  const pills = [...document.querySelectorAll('.section-pill')];
  const desktop = window.matchMedia('(min-width: 761px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const validSections = new Map(sections.map(section => [`#${section.id}`, section]));
  let framePending = false;

  function markSection(id) {
    pills.forEach(pill => {
      const active = pill.hash === `#${id}`;
      pill.classList.toggle('active', active);
      if (active) pill.setAttribute('aria-current', 'location');
      else pill.removeAttribute('aria-current');
    });
  }

  function updatePosition() {
    const boundary = desktop.matches ? pane.getBoundingClientRect().top + 85 : 85;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= boundary) current = section;
    }
    markSection(current.id);
    framePending = false;
  }

  function queueUpdate() {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updatePosition);
    }
  }

  function navigate(hash, { focus = false, smooth = true } = {}) {
    const section = validSections.get(hash);
    if (!section) return;
    const behavior = smooth && !reducedMotion.matches ? 'smooth' : 'instant';
    if (desktop.matches) {
      const top = pane.scrollTop + section.getBoundingClientRect().top - pane.getBoundingClientRect().top;
      pane.scrollTo({ top, behavior });
    } else {
      window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - 24, behavior });
    }
    if (focus) {
      const heading = section.querySelector('h2');
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    markSection(section.id);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (!validSections.has(link.hash)) return;
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (window.location.hash !== link.hash) history.pushState(null, '', link.hash);
      navigate(link.hash, { focus: event.detail === 0 });
    });
  });

  pane.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate, { passive: true });
  window.addEventListener('popstate', () => navigate(window.location.hash || '#experiences'));
  window.addEventListener('hashchange', () => navigate(window.location.hash || '#experiences'));
  desktop.addEventListener('change', () => {
    const active = pills.find(pill => pill.classList.contains('active'));
    if (active) navigate(active.hash, { smooth: false });
  });
  if (validSections.has(window.location.hash)) navigate(window.location.hash, { smooth: false });
  updatePosition();
})();
