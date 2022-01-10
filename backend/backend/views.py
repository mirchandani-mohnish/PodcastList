from django.shortcuts import render
from .serializers import PodcastSerializer
from rest_framework import serializers, viewsets
from .models import Podcast

# Create your views here.
class PodcastView(viewsets.ModelViewSet):
    serializer_class = PodcastSerializer
    queryset = Podcast.objects.all()
    # print(queryset.values('title'))
    
