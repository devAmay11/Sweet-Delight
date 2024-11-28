from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .import views
from dashboard import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard', include('dashboard.urls')),
    path('', views.dashboard, name='dashboard')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
