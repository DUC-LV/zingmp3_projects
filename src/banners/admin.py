from django.contrib import admin
from .models import Banners

# Register your models here.


@admin.register(Banners)
class Banners(admin.ModelAdmin):
    list_display = ["type", "banner", "cover", "target", "title", "description", "is_pr", "created_at"]


admin.register(Banners)
