from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import Songs, Albums, SongOfPlaylist, ArtistOfSong, AlbumOfSong, ArtistOfAlbum, TopicSong
from .serializers import SongSerializers, AlbumSerializers, TopicSongSerializers
from playlists.models import Playlists, ArtistOfPlaylist
from playlists.serializers import PlaylistSerializers
from playlists.serializers import ArtistSerializers


# Create your views here.

class SongAPIView(APIView):
    def get(self, request):
        song = Songs.objects.all()
        if not song.exists():
            return HttpResponse(status=400)
        serializer = SongSerializers(song, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)
        song = Songs.objects.create(
            title=data["title"],
            alias=data["alias"],
            is_offical=data["isOffical"],
            user_name=data["username"],
            artist_names=data["artistsNames"],
            is_world_wide=data["isWorldWide"],
            thumbnail_m=data["thumbnailM"],
            thumbnail=data["thumbnail"],
            duration=data["duration"],
            zing_choice=data["zingChoice"],
            is_private=data["isPrivate"],
            pre_release=data["preRelease"],
            release_date=data["releaseDate"],
            is_indie=data["isIndie"],
            streaming_status=data["streamingStatus"],
            allow_audio_ads=data["allowAudioAds"],
            has_lyric=data["hasLyric"]
        )
        song.save()
        serializer = SongSerializers(song).data

        return JsonResponse(serializer, safe=False)


class AlbumAPIView(APIView):
    def get(self, request):
        album = Albums.objects.all()
        if not album.exists():
            return HttpResponse(status=400)
        serializer = AlbumSerializers(album, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)
        album = Albums.objects.create(
            title=data["title"],
            thumbnail=data["thumbnail"],
            is_offical=data["isoffical"],
            is_indie=data["isIndie"],
            release_date=data["releaseDate"],
            sort_description=data["sortDescription"],
            released_at=data["releasedAt"],
            pr=data["PR"],
            artist_names=data["artistsNames"]
        )
        album.save()
        serializer = AlbumSerializers(album).data

        return JsonResponse(serializer, safe=False)


class TopicSongAPIView(APIView):
    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)
        topic_song = TopicSong.objects.create(
            title=data["title"],
        )
        topic_song.save()
        serializer = TopicSongSerializers(topic_song).data

        return JsonResponse(serializer, safe=False)

    def get(self, request):
        topic_song = TopicSong.objects.all()
        if not topic_song.exists():
            return HttpResponse(status=400)
        serializer = TopicSongSerializers(topic_song, many=True)
        return JsonResponse(serializer.data, safe=False)


class GetPlaylistDetail(APIView):
    def get(self, request, id):
        playlist = Playlists.objects.filter(id=id).all()
        if not playlist.exists():
            return HttpResponse(status=404)
        artist_data = []
        playlist_artist = ArtistOfPlaylist.objects.filter(playlist_id=playlist[0])
        for artist in playlist_artist:
            artist_data.append(ArtistSerializers(artist.artist).data)
        playlist_data = PlaylistSerializers(playlist[0]).data
        dict_artist_playlist = {"artists": artist_data}
        # songs
        song_data = []
        song_playlist = SongOfPlaylist.objects.filter(playlist_id=playlist[0])
        for song in song_playlist:
            # artist
            artist_song = ArtistOfSong.objects.filter(song_id=song.song)
            artist_song_data = []
            for artist_song in artist_song:
                artist_song_data.append(ArtistSerializers(artist_song.artist).data)
            # album
            album_song = AlbumOfSong.objects.filter(song_id=song.song)
            album_song_data = {}
            for album_song in album_song:
                artist_album = ArtistOfAlbum.objects.filter(album_id=album_song.album)
                artist_album_data = []
                # artist_album
                for artist_album in artist_album:
                    artist_album_data.append(ArtistSerializers(artist_album.artist).data)
                album_song_data = dict(AlbumSerializers(album_song.album).data, **{"artist": artist_album_data})

            # data_song
            song_json = dict(SongSerializers(song.song).data, **{"artists": artist_song_data},
                             **{"album": album_song_data})
            song_data.append(song_json)
        # playlist_detail
        song_dict = {
            "song": {
                "items": song_data
            }
        }
        playlist_dict = dict(playlist_data, **dict_artist_playlist, **song_dict)
        res = {
            "err": 0,
            "msg": "Success",
            "data": playlist_dict,
        }

        return JsonResponse(res, safe=False)
