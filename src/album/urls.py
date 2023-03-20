from django.urls import path
from . import views

urlpatterns = [
    path('album/<str:id>/', views.GetAlbumDetail.as_view()),
]
