from .models import DataArtistDetail
from rest_framework import serializers


class DataArtistDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataArtistDetail
        fields = ["cover", "biography", "sort_biography", "national", "birthday", "real_name"]
