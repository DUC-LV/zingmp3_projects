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
        items = []

        # banner
        banners = Banners.objects.all()
        if not banners.exists():
            return HttpResponse(status=404)
        serializerBanner = BannerSerializers(banners, many=True).data
        res_banner = {
            "sectionType": "banner",
            "viewType": "slider",
            "title": "",
            "link": "",
            "sectionId": "",
            "items": serializerBanner,
        }
        items.append(res_banner)

        # playlist
        all_topic = TopicPlaylist.objects.all()
        topic_ids = [tp.id for tp in all_topic]
        topic_playlist = PlaylistOfTopic.objects.filter(topic_id__in=topic_ids)
        topic_playlists_map = {}
        for tp_pl in topic_playlist:
            playlist = tp_pl.playlist
            playlist_map = topic_playlists_map.get(tp_pl.topic_id, None)
            playlist_artist = ArtistOfPlaylist.objects.filter(playlist_id=playlist)
            artist_data = []
            for artist in playlist_artist:
                artist_data.append(ArtistSerializers(artist.artist).data)
            playlist_data = PlaylistSerializers(playlist).data
            dict_artist = {"artists": artist_data}
            playlist_dict = dict(playlist_data, **dict_artist)
            if playlist_map is None:
                topic_playlists_map[tp_pl.topic_id] = [playlist_dict]
            else:
                topic_playlists_map[tp_pl.topic_id].append(playlist_dict)
        res_playlist = []
        for topic in all_topic:
            res_playlist.append({
                "sectionType": "playlist",
                "viewType": "slider",
                "title": topic.title,
                "link": "",
                "items": topic_playlists_map[topic.id]
            })
        for i in range(len(res_playlist)):
            items.append(res_playlist[i])
        # home
        res_home = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": items
            }
        }
        return JsonResponse(res_home, safe=False)
