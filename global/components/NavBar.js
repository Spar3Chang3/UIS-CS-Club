import { NavLinks } from '/global/index.js';

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
}

document.addEventListener("DOMContentLoaded", () => initNavbar(NavLinks, "/favicon.ico", "/global/components/NavBar.css"));