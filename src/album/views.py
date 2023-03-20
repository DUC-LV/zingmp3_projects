from django.shortcuts import render
from playlist_detail.models import Songs, ArtistOfSong, Albums, AlbumOfSong, ArtistOfAlbum
from playlist_detail.serializers import SongSerializers, AlbumSerializers
from playlists.models import Artists
from playlists.serializers import ArtistSerializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse


# Create your views here.

class GetAlbumDetail(APIView):
    def get(self, request, id):
        album = Albums.objects.filter(id=id).all()
        if not album.exists():
            return HttpResponse(status=404)
        artist_data = []
        album_artist = ArtistOfAlbum.objects.filter(album_id=album[0])
        for artist in album_artist:
            artist_data.append(ArtistSerializers(artist.artist).data)
        album_data = AlbumSerializers(album[0]).data
        # Song in Album ********
        song_data = []
        song_album = AlbumOfSong.objects.filter(album_id=album[0])
        for song in song_album:
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
        song_dict = {
            "song": {
                "items": song_data
            }
        }
        album_dict = dict(album_data, **{"artists": artist_data}, **song_dict)

        return Response(album_dict)