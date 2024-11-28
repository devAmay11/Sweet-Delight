from django.urls import path
from django.views.generic import TemplateView
from .views import login_view, signup_view



urlpatterns = [
    path('', TemplateView.as_view(template_name='dashboard/index.html'), name='dashboard_home'),
    path('login/', login_view, name='login'),  # Login page
    path('signup/', signup_view, name='signup'),  # Signup page
]
