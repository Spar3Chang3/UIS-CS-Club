const MEMBER_DATA_PATH = "/assets/members/ClubMembers.json";
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
const HOVER_JUMP_BUTTON_ICONS = [
  `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>`,
  `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-week"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>`,
  `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-discord"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" /><path d="M7 16.5c3.5 1 6.5 1 10 0" /></svg>`,
  `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>`,
];
const HOVER_JUMP_BUTTON_STATES = {
  open: "open",
  closed: "closed",
};
const FOOTER_ID = "footer"; // This may be considered temp, I really need to just implement an observer callback function
const FOOTER_DETAILS_ID = "ftr-disclaimer-details";

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
  const hvrJmpTggl = document.getElementById("hvr-jmp-btn-tggl");
  const hvrJmpList = document.getElementById("hvr-jmp-list");

  jmpList.innerHTML = "";
  hvrJmpList.innerHTML = "";

  for (const target in TARGET_LIST) {
    const jmpBtn = document.createElement("button");
    const hvrJmpBtn = document.createElement("button");
    jmpBtn.textContent = JUMP_BUTTON_NAMES[target];
    hvrJmpBtn.innerHTML = HOVER_JUMP_BUTTON_ICONS[target];
    jmpBtn.className = "jmp-btn";
    hvrJmpBtn.className = "hvr-jmp-btn";
    jmpBtn.dataset.jump = TARGET_LIST[target];
    hvrJmpBtn.dataset.jump = TARGET_LIST[target];
    jmpList.appendChild(jmpBtn);
    hvrJmpList.appendChild(hvrJmpBtn);
    jmpBtn.addEventListener("click", jumpTo);
    hvrJmpBtn.addEventListener("click", jumpTo);

    const hr = document.createElement("hr");
    hvrJmpList.appendChild(hr);
  }

  // hvrJmpList.removeChild(hvrJmpList.lastElementChild); // Get rid of that other hr - not active atm, not sure if I like it better with or without
  hvrJmpList.dataset.state = "closed";
  hvrJmpTggl.addEventListener("click", expandHoverJumpList);
}

function jumpTo(e) {
  e.preventDefault();
  const jump = e.currentTarget.dataset.jump;
  const target = document.getElementById(jump);

  if (target) {
    history.pushState(null, "", `#${jump}`);

    target.scrollIntoView({ behavior: "smooth" });
  }
}

function expandHoverJumpList(e) {
  e.preventDefault();

  const target = document.getElementById("hvr-jmp-list");
  const tgglBtn = e.currentTarget;

  if (target.dataset.state === HOVER_JUMP_BUTTON_STATES.open) {
    target.style = "";
    tgglBtn.classList.remove("active");
    target.dataset.state = HOVER_JUMP_BUTTON_STATES.closed;
  } else {
    target.style = `height: ${JUMP_BUTTON_NAMES.length * 4.25}rem; margin-bottom: 1rem; z-index: 6;`;
    tgglBtn.classList.add("active");
    target.dataset.state = HOVER_JUMP_BUTTON_STATES.open;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addMembers();

  const targets = new Map([
    ["outro-content", false],
    ["footer", false],
  ]);

  for (const target of TARGET_LIST) {
    targets.set(target, false);
  }

  setJumps();

  const footerDetails = document.getElementById("ftr-disclaimer-details");
  const hvrJmpCont = document.getElementById("hvr-jmp-container");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (
          !entry.isIntersecting &&
          id === FOOTER_ID &&
          targets.get(FOOTER_ID)
        ) {
          targets.set(id, false);
          entry.target.classList.remove("active");
        }
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

  footerDetails.addEventListener("toggle", () => {
    if (footerDetails.open) {
      hvrJmpCont.style.bottom = `${footerDetails.offsetHeight + 40}px`;
      footerDetails.scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      hvrJmpCont.style.bottom = "";
    }
  });

  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});
