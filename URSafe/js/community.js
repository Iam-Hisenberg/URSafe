/* URSafe - Community Section */

let currentCommunityTab = 'nearby';

function renderCommunitySection() {
    const section = document.getElementById('section-community');
    section.innerHTML = '';

    // Title
    const title = document.createElement('div');
    title.className = 'section-header';
    title.textContent = '💬 Community';
    section.appendChild(title);

    // Tab buttons
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tabs';
    const tabs = [
        { id: 'nearby', label: '📍 Nearby' },
        { id: 'volunteers', label: '👥 Volunteer Chat' },
        { id: 'updates', label: '📢 Official' },
        { id: 'offline', label: '📡 Offline' }
    ];

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.className = `tab-button ${tab.id === currentCommunityTab ? 'active' : ''}`;
        btn.textContent = tab.label;
        btn.addEventListener('click', () => {
            currentCommunityTab = tab.id;
            renderCommunitySection();
        });
        tabContainer.appendChild(btn);
    });
    section.appendChild(tabContainer);

    // Message Composer
    const composer = createMessageComposer();
    if (currentCommunityTab !== 'offline') {
        section.appendChild(composer);
    }

    // Tab content
    if (currentCommunityTab === 'nearby') {
        renderNearbyMessages(section);
    } else if (currentCommunityTab === 'volunteers') {
        renderVolunteerChat(section);
    } else if (currentCommunityTab === 'updates') {
        renderOfficialUpdates(section);
    } else if (currentCommunityTab === 'offline') {
        renderOfflineMode(section);
    }
}

function createMessageComposer() {
    const composer = document.createElement('div');
    composer.className = 'message-composer';

    composer.innerHTML = `
        <div class="composer-controls">
            <select class="urgency-selector" style="padding: 0.4rem; background: rgba(45, 53, 97, 0.5); border: 1px solid var(--border); border-radius: 4px; color: var(--text-primary); font-size: 0.8rem;">
                <option value="normal">Normal</option>
                <option value="urgent">🟠 Urgent</option>
                <option value="critical">🔴 Critical</option>
            </select>
        </div>
        <textarea class="composer-input" placeholder="Share info with nearby community members..." rows="3"></textarea>
        <div class="composer-actions">
            <button class="attach-btn">📍 Location</button>
            <button class="attach-btn">🖼️ Image</button>
            <button class="btn-primary" style="flex: 1.5; margin: 0;" onclick="sendCommunityMessage()">Send</button>
        </div>
    `;

    return composer;
}

function sendCommunityMessage() {
    if (app) {
        app.showToast('Message sent to community', 'success');
    }
}

function renderNearbyMessages(section) {
    const header = document.createElement('div');
    header.style.cssText = 'padding: 1rem 1rem 0.5rem; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;';
    header.textContent = `${MockCommunityMessages.length} Messages Nearby`;
    section.appendChild(header);

    MockCommunityMessages.forEach(msg => {
        const card = createMessageCard(msg);
        section.appendChild(card);
    });
}

function renderVolunteerChat(section) {
    const header = document.createElement('div');
    header.style.cssText = 'padding: 1rem 1rem 0.5rem; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;';
    header.textContent = 'Active Volunteer Chats';
    section.appendChild(header);

    const volunteers = MockVolunteers.slice(0, 3);
    volunteers.forEach(vol => {
        const card = document.createElement('div');
        card.className = 'message-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="message-header">
                <div>
                    <span class="message-user">${vol.name}</span>
                    <span class="message-role-badge">VOLUNTEER</span>
                </div>
                <span class="message-time">${vol.lastActive}</span>
            </div>
            <div class="message-content">Quick response to your earlier request. Available for assistance.</div>
            <div style="margin-top: 0.75rem;">
                <button class="btn-small" onclick="sendMessage('${vol.name}')">💬 Message</button>
            </div>
        `;
        section.appendChild(card);
    });
}

function renderOfficialUpdates(section) {
    const header = document.createElement('div');
    header.style.cssText = 'padding: 1rem 1rem 0.5rem; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;';
    header.textContent = 'Official Government Updates';
    section.appendChild(header);

    const officialMessages = MockCommunityMessages.filter(m => m.role === 'government');
    officialMessages.forEach(msg => {
        const card = createMessageCard(msg);
        section.appendChild(card);
    });
}

function renderOfflineMode(section) {
    const offlineIndicator = document.createElement('div');
    offlineIndicator.className = 'offline-indicator';
    offlineIndicator.innerHTML = `📡 Mesh Network Mode - Communicating without internet`;
    section.appendChild(offlineIndicator);

    const meshStatus = document.createElement('div');
    meshStatus.className = 'mesh-connection-status';
    meshStatus.innerHTML = `Connected to <strong>7 nearby peers</strong> via Bluetooth mesh`;
    section.appendChild(meshStatus);

    const header = document.createElement('div');
    header.style.cssText = 'padding: 1rem 1rem 0.5rem; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;';
    header.textContent = 'Local Network Messages';
    section.appendChild(header);

    MockOfflineMessages.forEach(msg => {
        const card = document.createElement('div');
        card.className = 'message-card';
        card.innerHTML = `
            <div class="message-header">
                <div>
                    <span class="message-user">${msg.user}</span>
                    <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 0.5rem;">${msg.distance}</span>
                </div>
                <span class="message-time">${msg.time}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span style="font-size: 0.7rem;">Signal: </span>
                <div style="display: flex; gap: 2px;">
                    <div style="width: 3px; height: ${msg.signal === 'strong' ? '12' : msg.signal === 'medium' ? '8' : '4'}px; background: var(--success); border-radius: 1px;"></div>
                    <div style="width: 3px; height: ${msg.signal === 'strong' ? '9' : msg.signal === 'medium' ? '6' : '0'}px; background: var(--success); border-radius: 1px;"></div>
                    <div style="width: 3px; height: ${msg.signal === 'strong' ? '6' : '0'}px; background: var(--success); border-radius: 1px;"></div>
                </div>
                <span style="font-size: 0.7rem; color: var(--text-muted);">${msg.signal}</span>
            </div>
            <div class="message-content">${msg.message}</div>
        `;
        section.appendChild(card);
    });
}

function createMessageCard(msg) {
    const card = document.createElement('div');
    card.className = 'message-card';
    if (msg.urgency === 'critical') {
        card.classList.add('urgency-critical');
    } else if (msg.urgency === 'high') {
        card.classList.add('urgency-high');
    }

    const roleBadge = msg.role === 'government' ? 'OFFICIAL' :
                     msg.role === 'volunteer' ? 'VOLUNTEER' : 'CITIZEN';

    card.innerHTML = `
        <div class="message-header">
            <div>
                <span class="message-user">${msg.user}</span>
                <span class="message-role-badge">${roleBadge}</span>
            </div>
            <span class="message-time">${msg.time}</span>
        </div>
        <div class="message-content">${msg.message}</div>
        <div class="message-location-tag">
            📍 ${msg.location}
        </div>
        <div class="message-actions">
            <button class="msg-action-btn" onclick="replyMessage('${msg.user}')">
                💬 Reply (${msg.replies})
            </button>
            <button class="msg-action-btn" onclick="shareMessage()">
                📤 Share
            </button>
            <button class="msg-action-btn" onclick="likeMessage()">
                👍 ${msg.likes}
            </button>
        </div>
    `;

    return card;
}

function sendMessage(name) {
    if (app) app.showToast(`Messaging ${name}...`, 'info');
}

function replyMessage(user) {
    if (app) app.showToast(`Replying to ${user}...`, 'info');
}

function shareMessage() {
    if (app) app.showToast('Message shared', 'success');
}

function likeMessage() {
    if (app) app.showToast('Message liked', 'success');
}
