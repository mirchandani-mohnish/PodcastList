from django.db import models
from django.db.models.fields.related import ForeignKey
import requests, os
import mutagen
from mutagen.wave import WAVE
from django.db.models.signals import post_init, post_save
from django.dispatch import receiver
import threading
from ckeditor.fields import RichTextField


def read_file(filename):
    with open(filename, "rb") as _file:
        while True:
            data = _file.read()
            if not data:
                break
            yield data

def upload_audio(filename):
    headers = {"authorization": "3a554671b5b140c7a34f049d85a2c0ca"}
    response = requests.post(
        "https://api.assemblyai.com/v2/upload",
        headers=headers,
        data=read_file(filename),
    )

    # print(response.json())
    response = response.json()
    # print(response["upload_url"][34:])
    return response["upload_url"][34:]

def post_transcript(filename):
    endpoint = "https://api.assemblyai.com/v2/transcript"
    json = {
        "audio_url": "https://cdn.assemblyai.com/upload/{}".format(
            upload_audio(filename)
        )
    }
    headers = {
        "authorization": "3a554671b5b140c7a34f049d85a2c0ca",
        "content-type": "application/json",
    }
    response = requests.post(endpoint, json=json, headers=headers)
    # print(response.json())
    response = response.json()
    return response["id"]

def get_transcript(link):
    endpoint = (
        link
    )
    headers = {
        "authorization": "3a554671b5b140c7a34f049d85a2c0ca",
    }
    response = requests.get(endpoint, headers=headers)
    result = response.json()
    return result

def create_transcript_from_JSON(result):
    stringResult = ""
    for i in result["words"]:
        stringResult += i["text"] + " "

    return stringResult

def convertor(filename, instance):
    transcript_id = post_transcript(filename)
    link = "https://api.assemblyai.com/v2/transcript/{}".format(transcript_id)
    print(link)
    while (True):
        result = get_transcript(link)
        print(result["status"])
        if (result["status"] == "processing" or result["status"] == "queued"):
            continue
        else:
            transcript = create_transcript_from_JSON(result)
            print(transcript)
            print(instance.title)
            instance.transcript = transcript
            instance.save()
            break

def upload_path(instance, filename):
    return str("{}/{}".format(instance, filename))

# Create your models here.
class Podcast (models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.CharField(max_length=200, blank=True)
    authorImage = models.ImageField(upload_to=upload_path, blank = True)
    photo = models.ImageField(upload_to=upload_path, blank = True)
    audio_file = models.FileField(upload_to=upload_path,blank=True, null=True)
    # transcript = models.TextField(blank=True)
    transcript = RichTextField(blank=True, null=True)
    def __str__(self):
        return self.title

    # def save(self) :
    #     print(self.audio_file)
    #     filename = self.audio_file
    #     print(filename)
    #     filename = "media/{}".format(filename)
    #     convertor(filename)

@receiver(post_save, sender=Podcast)
def create_transcript(sender,instance, **kwargs):
    print(instance.audio_file)
    filename = instance.audio_file
    filename = "media/{}".format(filename)
    if (len(instance.transcript) == 0 or instance.transcript == None) :
        t1 = threading.Thread(target=convertor, args=(filename,instance))
        t1.start()

