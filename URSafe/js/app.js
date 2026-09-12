/* URSafe - Main Application Controller */

class URSafeApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'alerts';
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.setupEventListeners();
        this.showSplash();
    }

    showSplash() {
        const splash = document.getElementById('splash-screen');
        setTimeout(() => {
            splash.classList.add('hidden');
            this.checkUserLogin();
        }, 2400);
    }

    checkUserLogin() {
        if (this.currentUser) {
            this.showMainApp();
        } else {
            this.showLoginPage();
        }
    }

    showLoginPage() {
        const loginPage = document.getElementById('login-page');
        const mainApp = document.getElementById('main-app');
        loginPage.classList.remove('hidden');
        mainApp.classList.add('hidden');
        initLoginPage();
    }

    showMainApp() {
        const loginPage = document.getElementById('login-page');
        const mainApp = document.getElementById('main-app');
        loginPage.classList.add('hidden');
        mainApp.classList.remove('hidden');
        this.initializeApp();
    }

    initializeApp() {
        this.updateHeader();
        this.setupSectionNavigation();
        this.loadSection('alerts');
        this.setupProfilePanel();
        this.startLocationUpdates();
    }

    setupEventListeners() {
        // Bottom navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = btn.dataset.section;
                this.switchSection(section);
            });
        });

        // Header buttons
        document.getElementById('btn-notifications')?.addEventListener('click', () => {
            this.showNotifications();
        });

        document.getElementById('btn-profile')?.addEventListener('click', () => {
            this.toggleProfilePanel();
        });
    }

    switchSection(section) {
        // Remove active from current nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active to clicked nav item
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Switch section
        this.loadSection(section);
    }

    loadSection(section) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(s => s.classList.remove('active'));

        const targetSection = document.getElementById(`section-${section}`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
            this.renderSection(section);
        }
    }

    renderSection(section) {
        switch(section) {
            case 'alerts':
                renderAlertsSection();
                break;
            case 'family':
                renderFamilyLinkSection();
                break;
            case 'volunteers':
                renderVolunteersSection();
                break;
            case 'community':
                renderCommunitySection();
                break;
            case 'profile':
                renderProfileSection();
                break;
        }
    }

    updateHeader() {
        if (this.currentUser) {
            const location = `${this.currentUser.district}, ${this.currentUser.state}`;
            document.getElementById('header-location').textContent = location;
        }
    }

    setupSectionNavigation() {
        // Set up alerts badge
        const alertsBadge = document.getElementById('nav-badge-alerts');
        alertsBadge.textContent = MockAlerts.filter(a => a.isNew).length;
    }

    setupProfilePanel() {
        const profilePanel = document.getElementById('profile-panel');
        document.getElementById('btn-close-profile')?.addEventListener('click', () => {
            this.toggleProfilePanel();
        });

        document.getElementById('btn-logout')?.addEventListener('click', () => {
            this.logout();
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!profilePanel.contains(e.target) && e.target.id !== 'btn-profile') {
                profilePanel.classList.add('hidden');
            }
        });
    }

    toggleProfilePanel() {
        const panel = document.getElementById('profile-panel');
        panel.classList.toggle('hidden');

        if (!panel.classList.contains('hidden')) {
            this.populateProfilePanel();
        }
    }

    populateProfilePanel() {
        const user = this.currentUser;
        document.getElementById('profile-avatar').textContent = user.name.charAt(0).toUpperCase();
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-role-display').textContent =
            user.role.charAt(0).toUpperCase() + user.role.slice(1);
        document.getElementById('profile-location-display').textContent =
            `${user.district}, ${user.state}`;
    }

    logout() {
        localStorage.removeItem('ursafe_user');
        this.currentUser = null;
        location.reload();
    }

    showNotifications() {
        this.showToast('You have 3 new alerts', 'info');
    }

    startLocationUpdates() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.currentUser.lat = pos.coords.latitude;
                this.currentUser.lng = pos.coords.longitude;
            });
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    loadUserFromStorage() {
        const stored = localStorage.getItem('ursafe_user');
        if (stored) {
            this.currentUser = JSON.parse(stored);
        }
    }

    saveUserToStorage() {
        localStorage.setItem('ursafe_user', JSON.stringify(this.currentUser));
    }
}

// Global app instance
let app = null;

document.addEventListener('DOMContentLoaded', () => {
    app = new URSafeApp();
});

// Helper function to render empty state
function renderEmpty(container, message, icon = '📭') {
    container.innerHTML = `
        <div class="section-empty">
            <div class="empty-icon">${icon}</div>
            <p>${message}</p>
        </div>
    `;
}

// Helper to format time
function formatTime(date) {
    if (typeof date === 'string') {
        return date;
    }
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

// Helper to calculate distance
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    if (distance < 1) return `${Math.round(distance * 1000)}m`;
    return `${distance.toFixed(1)} km`;
}
