from app.messages.models import Message
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.utils.translation import gettext_lazy as _

admin.site.register(Message)
