from django.db.models import fields
from rest_framework import serializers
from .models import Podcast

class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = ('title', 'description','audio_file')