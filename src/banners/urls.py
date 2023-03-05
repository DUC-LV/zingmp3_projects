from django.urls import path
from . import views

urlpatterns = [
    path('banners/', views.BannerAPIView.as_view()),
]
