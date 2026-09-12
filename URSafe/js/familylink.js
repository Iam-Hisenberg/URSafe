/* URSafe - Family Link Section */

let sosHoldTimer = null;
let sosStartTime = null;
let sosActive = false;

function renderFamilyLinkSection() {
    const section = document.getElementById('section-family');
    section.innerHTML = '';

    // Title
    const title = document.createElement('div');
    title.className = 'section-header';
    title.textContent = '👨‍👩‍👧‍👦 Family Link';
    section.appendChild(title);

    // SOS Button Container
    const sosContainer = document.createElement('div');
    sosContainer.style.cssText = 'padding: 2rem 1rem; text-align: center;';
    sosContainer.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                In case of emergency
            </p>
        </div>
        <button class="sos-button" id="sos-btn-main" title="Hold for 3 seconds to activate">
            SOS<br><span style="font-size: 0.6rem; display: block; margin-top: 0.25rem;">Hold 3s</span>
        </button>
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">
            Sends your location and message to all family members
        </p>
    `;
    section.appendChild(sosContainer);

    setupSOSButton();

    // Family Members Section
    const familyHeader = document.createElement('div');
    familyHeader.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    familyHeader.innerHTML = `👥 Family Members <span style="color: var(--text-muted); font-size: 0.85rem;">(${MockFamilyMembers.length})</span>`;
    section.appendChild(familyHeader);

    // Family Members List
    const familyContainer = document.createElement('div');
    familyContainer.id = 'family-members-container';
    MockFamilyMembers.forEach(member => {
        const memberCard = createFamilyMemberCard(member);
        familyContainer.appendChild(memberCard);
    });
    section.appendChild(familyContainer);

    // Add Member Button
    const addBtn = document.createElement('button');
    addBtn.className = 'btn-primary';
    addBtn.style.cssText = 'margin: 1rem; width: calc(100% - 2rem);';
    addBtn.innerHTML = '➕ Add Family Member';
    addBtn.addEventListener('click', showAddFamilyMemberForm);
    section.appendChild(addBtn);

    // Check-in Button
    const checkinBtn = document.createElement('button');
    checkinBtn.style.cssText = `
        margin: 0.5rem 1rem 1rem;
        width: calc(100% - 2rem);
        padding: 0.8rem;
        background: rgba(39, 174, 96, 0.2);
        border: 2px solid var(--success);
        border-radius: 8px;
        color: var(--success);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
    `;
    checkinBtn.innerHTML = '✓ Check In as Safe';
    checkinBtn.addEventListener('click', () => {
        if (app) {
            app.showToast('You checked in as safe. Family notified.', 'success');
        }
    });
    checkinBtn.addEventListener('mouseover', (e) => {
        e.target.style.background = 'rgba(39, 174, 96, 0.3)';
    });
    checkinBtn.addEventListener('mouseout', (e) => {
        e.target.style.background = 'rgba(39, 174, 96, 0.2)';
    });
    section.appendChild(checkinBtn);

    // Pet Tracking Section
    const petHeader = document.createElement('div');
    petHeader.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    petHeader.textContent = '🐾 Pet Tracking';
    section.appendChild(petHeader);

    const petCard = document.createElement('div');
    petCard.style.cssText = `
        background: rgba(45, 53, 97, 0.6);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1rem;
        text-align: center;
        position: relative;
    `;
    petCard.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🐕</div>
        <h3 style="margin-bottom: 0.5rem;">Connect Pet Hardware</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Track your pet's location in real-time
        </p>
        <span style="
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: rgba(255, 107, 53, 0.2);
            border: 1px solid var(--primary);
            border-radius: 4px;
            font-size: 0.75rem;
            color: var(--primary);
            font-weight: 600;
            text-transform: uppercase;
        ">Coming Soon</span>
    `;
    section.appendChild(petCard);

    // Family Chat Preview
    const chatHeader = document.createElement('div');
    chatHeader.style.cssText = 'padding: 1.5rem 1rem 0.5rem; font-size: 1rem; font-weight: 600; color: var(--text-primary);';
    chatHeader.textContent = '💬 Family Group Chat';
    section.appendChild(chatHeader);

    const chatPreview = document.createElement('div');
    chatPreview.style.cssText = `
        background: rgba(45, 53, 97, 0.6);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1rem;
        margin: 1rem;
        max-height: 150px;
        overflow-y: auto;
    `;
    chatPreview.innerHTML = `
        <div style="font-size: 0.9rem; margin-bottom: 0.75rem;">
            <div style="font-weight: 600; color: var(--primary); margin-bottom: 0.2rem;">Priya</div>
            <div style="color: var(--text-secondary); font-size: 0.85rem;">Everyone safe at home. Weather is getting worse.</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.3rem;">10:45 AM</div>
        </div>
        <div style="font-size: 0.9rem;">
            <div style="font-weight: 600; color: var(--secondary-light); margin-bottom: 0.2rem;">Rajesh</div>
            <div style="color: var(--text-secondary); font-size: 0.85rem;">Area flooded near office. Staying put.</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.3rem;">10:42 AM</div>
        </div>
    `;
    section.appendChild(chatPreview);
}

function createFamilyMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'family-member-card';

    const statusClass = `status-${member.status}`;
    const statusText = member.status.charAt(0).toUpperCase() + member.status.slice(1);

    card.innerHTML = `
        <div class="family-avatar">${member.name.charAt(0).toUpperCase()}</div>
        <div class="family-info">
            <div class="family-name">${member.name}</div>
            <div class="family-relation">${member.relation}</div>
            <div class="family-status">
                <span class="status-indicator ${statusClass}"></span>
                <span>${statusText} • ${member.lastSeen}</span>
            </div>
        </div>
        <div class="family-actions">
            <button class="btn-action" title="Call ${member.name}" onclick="alert('Calling ${member.name}...')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
            </button>
            <button class="btn-action" title="Message ${member.name}" onclick="alert('Messaging ${member.name}...')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                </svg>
            </button>
        </div>
    `;

    return card;
}

function setupSOSButton() {
    const sosBtn = document.getElementById('sos-btn-main');
    if (!sosBtn) return;

    sosBtn.addEventListener('mousedown', startSOSHold);
    sosBtn.addEventListener('mouseup', endSOSHold);
    sosBtn.addEventListener('mouseleave', endSOSHold);
    sosBtn.addEventListener('touchstart', startSOSHold, { passive: true });
    sosBtn.addEventListener('touchend', endSOSHold);
}

function startSOSHold(e) {
    e.preventDefault();
    sosStartTime = Date.now();
    sosActive = true;

    const sosBtn = document.getElementById('sos-btn-main');
    sosBtn.style.animation = 'none';
    void sosBtn.offsetWidth; // Trigger reflow
    sosBtn.style.animation = 'sosGrow 3s ease-out forwards';

    sosHoldTimer = setTimeout(() => {
        if (sosActive) {
            triggerSOS();
        }
    }, 3000);
}

function endSOSHold(e) {
    e.preventDefault();
    sosActive = false;
    if (sosHoldTimer) {
        clearTimeout(sosHoldTimer);
        sosHoldTimer = null;
    }

    const sosBtn = document.getElementById('sos-btn-main');
    if (sosBtn) {
        sosBtn.style.animation = 'none';
    }
}

function triggerSOS() {
    sosActive = false;
    showSOSOverlay();
}

function showSOSOverlay() {
    const overlay = document.getElementById('sos-overlay');
    const messageBox = document.getElementById('sos-message-box');

    overlay.classList.remove('hidden');
    messageBox.classList.add('hidden');

    const sosCircle = document.getElementById('sos-circle');
    sosCircle.classList.add('holding');

    setTimeout(() => {
        messageBox.classList.remove('hidden');
        sosCircle.classList.remove('holding');
    }, 3100);
}

function showAddFamilyMemberForm() {
    const form = document.createElement('div');
    form.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-darker);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
        width: 90%;
        max-width: 400px;
        z-index: 5000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    `;

    form.innerHTML = `
        <h3 style="margin: 0 0 1.5rem; color: var(--text-primary);">Add Family Member</h3>
        <div class="form-group">
            <label style="color: var(--text-primary); margin-bottom: 0.5rem; display: block;">Name</label>
            <input type="text" id="member-name" placeholder="Full name" style="width: 100%; padding: 0.75rem; background: rgba(45, 53, 97, 0.5); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
        </div>
        <div class="form-group">
            <label style="color: var(--text-primary); margin-bottom: 0.5rem; display: block;">Relation</label>
            <select id="member-relation" style="width: 100%; padding: 0.75rem; background: rgba(45, 53, 97, 0.5); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                <option value="Parent">Parent</option>
                <option value="Spouse">Spouse</option>
                <option value="Sibling">Sibling</option>
                <option value="Child">Child</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div class="form-group">
            <label style="color: var(--text-primary); margin-bottom: 0.5rem; display: block;">Phone Number</label>
            <input type="tel" id="member-phone" placeholder="10-digit number" style="width: 100%; padding: 0.75rem; background: rgba(45, 53, 97, 0.5); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
            <button id="btn-add-member" style="flex: 1; padding: 0.8rem; background: linear-gradient(135deg, var(--primary), #FF8C42); border: none; border-radius: 6px; color: white; font-weight: 600; cursor: pointer;">Add</button>
            <button id="btn-cancel-add" style="flex: 1; padding: 0.8rem; background: rgba(255, 255, 255, 0.1); border: 1px solid var(--border); border-radius: 6px; color: var(--text-secondary); font-weight: 600; cursor: pointer;">Cancel</button>
        </div>
    `;

    document.body.appendChild(form);

    document.getElementById('btn-add-member').addEventListener('click', () => {
        const name = document.getElementById('member-name').value;
        const relation = document.getElementById('member-relation').value;
        const phone = document.getElementById('member-phone').value;

        if (name && phone) {
            MockFamilyMembers.push({
                id: MockFamilyMembers.length + 1,
                name: name,
                relation: relation,
                phone: phone,
                status: 'unknown',
                lastSeen: 'Just added',
                lat: 28.6139,
                lng: 77.2090
            });
            renderFamilyLinkSection();
            form.remove();
            if (app) app.showToast('Family member added', 'success');
        }
    });

    document.getElementById('btn-cancel-add').addEventListener('click', () => {
        form.remove();
    });
}
