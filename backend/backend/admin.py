from django.contrib import admin
from .models import *

# Register your models here.
class podcastAdmin(admin.ModelAdmin) :
    list = ('title', 'description','author', 'authorImage','photo', 'audio_file', 'transcript')

admin.site.register(Podcast, podcastAdmin)