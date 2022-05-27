
# django rest framework
# django
from app.messages.models import Message
# serializers
from app.messages.serializers import (MessageModelSerializer,
                                      MessageModelSerializerRead)
from app.tasks import send_message_after_save, send_sheet_email
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class MessagesViewset(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageModelSerializer
    permission_classes = [IsAuthenticated]
    
    
    def create(self, request, *args, **kwargs):
        message = {
            'text': request.data.get('text'),
            'user': request.user.pk,
        }
                
        serializer = self.get_serializer(data=message)
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        task_uid = send_message_after_save.delay(MessageModelSerializerRead(serializer.instance).data)
        print(task_uid)
        email_details = {
            'to_name':"Carlos",
            'to_email':"krlosaren@gmail.com",
            "channel":"Mercadito App",
        }
        
        email_task  = send_sheet_email.delay(email_details)
        print(email_task)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

