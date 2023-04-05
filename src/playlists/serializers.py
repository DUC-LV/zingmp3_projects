from .models import TopicPlaylist, Playlists, Artists, PlaylistOfTopic, ArtistOfPlaylist
from rest_framework import serializers


class TopicPlaylistSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicPlaylist
        fields = ["title"]


class PlaylistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ["id", "title", "thumbnail", "isoffical", "is_indie", "release_date", "sort_description", "released_at"
            , "pr", "artist_names", "play_item_mode", "sub_type", "thumbnail_m", "is_shuffle", "is_private",
                  "user_name", "is_album", "text_type", "is_single", "followed"]


class PlaylistSortDataSerializers(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ["id", "thumbnail", "thumbnail_m", "title", "sort_description", "artist_names"]


class ArtistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ["id", "name", "spotlight", "alias", "thumbnail", "thumbnail_m", "is_oa", "is_oa_brand",
                  "total_follow"]
