from django.db import models
from commons.models import BaseModel
from playlists.models import TopicPlaylist
from topic_category.models import Hub
from playlist_detail.models import TopicSong


# Create your models here.

class TopicPlaylistOfHub(BaseModel):
    class Meta:
        ordering = ['created_at']

    hub = models.ForeignKey(Hub, on_delete=models.CASCADE)
    topic_playlist = models.ForeignKey(TopicPlaylist, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.hub.title}_{self.topic_playlist.title}"


class TopicSongOfHub(BaseModel):
    class Meta:
        ordering = ['created_at']

    hub = models.ForeignKey(Hub, on_delete=models.CASCADE)
    topic_song = models.ForeignKey(TopicSong, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.hub.title}_{self.topic_song.title}"

