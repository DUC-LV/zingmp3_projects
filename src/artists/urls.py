from django.urls import path
from . import views

urlpatterns = [
    path('artist/<str:id>/', views.GetArtistDetailAPIView.as_view()),
]
