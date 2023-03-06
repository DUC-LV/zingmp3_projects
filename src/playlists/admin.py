from django.contrib import admin
from .models import TopicPlaylist, Playlists, PlaylistOfTopic, Artists, ArtistOfPlaylist


# Register your models here.
@admin.register(TopicPlaylist)
class TopicPlaylist(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicPlaylist)


@admin.register(Playlists)
class Playlists(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "isoffical", "is_indie", "release_date", "sort_description", "released_at",
                    "pr", "artist_names", "play_item_mode", "sub_type", "thumbnail_m", "is_shuffle", "is_private",
                    "user_name", "is_album", "text_type", "is_single", "created_at"]


@admin.register(PlaylistOfTopic)
class PlaylistOfTopic(admin.ModelAdmin):
    list_display = ["topic", "playlist", "created_at"]


admin.register(PlaylistOfTopic)

admin.register(Playlists)


@admin.register(Artists)
class Artists(admin.ModelAdmin):
    list_display = ["name", "spotlight", "alias", "thumbnail", "thumbnail_m", "is_oa", "is_oa_brand", "total_follow",
                    "created_at"]


admin.register(Artists)


@admin.register(ArtistOfPlaylist)
class ArtistOfPlaylist(admin.ModelAdmin):
    list_display = ["playlist", "artist", "created_at"]


admin.register(ArtistOfPlaylist)
