from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from banners.serializers import BannerSerializers
from banners.models import Banners
from playlists.models import TopicPlaylist, Playlists, PlaylistOfTopic, Artists, ArtistOfPlaylist
from playlists.serializers import TopicPlaylistSerializers, PlaylistSerializers, ArtistSerializers
from rest_framework.permissions import AllowAny
from live_stream.models import Streamings, Hosts, Programs, HostOfStreaming, ProgramOfStreaming
from live_stream.serializers import StreamingSerializers, HostSerializers, ProgramSerializers


# Create your views here.

class HomeAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        items = []

        # banner
        banners = Banners.objects.all()
        if not banners.exists():
            return HttpResponse(status=404)
        serializerBanner = BannerSerializers(banners, many=True).data
        serializerBannerData = serializerBanner[-1::-4]

        res_banner = {
            "sectionType": "banner",
            "viewType": "slider",
            "title": "",
            "link": "",
            "sectionId": "",
            "items": serializerBannerData,
        }
        items.append(res_banner)

        # live stream
        stream = Streamings.objects.all()
        stream_data = []

        for st in stream:
            host_stream = HostOfStreaming.objects.filter(streaming=st)
            program_stream = ProgramOfStreaming.objects.filter(streaming=st)
            stream_dict = dict(StreamingSerializers(st).data, **{"host": HostSerializers(host_stream[0].host).data},
                               **{"program": ProgramSerializers(program_stream[0].program).data})
            stream_data.append(stream_dict)

        res_streaming = {
            "sectionType": "livestream",
            "viewType": "slider",
            "title": "",
            "link": "",
            "sectionId": "radHot",
            "items": stream_data
        }
        items.append(res_streaming)

        # playlist
        all_topic = TopicPlaylist.objects.filter(title__in=(
            'Lựa chọn hôm nay', 'Có Thể Bạn Muốn Nghe', 'Chill', 'Nữ nghệ sĩ Việt nổi bật 🌹'
        ))
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
