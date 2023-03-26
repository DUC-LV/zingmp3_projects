from django.contrib import admin
from .models import Songs, SongOfPlaylist, ArtistOfSong, Albums, AlbumOfSong, ArtistOfAlbum, TopicSong, SongOfTopic


# Register your models here.
@admin.register(Songs)
class Songs(admin.ModelAdmin):
    list_display = ["title", "alias", "is_offical", "user_name", "artist_names", "is_world_wide", "thumbnail_m",
                    "thumbnail", "duration", "zing_choice", "is_private", "pre_release", "release_date", "is_indie",
                    "streaming_status", "allow_audio_ads", "has_lyric", "created_at"]


admin.register(Songs)


@admin.register(SongOfPlaylist)
class SongOfPlaylist(admin.ModelAdmin):
    list_display = ["playlist", "song", "created_at"]


admin.register(SongOfPlaylist)


@admin.register(ArtistOfSong)
class ArtistOfSong(admin.ModelAdmin):
    list_display = ["song", "artist", "created_at"]


admin.register(ArtistOfSong)


@admin.register(Albums)
class Albums(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "is_offical", "is_indie", "release_date", "sort_description", "released_at", "pr",
                    "artist_names", "created_at"]


admin.register(Albums)


@admin.register(AlbumOfSong)
class AlbumOfSong(admin.ModelAdmin):
    list_display = ["album", "song", "created_at"]


admin.register(AlbumOfSong)


@admin.register(ArtistOfAlbum)
class ArtistOfAlbum(admin.ModelAdmin):
    list_display = ["artist", "album", "created_at"]


admin.register(ArtistOfAlbum)


@admin.register(TopicSong)
class TopicSong(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicSong)


@admin.register(SongOfTopic)
class SongOfTopic(admin.ModelAdmin):
    list_display = ["topic", "song", "created_at"]


admin.register(SongOfTopic)
