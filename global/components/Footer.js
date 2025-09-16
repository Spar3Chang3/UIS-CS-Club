function initFooter(styleSrc) {
    // if (styleSrc) { //TODO: find out what this was supposed to do, because all it does rn is throw an error.
    //     const styleLink = document.createElement("link");
    //     styleLink.rel = "stylesheet";
    //     styleLink.type = "text/css";
    //     styleLink.href = styleSrc;
    //     document.head.appendChild(styleLink);
    // }

    const footer = document.getElementById("footer");

    const copyright = `<strong>Copyright ${new Date().getFullYear()} UIS Computer Science Club. All Rights Thought About</strong>`;
    const p = document.createElement("p");
    p.innerHTML = copyright;

    footer.appendChild(p);
}

document.addEventListener("DOMContentLoaded", initFooter);