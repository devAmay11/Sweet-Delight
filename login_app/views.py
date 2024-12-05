from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from .models import CustomUser

# Function to create a user
def create_user(request):
    if request.method == "POST":
        # Get the form data
        full_name = request.POST.get('fullName')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        password = request.POST.get('confirmPassword')

        # Check if the email already exists
        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'errors': 'Email already exists.'})
        if CustomUser.objects.filter(mobile=mobile).exists():
            return JsonResponse({'success': False, 'errors': 'Mobile already exists.'})
        # Create user with hashed password
        user = CustomUser.objects.create_user(
            username=email,
            full_name=full_name,
            email=email,
            mobile=mobile,
            password=password,  # Django automatically hashes the password
        )
        user.save()
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)  # Log the user in         
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': 'Authentication failed. Please try logging in.'})
        
    return JsonResponse({'success': False, 'error': 'Invalid request method'})

# Function to log in a user
def login_user(request):
    # Check if the request method is POST
    if request.method == "POST":
        # Retrieve username and password from the request's POST data
        email = request.POST['lgemail']
        password = request.POST['lgpassword']
        
        # Authenticate the user with the provided credentials
        user = authenticate(request, email=email, password=password)
        
        if user is not None:  # If the user is authenticated successfully
            login(request, user)  # Log the user in
            return JsonResponse({'success': True})  # Return a success response as JSON
        else:
            # Return an error response if authentication fails
            return JsonResponse({'success': False, 'errors': 'Please enter valid credentials.'})
    else:
        # Return an error response for non-POST requests
        return JsonResponse({'success': False, 'error': 'Invalid request method'})

# Function to log out a user
def logout_user(request):
    logout(request)  # Log out the current user
    return redirect('index')