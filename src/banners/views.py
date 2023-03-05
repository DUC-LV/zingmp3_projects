from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import BannerSerializers
from .models import Banners


# Create your views here.

class BannerAPIView(APIView):
    def get(self, request):
        banners = Banners.objects.all()
        if not banners.exists():
            return HttpResponse(status=404)

        serializer = BannerSerializers(banners, many=True)
        return JsonResponse(serializer.data, safe=False)

    def put(self, request, id=None, *args, **kwargs):
        banner = Banners.objects.get()
        data = request.data

        banner.type = data["type"]
        # banner.banner = data["banner"]
        # banner.cover = data["cover"]
        # banner.target = data["target"]
        # banner.title = data["title"]
        # banner.description = data["description"]
        # banner.is_pr = data["ispr"]
        banner.save()
        print(banner)
        serializer = BannerSerializers(banner, many=True)
        return JsonResponse(serializer.data, safe=False)

