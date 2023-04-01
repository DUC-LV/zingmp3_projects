from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import TopicHub, Hub, PlaylistOfHub, HubOfTopic
from .serializers import TopicHubSerializers, HubSerializers
from random import choice
from playlists.models import Playlists, ArtistOfPlaylist
from playlists.serializers import ArtistSerializers, PlaylistSerializers
from rest_framework.permissions import AllowAny


# Create your views here.
class TopicHubAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, reuqest):
        data = reuqest.data
        if not data:
            return HttpResponse(status=404)
        topics = TopicHub.objects.create(
            title=data["title"]
        )

        topics.save()
        serializers = TopicHubSerializers(topics).data

        return JsonResponse(serializers, safe=False)

    def get(self, request):
        topics = TopicHub.objects.all()
        if not topics.exists():
            return HttpResponse(status=404)

        serializer = TopicHubSerializers(topics, many=True)
        return JsonResponse(serializer.data, safe=False)


class HubAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        hubs = Hub.objects.create(
            cover=data["cover"],
            thumbnail=data["thumbnail"],
            thumbnail_has_text=data["thumbnailHasText"],
            thumbnail_r=data["thumbnailR"],
            title=data["title"],
            description=data["description"]
        )
        hubs.save()

        serializers = HubSerializers(hubs).data

        return JsonResponse(serializers, safe=False)

    def get(self, request):
        hubs = Hub.objects.all()

        if not hubs.exists():
            return HttpResponse(status=404)

        serializer = HubSerializers(hubs, many=True)
        return JsonResponse(serializer.data, safe=False)


class HubPageAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # hub highlight
        topic_highlight = TopicHub.objects.filter(title="Nổi bật")
        hub_topicHighlight = HubOfTopic.objects.filter(topic=topic_highlight[0])
        data_hub_highlight = []
        for hub_topic in hub_topicHighlight:
            data_hub_highlight.append(HubSerializers(hub_topic.hub).data)

        # banner
        hub = Hub.objects.all()
        banner = []
        for hub in hub:
            banner.append(HubSerializers(hub).data)
        banner_data = choice(banner)

        # hub nations
        topic_nation = TopicHub.objects.filter(title="Quốc gia")
        hub_topicNation = HubOfTopic.objects.filter(topic=topic_nation[0])
        data_hub_nations = []
        for hub_topic in hub_topicNation:
            data_hub_nations.append(HubSerializers(hub_topic.hub).data)

        # Top topic
        topic_top = TopicHub.objects.filter(title="Top topic")
        hub_topTopic = HubOfTopic.objects.filter(topic=topic_top[0])
        data_hub_top = []
        for hub_topic in hub_topTopic:
            hub_playlist = PlaylistOfHub.objects.filter(hub=hub_topic.hub)
            playlist_data = []
            for art_pl in hub_playlist:
                artist_playlist = ArtistOfPlaylist.objects.filter(playlist=art_pl.playlist)
                data_artist = []
                for artist in artist_playlist:
                    data_artist.append(ArtistSerializers(artist.artist).data)
                playlist_dict = dict(PlaylistSerializers(art_pl.playlist).data, **{"artists": data_artist})
                playlist_data.append(playlist_dict)
            data_hut = dict(HubSerializers(hub_topic.hub).data, **{"playlists": playlist_data})
            data_hub_top.append(data_hut)

        # topic thịnh hành
        topic_popular = TopicHub.objects.filter(title="Thịnh hành")
        hub_topicPopular = HubOfTopic.objects.filter(topic=topic_popular[0])
        data_hub_popular = []
        for hub_topic in hub_topicPopular:
            hub_playlist = PlaylistOfHub.objects.filter(hub=hub_topic.hub)
            playlist_data = []
            for art_pl in hub_playlist:
                artist_playlist = ArtistOfPlaylist.objects.filter(playlist=art_pl.playlist)
                data_artist = []
                for artist in artist_playlist:
                    data_artist.append(ArtistSerializers(artist.artist).data)
                playlist_dict = dict(PlaylistSerializers(art_pl.playlist).data, **{"artists": data_artist})
                playlist_data.append(playlist_dict)
            data_hut = dict(HubSerializers(hub_topic.hub).data, **{"playlists": playlist_data})
            data_hub_popular.append(data_hut)

        # Response trả về
        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "sectionId": "hub",
                "banners": banner_data,
                "featured": {
                    "title": "Nổi bật",
                    "items": data_hub_highlight
                },
                "nations": {
                    "title": "Quốc gia",
                    "items": data_hub_nations
                },
                "topTopic": {
                    "title": "Top topic",
                    "items": data_hub_top,
                },
                "topic": {
                    "title": "Top topic",
                    "items": data_hub_top[0:8],
                },
                "popular": {
                    "title": "Thịnh hành",
                    "items": data_hub_popular,
                }
            }
        }
        return JsonResponse(res, safe=False)
