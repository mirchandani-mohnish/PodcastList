from django.shortcuts import render
from .serializers import PodcastSerializer
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Podcast

# Create your views here.
# class PodcastView(viewsets.ModelViewSet):
#     serializer_class = PodcastSerializer
#     queryset = Podcast.objects.all()
    
class PodcastAPI(APIView):
    def get(self, request):
        stu = Podcast.objects.all()
        for i in stu:
            if not(i.transcript_review):
                i.transcript = ""
        # for i in stu:
        #     print(i, i.transcript_review, i.transcript)
        serializer = PodcastSerializer(stu, many = True)
        return Response(serializer.data)
