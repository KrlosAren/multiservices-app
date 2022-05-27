from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Message(models.Model):
    """
    Model representing a message.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=500, help_text="Enter a message")

    date_created = models.DateTimeField(
        auto_now_add=True, verbose_name=_("Date created"))
    date_modified = models.DateTimeField(
        auto_now=True, verbose_name=_("Date modified"))

    def __str__(self):
        """
        String for representing the Model object.
        """
        return f'{self.user.get_short_name()} - {self.text}'

    def get_absolute_url(self):
        return reverse("messages:detail", kwargs={"pk": self.pk})
