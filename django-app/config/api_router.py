## django
## views
from app.messages.views import MessagesViewset
from app.users.views import UserViewset
from django.conf import settings
## django rest framework
from rest_framework.routers import DefaultRouter, SimpleRouter

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register(r"users", UserViewset, basename="users")
router.register(r"messages", MessagesViewset, basename="messages")


app_name = "api"
urlpatterns = router.urls
