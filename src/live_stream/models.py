from django.db import models
from commons.models import BaseModel


# Create your models here.
class Streamings(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_v = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_h = models.CharField(max_length=400, default=None, blank=True)
    description = models.TextField(default=None, blank=True)
    status = models.IntegerField(default=None, blank=True)
    type = models.CharField(max_length=100, default=None, blank=True)
    streaming = models.CharField(max_length=400, default=None, blank=True)
    active_users = models.IntegerField(default=None, blank=True)

    def __str__(self):
        return self.title


class Hosts(BaseModel):
    class Meta:
        ordering = ['created_at']

    name = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)

    def __str__(self):
        return self.name


class Programs(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_h = models.CharField(max_length=400, default=None, blank=True)
    description = models.TextField(default=None, blank=True)
    start_time = models.IntegerField(default=None, blank=True)
    end_time = models.IntegerField(default=None, blank=True)
    has_song_request = models.BooleanField(default=None, blank=True)

    def __str__(self):
        return self.title


class HostOfStreaming(BaseModel):
    class Meta:
        ordering = ['created_at']

    host = models.ForeignKey(Hosts, on_delete=models.CASCADE)
    streaming = models.ForeignKey(Streamings, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.host.name}_{self.streaming.title}"


class ProgramOfStreaming(BaseModel):
    class Meta:
        ordering = ['created_at']

    program = models.ForeignKey(Programs, on_delete=models.CASCADE)
    streaming = models.ForeignKey(Streamings, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.program.title}_{self.streaming.title}"

