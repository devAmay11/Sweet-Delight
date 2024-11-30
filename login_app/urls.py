from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .import views

urlpatterns = [
    path('create_user/',views.create_user,name='create_user'),
    path('logout_user/',views.logout_user,name='logout_user'),
    path('login_user/',views.login_user,name='login_user')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
