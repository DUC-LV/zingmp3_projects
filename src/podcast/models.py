from django.db import models
from commons.models import BaseModel


# Create your models here.
class TopicPodCast(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)

    def __str__(self):
        return self.title


class PodCast(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    isoffical = models.BooleanField(default=True)
    description = models.TextField(default=None, blank=True)
    content_type = models.CharField(max_length=200, default=None, blank=True)
    type = models.CharField(max_length=200, default=None, blank=True)

    def __str__(self):
        return self.title


class TopicPodCastCategory(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)

    def __str__(self):
        return self.title


class PodCastCategory(BaseModel):
    class Meta:
        ordering = ['created_at']

    name = models.CharField(max_length=200, default=None, blank=True)
    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)

    def __str__(self):
        return self.name


class PodCastOfTopic(BaseModel):
    class Meta:
        ordering = ['created_at']

    topic = models.ForeignKey(TopicPodCast, on_delete=models.CASCADE)
    podcast = models.ForeignKey(PodCast, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.topic.title}_{self.podcast.title}"


class PodCastCategoryOfTopic(BaseModel):
    class Meta:
        ordering = ['created_at']

    topic = models.ForeignKey(TopicPodCastCategory, on_delete=models.CASCADE)
    podcast_category = models.ForeignKey(PodCastCategory, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.topic.title}_{self.podcast_category.name}"


