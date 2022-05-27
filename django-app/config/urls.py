
# django
from django.conf import settings
from django.conf.urls import include
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path('api/', include('config.api_router')),
    path('api/auth/', include('dj_rest_auth.urls')),
] 
