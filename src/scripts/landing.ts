const root = document.querySelector<HTMLElement>('[data-landing]');
const stage = root?.querySelector<HTMLElement>('[data-landing-stage]');
if (root && stage) {
  const cards = [...stage.querySelectorAll<HTMLAnchorElement>('[data-landing-card]')];
  const slots = [...stage.querySelectorAll<HTMLElement>('[data-landing-slot]')];
  const status = root.querySelector<HTMLElement>('[data-landing-status]');
  const touchLayout = matchMedia('(max-width: 680px), (hover: none)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = Math.floor(cards.length / 2);
  let raised: number | null = null;
  let keyboardFocus = false;
  let suppressClickUntil = 0;
  let navigating = false;
  let navigationAnimation: Animation | null = null;
  let gesture: { id: number; x: number; y: number; dx: number; dy: number; dragging: boolean } | null = null;
  const wrap = (index: number) => (index + cards.length) % cards.length;
  const update = () => {
    const mobile = touchLayout.matches;
    let overlap = 0;
    if (!mobile && slots[0]) {
      const width = slots[0].offsetWidth;
      const step = Math.min(260, Math.max(80, (stage.clientWidth - width - 40) / Math.max(1, cards.length - 1)));
      overlap = Math.max(0, width - step);
      stage.style.setProperty('--fan-step', `${step}px`);
    } else stage.style.removeProperty('--fan-step');
    slots.forEach((slot, index) => {
      let distance = index - (mobile ? active : (cards.length - 1) / 2);
      if (mobile) {
        if (distance > cards.length / 2) distance -= cards.length;
        if (distance < -cards.length / 2) distance += cards.length;
      }
      const isRaised = mobile ? distance === 0 : index === raised;
      slot.style.setProperty('--slot', String(distance));
      slot.style.setProperty('--depth', String(Math.abs(distance)));
      slot.style.setProperty('--copy-inset-left', `${!mobile && distance > 0 ? overlap : 0}px`);
      slot.style.setProperty('--copy-inset-right', `${!mobile && distance < 0 ? overlap : 0}px`);
      slot.style.setProperty('--nudge', `${!mobile && raised !== null && index !== raised ? Math.sign(index - raised) * 16 : 0}px`);
      slot.style.zIndex = String(isRaised ? cards.length + 10 : cards.length - Math.floor(Math.abs(distance)));
      slot.toggleAttribute('data-raised', isRaised);
    });
    root.dataset.activeId = cards[active]?.dataset.landingCard ?? '';
    if (status) status.textContent = `${cards[active]?.dataset.title} · ${active + 1} / ${cards.length}`;
  };
  const select = (index: number) => { active = wrap(index); raised = index; update(); };
  const resetGesture = () => {
    gesture = null;
    stage.removeAttribute('data-dragging');
    stage.style.removeProperty('--drag');
    stage.style.removeProperty('--drag-angle');
  };
  document.addEventListener('keydown', (event) => {
    if (['Tab', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(event.key)) keyboardFocus = true;
  });
  stage.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' && !touchLayout.matches) {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('[data-landing-card]') : null;
      if (link && !navigating) { raised = cards.indexOf(link); update(); }
    }
    if (!gesture || gesture.id !== event.pointerId) return;
    gesture.dx = event.clientX - gesture.x;
    gesture.dy = event.clientY - gesture.y;
    if (Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2) {
      gesture.dragging = true;
      stage.setPointerCapture(event.pointerId);
      stage.setAttribute('data-dragging', '');
      stage.style.setProperty('--drag', `${Math.max(-70, Math.min(70, gesture.dx * .25))}px`);
      stage.style.setProperty('--drag-angle', `${Math.max(-5, Math.min(5, gesture.dx * .04))}deg`);
    }
  });
  stage.addEventListener('pointerleave', () => {
    if (touchLayout.matches || navigating) return;
    const focused = cards.indexOf(document.activeElement as HTMLAnchorElement);
    raised = focused >= 0 ? focused : null;
    update();
  });
  stage.addEventListener('pointerdown', (event) => {
    keyboardFocus = false;
    suppressClickUntil = 0;
    if (!touchLayout.matches || !event.isPrimary || navigating) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, dy: 0, dragging: false };
  });
  stage.addEventListener('pointerup', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (gesture.dragging) {
      suppressClickUntil = performance.now() + 400;
      if (Math.abs(gesture.dx) >= 50 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.2) select(active + (gesture.dx < 0 ? 1 : -1));
    }
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    resetGesture();
  });
  stage.addEventListener('pointercancel', resetGesture);
  stage.addEventListener('focusin', (event) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('[data-landing-card]') : null;
    if (link && (!touchLayout.matches || keyboardFocus || link.matches(':focus-visible'))) select(cards.indexOf(link));
  });
  stage.addEventListener('focusout', (event) => {
    if (event.relatedTarget instanceof Node && stage.contains(event.relatedTarget)) return;
    raised = null;
    update();
  });
  stage.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const index = cards.indexOf(document.activeElement as HTMLAnchorElement);
    if (index < 0) return;
    event.preventDefault();
    const next = wrap(index + (event.key === 'ArrowRight' ? 1 : -1));
    select(next);
    cards[next].focus({ preventScroll: true });
  });
  stage.addEventListener('click', (event) => {
    if (performance.now() < suppressClickUntil || navigating) { event.preventDefault(); return; }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('[data-landing-card]') : null;
    if (!link) return;
    const index = cards.indexOf(link);
    if (touchLayout.matches && event.detail !== 0 && index !== active) {
      event.preventDefault();
      select(index);
      return;
    }
    if (reducedMotion.matches || !link.animate) return;
    event.preventDefault();
    navigating = true;
    active = index;
    raised = index;
    update();
    root.dataset.navigating = link.dataset.landingCard;
    const transform = getComputedStyle(link).transform;
    navigationAnimation = link.animate([{ transform }, { transform: `${transform === 'none' ? '' : transform} scale(1.16)` }], { duration: 200, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' });
    void navigationAnimation.finished.then(() => { location.assign(link.href); }, () => { if (navigating) location.assign(link.href); });
  });
  window.addEventListener('pageshow', () => {
    navigating = false;
    root.removeAttribute('data-navigating');
    navigationAnimation?.cancel();
    navigationAnimation = null;
    resetGesture();
    update();
  });
  touchLayout.addEventListener('change', update);
  new ResizeObserver(update).observe(stage);
  root.setAttribute('data-enhanced', '');
  update();
}
