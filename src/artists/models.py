from django.db import models
from commons.models import BaseModel
from playlists.models import Artists


# Create your models here.

class DataArtistDetail(BaseModel):
    class Meta:
        ordering = ['created_at']

    cover = models.CharField(max_length=200, default=None, blank=True, null=True)
    biography = models.TextField(default=None, blank=True, null=True)
    sort_biography = models.TextField(default=None, blank=True, null=True)
    national = models.CharField(max_length=200, default=None, blank=True, null=True)
    birthday = models.CharField(max_length=100, default=None, blank=True, null=True)
    real_name = models.CharField(max_length=200, default=None, blank=True, null=True)

    def __str__(self):
        return self.real_name


class ArtistDetail(BaseModel):
    class Meta:
        ordering = ['created_at']
    data = models.ForeignKey(DataArtistDetail, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.artist.name}_{self.data.real_name}"
