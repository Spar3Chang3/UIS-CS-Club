function applyObservation(target) {
  target.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("only screen and (max-width: 768px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const targets = new Map([["promotional-content", false]]);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (!entry.isIntersecting || targets.get(id)) return;
        applyObservation(entry.target);
        targets.set(id, true);
      }
    },
    {
      threshold: 0.5,
    },
  );

  targets.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});
