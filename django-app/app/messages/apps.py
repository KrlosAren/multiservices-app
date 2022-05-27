from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class MessagesConfig(AppConfig):
    name = "app.messages"
    verbose_name = _("Messages")
    label = "notifications"

    def ready(self):
        try:
            import app.messages.signals  # noqa F401
        except ImportError:
            pass
