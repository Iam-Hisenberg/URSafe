/* URSafe - Alerts Section */

function renderAlertsSection() {
    const section = document.getElementById('section-alerts');
    section.innerHTML = '';

    // Pull-to-refresh hint
    const refreshHint = document.createElement('div');
    refreshHint.style.cssText = 'padding: 1rem; text-align: center; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 0.5rem;';
    refreshHint.innerHTML = `<span id="icon-refresh" style="width: 16px; height: 16px;"></span> Pull to refresh`;
    section.appendChild(refreshHint);

    // Alert count header
    const alertCount = MockAlerts.filter(a => a.isNew).length;
    const header = document.createElement('div');
    header.style.cssText = 'padding: 1rem 1rem 0.5rem; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;';
    header.textContent = `${alertCount} Active Alerts`;
    section.appendChild(header);

    // Render alerts
    MockAlerts.forEach(alert => {
        const card = createAlertCard(alert);
        section.appendChild(card);
    });

    // Add scroll listener for refresh
    let lastScrollTop = 0;
    section.addEventListener('scroll', (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop < -50 && lastScrollTop >= 0) {
            // Pull-to-refresh triggered
            refreshAlerts();
        }
        lastScrollTop = scrollTop;
    });
}

function createAlertCard(alert) {
    const card = document.createElement('div');
    card.className = `alert-card ${alert.severity}`;
    if (alert.isNew) {
        card.style.position = 'relative';
    }

    let typeIcon = getAlertTypeIcon(alert.type);

    card.innerHTML = `
        ${alert.isNew ? '<div class="alert-new">NEW</div>' : ''}
        <div class="alert-header">
            <div class="alert-icon">${typeIcon}</div>
            <div class="alert-info">
                <div class="alert-title">
                    <h3>${alert.title}</h3>
                    <span class="severity-badge severity-${alert.severity}">${alert.severity.toUpperCase()}</span>
                </div>
                <div class="alert-meta">
                    <span class="alert-location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        ${alert.location}
                    </span>
                    <span>${alert.time}</span>
                </div>
            </div>
        </div>
        <div class="alert-description">${alert.description}</div>
        <div class="alert-actions">
            ${alert.actions.map(action => `<button class="btn-small" onclick="handleAlertAction('${action}')">${action}</button>`).join('')}
        </div>
    `;

    return card;
}

function getAlertTypeIcon(type) {
    const icons = {
        'earthquake': '🌍',
        'flood': '🌊',
        'cyclone': '🌪️',
        'tsunami': '🌊',
        'landslide': '⛏️',
        'heatwave': '🔥',
        'coldwave': '❄️',
        'industrial': '🏭',
        'power': '⚡',
        'internet': '📡'
    };
    return icons[type] || '⚠️';
}

function handleAlertAction(action) {
    if (app) {
        app.showToast(`${action} triggered`, 'info');
    }
}

function refreshAlerts() {
    if (app) {
        app.showToast('Alerts refreshed', 'success');
        renderAlertsSection();
    }
}
