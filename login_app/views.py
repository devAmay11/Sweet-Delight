from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from .models import CustomUser

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
        user = authenticate(request, username=user.username, password=password)
        if user is not None:
            login(request, user)  # Log the user in         
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': 'Authentication failed. Please try logging in.'})
        
    return JsonResponse({'success': False, 'error': 'Invalid request method'})

def login_user(request):
    if request.method == "POST":
        username = request.POST['lgemail']
        password = request.POST['lgpassword']
        user = authenticate(request, username=username,password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': 'Please enter valid crendentials.'})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})

def logout_user(request):
    logout(request)
    messages.success(request, ("you have been logged out"))
    return redirect('dashboard')