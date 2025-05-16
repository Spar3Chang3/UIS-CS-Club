const memberData = "/global/data/TeamMembers.json";

function addTeamMember({ name, description, portraitSrc, wrapperId }) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) {
        console.warn(`Wrapper element with id '${wrapperId}' not found.`);
        return;
    }

    // Create container
    const card = document.createElement('div');
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
        console.log(json);
        for (const member of json) {
            addTeamMember({
                ...member,
                wrapperId: 'member-container'
            });
        }
    });
});
