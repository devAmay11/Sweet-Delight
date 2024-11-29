function createUser() {
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
                alert('Account created successfully!');
            } else {
                alert('Error: ' + response.error);
            }
        },
        error: function(xhr, status, error) {
            // Handle any errors that occur during the request
            alert("An error occurred. Please try again.");
        }
    });
}