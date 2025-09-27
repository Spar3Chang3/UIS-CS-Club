/*
  TODO:
    * Finish implementing reduced motion stuffs
    * Potentially move major constants into their own JS file
*/

const MEMBER_DATA_PATH = "/assets/members/ClubMembers.json"; // For fetching all the club members obvi, need to make an "add club member" part too
const IS_MOBILE = window.matchMedia("only screen and (max-width: 768px)"); // 768px just because most modern phones report around there - fuck you iPhone 4s
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)"); // Still need to properly implement
const WINDOW_HEIGHT = window.innerHeight;

const EL_ID_LIST = {
  // Top
  introCont: "intro-container",

  // Observer Sections
  promoContent: "promotional-content",
  schedContent: "schedule-content",
  joinContent: "join-content",
  memberContent: "member-content",
  outroContent: "outro-content",

  // Member wrapper
  memberCont: "member-container",

  // Nav Buttons
  jmpList: "jmp-list",
  hvrJmpCont: "hvr-jmp-container",
  hvrJmpList: "hvr-jmp-list",
  hvrJmpBtnTggl: "hvr-jmp-btn-tggl",
  clrUrlBtn: "clr-btn",
  scrlHlpBtn: "scrl-hlp-btn",

  // Util containers
  clrCont: "clr-container",

  // SVG animations
  joinSvg: "join-svg",
  joinSvgStart: "join-svg-start",
  joinSvgStop: "join-svg-stop",
  joinSvgDot: "join-start-dot",
  joinSvgPath: "join-dynamic-path",

  // Footer
  ftr: "footer",
  ftrDisclaimerDetails: "ftr-disclaimer-details",
};

// Felt like this was better because any addtional containers added to the site can just be put here - can have more observers than jumping buttons
const DEFAULT_OBSERVER_TARGET_LIST = [
  EL_ID_LIST.promoContent,
  EL_ID_LIST.schedContent,
  EL_ID_LIST.joinContent,
  EL_ID_LIST.memberContent,
  EL_ID_LIST.outroContent,
];

// Name for header buttons, icon for hover jump list, observer target list
const JMP_BTN_ATTRIBUTES = [
  {
    jmpName: "Top",
    hvrIcon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-rectangle-rounded-top"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6h6a6 6 0 0 1 6 6v5a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-5a6 6 0 0 1 6 -6z" /></svg>`,
    target: EL_ID_LIST.introCont,
    ariaLabel: "Scroll to top",
  },
  {
    jmpName: "Promotion",
    hvrIcon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 8a3 3 0 0 1 0 6" /><path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" /><path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" /></svg>`,
    target: EL_ID_LIST.promoContent,
    ariaLabel: "Scroll to promotion",
  },
  {
    jmpName: "Schedule",
    hvrIcon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-week"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>`,
    target: EL_ID_LIST.schedContent,
    ariaLabel: "Scroll to schedule",
  },
  {
    jmpName: "Join Us",
    hvrIcon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-discord"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" /><path d="M7 16.5c3.5 1 6.5 1 10 0" /></svg>`,
    target: EL_ID_LIST.joinContent,
    ariaLabel: "Scroll to join section",
  },
  {
    jmpName: "Members",
    hvrIcon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>`,
    target: EL_ID_LIST.memberContent,
    ariaLabel: "Scroll to club members",
  },
  {
    jmpName: "Bottom",
    hvrIcon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-rectangle-rounded-bottom"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 18h6a6 6 0 0 0 6 -6v-5a1 1 0 0 0 -1 -1h-16a1 1 0 0 0 -1 1v5a6 6 0 0 0 6 6z" /></svg>`,
    target: EL_ID_LIST.ftr,
    ariaLabel: "Scroll to bottom",
  },
];

const ElAttributes = {
  hvrJmpListHeight: 0, // Expanding part of hover jump list
  hvrJmpBtnOpen: "open", // Look these two I just didn't like being in their own separate object
  hvrJmpBtnClosed: "closed", // ^
  activeClassName: "active", // ^
  cpBtnIcon: `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>`,
  hvrJmpBtnBttmBffr: 25, // Buffer in px for button to stay away from footer
  svgElBuffer: 16, // Buffer in px for svg to not run into element
};

const ElStore = new Map([]); // ID, Doc Element
const ObTargets = new Map([]); // ID, { callback(), cleanup(), viewed (t/f) }
const JmpTargets = new Map([]); // jump name, document id - going to try this for very marginally less performance but more ease of use

/* --------------------------------- UTIL FUNCTIONS --------------------------------- */

function GetAllElements() {
  for (const prop in EL_ID_LIST) {
    const elToAdd = document.getElementById(EL_ID_LIST[prop]);

    if (elToAdd) {
      ElStore.set(EL_ID_LIST[prop], elToAdd);
    }
  }
}

function GetUrlArtifact() {
  return window.location.hash.substring(1); // NO '#' INCLUDED IN RETURN
}

function SetUrlArtifact(artifact) {
  history.replaceState(null, "", `#${artifact}`);
}

/* --------------------------------- ELEMENT MANIPULATION FUNCTIONS --------------------------------- */

// Current callbacks for observer

function applyActiveClass(targetEl) {
  targetEl.classList.add(ElAttributes.activeClassName);
}

function moveHoverJumpList() {
  const offset = ElStore.get(EL_ID_LIST.ftr).offsetHeight;
  ElStore.get(EL_ID_LIST.hvrJmpCont).style.bottom =
    `${offset + ElAttributes.hvrJmpBtnBttmBffr}px`;
}

/* --------------------------------- DOM MANIPULATION FUNCTIONS --------------------------------- */

async function addMembers() {
  const wrapper = ElStore.get(EL_ID_LIST.memberCont);
  if (!wrapper) {
    console.warn(
      `Wrapper element with id '${EL_ID_LIST.memberCont}' not found.`,
    );
    const warning = document.createElement("h3");
    warning.textContent = `Wrapper element with id '${EL_ID_LIST.memberCont}' not found.`;
    warning.style = "color: lightcoral";
    ElStore.get(EL_ID_LIST.memberContent).appendChild(warning);
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
        if (!REDUCED_MOTION.matches && !IS_MOBILE.matches) {
          card.style.setProperty("--trans-delay", `${100 * index}ms`);
          card.addEventListener("mousemove", applyTransform);
          card.addEventListener("mouseleave", resetTransform);
        } else {
          card.style.transitionDelay = "none";
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
  const jmpList = ElStore.get(EL_ID_LIST.jmpList);
  const hvrJmpTggl = ElStore.get(EL_ID_LIST.hvrJmpBtnTggl);
  const hvrJmpList = ElStore.get(EL_ID_LIST.hvrJmpList);

  jmpList.innerHTML = "";
  hvrJmpList.innerHTML = "";

  // Handle top and bottom buttons first
  const topTarget = JMP_BTN_ATTRIBUTES[0];
  const btmTarget = JMP_BTN_ATTRIBUTES[JMP_BTN_ATTRIBUTES.length - 1];

  JmpTargets.set(topTarget.jmpName, topTarget.target);
  JmpTargets.set(btmTarget.jmpName, btmTarget.target);

  const hvrTopBtn = document.createElement("button");
  const hvrBtmBtn = document.createElement("button");

  hvrTopBtn.innerHTML = topTarget.hvrIcon;
  hvrBtmBtn.innerHTML = btmTarget.hvrIcon;

  hvrTopBtn.className = "hvr-jmp-btn-top";
  hvrBtmBtn.className = "hvr-jmp-btn-btm";

  hvrTopBtn.dataset.jumpto = topTarget.target;
  hvrBtmBtn.dataset.jumpto = btmTarget.target;

  hvrTopBtn.ariaLabel = topTarget.ariaLabel;
  hvrTopBtn.title = topTarget.ariaLabel;
  hvrBtmBtn.ariaLabel = btmTarget.ariaLabel;
  hvrBtmBtn.title = btmTarget.ariaLabel;

  const topHr = document.createElement("hr");

  hvrJmpList.appendChild(hvrTopBtn);
  hvrJmpList.appendChild(topHr);

  hvrTopBtn.addEventListener("click", jumpTo);

  // Then do the rest
  for (let i = 1; i < JMP_BTN_ATTRIBUTES.length - 1; i++) {
    const target = JMP_BTN_ATTRIBUTES[i];

    const jmpBtn = document.createElement("button");
    const hvrJmpBtn = document.createElement("button");
    const cpBtn = document.createElement("button");

    JmpTargets.set(target.jmpName, target.target);

    jmpBtn.textContent = target.jmpName;
    hvrJmpBtn.innerHTML = target.hvrIcon;
    cpBtn.innerHTML = ElAttributes.cpBtnIcon;

    jmpBtn.className = "jmp-btn";
    hvrJmpBtn.className = "hvr-jmp-btn";
    cpBtn.className = "cp-btn";

    jmpBtn.style.animationDelay = `${150 * i}ms`;

    jmpBtn.dataset.jumpto = target.target;
    hvrJmpBtn.dataset.jumpto = target.target;
    cpBtn.dataset.copylink =
      location.origin +
      location.pathname +
      location.search +
      `#${target.jmpName}`;

    jmpBtn.ariaLabel = target.ariaLabel;
    jmpBtn.title = target.ariaLabel;
    hvrJmpBtn.ariaLabel = target.ariaLabel;
    hvrJmpBtn.title = target.ariaLabel;
    cpBtn.ariaLabel = `Copy website link of the ${target.jmpName} to your clipboard`;
    cpBtn.title = "Copy URL to clipboard";

    jmpList.appendChild(jmpBtn);
    hvrJmpList.appendChild(hvrJmpBtn);
    ElStore.get(target.target).appendChild(cpBtn);

    jmpBtn.addEventListener("click", jumpTo);
    hvrJmpBtn.addEventListener("click", jumpTo);
    cpBtn.addEventListener("click", copyURL);

    const hr = document.createElement("hr");
    hvrJmpList.appendChild(hr);
  }

  hvrJmpList.appendChild(hvrBtmBtn);

  hvrBtmBtn.addEventListener("click", jumpTo);

  // Get what the height should be theoretically
  hvrJmpList.style = "height: fit-content";
  ElAttributes.hvrJmpListHeight = hvrJmpList.offsetHeight;
  hvrJmpList.style = ""; // Then pretend nothing ever happened

  hvrJmpList.dataset.state = ElAttributes.hvrJmpBtnClosed;
  hvrJmpTggl.addEventListener("click", expandHoverJumpList);
}

function generateSvgPath(startEl, endEl, dotEl, pathEl, svg) {
  const startRect = startEl.getBoundingClientRect();
  const endRect = endEl.getBoundingClientRect();
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const startX =
    scrollX + startRect.left + startRect.width + ElAttributes.svgElBuffer;
  const startY = scrollY + startRect.top + startRect.height / 2;

  const turnY = scrollY + endRect.height / 2;
  const endX =
    scrollX + endRect.left + endRect.width + ElAttributes.svgElBuffer;

  const pathData = `M ${startX} ${startY} L ${startX} ${turnY} L ${endX} ${turnY}`;

  pathEl.setAttribute("d", pathData);

  dotEl.setAttribute("cx", startX);
  dotEl.setAttribute("cy", startY);
}

/* --------------------------------- EVENT LISTENER FUNCTIONS --------------------------------- */

function jumpTo(e) {
  e.preventDefault();

  // Do the main part
  const jump = e.currentTarget.dataset.jumpto;
  const targetEl = ElStore.get(jump);

  if (targetEl) {
    targetEl.style = `scroll-margin-bottom: ${WINDOW_HEIGHT / 2 - targetEl.offsetHeight / 2}px`;
    SetUrlArtifact(targetEl.dataset.jumpdestination);
    targetEl.scrollIntoView({ behavior: "smooth", block: "end" });
    targetEl.focus();
  }

  // Apply the insignificant CSS
  if (window.location.hash) {
    ElStore.get(EL_ID_LIST.clrCont).classList.add(ElAttributes.activeClassName);
  }
}

function expandHoverJumpList(e) {
  e.preventDefault();

  const targetEl = ElStore.get(EL_ID_LIST.hvrJmpList);
  const tgglBtn = e.currentTarget;

  if (targetEl.dataset.state === ElAttributes.hvrJmpBtnOpen) {
    targetEl.style = "";
    tgglBtn.classList.remove("active");
    targetEl.dataset.state = ElAttributes.hvrJmpBtnClosed;
  } else {
    targetEl.style = `height: ${ElAttributes.hvrJmpListHeight}px; z-index: 6;`;
    tgglBtn.classList.add("active");
    targetEl.dataset.state = ElAttributes.hvrJmpBtnOpen;
  }
}

function clearUrl(e) {
  e.preventDefault();

  if (window.location.hash) {
    history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search,
    );

    // Yes this kinda just assumes it's got one but eh, should never be falsely fired and even if it does nothing bad should really happe
    ElStore.get(EL_ID_LIST.clrCont).classList.remove(
      ElAttributes.activeClassName,
    );
  }
}

function copyURL(e) {
  e.preventDefault();

  const targetEl = e.currentTarget;

  const link = targetEl.dataset.copylink;
  navigator.clipboard.writeText(link);

  targetEl.classList.add(ElAttributes.activeClassName);
  setTimeout(
    () => targetEl.classList.remove(ElAttributes.activeClassName),
    2000,
  );
}

function applyTransform(e) {
  e.preventDefault();

  // Reset the transition delay
  e.currentTarget.style.setProperty("--trans-delay", "0ms");

  // Get the button's position and dimensions
  const rect = e.currentTarget.getBoundingClientRect();

  // Calculate the mouse position relative to the button's center
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  // Calculate the angle from the center to the mouse position
  // Add 90 degrees because a linear-gradient's 0deg is a vertical line
  const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;

  // Update --mouse-angle css var
  e.currentTarget.style.setProperty("--mouse-angle", `${angle}deg`);

  // Then calculate rotation for card tilt
  const rotateLimit = 10; // Max degrees to tilt
  const rotateX = (-y / (rect.height / 2)) * rotateLimit; // Invert Y for natural tilt
  const rotateY = (x / (rect.width / 2)) * rotateLimit;

  // Add rotation effect next
  e.currentTarget.style.setProperty("--tilt-x", `${rotateX}deg`);
  e.currentTarget.style.setProperty("--tilt-y", `${rotateY}deg`);
}

function resetTransform(e) {
  e.preventDefault();

  e.currentTarget.style.setProperty("--tilt-x", "0deg");
  e.currentTarget.style.setProperty("--tilt-y", "0deg");
}

function scrollPastIntro(e) {
  e.preventDefault();
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: "smooth",
  });
}

/* --------------------------------- MAIN FUNCTION --------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // GetElementById() for every entry in EL_ID_LIST
  GetAllElements();

  // Setup for displaying club members, jumping to sections
  addMembers();
  setJumps();

  const footerDetails = ElStore.get(EL_ID_LIST.ftrDisclaimerDetails); // Literally just for the event listener

  // Setup observer map
  ObTargets.set(EL_ID_LIST.ftr, {
    callback(el) {
      moveHoverJumpList();
    },
    cleanup(el) {
      ElStore.get(EL_ID_LIST.hvrJmpCont).style = "";
      this.viewed = false;
    },
    viewed: false,
  });
  for (const target of DEFAULT_OBSERVER_TARGET_LIST) {
    ObTargets.set(target, {
      callback(el) {
        applyActiveClass(el);
      },
      cleanup(el) {
        return;
      },
      viewed: false,
    });
  }

  // Create observer and then observe - still need to set proper cleanup functions
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        const curTarget = ObTargets.get(id);

        if (!entry.isIntersecting || curTarget.viewed) {
          curTarget.cleanup(entry.target);
        } else {
          curTarget.callback(entry.target);
          curTarget.viewed = true;
        }
      }
    },
    {
      threshold: IS_MOBILE.matches ? 0.4 : 0.8,
    },
  );

  ObTargets.forEach((_, id) => {
    const el = ElStore.get(id);
    if (el) observer.observe(el);
  });

  // Add event listener to make sure hover jump list does not cover the footer
  footerDetails.addEventListener("toggle", () => {
    if (!IS_MOBILE.matches) {
      console.log("Still triggering");
      moveHoverJumpList();
    }

    ElStore.get(EL_ID_LIST.ftr).scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  });

  // Scroll to the given element if user enters website with a # - added the window.scrollTo part so that all observer animations are guaranteed
  if (window.location.hash) {
    const dataJmpDst = GetUrlArtifact();
    const targetEl = ElStore.get(JmpTargets.get(dataJmpDst));
    if (targetEl) {
      targetEl.style = `scroll-margin-bottom: ${WINDOW_HEIGHT / 2 - targetEl.offsetHeight * 0.8}px`;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      targetEl.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    ElStore.get(EL_ID_LIST.clrCont).classList.add(ElAttributes.activeClassName);
  }

  ElStore.get(EL_ID_LIST.clrUrlBtn).addEventListener("click", clearUrl);
  ElStore.get(EL_ID_LIST.scrlHlpBtn).addEventListener("click", scrollPastIntro);

  generateSvgPath(
    ElStore.get(EL_ID_LIST.joinSvgStart),
    ElStore.get(EL_ID_LIST.joinSvgStop),
    ElStore.get(EL_ID_LIST.joinSvgDot),
    ElStore.get(EL_ID_LIST.joinSvgPath),
    ElStore.get(EL_ID_LIST.joinSvg),
  );
});
