from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from live_stream.models import Streamings, Hosts, Programs, HostOfStreaming, ProgramOfStreaming
from live_stream.serializers import StreamingSerializers, HostSerializers, ProgramSerializers
from podcast.models import TopicPodCast, PodCast, TopicPodCastCategory, PodCastCategory, PodCastOfTopic, \
    PodCastCategoryOfTopic
from podcast.serializers import TopicPodCastSerializers, PodCastSerializers, TopicPodCastCategorySerializers, \
    PodCastCategorySerializers


# Create your views here.
class RadioAPIView(APIView):

    def get(self, request):

        items = []
        # streaming

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

        # category podcast

        topic = TopicPodCastCategory.objects.all()
        podcast_category_data = []

        topic_podcast_category = PodCastCategoryOfTopic.objects.filter(topic=topic[0])
        for i in topic_podcast_category:
            podcast_category_data.append(PodCastCategorySerializers(i.podcast_category).data)

        res_category_podcast = {
            "sectionType": "podcast_category",
            "viewType": "slider",
            "title": "Thể loại podcast",
            "link": "",
            "sectionId": "radPromoteCategory",
            "items": podcast_category_data
        }
        items.append(res_category_podcast)

        # podcast

        topic_pc = TopicPodCast.objects.all()
        topic_podcast = PodCastOfTopic.objects.filter(topic__in=topic_pc)
        topic_podcast_map = {}

        for tp_pc in topic_podcast:
            podcast = tp_pc.podcast
            podcast_map = topic_podcast_map.get(tp_pc.topic_id, None)
            podcast_data = PodCastSerializers(podcast).data
            if podcast_map is None:
                topic_podcast_map[tp_pc.topic_id] = [podcast_data]
            else:
                topic_podcast_map[tp_pc.topic_id].append(podcast_data)

        res_podcast = []
        for topic in topic_pc:
            res_podcast.append({
                "sectionType": "podcastH",
                "viewType": "slider",
                "title": topic.title,
                "link": "",
                "sectionId": "radSponsoredProgram",
                "items": topic_podcast_map[topic.id]
            })

        for i in range(len(res_podcast)):
            items.append(res_podcast[i])

        # res_home_radio

        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": items,
                "hasMore": "true",
                "total": len(items)
            }
        }

        return JsonResponse(res, safe=False)


class GetStreamingDetailAPIView(APIView):
    def get(self, request, id):

        streaming = Streamings.objects.filter(id=id).all()
        if not streaming.exists():
            return HttpResponse(status=404)

        host_stream = HostOfStreaming.objects.filter(streaming=streaming[0])
        program_stream = ProgramOfStreaming.objects.filter(streaming=streaming[0])

        stream_dict = dict(StreamingSerializers(streaming[0]).data, **{"host": HostSerializers(host_stream[0].host).data},
                           **{"program": ProgramSerializers(program_stream[0].program).data})

        res = {
            "err": 0,
            "msg": "Success",
            "data": stream_dict
        }

        return JsonResponse(res, safe=False)
