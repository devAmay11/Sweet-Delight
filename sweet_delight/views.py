from django.http import HttpResponse
from sweet_delight import get_mongo_db


def home(request):
    try:
        db = get_mongo_db()
        user_db = db['sample_airbnb']
        listingsAndReviews_collection = user_db['listingsAndReviews']
        data = listingsAndReviews_collection.find_one({'_id': '10006546'})
        print(data)

        return HttpResponse({'Message': 'Successfully Pinged'})
    except Exception as e:
        print(e)