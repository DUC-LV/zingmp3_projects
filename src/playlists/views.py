from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import TopicPlaylist, Playlists, Artists, PlaylistOfTopic, ArtistOfPlaylist
from .serializers import TopicPlaylistSerializers, PlaylistSerializers, ArtistSerializers, PlaylistSortDataSerializers
from rest_framework.permissions import AllowAny


# Create your views here.
class TopicPlaylistAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        topics = TopicPlaylist.objects.create(
            title=data["title"]
        )
        topics.save()
        serializer = TopicPlaylistSerializers(topics).data
        return JsonResponse(serializer, safe=False)


class PlaylistAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        playlists = Playlists.objects.all()
        if not playlists.exists():
            return HttpResponse(status=404)

        serializer = PlaylistSerializers(playlists, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        playlist = Playlists.objects.create(
            title=data["title"],
            thumbnail=data["thumbnail"],
            isoffical=data["isoffical"],
            is_indie=data["isIndie"],
            release_date=data["releaseDate"],
            sort_description=data["sortDescription"],
            released_at=data["releasedAt"],
            pr=data["PR"],
            artist_names=data["artistsNames"],
            play_item_mode=data["playItemMode"],
            sub_type=data["subType"],
            uid=data["uid"],
            thumbnail_m=data["thumbnailM"],
            is_shuffle=data["isShuffle"],
            is_private=data["isPrivate"],
            user_name=data["userName"],
            is_album=data["isAlbum"],
            text_type=data["textType"],
            is_single=data["isSingle"]
        )
        playlist.save()
        serializer = PlaylistSerializers(playlist).data

        return JsonResponse(serializer, safe=False)


class ArtistAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        artists = Artists.objects.all()
        if not artists.exists():
            return HttpResponse(status=404)

        serializer = ArtistSerializers(artists, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = request.data
        artist = Artists.objects.create(
            name=data["name"],
            spotlight=data["spotlight"],
            alias=data["alias"],
            thumbnail=data["thumbnail"],
            thumbnail_m=data["thumbnailM"],
            is_oa=data["isOA"],
            is_oa_brand=data["isOABrand"],
            total_follow=data["totalFollow"]
        )

        artist.save()
        serializers = ArtistSerializers(artist).data

        return JsonResponse(serializers, safe=False)


class PostPlaylistDataSort(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        playlist = Playlists.objects.create(
            thumbnail=data["thumbnail"],
            thumbnail_m=data["thumbnailM"],
            title=data["title"],
            sort_description=data["sortDescription"],
            artist_names=data["artistsNames"],
        )

        playlist.save()
        serializers = PlaylistSortDataSerializers(playlist).data

        return JsonResponse(serializers, safe=False)
