const MEMBER_DATA_PATH = "/assets/TeamMembers.json";
const MEMBER_WRAPPER_ID = "member-container";
const IS_MOBILE = window.matchMedia("only screen and (max-width: 768px)");
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");
const TARGET_LIST = [
  "promotional-content",
  "schedule-content",
  "contact-content",
  "member-content",
];
const JUMP_BUTTON_NAMES = ["Promotion", "Schedule", "Contact", "Members"];

function applyObservation(target) {
  target.classList.add("active");
}

async function addMembers() {
  const wrapper = document.getElementById(MEMBER_WRAPPER_ID);
  if (!wrapper) {
    console.warn(`Wrapper element with id '${MEMBER_WRAPPER_ID}' not found.`);
    const warning = document.createElement("h3");
    warning.textContent = `Wrapper element with id '${MEMBER_WRAPPER_ID}' not found.`;
    warning.style = "color: lightcoral";
    document.getElementById("member-content").appendChild(warning);
  } else {
    wrapper.innerHTML = "";
  }

  fetch(MEMBER_DATA_PATH)
    .then((res) => {
      return res.json();
    })
    .then((memberData) => {
      let index = 0;
      for (const member of memberData) {
        const card = document.createElement("div");
        if (!REDUCED_MOTION.matches) {
          card.style.visibility = "hidden";
          card.style.animation = "fade-fly-in 0.5s ease forwards";
          card.style.animationDelay = `${100 * index}ms`;
        } else {
          card.style.visibility = "visible";
          card.style.animation = "none";
          card.style.animationDelay = "none";
        }
        card.className = "team-member-card";

        // Portrait
        const img = document.createElement("img");
        img.src = member.portraitSrc;
        img.alt = `${member.name}'s portrait`;
        img.className = "team-member-portrait";

        // Name
        const nameEl = document.createElement("h3");
        nameEl.textContent = member.name;
        nameEl.className = "team-member-name";

        // Description
        const descEl = document.createElement("p");
        descEl.textContent = member.description;
        descEl.className = "team-member-description";

        // Append all
        card.appendChild(img);
        card.appendChild(nameEl);
        card.appendChild(descEl);
        wrapper.appendChild(card);

        index++;
      }
    })
    .catch((err) => {
      wrapper.innerHTML = "";
      const error = document.createElement("h3");
      error.style = "color: lightcoral";
      error.textContent = `Encountered ${err} while trying to add members`;
      wrapper.appendChild(error);
    });
}

function setJumps() {
  const jmpList = document.getElementById("jmp-list");
  jmpList.innerHTML = "";

  for (const target in TARGET_LIST) {
    const jmpBtn = document.createElement("button");
    jmpBtn.textContent = JUMP_BUTTON_NAMES[target];
    jmpBtn.className = "jmp-btn";
    jmpBtn.dataset.jump = TARGET_LIST[target];
    jmpList.appendChild(jmpBtn);
    jmpBtn.addEventListener("click", jumpTo);
  }
}

function jumpTo(e) {
  e.preventDefault();
  const jump = e.target.dataset.jump;
  const target = document.getElementById(jump);

  if (target) {
    history.pushState(null, "", `#${jump}`);

    target.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addMembers();

  const targets = new Map([["outro-content", false]]);

  for (const target of TARGET_LIST) {
    targets.set(target, false);
  }

  setJumps();

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
      threshold: 0.8,
    },
  );

  targets.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth",  });
    }
  }
});
