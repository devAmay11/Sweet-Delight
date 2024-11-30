
function userLogin() {
    $('#loader').show();
    // Get the form data
    var formData = $('#EmailForm').serialize();  // Serialize the entire form dataType

    // Perform the Ajax request
    $.ajax({
        url: loginUserUrl,  // URL of the Django view
        type: "POST",                    // Method is POST
        data: formData,                  // Send form data
        dataType: "json",                // Expect JSON response
        success: function(response) {
            if (response.success) {
                console.log('login successfully!');
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