# django

from asyncore import read

from app.messages.models import Message
from app.users.serializers import UserSerializer
from rest_framework import serializers


class MessageModelSerializer(serializers.ModelSerializer):
  
    user = UserSerializer()
    class Meta:
        model = Message
        fields = ('text','user')
        

class MessageModelSerializerRead(serializers.ModelSerializer):
    
    user = UserSerializer()
    class Meta:
        model = Message
        fields = ('id','text','user')
