from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .serializers import ArtistDetailSerializers
from playlists.models import Artists, ArtistOfPlaylist
from playlists.serializers import ArtistSerializers, PlaylistSerializers
from playlist_detail.models import ArtistOfSong, AlbumOfSong, ArtistOfAlbum
from playlist_detail.serializers import SongSerializers, AlbumSerializers
from rest_framework.permissions import AllowAny


# Create your views here.

class GetArtistDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        # thông tin artist_detail
        artist = Artists.objects.filter(id=id).all()
        data_artist = ArtistDetailSerializers(artist[0]).data

        # song artist_detail **************
        artSong = ArtistOfSong.objects.filter(artist=artist[0].id)  # lấy tất cả Song có tên artist đó
        list_song = [art_s.song for art_s in artSong]  # Tạo danh sách list song
        song_arr = []
        for s in list_song:
            artists_songs = ArtistOfSong.objects.filter(song_id=s.id).all()  # Lấy danh sách artist trong list song
            song_albums = AlbumOfSong.objects.filter(song_id=s.id)
            artists_album_data = []
            albums_dict = {}
            for ab_s in song_albums:
                ars = ab_s.album
                artists_album = ArtistOfAlbum.objects.filter(album_id=ars.id).all()
                for ar_bl in artists_album:
                    art = ar_bl.artist
                    artists_album_data.append(ArtistSerializers(art).data)
                albums_dict = dict(AlbumSerializers(ars).data, **{"artists": artists_album_data})
            artists_data_song = []
            for art_s in artists_songs:
                art = art_s.artist
                artists_data_song.append(ArtistSerializers(art).data)
            song_data = dict(SongSerializers(s).data, **{"album": albums_dict}, **{"artists": artists_data_song})
            song_arr.append(song_data)

        # playlist artist_detail **************
        artistPlaylist = ArtistOfPlaylist.objects.filter(artist_id=artist[0].id)  # lấy tất cả playlist có tên artist đó
        list_playlist = [art_pl.playlist for art_pl in artistPlaylist]  # Lấy danh sách playlist
        playlist_arr = []
        for l_pl in list_playlist:
            artist_playlists = ArtistOfPlaylist.objects.filter(
                                playlist_id=l_pl.id)  # Lấy danh sách artist trong playlist
            artists_data_playlist = []
            for art_s in artist_playlists:
                arts = art_s.artist
                artists_data_playlist.append(ArtistSerializers(arts).data)
            playlist_dict = dict(PlaylistSerializers(l_pl).data, **{"artists": artists_data_playlist})
            playlist_arr.append(playlist_dict)

        # album artist_detail **************
        artists_album = ArtistOfAlbum.objects.filter(artist_id=artist[0].id)
        list_album = [art_al.album for art_al in artists_album]
        album_arr = []
        for l_al in list_album:
            artist_album = ArtistOfAlbum.objects.filter(album_id=l_al.id)
            artists_data_album = []
            for art_s in artist_album:
                arts = art_s.artist
                artists_data_album.append(ArtistSerializers(arts).data)
            album_dict = dict(AlbumSerializers(l_al).data, **{"artists": artists_data_album})
            album_arr.append(album_dict)

        # res_api **************
        res = dict(data_artist,
                   **{"sections": [
                       {
                           "sectionType": "song",
                           "viewType": "slider",
                           "title": "Bài hát nổi bật",
                           "sectionId": "aSongs",
                           "items": song_arr
                       },
                       {
                           "sectionType": "playlist",
                           "viewType": "slider",
                           "title": "Single & EP",
                           "sectionId": "aSingle",
                           "items": playlist_arr,
                       },
                       {
                           "sectionType": "album",
                           "viewType": "slider",
                           "title": "Single & EP",
                           "sectionId": "aAlbum",
                           "items": album_arr,
                       },
                   ]}
                   )
        res_artist_detail = {
            "err": 0,
            "msg": "Success",
            "data": res
        }
        return JsonResponse(res_artist_detail, safe=False)
