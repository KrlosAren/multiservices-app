import channels.layers
from app.users.models import User
from asgiref.sync import async_to_sync
from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf import settings
from django.core.mail.message import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone

logger = get_task_logger(__name__)


@shared_task(name='send_message_after_save', max_retries=3)
def send_message_after_save(message):
  channel_layer = channels.layers.get_channel_layer()
  async_to_sync(channel_layer.group_send)("emails", {
    'type': 'send_email',
    'message': message,
  })
  logger.info(f"Message {message['id']} sent to channel {message['user']}")
  
  
@shared_task(name='send_sheet_email', max_retries=3)
def send_sheet_email(email_details):

  subject = 'Hello @{}! you have an invitation to {}'.format(email_details['to_name'],email_details['channel'])
  from_email = 'Mercadito App <noreply@mercadito_reload.com>'
  content = render_to_string('emails/channel_invitation.html', {
    })
  msg = EmailMultiAlternatives(subject, content, from_email, [email_details['to_email']])
  msg.attach_alternative(content, "text/html")
  msg.send()
  logger.info(f"Sender email sent to {email_details['to_email']}")
