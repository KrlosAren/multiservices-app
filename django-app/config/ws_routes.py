from app import consumers
from django.urls import re_path

websocket_urlpatterns = [
  # re_path(r'ws/tasks/(?P<task_id>\w+)/$', consumers.TaskConsumer.as_asgi()),
  re_path(r'ws/tasks/(?P<task_id>\w+)/$', consumers.TaskConsumer.as_asgi()),
]
