from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .import views
from dashboard import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.dashboard, name='dashboard'),
    path('login_app/', include('login_app.urls')),
    path('dashboard/', include('dashboard.urls')),
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
