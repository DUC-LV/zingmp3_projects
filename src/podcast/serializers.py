from .models import TopicPodCast, PodCast, TopicPodCastCategory, PodCastCategory
from rest_framework import serializers


class TopicPodCastSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicPodCast
        fields = ["title"]


class PodCastSerializers(serializers.ModelSerializer):
    class Meta:
        model = PodCast
        fields = ["id", "title", "thumbnail_m", "thumbnail", "isoffical", "description", "content_type", "type"]


class TopicPodCastCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicPodCastCategory
        fields = ["title"]


class PodCastCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = PodCastCategory
        fields = ["id", "name", "title", "thumbnail"]
