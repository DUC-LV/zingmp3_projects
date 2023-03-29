from django.urls import path
from . import views

urlpatterns = [
    path('update/topic-playlist/', views.TopicPlaylistAPIView.as_view()),
    path('update/playlist/', views.PlaylistAPIView.as_view()),
    path('update/artist/', views.ArtistAPIView.as_view()),
    path('update-sort-playlist/playlist/', views.PostPlaylistDataSort.as_view()),
]
