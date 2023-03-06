from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from banners.serializers import BannerSerializers
from banners.models import Banners


# Create your views here.

class HomeAPIView(APIView):
    def get(self, request):
        banners = Banners.objects.all()
        if not banners.exists():
            return HttpResponse(status=404)

        serializerBanner = BannerSerializers(banners, many=True).data
        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": [
                    {
                        "sectionType": "banner",
                        "viewType": "slider",
                        "title": "",
                        "link": "",
                        "sectionId": "hSlider",
                        "items": serializerBanner,
                    }
                ]
            }
        }
        return JsonResponse(res, safe=False)
