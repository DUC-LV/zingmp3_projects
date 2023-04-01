from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import Streamings, Hosts, Programs
from .serializers import StreamingSerializers, HostSerializers, ProgramSerializers
from rest_framework.permissions import AllowAny


# Create your views here.
class StreamingAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        streaming = Streamings.objects.create(
            title=data["title"],
            thumbnail=data["thumbnail"],
            thumbnail_m=data["thumbnailM"],
            thumbnail_v=data["thumbnailV"],
            thumbnail_h=data["thumbnailH"],
            description=data["description"],
            status=data["status"],
            type=data["type"],
            streaming=data["streaming"],
            active_users=data["activeUsers"]
        )

        streaming.save()
        serializer = StreamingSerializers(streaming).data

        return JsonResponse(serializer, safe=False)

    def get(self, request):
        streaming = Streamings.objects.all()

        if not streaming.exists():
            return HttpResponse(status=404)

        serializer = StreamingSerializers(streaming, many=True)
        return JsonResponse(serializer.data, safe=False)


class HostAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        host = Hosts.objects.create(
            name=data["name"],
            thumbnail=data["thumbnail"]
        )

        host.save()
        serializer = StreamingSerializers(host).data

        return JsonResponse(serializer, safe=False)

    def get(self, request):
        host = Hosts.objects.all()

        if not host.exists():
            return HttpResponse(status=404)

        serializer = HostSerializers(host, many=True)
        return JsonResponse(serializer.data, safe=False)


class ProgramAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        program = Programs.objects.create(
            title=data["title"],
            thumbnail=data["thumbnail"],
            thumbnail_h=data["thumbnailH"],
            description=data["description"],
            start_time=data["startTime"],
            end_time=data["endTime"],
            has_song_request=data["hasSongRequest"]
        )

        program.save()
        serializer = StreamingSerializers(program).data

        return JsonResponse(serializer, safe=False)

    def get(self, request):
        program = Programs.objects.all()

        if not program.exists():
            return HttpResponse(status=404)

        serializer = ProgramSerializers(program, many=True)
        return JsonResponse(serializer.data, safe=False)
