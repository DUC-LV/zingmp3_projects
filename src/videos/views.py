from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import TopicVideo, Videos, VideoOfTopic, ArtistOfVideo
from .serializers import TopicVideoSerializers, VideoSerializers
from playlists.serializers import ArtistSerializers


# Create your views here.

class TopicVideoAPIView(APIView):
    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        topic_videos = TopicVideo.objects.create(
            name=data["name"],
            title=data["title"],
            alias=data["alias"]
        )
        topic_videos.save()
        serializer = TopicVideoSerializers(topic_videos).data
        return JsonResponse(serializer, safe=False)

    def get(self, request):
        topic_videos = TopicVideo.objects.all()
        if not topic_videos.exists():
            return HttpResponse(status=404)

        serializer = TopicVideoSerializers(topic_videos, many=True)
        return JsonResponse(serializer.data, safe=False)


class VideoAPIView(APIView):
    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        video = Videos.objects.create(
            title=data["title"],
            alias=data["alias"],
            is_offical=data["isOffical"],
            username=data["username"],
            artist_names=data["artistsNames"],
            is_world_wide=data["isWorldWide"],
            thumbnail_m=data["thumbnailM"],
            thumbnail=data["thumbnail"],
            duration=data["duration"],
            streaming_status=data["streamingStatus"]
        )
        video.save()
        serializer = VideoSerializers(video).data

        return JsonResponse(serializer, safe=False)


class CategoryVideoAPIView(APIView):
    def get(self, request, id):
        items = []
        data_topic = []
        all_topic = TopicVideo.objects.all()
        for all_tp in all_topic:
            data_topic.append(TopicVideoSerializers(all_tp).data)
        dict_topic_video = {
            "id": "tab_vod",
            "name": "menu tab",
            "type": "TAB",
            "display": 0,
            "items": data_topic
        }
        topic_video = TopicVideo.objects.filter(id=id)
        video_topic = VideoOfTopic.objects.filter(topic_id=topic_video[0])
        for vd_tp in video_topic:
            video_artist = ArtistOfVideo.objects.filter(video_id=vd_tp.video)
            artist_data = []
            for artist in video_artist:
                artist_data.append(ArtistSerializers(artist.artist).data)
        dict_res = dict(dict_topic_video)
        items.append(dict_res)
        res = {
            "err": 0,
            "msg": "Success",
            "data": items
        }
        return JsonResponse(res, safe=False)
