// ================== AUTOCARE360 REGISTRATION SYSTEM ==================

// === GLOBAL VARIABLES ===
let currentStep = 1;
let totalSteps = 3;
let formData = {};
let passwordStrength = 0;
let isSubmitting = false;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AutoCare360 Registration System Loading...');
    
    try {
        initializeParticles();
        console.log('✅ Particles initialized');
        
        initializeFormValidation();
        console.log('✅ Form validation initialized');
        
        initializePasswordStrength();
        console.log('✅ Password strength initialized');
        
        populateYearDropdown();
        console.log('✅ Year dropdown populated');
        
        updateProgressBar();
        console.log('✅ Progress bar updated');
        
        setupFormNavigation();
        console.log('✅ Form navigation setup');
        
        console.log('✅ AutoCare360 Registration System Ready!');
        
        // Test if form exists
        const form = document.getElementById('registrationForm');
        if (form) {
            console.log('✅ Registration form found:', form);
        } else {
            console.error('❌ Registration form NOT found!');
        }
        
        // Test submit button
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            console.log('✅ Submit button found:', submitBtn);
            // Add click event as backup
            submitBtn.addEventListener('click', function(e) {
                console.log('🔘 Submit button clicked!');
                if (currentStep !== 3) {
                    console.log('⚠️ Not on final step, preventing submission');
                    e.preventDefault();
                    return;
                }
            });
        } else {
            console.error('❌ Submit button NOT found!');
        }
        
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// === PARTICLE BACKGROUND ===
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.4, random: true },
                size: { value: 2, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d4ff",
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
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
                    bubble: { distance: 200, size: 15, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 2 },
                    remove: { particles_nb: 1 }
                }
            },
            retina_detect: true
        });
    }
}

// === FORM NAVIGATION ===
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgressBar();
            updateStepText();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgressBar();
        updateStepText();
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // Show current step
    const targetStep = document.getElementById(`step${step}`);
    if (targetStep) {
        targetStep.classList.add('active');
        
        // Focus first input in step
        setTimeout(() => {
            const firstInput = targetStep.querySelector('input, select');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('registrationProgress');
    const percentage = (currentStep / totalSteps) * 100;
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

function updateStepText() {
    const currentStepEl = document.getElementById('currentStep');
    const stepTexts = {
        1: 'Personal Information',
        2: 'Vehicle Information',
        3: 'Account Security'
    };
    
    if (currentStepEl) {
        currentStepEl.textContent = currentStep;
    }
    
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.innerHTML = `<span class="step-current">${currentStep}</span> of <span class="step-total">${totalSteps}</span> - ${stepTexts[currentStep]}`;
    }
}

// === FORM VALIDATION ===
function initializeFormValidation() {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleRegistration);
    }
    
    // Real-time validation for all inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        // Enhanced input accessibility - FIX FOR INPUT ISSUES
        input.style.pointerEvents = 'auto';
        input.style.zIndex = '100';
        input.style.position = 'relative';
        input.style.cursor = 'text';
        
        // Wrapper click handling - ENHANCED FIX
        const wrapper = input.closest('.input-wrapper');
        if (wrapper) {
            wrapper.style.pointerEvents = 'auto';
            wrapper.style.cursor = 'text';
            wrapper.style.position = 'relative';
            wrapper.style.zIndex = '50';
            
            // Multiple event handlers for better accessibility
            wrapper.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Wrapper clicked, focusing input:', input.id);
                input.focus();
                input.click();
            });
            
            wrapper.addEventListener('mousedown', function(e) {
                e.preventDefault();
                input.focus();
            });
            
            wrapper.addEventListener('touchstart', function(e) {
                e.preventDefault();
                input.focus();
            });
        }
        
        // Enhanced focus handlers
        input.addEventListener('focus', function() {
            console.log('Input focused:', this.id);
            this.style.outline = '2px solid #00d4ff';
            this.style.backgroundColor = 'rgba(0, 212, 255, 0.05)';
            
            // Ensure the input is truly focusable
            this.style.pointerEvents = 'auto';
            this.style.zIndex = '200';
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.backgroundColor = '';
            this.style.zIndex = '100';
            validateField({ target: this });
        });
        
        input.addEventListener('input', function(e) {
            console.log('Input changed:', this.id, this.value);
            clearFieldError(e);
            
            // Real-time formatting
            if (input.type === 'tel') {
                formatPhoneNumber(input);
            }
            
            if (input.type === 'email') {
                input.value = input.value.toLowerCase();
            }
        });
        
        // Force input to be clickable
        input.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            this.focus();
        });
        
        input.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            this.focus();
        });
    });
    
    // Fix for select dropdowns specifically
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.style.pointerEvents = 'auto';
        select.style.zIndex = '100';
        select.style.cursor = 'pointer';
        
        select.addEventListener('focus', function() {
            console.log('Select focused:', this.id);
            this.style.outline = '2px solid #00d4ff';
        });
        
        select.addEventListener('change', function() {
            console.log('Select changed:', this.id, this.value);
            validateField({ target: this });
        });
    });
}

function validateCurrentStep() {
    console.log('🔍 Validating step:', currentStep);
    
    const currentStepEl = document.getElementById(`step${currentStep}`);
    if (!currentStepEl) {
        console.error('❌ Current step element not found:', `step${currentStep}`);
        return false;
    }
    
    const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
    console.log('📋 Found required inputs:', inputs.length);
    
    let isValid = true;
    
    inputs.forEach((input, index) => {
        console.log(`🔍 Validating input ${index + 1}:`, input.id, input.value);
        if (!validateField({ target: input })) {
            console.log(`❌ Input ${input.id} failed validation`);
            isValid = false;
        } else {
            console.log(`✅ Input ${input.id} passed validation`);
        }
    });
    
    // Additional step-specific validations
    if (currentStep === 3) {
        console.log('🔐 Validating step 3 specific requirements...');
        
        // Validate password confirmation
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            console.log('❌ Passwords do not match');
            showFieldError(document.getElementById('confirmPassword'), 'Passwords do not match');
            isValid = false;
        } else {
            console.log('✅ Passwords match');
        }
        
        // Check password strength
        if (passwordStrength < 60) {
            console.log('❌ Password too weak:', passwordStrength);
            showFieldError(document.getElementById('password'), 'Password is too weak');
            isValid = false;
        } else {
            console.log('✅ Password strength acceptable:', passwordStrength);
        }
        
        // Check required checkboxes
        const requiredCheckboxes = currentStepEl.querySelectorAll('input[type="checkbox"][required]');
        console.log('📋 Checking required checkboxes:', requiredCheckboxes.length);
        
        requiredCheckboxes.forEach((checkbox, index) => {
            if (!checkbox.checked) {
                console.log(`❌ Required checkbox ${index + 1} not checked:`, checkbox.id);
                showError('Please agree to all required terms and conditions');
                isValid = false;
            } else {
                console.log(`✅ Required checkbox ${index + 1} checked:`, checkbox.id);
            }
        });
    }
    
    console.log('🔍 Overall validation result:', isValid ? 'PASSED' : 'FAILED');
    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value ? field.value.trim() : '';
    const fieldType = field.type;
    const fieldId = field.id;
    
    console.log(`🔍 Validating field: ${fieldId}, type: ${fieldType}, value: "${value}"`);
    
    // Handle checkboxes differently
    if (fieldType === 'checkbox') {
        if (field.hasAttribute('required') && !field.checked) {
            console.log(`❌ Required checkbox ${fieldId} not checked`);
            showError(`Please check the required ${fieldId} option`);
            return false;
        }
        console.log(`✅ Checkbox ${fieldId} validation passed`);
        return true;
    }
    
    clearFieldError(event);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (!value) return true; // Optional field
    
    switch (fieldType) {
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'tel':
            if (!isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            break;
        case 'password':
            if (value.length < 8) {
                showFieldError(field, 'Password must be at least 8 characters long');
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
            if (fieldId === 'zipCode') {
                if (!/^\d{5}(-\d{4})?$/.test(value)) {
                    showFieldError(field, 'Please enter a valid ZIP code (12345 or 12345-6789)');
                    return false;
                }
            }
            if (fieldId === 'vehicleVin' && value) {
                if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) {
                    showFieldError(field, 'VIN must be exactly 17 characters (letters and numbers)');
                    return false;
                }
            }
            break;
        case 'number':
            if (fieldId === 'currentMileage') {
                if (value < 0 || value > 999999) {
                    showFieldError(field, 'Please enter a valid mileage (0-999,999)');
                    return false;
                }
            }
            break;
        case 'date':
            if (fieldId === 'dateOfBirth') {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                
                if (age < 16 || age > 120) {
                    showFieldError(field, 'Please enter a valid date of birth (must be 16+ years old)');
                    return false;
                }
            }
            break;
    }
    
    // Special validation for select fields
    if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
        if (!value) {
            showFieldError(field, 'Please make a selection');
            return false;
        }
    }
    
    showFieldSuccess(field);
    return true;
}

function clearFieldError(event) {
    const field = event.target;
    const wrapper = field.closest('.input-wrapper');
    
    // Handle checkboxes that don't have input-wrapper
    if (!wrapper) {
        console.log('⚠️ No wrapper found for field:', field.id, field.type);
        return;
    }
    
    wrapper.classList.remove('error', 'success');
    
    const errorMsg = wrapper.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    const wrapper = field.closest('.input-wrapper');
    
    // Handle checkboxes that don't have input-wrapper
    if (!wrapper) {
        console.log('⚠️ No wrapper found for field:', field.id, field.type);
        // Show general error instead
        showError(message);
        return;
    }
    
    wrapper.classList.add('error');
    wrapper.classList.remove('success');
    
    const existingError = wrapper.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    wrapper.appendChild(errorElement);
}

function showFieldSuccess(field) {
    const wrapper = field.closest('.input-wrapper');
    
    // Handle checkboxes that don't have input-wrapper
    if (!wrapper) {
        console.log('✅ Success for field without wrapper:', field.id, field.type);
        return;
    }
    
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

function formatPhoneNumber(input) {
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

// === PASSWORD FUNCTIONALITY ===
function initializePasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }
}

function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    passwordStrength = calculatePasswordStrength(password);
    
    if (strengthFill) {
        strengthFill.style.width = passwordStrength + '%';
        
        if (passwordStrength < 30) {
            strengthFill.style.background = '#ff4444';
            strengthText.textContent = 'Weak';
            strengthText.style.color = '#ff4444';
        } else if (passwordStrength < 60) {
            strengthFill.style.background = '#ff6b35';
            strengthText.textContent = 'Fair';
            strengthText.style.color = '#ff6b35';
        } else if (passwordStrength < 80) {
            strengthFill.style.background = '#ffa500';
            strengthText.textContent = 'Good';
            strengthText.style.color = '#ffa500';
        } else {
            strengthFill.style.background = '#00ff88';
            strengthText.textContent = 'Strong';
            strengthText.style.color = '#00ff88';
        }
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;
    if (password.length >= 16) strength += 5;
    
    return Math.min(100, strength);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.nextElementSibling.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        toggle.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// === FORM UTILITIES ===
function populateYearDropdown() {
    const yearSelect = document.getElementById('vehicleYear');
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        const startYear = 1990;
        
        for (let year = currentYear; year >= startYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }
}

function setupFormNavigation() {
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.target.matches('textarea')) {
            event.preventDefault();
            
            if (currentStep < totalSteps) {
                nextStep();
            } else {
                const submitBtn = document.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.click();
                }
            }
        }
    });
}

// === DIRECT SUBMISSION FUNCTION ===
function submitRegistration() {
    console.log('🔥 DIRECT SUBMIT BUTTON CLICKED!');
    alert('Button clicked! Check console for details.');
    
    // Force to step 3 if not already there
    if (currentStep !== 3) {
        console.log('🔄 Not on step 3, moving to final step');
        currentStep = 3;
        showStep(3);
        updateProgressBar();
        updateStepText();
    }
    
    // Create a fake event object
    const fakeEvent = {
        preventDefault: function() {
            console.log('preventDefault called');
        },
        target: document.querySelector('button[onclick="submitRegistration()"]')
    };
    
    // Call the registration handler directly
    handleRegistration(fakeEvent);
}

// === FORM SUBMISSION ===
async function handleRegistration(event) {
    console.log('🚀 Registration form submitted!');
    event.preventDefault();
    
    if (isSubmitting) {
        console.log('⚠️ Already submitting, preventing duplicate submission');
        return;
    }
    
    console.log('✅ Validating current step:', currentStep);
    if (!validateCurrentStep()) {
        console.log('❌ Validation failed');
        showError('Please fix the errors above');
        return;
    }
    
    console.log('✅ Validation passed, starting registration');
    isSubmitting = true;
    
    // Collect all form data
    formData = collectFormData();
    
    // Show loading
    showLoading('Creating your account...');
    setButtonLoading(document.querySelector('button[type="submit"]'), true);
    
    try {
        // Simulate API call for registration
        await simulateRegistration();
        
        // Show success modal
        showSuccessModal();
        
    } catch (error) {
        console.error('Registration failed:', error);
        showError('Registration failed. Please try again.');
        setButtonLoading(document.querySelector('button[type="submit"]'), false);
    } finally {
        hideLoading();
        isSubmitting = false;
    }
}

function collectFormData() {
    const formElements = document.querySelectorAll('input, select');
    const data = {};
    
    formElements.forEach(element => {
        if (element.type === 'checkbox') {
            data[element.name] = element.checked;
        } else if (element.value) {
            data[element.name] = element.value.trim();
        }
    });
    
    // Add metadata
    data.registrationDate = new Date().toISOString();
    data.registrationSource = 'web';
    data.userAgent = navigator.userAgent;
    
    console.log('📋 Form data collected:', data);
    return data;
}

async function simulateRegistration() {
    // Simulate different registration steps
    const steps = [
        { message: 'Validating information...', delay: 1000 },
        { message: 'Creating user account...', delay: 1500 },
        { message: 'Setting up vehicle profile...', delay: 1200 },
        { message: 'Initializing AI systems...', delay: 800 },
        { message: 'Finalizing setup...', delay: 600 }
    ];
    
    for (const step of steps) {
        updateLoadingMessage(step.message);
        await new Promise(resolve => setTimeout(resolve, step.delay));
    }
    
    // Simulate potential error (5% chance)
    if (Math.random() < 0.05) {
        throw new Error('Registration service temporarily unavailable');
    }
}

// === UI HELPERS ===
function showLoading(message = 'Processing...') {
    const overlay = document.getElementById('loadingOverlay');
    const messageEl = document.getElementById('loadingMessage');
    
    if (messageEl) messageEl.textContent = message;
    if (overlay) overlay.style.display = 'flex';
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
}

function updateLoadingMessage(message) {
    const messageEl = document.getElementById('loadingMessage');
    if (messageEl) messageEl.textContent = message;
}

function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

function showError(message) {
    // Create temporary error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(255, 68, 68, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 300px;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const summaryEl = document.getElementById('accountSummary');
    
    // Populate account summary
    if (summaryEl && formData) {
        summaryEl.innerHTML = `
            <h4>Account Details</h4>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Vehicle:</strong> ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}</p>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
        `;
    }
    
    if (modal) {
        modal.style.display = 'flex';
    }
}

function redirectToDashboard() {
    // Store user session (in real app, this would be handled by backend)
    localStorage.setItem('autocare360_user', JSON.stringify({
        ...formData,
        sessionStart: Date.now()
    }));
    
    // Show success message and redirect to login page
    setTimeout(() => {
        alert('Registration successful! Please log in with your credentials.');
        window.location.href = 'login.html';
    }, 1000);
}

// === MODAL HELPERS ===
function showTerms() {
    alert('Terms of Service\n\nThis is a demo. In a real application, this would show the full terms of service.');
}

function showPrivacy() {
    alert('Privacy Policy\n\nThis is a demo. In a real application, this would show the full privacy policy.');
}

// === DEMO HELPERS ===
function fillDemoData() {
    const demoData = {
        // Step 1: Personal Information
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@autocare360.com',
        phone: '555-123-4567',
        dateOfBirth: '1990-05-15',
        address: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        
        // Step 2: Vehicle Information
        vehicleMake: 'Toyota',
        vehicleModel: 'Camry',
        vehicleYear: '2020',
        vehicleType: 'sedan',
        fuelType: 'gasoline',
        currentMileage: '45000',
        vehicleColor: 'Silver',
        
        // Step 3: Security
        password: 'SecurePass123!',
        confirmPassword: 'SecurePass123!',
        securityQuestion: 'pet',
        securityAnswer: 'Buddy'
    };
    
    Object.entries(demoData).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) {
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('blur', { bubbles: true }));
        }
    });
    
    // Check required checkboxes
    ['emailNotifications', 'pushNotifications', 'agreeTerms', 'agreeData'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    
    console.log('✅ Demo data filled successfully');
}

// Add demo button to page
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // Demo fill button
        const demoBtn = document.createElement('button');
        demoBtn.innerHTML = '🎮 Fill Demo Data';
        demoBtn.onclick = fillDemoData;
        demoBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #00d4ff;
            color: #000;
            border: none;
            padding: 0.8rem 1.2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
            transition: all 0.3s ease;
        `;
        demoBtn.onmouseenter = () => {
            demoBtn.style.transform = 'translateY(-2px)';
            demoBtn.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.4)';
        };
        demoBtn.onmouseleave = () => {
            demoBtn.style.transform = 'translateY(0)';
            demoBtn.style.boxShadow = '0 5px 15px rgba(0, 212, 255, 0.3)';
        };
        document.body.appendChild(demoBtn);
        
        // Debug registration button - ENHANCED VERSION
        const debugBtn = document.createElement('button');
        debugBtn.innerHTML = '🔧 FORCE REGISTRATION';
        debugBtn.onclick = function() {
            console.log('🔧 FORCING REGISTRATION NOW!');
            
            // Fill demo data first
            fillDemoData();
            
            // Force to final step
            currentStep = 3;
            showStep(3);
            updateProgressBar();
            updateStepText();
            
            setTimeout(() => {
                console.log('🔧 BYPASSING ALL VALIDATION - DIRECT REGISTRATION');
                
                // Collect data and show success immediately
                formData = collectFormData();
                console.log('📋 Data collected:', formData);
                
                // Skip validation and go straight to success
                showSuccessModal();
                
            }, 500);
        };
        debugBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #ff1744;
            color: #fff;
            border: none;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 700;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(255, 23, 68, 0.4);
            transition: all 0.3s ease;
            font-size: 12px;
        `;
        document.body.appendChild(debugBtn);
        
    }, 2000);
});

console.log('AutoCare360 Registration System Initialized');
