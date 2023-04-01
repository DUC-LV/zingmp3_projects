from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import BannerSerializers
from .models import Banners
from rest_framework.permissions import AllowAny


# Create your views here.

class BannerAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        banners = Banners.objects.all()
        if not banners.exists():
            return HttpResponse(status=404)

        serializer = BannerSerializers(banners, many=True)
        return JsonResponse(serializer.data, safe=False)


class UpdateBannerAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)
        banner = Banners.objects.create(
            type=data["type"],
            banner=data["banner"],
            cover=data["cover"],
            target=data["target"],
            title=data["title"],
            description=data["description"],
            is_pr=data["ispr"],
        )
        banner.save()
        serializer = BannerSerializers(banner).data
        return JsonResponse(serializer, safe=False)
    