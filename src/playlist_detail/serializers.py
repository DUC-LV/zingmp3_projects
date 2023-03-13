from .models import Songs, Albums
from rest_framework import serializers


class SongSerializers(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ["id", "title", "alias", "is_offical", "user_name", "artist_names", "is_world_wide", "thumbnail_m",
                  "thumbnail", "duration", "zing_choice", "is_private", "pre_release", "release_date", "is_indie",
                  "streaming_status", "allow_audio_ads", "has_lyric"]


class AlbumSerializers(serializers.ModelSerializer):
    class Meta:
        model = Albums
        fields = ["id", "title", "thumbnail", "is_offical", "is_indie", "release_date", "sort_description",
                  "released_at", "pr", "artist_names"]
