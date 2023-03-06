from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from banners.serializers import BannerSerializers
from banners.models import Banners
from playlists.models import TopicPlaylist, Playlists, PlaylistOfTopic, Artists, ArtistOfPlaylist
from playlists.serializers import TopicPlaylistSerializers, PlaylistSerializers, ArtistSerializers


# Create your views here.

class HomeAPIView(APIView):
    def get(self, request):
        banners = Banners.objects.all()
        if not banners.exists():
            return HttpResponse(status=404)

        serializerBanner = BannerSerializers(banners, many=True).data
        all_topic = TopicPlaylist.objects.filter()
        topic_id = [tp.id for tp in all_topic]
        topic_playlist = PlaylistOfTopic.objects.filter(topic_id__in=topic_id)
        print(topic_playlist)
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
                        "sectionId": "",
                        "items": serializerBanner,
                    },
                    {
                        "sectionType": "playlist",
                        "viewType": "slider",
                        "title": "",
                        "link": "",
                        "sectionId": "",
                        "items": ""
                    }
                ]
            }
        }
        return JsonResponse(res, safe=False)
