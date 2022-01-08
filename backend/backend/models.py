from django.db import models

# Create your models here.

def upload_path(instance, filename):
    return str("{}/{}".format(instance, filename))
    
class Podcast (models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    audio_file = models.FileField(upload_to=upload_path,blank=True, null=True)

    def __str__(self):
        return self.title