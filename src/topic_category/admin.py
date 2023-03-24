from django.contrib import admin
from .models import TopicHub, Hub, PlaylistOfHub, HubOfTopic


# Register your models here.
@admin.register(TopicHub)
class TopicHub(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicHub)


@admin.register(Hub)
class Hub(admin.ModelAdmin):
    list_display = ["cover", "thumbnail", "thumbnail_has_text", "thumbnail_r", "title", "description", "created_at"]


admin.register(Hub)


@admin.register(HubOfTopic)
class HubOfTopic(admin.ModelAdmin):
    list_display = ["topic", "hub", "created_at"]


admin.register(HubOfTopic)


@admin.register(PlaylistOfHub)
class PlaylistOfHub(admin.ModelAdmin):
    list_display = ["hub", "playlist", "created_at"]


admin.register(PlaylistOfHub)
