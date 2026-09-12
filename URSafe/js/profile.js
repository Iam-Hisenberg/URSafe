/* URSafe - Profile Section */

function renderProfileSection() {
    const section = document.getElementById('section-profile');
    section.innerHTML = '';

    const user = app.currentUser;

    // Profile Header
    const header = document.createElement('div');
    header.style.cssText = `
        background: linear-gradient(135deg, var(--bg-darker), var(--bg-darkest));
        padding: 2rem 1rem;
        text-align: center;
        border-bottom: 1px solid var(--border);
    `;

    header.innerHTML = `
        <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #FF8C42); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: white; margin: 0 auto 1rem;">
            ${user.name.charAt(0).toUpperCase()}
        </div>
        <h2 style="margin: 0 0 0.25rem; color: var(--text-primary);">${user.name}</h2>
        <p style="margin: 0 0 0.5rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; font-weight: 600;">
            ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
            📍 ${user.district}, ${user.state}
        </p>
        <p style="margin: 0.75rem 0 0; color: var(--text-muted); font-size: 0.8rem;">
            ID: ${user.id}
        </p>
    `;
    section.appendChild(header);

    // Profile Info Grid
    const infoGrid = document.createElement('div');
    infoGrid.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        padding: 1.5rem 1rem;
        border-bottom: 1px solid var(--border);
    `;

    infoGrid.innerHTML = `
        <div style="background: rgba(45, 53, 97, 0.6); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">👥</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">Family Members</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${MockFamilyMembers.length}</div>
        </div>
        <div style="background: rgba(45, 53, 97, 0.6); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🤝</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">Volunteers Near</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${MockVolunteers.length}</div>
        </div>
        <div style="background: rgba(45, 53, 97, 0.6); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📢</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">Active Alerts</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--danger);">${MockAlerts.filter(a => a.isNew).length}</div>
        </div>
        <div style="background: rgba(45, 53, 97, 0.6); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛡️</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">Safety Score</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--success);">A+</div>
        </div>
    `;
    section.appendChild(infoGrid);

    // Account Settings
    const settingsTitle = document.createElement('div');
    settingsTitle.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    settingsTitle.textContent = '⚙️ Account Settings';
    section.appendChild(settingsTitle);

    const settingsOptions = [
        { icon: '✏️', label: 'Edit Profile', action: 'editProfile' },
        { icon: '🔔', label: 'Notification Settings', action: 'notifications' },
        { icon: '🔐', label: 'Privacy & Security', action: 'security' },
        { icon: '📡', label: 'Location Services', action: 'location' },
        { icon: '🎨', label: 'App Theme', action: 'theme' },
        { icon: '🌐', label: 'Language', action: 'language' },
    ];

    settingsOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.style.cssText = `
            width: calc(100% - 2rem);
            padding: 0.9rem 1rem;
            margin: 0.5rem 1rem;
            background: rgba(45, 53, 97, 0.6);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-secondary);
            font-size: 0.9rem;
            text-align: left;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: var(--transition);
        `;
        btn.innerHTML = `
            <span>${option.icon} ${option.label}</span>
            <span style="color: var(--text-muted); font-size: 1.2rem;">›</span>
        `;
        btn.addEventListener('mouseover', (e) => {
            e.target.style.background = 'rgba(255, 107, 53, 0.1)';
            e.target.style.borderColor = 'var(--primary)';
        });
        btn.addEventListener('mouseout', (e) => {
            e.target.style.background = 'rgba(45, 53, 97, 0.6)';
            e.target.style.borderColor = 'var(--border)';
        });
        btn.addEventListener('click', () => {
            if (app) app.showToast(`${option.label} coming soon`, 'info');
        });
        section.appendChild(btn);
    });

    // Emergency Numbers
    const emergencyTitle = document.createElement('div');
    emergencyTitle.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    emergencyTitle.textContent = '🚨 Emergency Numbers';
    section.appendChild(emergencyTitle);

    EmergencyNumbers.forEach(emergency => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: rgba(45, 53, 97, 0.6);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 0.9rem 1rem;
            margin: 0.5rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        card.innerHTML = `
            <div style="font-weight: 500; color: var(--text-primary);">${emergency.name}</div>
            <button onclick="alert('Calling ${emergency.number}...')" style="background: var(--primary); color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 0.85rem;">
                📞 ${emergency.number}
            </button>
        `;
        section.appendChild(card);
    });

    // About Section
    const aboutTitle = document.createElement('div');
    aboutTitle.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    aboutTitle.textContent = 'ℹ️ About URSafe';
    section.appendChild(aboutTitle);

    const aboutCard = document.createElement('div');
    aboutCard.style.cssText = `
        background: rgba(0, 78, 137, 0.1);
        border: 1px solid rgba(0, 78, 137, 0.3);
        border-radius: 8px;
        padding: 1.5rem 1rem;
        margin: 1rem;
        text-align: center;
    `;
    aboutCard.innerHTML = `
        <h4 style="margin: 0 0 0.5rem; color: var(--secondary-light);">URSafe v1.0.0</h4>
        <p style="margin: 0 0 1rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
            National Disaster Safety Platform by Government of India. Connecting communities, saving lives, building resilience.
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
            <button style="padding: 0.4rem 0.8rem; background: rgba(0, 78, 137, 0.3); border: 1px solid var(--secondary); border-radius: 4px; color: var(--secondary-light); font-size: 0.75rem; cursor: pointer;">Privacy Policy</button>
            <button style="padding: 0.4rem 0.8rem; background: rgba(0, 78, 137, 0.3); border: 1px solid var(--secondary); border-radius: 4px; color: var(--secondary-light); font-size: 0.75rem; cursor: pointer;">Terms of Service</button>
            <button style="padding: 0.4rem 0.8rem; background: rgba(0, 78, 137, 0.3); border: 1px solid var(--secondary); border-radius: 4px; color: var(--secondary-light); font-size: 0.75rem; cursor: pointer;">Contact Us</button>
        </div>
    `;
    section.appendChild(aboutCard);

    // Logout Button
    const logoutBtn = document.createElement('button');
    logoutBtn.style.cssText = `
        width: calc(100% - 2rem);
        padding: 0.9rem 1rem;
        margin: 1.5rem 1rem 2rem;
        background: rgba(199, 21, 21, 0.1);
        border: 2px solid var(--danger);
        border-radius: 8px;
        color: var(--danger);
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
    `;
    logoutBtn.textContent = '🚪 Logout';
    logoutBtn.addEventListener('mouseover', (e) => {
        e.target.style.background = 'rgba(199, 21, 21, 0.2)';
    });
    logoutBtn.addEventListener('mouseout', (e) => {
        e.target.style.background = 'rgba(199, 21, 21, 0.1)';
    });
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            app.logout();
        }
    });
    section.appendChild(logoutBtn);
}
