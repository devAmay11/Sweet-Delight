function showModal(formName) {
    // Trigger the modal
    toggleForms(formName);
    $('#authModal').modal('show');
    // Ensure the overflow property is set to auto so the body can scroll
    $('body').css('overflow', 'auto');
    $('body').css('padding-right', '');
    
}
// Function to toggle between Login and Signup forms
function toggleForms(formName){

    const selectedForm = formName;
    const loginForm = document.getElementById('loginForm');
    const EmailForm = document.getElementById('EmailForm');
    const signUpForm = document.getElementById('signUpForm');
    const modalTitle = document.getElementById('authModalLabel');
    const toggleLink = document.getElementById('toggleLink');
    console.log(`Selected Form: ${selectedForm}`);
    if (selectedForm == "emailForm"){
        loginForm.style.display = 'none';
        EmailForm.style.display = 'block';
        signUpForm.style.display = 'none';
        modalTitle.innerHTML = 'Login';
        toggleLink.innerHTML = 'Already have an account? <a href="javascript:void(0);" onclick="toggleForms(\'loginForm\')">Login</a>';
        EmailForm.reset();

    }
    else if (selectedForm == "loginForm"){
        loginForm.style.display = 'block';
        EmailForm.style.display = 'none';
        signUpForm.style.display = 'none';
        modalTitle.innerHTML = 'Login';
        toggleLink.innerHTML = 'New to <strong>Sweet Delight</strong>? <a href="javascript:void(0);" class="text-primary text-decoration-none" onclick="toggleForms(\'signUpForm\')">Create account</a>';
        loginForm.reset();
    }
    else{
        signUpForm.style.display = 'block';
        loginForm.style.display = 'none';
        EmailForm.style.display = 'none';
        modalTitle.innerHTML = 'Sign up';
        toggleLink.innerHTML = 'Already have an account? <a href="javascript:void(0);" onclick="toggleForms(\'loginForm\')">Login</a>';
        signUpForm.reset();
    }
    
}

// Select elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const agreeTermsCheckbox = document.getElementById('agreeTerms');
const createAccountButton = document.getElementById('createAccountButton');
const emailError = document.getElementById('emailError');

// Function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to check form validity
function checkFormValidity() {
    const isFullNameValid = fullNameInput.value.trim() !== '';
    const isEmailValid = isValidEmail(emailInput.value.trim());
    const isTermsChecked = agreeTermsCheckbox.checked;

    // Show or hide email error
    if (!isEmailValid && emailInput.value.trim() !== '') {
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }

    // Enable or disable the button
    if (isFullNameValid && isEmailValid && isTermsChecked) {
        createAccountButton.disabled = false;
    } else {
        createAccountButton.disabled = true;
    }
}

// Add event listeners for inputs and checkbox
fullNameInput.addEventListener('input', checkFormValidity);
emailInput.addEventListener('input', checkFormValidity);
agreeTermsCheckbox.addEventListener('change', checkFormValidity);