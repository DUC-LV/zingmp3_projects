# Generated by Django 3.2.18 on 2023-04-04 12:26

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('playlists', '0004_alter_playlists_uid'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlists',
            name='followed',
            field=models.ManyToManyField(related_name='follow_playlist', to=settings.AUTH_USER_MODEL),
        ),
    ]