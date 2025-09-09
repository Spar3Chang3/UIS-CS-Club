const isMobile = window.matchMedia("only screen and (max-width: 768px)");

function runIntroObserver(observerWrapper) {
  let children;
  if (isMobile.matches) {
    children = observerWrapper.querySelectorAll(".intro-text, .events, .links");
  } else {
    children = observerWrapper.querySelectorAll(
      ".intro-text, .events, .event-calendar-h2, .calendar, .links",
    );
  }
  for (const child of children) {
    child.style =
      "height: fit-content; transform: translateY(0); opacity: 1; visibility: visible;";
  }
}

function initObserverAnimations() {
  const children = document.querySelectorAll(
    ".intro-text, .events, .event-calendar-h2, .calendar, .links",
  );
  for (const child of children) {
    child.style =
      "height: 0; transform: translateY(100%); opacity: 0; visibility: hidden;";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const targets = new Map([
    ["observer-wrapper-text", false],
    ["observer-wrapper-calendar", false],
    ["observer-wrapper-links", false],
  ]);

  if (!reducedMotion.matches) {
    initObserverAnimations();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || targets.get(id)) return;
          runIntroObserver(entry.target);
          targets.set(id, true);
        }
      },
      {
        threshold: 0.8,
      },
    );

    targets.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  } else {
    runIntroObserver(document);
  }
});
