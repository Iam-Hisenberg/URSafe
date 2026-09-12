/* URSafe - Volunteers Section */

let currentVolunteerFilter = 'all';

function renderVolunteersSection() {
    const section = document.getElementById('section-volunteers');
    section.innerHTML = '';

    // Title
    const title = document.createElement('div');
    title.className = 'section-header';
    title.textContent = '🤝 Volunteers & Relief';
    section.appendChild(title);

    // Filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-buttons';
    const filters = [
        { id: 'all', label: 'All', icon: '👥' },
        { id: 'medical', label: 'Medical', icon: '🏥' },
        { id: 'rescue', label: 'Rescue', icon: '🚒' },
        { id: 'supplies', label: 'Supplies', icon: '📦' },
        { id: 'shelter', label: 'Shelter', icon: '🏠' },
        { id: 'transport', label: 'Transport', icon: '🚗' },
        { id: 'communication', label: 'Comms', icon: '📡' }
    ];

    filters.forEach(filter => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${filter.id === currentVolunteerFilter ? 'active' : ''}`;
        btn.textContent = `${filter.icon} ${filter.label}`;
        btn.addEventListener('click', () => {
            currentVolunteerFilter = filter.id;
            renderVolunteersSection();
        });
        filterContainer.appendChild(btn);
    });
    section.appendChild(filterContainer);

    // Volunteers heading
    const volHeader = document.createElement('div');
    volHeader.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    volHeader.textContent = '📍 Volunteers Nearby';
    section.appendChild(volHeader);

    // Filter volunteers
    let filteredVolunteers = MockVolunteers;
    if (currentVolunteerFilter !== 'all') {
        filteredVolunteers = MockVolunteers.filter(v => v.type === currentVolunteerFilter);
    }

    // Render volunteers
    filteredVolunteers.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
    }).forEach(volunteer => {
        const card = createVolunteerCard(volunteer);
        section.appendChild(card);
    });

    // Relief Teams heading
    const teamHeader = document.createElement('div');
    teamHeader.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    teamHeader.textContent = '🏛️ Official Relief Teams';
    section.appendChild(teamHeader);

    // Render relief teams
    MockReliefTeams.forEach(team => {
        const card = createReliefTeamCard(team);
        section.appendChild(card);
    });
}

function createVolunteerCard(volunteer) {
    const card = document.createElement('div');
    card.className = 'volunteer-card';

    const typeEmoji = {
        medical: '🏥',
        rescue: '🚒',
        supplies: '📦',
        shelter: '🏠',
        transport: '🚗',
        communication: '📡'
    };

    const availabilityStyle = volunteer.available
        ? 'background: rgba(39, 174, 96, 0.2); color: var(--success);'
        : 'background: rgba(231, 76, 60, 0.2); color: var(--danger);';

    card.innerHTML = `
        <div class="volunteer-header">
            <div>
                <div class="volunteer-name">${volunteer.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
                    ${volunteer.distance} away • Last active: ${volunteer.lastActive}
                </div>
            </div>
            <div style="${availabilityStyle} padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; white-space: nowrap;">
                ${volunteer.available ? '● Available' : '● Busy'}
            </div>
        </div>

        <div style="display: flex; gap: 0.75rem; margin: 0.75rem 0;">
            <span class="type-badge">
                ${typeEmoji[volunteer.type]} ${volunteer.type.charAt(0).toUpperCase() + volunteer.type.slice(1)}
            </span>
            ${volunteer.verified ? `<span class="verified-badge">✓ Verified</span>` : ''}
            <div style="flex: 1;"></div>
            <div style="display: flex; gap: 0.25rem;">
                ${[...Array(5)].map((_, i) => `
                    <svg class="star" viewBox="0 0 24 24" fill="${i < Math.floor(volunteer.rating) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                `).join('')}
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 0.25rem;">${volunteer.rating}</span>
            </div>
        </div>

        <div class="volunteer-skills">
            ${volunteer.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>

        <div class="volunteer-actions">
            <button class="btn-volunteer" onclick="callVolunteer('${volunteer.phone}', '${volunteer.name}')">📞 Call</button>
            <button class="btn-volunteer" onclick="messageVolunteer('${volunteer.name}')">💬 Message</button>
            <button class="btn-volunteer" onclick="requestHelp('${volunteer.name}')">🆘 Request Help</button>
        </div>
    `;

    return card;
}

function createReliefTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'relief-team-card';

    const statusColors = {
        deployed: 'rgba(39, 174, 96, 0.2)',
        standby: 'rgba(243, 156, 18, 0.2)',
        'en-route': 'rgba(52, 152, 219, 0.2)',
        active: 'rgba(0, 78, 137, 0.2)'
    };

    const statusBorder = {
        deployed: 'var(--success)',
        standby: 'var(--warning)',
        'en-route': 'var(--info)',
        active: 'var(--secondary)'
    };

    card.innerHTML = `
        <h4 style="margin: 0 0 0.5rem; color: var(--text-primary);">${team.name}</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0 0 0.75rem;">${team.description}</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; font-size: 0.85rem;">
            <div>
                <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Personnel</span>
                <span style="color: var(--text-primary); font-weight: 600;">${team.personnel} Active</span>
            </div>
            <div>
                <span style="color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Location</span>
                <span style="color: var(--text-primary); font-weight: 600;">${team.location}</span>
            </div>
        </div>

        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1rem;">
            <span class="team-status ${team.status}">● ${team.status.toUpperCase()}</span>
        </div>

        <button class="btn-small" onclick="contactTeam('${team.name}', '${team.contact}')">📞 Contact: ${team.contact}</button>
    `;

    return card;
}

function callVolunteer(phone, name) {
    if (app) app.showToast(`Calling ${name} at ${phone}...`, 'info');
}

function messageVolunteer(name) {
    if (app) app.showToast(`Opening message with ${name}...`, 'info');
}

function requestHelp(name) {
    if (app) app.showToast(`Help request sent to ${name}`, 'success');
}

function contactTeam(teamName, contact) {
    if (app) app.showToast(`Contacting ${teamName} at ${contact}...`, 'info');
}
