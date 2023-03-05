from django.db import models
from commons.models import BaseModel


# Create your models here.
class Banners(BaseModel):
    class Meta:
        ordering = ['created_at']

    type = models.IntegerField()
    banner = models.CharField(max_length=300)
    cover = models.CharField(max_length=300)
    target = models.CharField(max_length=100, default='1')
    title = models.CharField(max_length=200, default=None, blank=True)
    description = models.TextField(default=None, blank=True)
    is_pr = models.IntegerField(default=0)

    def __str__(self):
        return self.title
