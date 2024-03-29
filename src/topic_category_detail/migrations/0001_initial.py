# Generated by Django 3.2.18 on 2023-03-26 03:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('playlist_detail', '0002_songoftopic_topicsong'),
        ('topic_category', '0001_initial'),
        ('playlists', '0004_alter_playlists_uid'),
    ]

    operations = [
        migrations.CreateModel(
            name='TopicSongOfHub',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('hub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='topic_category.hub')),
                ('topic_song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlist_detail.topicsong')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='TopicPlaylistOfHub',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('hub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='topic_category.hub')),
                ('topic_playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlists.topicplaylist')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
