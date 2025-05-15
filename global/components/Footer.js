function initFooter(styleSrc) {
    if (styleSrc) {
        const styleLink = document.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.type = "text/css";
        styleLink.href = styleSrc;
        document.head.appendChild(styleLink);
    }

    const footer = document.getElementById("footer");

    const copyright = `<strong>Copyright ${new Date().getFullYear()} UIS Computer Science Club. All Rights Thought About</strong>`;
    const p = document.createElement("p");
    p.innerHTML = copyright;

    footer.appendChild(p);
}

document.addEventListener("DOMContentLoaded", initFooter);