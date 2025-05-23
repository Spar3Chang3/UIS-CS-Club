function runIntroObserver(observerWrapper) {
    const children = observerWrapper.querySelectorAll(".intro-text, .events, .event-calendar-h2, .calendar, .links");
    for (const child of children) {
        child.style = "height: fit-content; transform: translateY(0); opacity: 1; visibility: visible;";
    }
}

document.addEventListener('DOMContentLoaded', () => {
   const targets = new Map([
       ["observer-wrapper-text", false],
       ["observer-wrapper-calendar", false],
       ["observer-wrapper-links", false]
   ]);

   const observer = new IntersectionObserver((entries) => {
       for (const entry of entries) {
           const id = entry.target.id;
           if (!entry.isIntersecting || targets.get(id)) return;
           runIntroObserver(entry.target);
           targets.set(id, true);
       }
   },
       {
           threshold: 0.8
       }
       );

    targets.forEach((_, id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
});