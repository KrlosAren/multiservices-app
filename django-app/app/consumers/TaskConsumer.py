import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class TaskConsumer(WebsocketConsumer):
    def connect(self):
        self.task_id = self.scope['url_route']['kwargs']['task_id'] # your task's identifier
        async_to_sync(self.channel_layer.group_add)(f"tasks-{self.task_id}", self.channel_name)
        self.accept()

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(f"tasks-{self.task_id}", self.channel_name)

    def item_processed(self, event):
        item = event['item']
        self.send(text_data=json.dumps(item))
