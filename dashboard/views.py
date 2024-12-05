from django.http import HttpResponse
from sweet_delight import get_mongo_db
from django.shortcuts import render,redirect
from django.contrib.auth.models import User

def index(request):
    db = get_mongo_db()
    user_db = db['sample_airbnb']
    listingsAndReviews_collection = user_db['listingsAndReviews']
    data = listingsAndReviews_collection.find_one({'_id': '10006546'})
    return render(request, "dashboard/index.html",{})

def dashboard(request):
    return render(request, "dashboard/dashboard.html",{})