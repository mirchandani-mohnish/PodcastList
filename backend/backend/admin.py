from django.contrib import admin
from .models import *

# Register your models here.
class podcastAdmin(admin.ModelAdmin) :
    list = ('title', 'description')

class transcriptAdmin(admin.ModelAdmin) :
    list = ('podcast', 'transcript')

admin.site.register(Podcast, podcastAdmin)
admin.site.register(Transcript, transcriptAdmin)