from .models import Banners
from rest_framework import serializers


class BannerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Banners
        fields = ["type", "banner", "cover", "target", "title", "description", "is_pr", "id"]
