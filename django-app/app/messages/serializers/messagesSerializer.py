# django

from asyncore import read

from app.messages.models import Message
from rest_framework import serializers


class MessageModelSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Message
        fields = ('text','user')
        

class MessageModelSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id','text','user')
