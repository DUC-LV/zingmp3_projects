# Generated by Django 3.2.18 on 2023-03-05 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Banners',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('type', models.IntegerField()),
                ('banner', models.CharField(max_length=300)),
                ('cover', models.CharField(max_length=300)),
                ('target', models.CharField(default='1', max_length=100)),
                ('title', models.CharField(blank=True, default=None, max_length=200)),
                ('description', models.TextField(blank=True, default=None)),
                ('is_pr', models.IntegerField(default=0)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
