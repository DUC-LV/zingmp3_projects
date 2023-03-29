from .models import Streamings, Hosts, Programs, HostOfStreaming, ProgramOfStreaming
from rest_framework import serializers


class StreamingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Streamings
        fields = ["id", "title", "thumbnail", "thumbnail_m", "thumbnail_v", "thumbnail_h", "description", "status",
                  "type", "streaming", "active_users"]


class HostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Hosts
        fields = ["id", "name", "thumbnail"]


class ProgramSerializers(serializers.ModelSerializer):
    class Meta:
        model = Programs
        fields = ["id", "title", "thumbnail", "thumbnail_h", "description", "start_time", "end_time", "has_song_request"]
