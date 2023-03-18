from django.contrib import admin
from .models import DataArtistDetail, ArtistDetail


# Register your models here.

@admin.register(DataArtistDetail)
class DataArtistDetail(admin.ModelAdmin):
    list_display = ["cover", "biography", "sort_biography", "national", "birthday", "real_name"]


admin.register(DataArtistDetail)


@admin.register(ArtistDetail)
class ArtistDetail(admin.ModelAdmin):
    list_display = ["data", "artist"]


admin.register(ArtistDetail)
