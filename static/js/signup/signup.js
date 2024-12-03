// Select elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const agreeTermsCheckbox = document.getElementById('agreeTerms');
const createAccountButton = document.getElementById('createAccountButton');
const emailError = document.getElementById('emailError');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const mobileInput = document.getElementById('mobile');
const signUpForm = document.getElementById('signUpForm');

// Function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMobile() {
    const mobile = mobileInput.value.trim();
    if (mobile === '') {
        mobileError.style.display = 'none';
        return false;
    }
    else if (!/^\d+$/.test(mobile)) { // Ensure only digits are present
        mobileError.textContent = 'Mobile number must contain only integers.';
        mobileError.style.display = 'block';
        return false;
    }
    else if (mobile.length !== 10) { // Ensure the length is exactly 10 digits
        mobileError.textContent = 'Mobile number must be 10 digits.';
        mobileError.style.display = 'block';
        return false;
    }
    mobileError.style.display = 'none';
    return true;
}

function arePasswordsValid() {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (password === '' || confirmPassword === '') {
        return false;
    }
    else if (password !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match.';
        passwordError.style.display = 'block';
        return false;
    }
    passwordError.style.display = 'none';
    return true;
}

// Function to check form validity
function checkFormValidity() {
    const isFullNameValid = fullNameInput.value.trim() !== '';
    const isEmailValid = isValidEmail(emailInput.value.trim());
    const isTermsChecked = agreeTermsCheckbox.checked;
    const isPasswordsValid = arePasswordsValid();
    const isMobileValid = validateMobile();

    // Show or hide email error
    if (!isEmailValid && emailInput.value.trim() !== '') {
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }
    // Enable or disable the button
    if (isFullNameValid && isEmailValid && isMobileValid && isPasswordsValid && isTermsChecked) {
        createAccountButton.disabled = false;
    } else {
        createAccountButton.disabled = true;
    }
}

// Add event listeners for inputs and checkbox
fullNameInput.addEventListener('input', checkFormValidity);
confirmPasswordInput.addEventListener('input', checkFormValidity);
emailInput.addEventListener('input', checkFormValidity);
mobileInput.addEventListener('input', checkFormValidity);
agreeTermsCheckbox.addEventListener('change', checkFormValidity);


function createUser() {
    $('#loader').show();
    // Get the form data
    var formData = $('#signUpForm').serialize();  // Serialize the entire form dataType
	
    var agreeTermsValue = $('#agreeTerms').prop('checked') ? 1 : 0;

    // You can append additional values to the serialized string
    formData += '&agreeTerms=' + agreeTermsValue;  // Adds agreeTerms=1 or 0 to the serialized data
    // Perform the Ajax request
    $.ajax({
        url: createUserUrl,  // URL of the Django view
        type: "POST",                    // Method is POST
        data: formData,                  // Send form data
        dataType: "json",                // Expect JSON response
        success: function(response) {
            if (response.success) {
                console.log('Account created successfully!');
                window.location.href = "/";
                
            } else {
                $('#loader').hide();
                alert(response.errors);
            }
        },
        error: function(xhr, status, error) {
            // Handle any errors that occur during the request
            $('#loader').hide();
            alert("An error occurred. Please try again.");
        }
    });
}