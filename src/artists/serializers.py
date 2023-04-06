from rest_framework import serializers
from playlists.models import Artists


class ArtistDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ["id", "name", "spotlight", "alias", "thumbnail", "thumbnail_m", "is_oa", "is_oa_brand",
                  "total_follow", "cover", "biography", "sort_biography", "national", "birthday", "real_name"]
