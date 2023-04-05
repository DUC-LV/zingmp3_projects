from django.urls import path
from . import views

urlpatterns = [
    path('update-follow/', views.FollowAPIView.as_view()),
    path('favourite/', views.FavouriteAPIView.as_view()),
]
