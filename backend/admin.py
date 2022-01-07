from django.contrib import admin
from .models import *

# Register your models here.
class podcastAdmin(admin.ModelAdmin) :
    list = ('title', 'description')

admin.site.register(Podcast, podcastAdmin)