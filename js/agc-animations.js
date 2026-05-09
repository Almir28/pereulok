export function pulsePrice(...elements) {
  elements.filter(Boolean).forEach((element) => {
    element.classList.remove('agc-price-pulse');
    void element.offsetWidth;
    element.classList.add('agc-price-pulse');
  });
}

export function hydrateSkeleton(container, render) {
  if (!container) return;
  requestAnimationFrame(() => {
    container.classList.add('is-loading');
    window.setTimeout(() => {
      render();
      container.classList.remove('is-loading');
    }, 180);
  });
}
