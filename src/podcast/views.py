from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TopicPodCastSerializers, PodCastSerializers, TopicPodCastCategorySerializers, \
    PodCastCategorySerializers
from .models import TopicPodCast, PodCast, TopicPodCastCategory, PodCastCategory
from django.http import HttpResponse, JsonResponse


# Create your views here.

class TopicPodCastAPIView(APIView):

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        topic = TopicPodCast.objects.create(
            title=data["title"]
        )

        topic.save()
        serializer = TopicPodCastSerializers(topic).data
        return JsonResponse(serializer, safe=False)

    def get(self, request):
        topic = TopicPodCast.objects.all()
        if not topic.exists():
            return HttpResponse(status=404)

        serializer = TopicPodCastSerializers(topic, many=True)
        return JsonResponse(serializer.data, safe=False)


class PodCastAPIView(APIView):

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        podcast = PodCast.objects.create(
            title=data["title"],
            thumbnail_m=data["thumbnailM"],
            thumbnail=data["thumbnail"],
            isoffical=data["isoffical"],
            description=data["description"],
            content_type=data["contentType"],
            type=data["type"]
        )

        podcast.save()
        serializer = PodCastSerializers(podcast).data
        return JsonResponse(serializer, safe=False)

    def get(self, request):
        podcast = PodCast.objects.all()
        if not podcast.exists():
            return HttpResponse(status=404)

        serializer = PodCastSerializers(podcast, many=True)
        return JsonResponse(serializer.data, safe=False)


class TopicPodCastCategoryAPIView(APIView):

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        topic = TopicPodCastCategory.objects.create(
            title=data["title"]
        )

        topic.save()
        serializer = TopicPodCastCategorySerializers(topic).data
        return JsonResponse(serializer, safe=False)

    def get(self, request):
        topic = TopicPodCastCategory.objects.all()
        if not topic.exists():
            return HttpResponse(status=404)

        serializer = TopicPodCastCategorySerializers(topic, many=True)
        return JsonResponse(serializer.data, safe=False)


class PodCastCategoryAPIView(APIView):
    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        podcast_category = PodCastCategory.objects.create(
            name=data["name"],
            title=data["title"],
            thumbnail=data["thumbnail"],
        )

        podcast_category.save()
        serializer = PodCastCategorySerializers(podcast_category).data
        return JsonResponse(serializer, safe=False)

    def get(self, request):
        podcast_category = PodCastCategory.objects.all()
        if not podcast_category.exists():
            return HttpResponse(status=404)

        serializer = PodCastCategorySerializers(podcast_category, many=True)
        return JsonResponse(serializer.data, safe=False)
