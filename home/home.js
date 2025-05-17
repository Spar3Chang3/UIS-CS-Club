function runIntroObserver(observerWrapper) {
    const children = observerWrapper.querySelectorAll(".intro-text, .events");
    for (const child of children) {
        console.log(child);
        child.style = "height: fit-content; transform: translateY(0); opacity: 1; visibility: visible;";
    }
}

document.addEventListener('DOMContentLoaded', () => {
   const targets = new Map([
       ["observer-wrapper", false]
   ]);

   const observer = new IntersectionObserver((entries) => {
       for (const entry of entries) {
           const id = entry.target.id;
           console.log(id);
           if (!entry.isIntersecting || targets.get(id)) return;

           switch (id) {
               case "observer-wrapper":
                   runIntroObserver(entry.target);
                   targets.set(id, true);
           }
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