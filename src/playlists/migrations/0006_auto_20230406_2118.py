# Generated by Django 3.2.18 on 2023-04-06 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0005_playlists_followed'),
    ]

    operations = [
        migrations.AddField(
            model_name='artists',
            name='biography',
            field=models.TextField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='artists',
            name='birthday',
            field=models.CharField(blank=True, default=None, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='artists',
            name='cover',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='artists',
            name='national',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='artists',
            name='real_name',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='artists',
            name='sort_biography',
            field=models.TextField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='artists',
            name='alias',
            field=models.CharField(blank=True, default=None, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='artists',
            name='name',
            field=models.CharField(blank=True, default=None, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='artists',
            name='thumbnail',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='artists',
            name='thumbnail_m',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='artists',
            name='total_follow',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
