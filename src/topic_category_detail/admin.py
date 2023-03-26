from django.contrib import admin
from .models import TopicPlaylistOfHub, TopicSongOfHub


# Register your models here.
@admin.register(TopicPlaylistOfHub)
class TopicPlaylistOfHub(admin.ModelAdmin):
    list_display = ["hub", "topic_playlist", "created_at"]


admin.register(TopicPlaylistOfHub)


@admin.register(TopicSongOfHub)
class TopicSongOfHub(admin.ModelAdmin):
    list_display = ["hub", "topic_song", "created_at"]


admin.register(TopicSongOfHub)
