from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from topic_category.models import Hub
from .models import TopicPlaylistOfHub
from playlists.models import PlaylistOfTopic, ArtistOfPlaylist
from playlists.serializers import ArtistSerializers, PlaylistSerializers
from topic_category.serializers import HubSerializers


# Create your views here.
class TopicCategoryDetail(APIView):
    def get(self, request, id):
        items = []

        # hub_data
        hub = Hub.objects.filter(id=id).all()
        hub_data = HubSerializers(hub[0]).data

        # list_playlist
        topicPlaylist_hub = TopicPlaylistOfHub.objects.filter(hub_id=hub[0])
        topic_playlist = [tp.topic_playlist for tp in topicPlaylist_hub]
        topic_playlist_id = [tp.id for tp in topic_playlist]
        playlist_topic = PlaylistOfTopic.objects.filter(topic_id__in=topic_playlist_id)
        topic_playlists_map = {}
        for tp_pl in playlist_topic:
            playlist = tp_pl.playlist
            playlist_map = topic_playlists_map.get(tp_pl.topic_id, None)
            playlist_artist = ArtistOfPlaylist.objects.filter(playlist_id=playlist)
            artist_data = []
            for artist in playlist_artist:
                artist_data.append(ArtistSerializers(artist.artist).data)
            playlist_data = PlaylistSerializers(playlist).data
            playlist_dict = dict(playlist_data, **{"artists": artist_data})
            if playlist_map is None:
                topic_playlists_map[tp_pl.topic_id] = [playlist_dict]
            else:
                topic_playlists_map[tp_pl.topic_id].append(playlist_dict)
        res_playlist = []
        for topic in topic_playlist:
            res_playlist.append({
                "sectionType": "playlist",
                "viewType": 'slider' if len(topic_playlist) > 1 else 'list',
                "title": topic.title,
                "link": "",
                "items": topic_playlists_map[topic.id]
            })
        for i in range(len(res_playlist)):
            items.append(res_playlist[i])

        # song of hub

        res = dict(hub_data, **{"sections": items})
        res_hub_detail = {
            "err": 0,
            "msg": "Success",
            "data": res
        }
        return JsonResponse(res_hub_detail, safe=False)
