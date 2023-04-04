from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from playlists.models import Playlists, Artists, ArtistOfPlaylist
from playlists.serializers import PlaylistSerializers, ArtistSerializers
from rest_framework.permissions import IsAuthenticated
from playlist_detail.models import Songs, ArtistOfSong, AlbumOfSong, ArtistOfAlbum
from playlist_detail.serializers import SongSerializers, AlbumSerializers


# Create your views here.

class FollowAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        playlist_id = request.data.get('id_playlist', None)
        song_id = request.data.get('id_song', None)
        playlist = Playlists.objects.filter(id=playlist_id)
        song = Songs.objects.filter(id=song_id)
        if playlist and not song:
            list_post_playlist = user.follow_playlist.all()
            if playlist_id in list_post_playlist:
                user.follow_playlist.remove(playlist[0])
            else:
                user.follow_playlist.add(playlist[0])
            return JsonResponse({
                "err": 0,
                "msg": "Success",
                "data": None
            }, safe=False)

        if not playlist and song:
            list_post_song = user.follow_song.all()
            if song_id in list_post_song:
                user.follow_song.remove(song[0])
            else:
                user.follow_song.add(song[0])
            return JsonResponse({
                "err": 0,
                "msg": "Success",
                "data": None
            }, safe=False)

        return JsonResponse({"code": 400, "message": "Bad Request"}, safe=False)

    def get(self, request):
        user = request.user
        if not user:
            return JsonResponse({'code': 200, "msg": "Success", "data": {}})

        # playlist
        playlist_list = user.follow_playlist.all()
        data_playlist = []
        for playlist in playlist_list:
            playlist_artist = ArtistOfPlaylist.objects.filter(playlist_id=playlist)
            artist_data = []
            for artist in playlist_artist:
                artist_data.append(ArtistSerializers(artist.artist).data)
            playlist_data = PlaylistSerializers(playlist).data
            dict_artist = {"artists": artist_data}
            playlist_dict = dict(playlist_data, **dict_artist)
            data_playlist.append(playlist_dict)

        res_playlist = {
            "sectionType": "playlist",
            "viewType": "slider",
            "items": data_playlist
        }

        # song
        song_list = user.follow_song.all()
        data_song = []
        for song in song_list:
            # artist
            artist_song = ArtistOfSong.objects.filter(song_id=song)
            artist_song_data = []
            for artist_song in artist_song:
                artist_song_data.append(ArtistSerializers(artist_song.artist).data)

            # album
            album_song = AlbumOfSong.objects.filter(song_id=song)
            album_song_data = {}
            for album_song in album_song:
                artist_album = ArtistOfAlbum.objects.filter(album_id=album_song.album)
                artist_album_data = []
                # artist_album
                for artist_album in artist_album:
                    artist_album_data.append(ArtistSerializers(artist_album.artist).data)
                album_song_data = dict(AlbumSerializers(album_song.album).data, **{"artist": artist_album_data})

            # data_song
            song_json = dict(SongSerializers(song).data, **{"artists": artist_song_data},
                             **{"album": album_song_data})
            data_song.append(song_json)

        res_song = {
            "sectionType": "songs",
            "items": data_song
        }

        # response
        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": [res_playlist, res_song]
            }
        }
        return JsonResponse(res, safe=False)

