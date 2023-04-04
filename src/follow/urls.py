from django.urls import path
from . import views

urlpatterns = [
    path('update-follow/', views.FollowAPIView.as_view()),
]
