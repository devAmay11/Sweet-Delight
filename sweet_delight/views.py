from django.http import HttpResponse
from django.shortcuts import render
from .mongo_client import get_mongodb
mongodbConn = get_mongodb()

def home(request):    
    countData = list(mongodbConn.Countries.aggregate([
        {"$match": {"id": 2}},
        {"$project": {"_id": 0}}
    ]))
    return render(request, "index/index.html",{})