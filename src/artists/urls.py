from django.urls import path
from . import views

urlpatterns = [
    path('update/data-artist/', views.AddDataArtistDetail.as_view()),
    path('artist/<str:id>/', views.GetArtistDetailAPIView.as_view()),
]
