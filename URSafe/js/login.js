/* URSafe - Login Page Handler */

function initLoginPage() {
    const form = document.getElementById('login-form');
    const stateSelect = document.getElementById('user-state');
    const districtSelect = document.getElementById('user-district');
    const aadhaarInput = document.getElementById('user-aadhaar');

    // Populate states
    const states = Object.keys(IndianStates).sort();
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // State change handler
    stateSelect.addEventListener('change', () => {
        const selectedState = stateSelect.value;
        districtSelect.innerHTML = '<option value="" disabled selected>Select district</option>';
        districtSelect.disabled = !selectedState;

        if (selectedState && IndianStates[selectedState]) {
            IndianStates[selectedState].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });

    // Aadhaar masking and validation
    aadhaarInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 12) value = value.slice(0, 12);

        // Format as XXXX XXXX XXXX
        if (value.length > 0) {
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) formatted += ' ';
                formatted += value[i];
            }
            e.target.value = formatted;
        }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validation
        const name = document.getElementById('user-name').value.trim();
        const role = document.getElementById('user-role').value;
        const state = document.getElementById('user-state').value;
        const district = document.getElementById('user-district').value;
        const aadhaar = document.getElementById('user-aadhaar').value.replace(/\s/g, '');

        if (!name || name.length < 2) {
            showError('name-error', 'Please enter a valid name');
            return;
        }

        if (!role) {
            showError('role-error', 'Please select a role');
            return;
        }

        if (!state) {
            showError('state-error', 'Please select a state');
            return;
        }

        if (!district) {
            showError('district-error', 'Please select a district');
            return;
        }

        if (aadhaar && aadhaar.length !== 12) {
            showError('aadhaar-error', 'Aadhaar must be 12 digits');
            return;
        }

        // Clear errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

        // Show loading
        const btn = document.querySelector('.btn-login');
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        btn.disabled = true;

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Create user object
        const user = {
            id: 'user_' + Date.now(),
            name: name,
            role: role,
            state: state,
            district: district,
            aadhaar: aadhaar ? aadhaar : null,
            registeredAt: new Date().toISOString(),
            lat: 28.6139,
            lng: 77.2090
        };

        // Save to storage and update app
        app.currentUser = user;
        app.saveUserToStorage();

        // Animate transition
        const loginPage = document.getElementById('login-page');
        loginPage.style.opacity = '0';
        loginPage.style.transition = 'opacity 0.4s ease';

        setTimeout(() => {
            app.showMainApp();
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            btn.disabled = false;
        }, 400);
    });
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
    }
}
