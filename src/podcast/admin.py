from django.contrib import admin
from .models import TopicPodCast, PodCast, TopicPodCastCategory, PodCastCategory, PodCastOfTopic, PodCastCategoryOfTopic


# Register your models here.
@admin.register(TopicPodCast)
class TopicPodCast(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicPodCast)


@admin.register(PodCast)
class PodCast(admin.ModelAdmin):
    list_display = ["title", "thumbnail_m", "thumbnail", "isoffical", "description", "content_type", "type",
                    "created_at"]


admin.register(PodCast)


@admin.register(TopicPodCastCategory)
class TopicPodCastCategory(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicPodCastCategory)


@admin.register(PodCastCategory)
class PodCastCategory(admin.ModelAdmin):
    list_display = ["name", "title", "thumbnail", "created_at"]


admin.register(PodCastCategory)


@admin.register(PodCastOfTopic)
class PodCastOfTopic(admin.ModelAdmin):
    list_display = ["topic", "podcast", "created_at"]


admin.register(PodCastOfTopic)


@admin.register(PodCastCategoryOfTopic)
class PodCastCategoryOfTopic(admin.ModelAdmin):
    list_display = ["topic", "podcast_category", "created_at"]


admin.register(PodCastCategoryOfTopic)
