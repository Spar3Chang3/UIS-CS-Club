import { NavLinks, Logos, CheckColorScheme } from '/global/index.js';

function initNavbar(links, logoSrc, styleSrc) {

    if (styleSrc) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.type = 'text/css';
        styleLink.href = styleSrc;
        document.head.appendChild(styleLink);
    }

    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    // Logo
    const logo = document.createElement("img");
    logo.src = logoSrc;
    logo.alt = "Logo";
    navbar.appendChild(logo);

    // Menu Toggle
    const toggle = document.createElement("button");
    toggle.id = "menu-toggle";
    toggle.textContent = "☰";
    navbar.appendChild(toggle);

    // Links container
    const linksContainer = document.createElement("div");
    linksContainer.className = "nav-links";
    links.forEach(({ name, url }) => {
        const link = document.createElement("a");
        link.href = url;
        link.textContent = name;
        linksContainer.appendChild(link);
    });
    navbar.appendChild(linksContainer);

    // Toggle menu visibility
    toggle.addEventListener("click", () => {
        linksContainer.classList.toggle("open");
    });

    const topBtn = document.createElement("button");
    topBtn.className = "top-btn";
    topBtn.innerHTML = `
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <line x1="24" y1="20" x2="24" y2="44" stroke="white" stroke-width="2" />
          <polyline points="18,20 24,8 30,20" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `

    topBtn.style.opacity = "0";
    topBtn.style.visibility = "hidden";

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // optional — makes the scroll animated
        });
    });

    document.body.appendChild(topBtn);

    document.addEventListener("scroll", () => {
        if (window.scrollY > 160) {
            topBtn.style.opacity = "1";
            topBtn.style.visibility = "visible";
        } else {
            topBtn.style.opacity = "0";
            topBtn.style.visibility = "hidden";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => initNavbar(NavLinks, CheckColorScheme(Logos.club), "/global/components/NavBar.css"));