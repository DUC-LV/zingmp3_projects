from django.urls import path
from . import views

urlpatterns = [
    path('playlist/<str:id>/', views.GetPlaylistDetail.as_view()),
    path('update/song/', views.SongAPIView.as_view()),
    path('update/album/', views.AlbumAPIView.as_view()),
]
