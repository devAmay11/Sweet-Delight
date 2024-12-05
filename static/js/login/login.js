function userLogin() {
    // Clear any previous error messages
    $('#lgemailError').hide();
    $('#lgpasswordError').hide();

    // Show loader
    $('#loader').show();

    // Get the input field values
    var email = $('#lgemail').val().trim();
    var password = $('#lgpassword').val().trim();
    var isValid = true;

    // Check if email is blank
    if (!email) {
        $('#lgemailError').text('Please enter email').show();
        isValid = false;
    } else {
        // Validate email format using regex
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            $('#lgemailError').text('Please enter a valid email address').show();
            isValid = false;
        }
    }

    // Check if password is blank
    if (!password) {
        $('#lgpasswordError').text('Please enter password').show();
        isValid = false;
    }

    // If any validation fails, stop and hide the loader
    if (!isValid) {
        $('#loader').hide();
        return;
    }

    // Serialize form data
    var formData = $('#EmailForm').serialize();

    // Perform the Ajax request
    $.ajax({
        url: loginUserUrl,  // URL of the Django view
        type: "POST",       // Method is POST
        data: formData,     // Send form data
        dataType: "json",   // Expect JSON response
        success: function(response) {
            if (response.success) {
                console.log('Login successfully!');
                window.location.href = "/dashboard/dashboard";
            } else {
                $('#loader').hide();
                const alertDiv = $('#authError');

                // Set the message dynamically (optional)
                alertDiv.html(response.errors);

                // Show the alert
                alertDiv.show();

                // Fade out after 3 seconds
                setTimeout(() => {
                    alertDiv.fadeOut();
                }, 3000);
            }
        },
        error: function(xhr, status, error) {
            // Handle any errors that occur during the request
            $('#loader').hide();
            alert("An error occurred. Please try again.");
        }
    });
}
