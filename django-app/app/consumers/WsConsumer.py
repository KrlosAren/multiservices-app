import json
from time import clock_getres

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer


class DjangoWebsocket(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "emails" 
        
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def send_email(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
