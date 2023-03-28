from django.contrib import admin
from .models import Streamings, Hosts, Programs, HostOfStreaming, ProgramOfStreaming


# Register your models here.
@admin.register(Streamings)
class Streamings(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "thumbnail_m", "thumbnail_v", "thumbnail_h", "description", "status", "type",
                    "streaming", "active_users", "created_at"]


admin.register(Streamings)


@admin.register(Hosts)
class Hosts(admin.ModelAdmin):
    list_display = ["name", "thumbnail", "created_at"]


admin.register(Hosts)


@admin.register(Programs)
class Programs(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "thumbnail_h", "description", "start_time", "end_time", "has_song_request",
                    "created_at"]


admin.register(Programs)


@admin.register(HostOfStreaming)
class HostOfStreaming(admin.ModelAdmin):
    list_display = ["host", "streaming", "created_at"]


admin.register(HostOfStreaming)


@admin.register(ProgramOfStreaming)
class ProgramOfStreaming(admin.ModelAdmin):
    list_display = ["program", "streaming", "created_at"]


admin.register(ProgramOfStreaming)
