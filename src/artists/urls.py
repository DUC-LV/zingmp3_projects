from django.urls import path
from . import views

urlpatterns = [
    path('artist/<int:id>/', views.GetArtistDetailAPIView.as_view()),
]
