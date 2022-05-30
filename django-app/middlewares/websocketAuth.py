import logging
from asyncio.log import logger

import jwt
from app.users.models import User
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from rest_framework.exceptions import AuthenticationFailed


@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

class WebsocketAuth(BaseMiddleware):
    """
      custom middleware based on cookies jwt
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
      
        token = False
        query = scope['query_string']
        if query.decode('utf-8') != '':
          query = query.decode('utf-8')
          query = query.split('=')
          
          if query[0] == 'access_token':
            token = query[1]
          
          if token:
            try:
              token_data = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
              scope['user'] = await get_user(token_data['user_id'])
            except jwt.ExpiredSignatureError:
              logging.info('Token expired')
              raise AuthenticationFailed('Token expired')
              
        else:
          raise AuthenticationFailed('No token')
        
        return await self.app(scope, receive, send)
