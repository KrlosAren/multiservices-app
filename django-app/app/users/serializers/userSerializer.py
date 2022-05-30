# django
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    
    full_name = serializers.CharField(source='get_full_name')
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            'full_name'
        )
