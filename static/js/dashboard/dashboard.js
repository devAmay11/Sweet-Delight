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