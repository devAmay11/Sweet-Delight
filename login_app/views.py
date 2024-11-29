from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
# Create your views here.


def create_user(request):
    if request.method == "POST":
        full_name = request.POST.get('fullName')
        email = request.POST.get('email')
        agree_terms = request.POST.get('agreeTerms')
        print("--------full_name-----------",full_name)
        print("--------email-----------",email)
        print("--------agree_terms-----------",agree_terms)

        user = User.objects.create(first_name=full_name, email=email)
        
        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

