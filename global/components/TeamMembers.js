const memberData = "/global/data/TeamMembers.json";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function addTeamMember({ name, description, portraitSrc, wrapperId, index }) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) {
        console.warn(`Wrapper element with id '${wrapperId}' not found.`);
        return;
    }

    // Create container
    const card = document.createElement('div');
    if (!reducedMotion.matches) {
        card.style.visibility = 'hidden';
        card.style.animation = "fade-fly-in 0.5s ease forwards";
        card.style.animationDelay = `${100 * index}ms`;
    } else {
        card.style.visibility = 'visible';
        card.style.animation = 'none';
        card.style.animationDelay = 'none';
    }
    card.className = 'team-member-card';

    // Portrait
    const img = document.createElement('img');
    img.src = portraitSrc;
    img.alt = `${name}'s portrait`;
    img.className = 'team-member-portrait';

    // Name
    const nameEl = document.createElement('h3');
    nameEl.textContent = name;
    nameEl.className = 'team-member-name';

    // Description
    const descEl = document.createElement('p');
    descEl.textContent = description;
    descEl.className = 'team-member-description';

    // Append all
    card.appendChild(img);
    card.appendChild(nameEl);
    card.appendChild(descEl);
    wrapper.appendChild(card);
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(memberData).then((res) => {
        return res.json();
    }).then((json) => {
        let index = 0;
        for (const member of json) {
            addTeamMember({
                ...member,
                wrapperId: 'member-container',
                index
            });
            index++;
        }
    });
});
