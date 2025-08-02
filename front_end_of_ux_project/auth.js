// ================== AUTOCARE360 AUTHENTICATION SYSTEM ==================

// === GLOBAL VARIABLES ===
let currentForm = 'login';
let isLoading = false;
let passwordStrength = 0;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AutoCare360 Auth System Loading...');
    
    // Debug: Check if inputs are accessible
    const testInputs = document.querySelectorAll('input');
    console.log('📝 Found inputs:', testInputs.length);
    
    testInputs.forEach((input, index) => {
        console.log(`Input ${index + 1}:`, input.id, input.type);
        
        // Add debug click handler
        input.addEventListener('click', function() {
            console.log('🎯 Input clicked:', this.id);
            this.focus();
        });
        
        // Add debug focus handler
        input.addEventListener('focus', function() {
            console.log('🔍 Input focused:', this.id);
            this.style.borderColor = '#00ff00';
        });
        
        // Add debug input handler
        input.addEventListener('input', function() {
            console.log('⌨️ Input changed:', this.id, 'Value:', this.value);
        });
        
        // Add label click handler
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) {
            label.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🏷️ Label clicked for:', input.id);
                input.focus();
                input.click();
            });
        }
    });
    
    // Initialize manual input focusing
    initializeManualInputFocus();
    
    initializeParticles();
    initializeFormValidation();
    initializePasswordStrength();
    initializeAIAssistant();
    preloadAssets();
    
    console.log('✅ AutoCare360 Auth System Ready!');
});

// === MANUAL INPUT FOCUS HANDLER ===
function initializeManualInputFocus() {
    console.log('🔧 Initializing manual input focus handlers...');
    
    // Force input accessibility
    const allInputs = document.querySelectorAll('input, select');
    
    allInputs.forEach(input => {
        // Remove any potential blocking styles
        input.style.pointerEvents = 'auto';
        input.style.zIndex = '100';
        input.style.position = 'relative';
        
        // Add manual click zone
        const wrapper = input.closest('.input-wrapper');
        if (wrapper) {
            wrapper.style.pointerEvents = 'auto';
            wrapper.style.cursor = 'text';
            
            // Make entire wrapper clickable to focus input
            wrapper.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 Wrapper clicked, focusing input:', input.id);
                input.focus();
                input.click();
                
                // Force cursor to end of input
                if (input.type === 'text' || input.type === 'email') {
                    setTimeout(() => {
                        input.setSelectionRange(input.value.length, input.value.length);
                    }, 10);
                }
            });
            
            // Visual feedback on wrapper hover
            wrapper.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(0, 212, 255, 0.1)';
            });
            
            wrapper.addEventListener('mouseleave', function() {
                this.style.background = '';
            });
        }
        
        // Enhanced focus handling
        input.addEventListener('focus', function() {
            console.log('✅ Input successfully focused:', this.id);
            this.style.outline = '2px solid #00d4ff';
            
            // Move cursor to end
            setTimeout(() => {
                if (this.type === 'text' || this.type === 'email') {
                    this.setSelectionRange(this.value.length, this.value.length);
                }
            }, 10);
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = '';
        });
        
        // Test input immediately
        input.addEventListener('input', function() {
            console.log('📝 Input working:', this.id, 'Value:', this.value);
        });
    });
    
    console.log('✅ Manual input focus handlers initialized for', allInputs.length, 'inputs');
}

// === PARTICLE BACKGROUND ===
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 2, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d4ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 200, size: 20, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 2 },
                    remove: { particles_nb: 1 }
                }
            },
            retina_detect: true
        });
    }
}

// === FORM SWITCHING ===
function switchForm(formType) {
    if (isLoading) return;
    
    const forms = document.querySelectorAll('.auth-form');
    const targetForm = document.getElementById(formType + 'Form');
    
    // Animate out current form
    forms.forEach(form => {
        if (form.classList.contains('active')) {
            form.style.transform = 'translateX(-100px)';
            form.style.opacity = '0';
            setTimeout(() => {
                form.classList.remove('active');
                form.style.transform = '';
                form.style.opacity = '';
            }, 300);
        }
    });
    
    // Animate in target form
    setTimeout(() => {
        targetForm.style.transform = 'translateX(100px)';
        targetForm.style.opacity = '0';
        targetForm.classList.add('active');
        
        setTimeout(() => {
            targetForm.style.transform = '';
            targetForm.style.opacity = '';
        }, 50);
    }, 300);
    
    currentForm = formType;
}

// === PASSWORD VISIBILITY TOGGLE ===
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// === PASSWORD STRENGTH CHECKER ===
function initializePasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrengthUI(strength, strengthFill, strengthText);
        });
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length === 0) {
        return { score: 0, feedback: ['Enter password'], color: '#8892b0' };
    }
    
    // Length check
    if (password.length >= 8) {
        strength += 25;
    } else {
        feedback.push('At least 8 characters');
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 25;
    } else {
        feedback.push('Add uppercase letter');
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
        strength += 25;
    } else {
        feedback.push('Add lowercase letter');
    }
    
    // Number check
    if (/\d/.test(password)) {
        strength += 15;
    } else {
        feedback.push('Add number');
    }
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 10;
    } else {
        feedback.push('Add special character');
    }
    
    // Determine color and text
    let color, text;
    if (strength < 30) {
        color = '#ff4444';
        text = 'Weak';
    } else if (strength < 60) {
        color = '#ff6b35';
        text = 'Fair';
    } else if (strength < 80) {
        color = '#4ecdc4';
        text = 'Good';
    } else {
        color = '#00d4ff';
        text = 'Strong';
    }
    
    return { score: strength, feedback, color, text };
}

function updatePasswordStrengthUI(strength, strengthFill, strengthText) {
    strengthFill.style.width = strength.score + '%';
    strengthFill.style.background = strength.color;
    strengthText.textContent = strength.text;
    strengthText.style.color = strength.color;
    
    passwordStrength = strength.score;
}

// === FORM VALIDATION ===
function initializeFormValidation() {
    // Login form validation
    const loginForm = document.getElementById('loginFormContent');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup form validation
    const signupForm = document.getElementById('signupFormContent');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Forgot password form validation
    const forgotForm = document.getElementById('forgotFormContent');
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Real-time validation
    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', function(event) {
            clearFieldError(event);
            
            // Real-time email formatting help
            if (input.type === 'email') {
                const value = input.value;
                if (value && !value.includes('@') && value.length > 3) {
                    // Show helpful placeholder
                    input.setAttribute('placeholder', 'e.g., your.email@example.com');
                }
            }
            
            // Real-time phone formatting
            if (input.type === 'tel') {
                let value = input.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = value;
                    } else if (value.length <= 6) {
                        value = value.slice(0, 3) + '-' + value.slice(3);
                    } else {
                        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                    }
                    input.value = value;
                }
            }
        });
        
        // Add focus enhancement
        input.addEventListener('focus', function() {
            this.closest('.input-wrapper').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.input-wrapper').classList.remove('focused');
        });
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldId = field.id;
    
    clearFieldError(event);
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    switch (fieldType) {
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address (e.g., user@example.com)');
                return false;
            }
            break;
        case 'password':
            if (fieldId === 'signupPassword') {
                if (value.length < 8) {
                    showFieldError(field, 'Password must be at least 8 characters long');
                    return false;
                }
                if (passwordStrength < 60) {
                    showFieldError(field, 'Password is too weak. Use uppercase, lowercase, numbers, and symbols');
                    return false;
                }
            } else if (fieldId === 'loginPassword') {
                if (value.length < 6) {
                    showFieldError(field, 'Password must be at least 6 characters long');
                    return false;
                }
            }
            break;
        case 'tel':
            if (!isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number (e.g., +1234567890)');
                return false;
            }
            break;
        case 'text':
            if (fieldId === 'firstName' || fieldId === 'lastName') {
                if (value.length < 2) {
                    showFieldError(field, 'Name must be at least 2 characters long');
                    return false;
                }
                if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    showFieldError(field, 'Name can only contain letters, spaces, hyphens, and apostrophes');
                    return false;
                }
            }
            break;
    }
    
    // Special validation for select fields
    if (field.tagName === 'SELECT' && fieldId === 'vehicleType') {
        if (!value) {
            showFieldError(field, 'Please select your vehicle type');
            return false;
        }
    }
    
    // Password confirmation check
    if (fieldId === 'confirmPassword') {
        const password = document.getElementById('signupPassword').value;
        if (value !== password) {
            showFieldError(field, 'Passwords do not match');
            return false;
        }
    }
    
    showFieldSuccess(field);
    return true;
}

function clearFieldError(event) {
    const field = event.target;
    const wrapper = field.closest('.input-wrapper');
    wrapper.classList.remove('error', 'success');
    
    const errorMsg = wrapper.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    const wrapper = field.closest('.input-wrapper');
    wrapper.classList.add('error');
    wrapper.classList.remove('success');
    
    const existingError = wrapper.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: fadeIn 0.3s ease;
    `;
    
    wrapper.appendChild(errorElement);
}

function showFieldSuccess(field) {
    const wrapper = field.closest('.input-wrapper');
    wrapper.classList.add('success');
    wrapper.classList.remove('error');
}

// === VALIDATION HELPERS ===
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{9,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone);
}

// === FORM HANDLERS ===
async function handleLogin(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear any previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-wrapper').forEach(el => el.classList.remove('error', 'success'));
    
    // Validate fields
    const emailValid = validateField({ target: emailInput });
    const passwordValid = validateField({ target: passwordInput });
    
    if (!emailValid || !passwordValid) {
        showError('Please fix the errors above and try again');
        return;
    }
    
    // Check for demo credentials
    const isDemoLogin = email.toLowerCase() === 'demo@autocare360.com' && password === 'demo123';
    
    // Show loading
    showLoading('Signing you in...');
    setButtonLoading(event.target.querySelector('.auth-btn'), true);
    
    try {
        // Simulate API call
        await simulateAuthCall(isDemoLogin ? 1000 : 2000);
        
        // Store session if remember me is checked
        if (rememberMe) {
            localStorage.setItem('autocare360_session', JSON.stringify({
                email: email,
                timestamp: Date.now(),
                userId: isDemoLogin ? 'demo-user' : 'user-' + Date.now()
            }));
        }
        
        // Show success and redirect
        showSuccess(isDemoLogin ? 
            'Demo login successful! Welcome to AutoCare360!' : 
            'Welcome back! Redirecting to your dashboard...');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        showError('Invalid email or password. Please check your credentials and try again.');
        setButtonLoading(event.target.querySelector('.auth-btn'), false);
        
        // Add shake animation to form
        const form = event.target.closest('.auth-form');
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    } finally {
        hideLoading();
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('signupEmail').value.trim(),
        phone: document.getElementById('phoneNumber').value.trim(),
        vehicleType: document.getElementById('vehicleType').value,
        password: document.getElementById('signupPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        agreeTerms: document.getElementById('agreeTerms').checked,
        newsletter: document.getElementById('newsletter').checked
    };
    
    // Clear any previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-wrapper').forEach(el => el.classList.remove('error', 'success'));
    
    // Validate all fields
    const requiredFields = ['firstName', 'lastName', 'signupEmail', 'phoneNumber', 'vehicleType', 'signupPassword', 'confirmPassword'];
    let allValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField({ target: field })) {
            allValid = false;
        }
    });
    
    // Check terms agreement
    if (!formData.agreeTerms) {
        showError('Please agree to the Terms of Service and Privacy Policy to continue');
        document.getElementById('agreeTerms').closest('.checkbox-wrapper').style.border = '2px solid #ff4444';
        document.getElementById('agreeTerms').closest('.checkbox-wrapper').style.borderRadius = '4px';
        return;
    }
    
    // Check password strength
    if (passwordStrength < 60) {
        showError('Please choose a stronger password. Use a mix of uppercase, lowercase, numbers, and symbols');
        return;
    }
    
    if (!allValid) {
        showError('Please fix the errors above and try again');
        return;
    }
    
    // Show loading
    showLoading('Creating your account...');
    setButtonLoading(event.target.querySelector('.auth-btn'), true);
    
    try {
        // Simulate API call
        await simulateAuthCall(2500);
        
        // Store user data (in real app, this would be done server-side)
        localStorage.setItem('autocare360_user', JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            vehicleType: formData.vehicleType,
            joinDate: new Date().toISOString(),
            newsletter: formData.newsletter
        }));
        
        // Auto-login after successful signup
        localStorage.setItem('autocare360_session', JSON.stringify({
            email: formData.email,
            timestamp: Date.now(),
            userId: 'user-' + Date.now()
        }));
        
        // Show success and redirect
        showSuccess(`Welcome to AutoCare360, ${formData.firstName}! Your account has been created successfully!`);
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);
        
    } catch (error) {
        showError('Registration failed. This email might already be registered. Please try again.');
        setButtonLoading(event.target.querySelector('.auth-btn'), false);
        
        // Add shake animation to form
        const form = event.target.closest('.auth-form');
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    } finally {
        hideLoading();
        // Reset terms checkbox styling
        document.getElementById('agreeTerms').closest('.checkbox-wrapper').style.border = '';
        document.getElementById('agreeTerms').closest('.checkbox-wrapper').style.borderRadius = '';
    }
}

async function handleForgotPassword(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const email = document.getElementById('resetEmail').value;
    
    if (!validateField({ target: document.getElementById('resetEmail') })) {
        return;
    }
    
    showLoading('Sending reset instructions...');
    setButtonLoading(event.target.querySelector('.auth-btn'), true);
    
    try {
        await simulateAuthCall(1500);
        
        showSuccess('Reset instructions sent to your email!');
        
        setTimeout(() => {
            switchForm('login');
        }, 2000);
        
    } catch (error) {
        showError('Failed to send reset email. Please try again.');
        setButtonLoading(event.target.querySelector('.auth-btn'), false);
    } finally {
        hideLoading();
    }
}

// === SOCIAL LOGIN ===
async function socialLogin(provider) {
    if (isLoading) return;
    
    showLoading(`Connecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)}...`);
    
    try {
        // Simulate social login
        await simulateAuthCall(1500);
        
        showSuccess(`Successfully connected with ${provider}! Redirecting...`);
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        showError(`Failed to connect with ${provider}. Please try again.`);
    } finally {
        hideLoading();
    }
}

// === UI HELPERS ===
function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        isLoading = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        isLoading = false;
    }
}

function showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loadingOverlay');
    const messageElement = document.getElementById('loadingMessage');
    
    messageElement.textContent = message;
    overlay.classList.add('active');
    isLoading = true;
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
    isLoading = false;
}

function showSuccess(message) {
    const modal = document.getElementById('successModal');
    const messageElement = modal.querySelector('.modal-body p');
    
    messageElement.textContent = message;
    modal.classList.add('active');
    
    // Countdown
    let count = 3;
    const countdownElement = document.getElementById('countdown');
    
    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            modal.classList.remove('active');
        }
    }, 1000);
}

function showError(message) {
    const modal = document.getElementById('errorModal');
    const messageElement = document.getElementById('errorMessage');
    
    messageElement.textContent = message;
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// === AI ASSISTANT ===
function initializeAIAssistant() {
    const assistant = document.getElementById('aiAssistant');
    
    assistant.addEventListener('click', function() {
        const messages = [
            "Hi! I'm Alex, your AI assistant. Need help with authentication?",
            "Having trouble signing in? Try resetting your password.",
            "Need help creating an account? Make sure to use a strong password!",
            "Forgot your email? Contact our support team for assistance.",
            "Tip: Use a password manager for better security!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Create temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'ai-message';
        tooltip.textContent = randomMessage;
        tooltip.style.cssText = `
            position: fixed;
            bottom: 120px;
            right: 2rem;
            background: rgba(255, 255, 255, 0.95);
            color: #333;
            padding: 1rem;
            border-radius: 10px;
            max-width: 250px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(tooltip);
            }, 300);
        }, 3000);
    });
}

// === UTILITY FUNCTIONS ===
async function simulateAuthCall(delay = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure (90% success rate)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Authentication failed'));
            }
        }, delay);
    });
}

function preloadAssets() {
    // Preload critical assets for faster loading
    const assets = [
        'index.html'
    ];
    
    assets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = asset;
        document.head.appendChild(link);
    });
}

// === TERMS AND PRIVACY ===
function showTerms() {
    showModal('Terms of Service', `
        <div style="text-align: left; max-height: 300px; overflow-y: auto; color: #8892b0; line-height: 1.6;">
            <h4 style="color: #00d4ff; margin-bottom: 1rem;">AutoCare360 Terms of Service</h4>
            <p><strong>1. Service Description</strong><br>
            AutoCare360 provides AI-powered vehicle diagnostic and monitoring services.</p>
            
            <p><strong>2. User Responsibilities</strong><br>
            Users must provide accurate vehicle information and maintain their account security.</p>
            
            <p><strong>3. Data Usage</strong><br>
            We collect vehicle data to provide diagnostic services and improve our AI algorithms.</p>
            
            <p><strong>4. Privacy</strong><br>
            Your personal and vehicle data is protected according to our Privacy Policy.</p>
            
            <p><strong>5. Limitation of Liability</strong><br>
            AutoCare360 diagnostic suggestions are for informational purposes. Always consult a qualified mechanic.</p>
        </div>
    `);
}

function showPrivacy() {
    showModal('Privacy Policy', `
        <div style="text-align: left; max-height: 300px; overflow-y: auto; color: #8892b0; line-height: 1.6;">
            <h4 style="color: #00d4ff; margin-bottom: 1rem;">AutoCare360 Privacy Policy</h4>
            <p><strong>Data Collection</strong><br>
            We collect vehicle diagnostic data, usage patterns, and account information.</p>
            
            <p><strong>Data Usage</strong><br>
            Data is used to provide personalized diagnostic services and improve our AI systems.</p>
            
            <p><strong>Data Sharing</strong><br>
            We do not sell your personal data. Data may be shared with service partners for maintenance scheduling.</p>
            
            <p><strong>Data Security</strong><br>
            All data is encrypted and stored securely using industry-standard protocols.</p>
            
            <p><strong>Your Rights</strong><br>
            You can access, modify, or delete your data at any time through your account settings.</p>
        </div>
    `);
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
            </div>
            <div class="modal-body">
                ${content}
                <button class="modal-btn" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// === ANIMATIONS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    .input-wrapper.error input,
    .input-wrapper.error select {
        border-color: #ff4444 !important;
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.3) !important;
    }
    
    .input-wrapper.success input,
    .input-wrapper.success select {
        border-color: #4ecdc4 !important;
        box-shadow: 0 0 10px rgba(78, 205, 196, 0.3) !important;
    }
    
    .input-wrapper.error .input-icon {
        color: #ff4444 !important;
    }
    
    .input-wrapper.success .input-icon {
        color: #4ecdc4 !important;
    }
`;
document.head.appendChild(style);

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', function(event) {
    // ESC to close modals
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
    
    // Enter to submit forms
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        const form = event.target.closest('form');
        if (form && !isLoading) {
            const submitBtn = form.querySelector('.auth-btn');
            if (submitBtn) {
                submitBtn.click();
            }
        }
    }
});

// === SESSION MANAGEMENT ===
window.addEventListener('load', function() {
    const session = localStorage.getItem('autocare360_session');
    if (session) {
        try {
            const sessionData = JSON.parse(session);
            const isExpired = Date.now() - sessionData.timestamp > 7 * 24 * 60 * 60 * 1000; // 7 days
            
            if (!isExpired) {
                // Auto-fill email if session exists
                const emailInput = document.getElementById('loginEmail');
                if (emailInput) {
                    emailInput.value = sessionData.email;
                    document.getElementById('rememberMe').checked = true;
                }
            } else {
                localStorage.removeItem('autocare360_session');
            }
        } catch (error) {
            localStorage.removeItem('autocare360_session');
        }
    }
});

// === DEMO HELPERS ===
function fillDemoCredentials() {
    console.log('🎮 Filling demo credentials...');
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (emailInput && passwordInput) {
        // Clear and fill inputs
        emailInput.value = '';
        passwordInput.value = '';
        
        // Simulate typing
        setTimeout(() => {
            emailInput.focus();
            emailInput.value = 'demo@autocare360.com';
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            setTimeout(() => {
                passwordInput.focus();
                passwordInput.value = 'demo123';
                passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                console.log('✅ Demo credentials filled successfully');
            }, 500);
        }, 100);
    } else {
        console.error('❌ Could not find login inputs');
    }
}

function fillDemoSignup() {
    console.log('🎮 Filling demo signup data...');
    
    const inputs = {
        firstName: 'John',
        lastName: 'Doe',
        signupEmail: 'john.doe@autocare360.com',
        phoneNumber: '555-123-4567',
        signupPassword: 'SecurePass123!',
        confirmPassword: 'SecurePass123!'
    };
    
    Object.entries(inputs).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) {
            input.focus();
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    
    // Set vehicle type
    const vehicleSelect = document.getElementById('vehicleType');
    if (vehicleSelect) {
        vehicleSelect.value = 'sedan';
        vehicleSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    // Check terms
    const termsCheckbox = document.getElementById('agreeTerms');
    if (termsCheckbox) {
        termsCheckbox.checked = true;
    }
    
    console.log('✅ Demo signup data filled successfully');
}

console.log('AutoCare360 Authentication System Initialized');
