from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _


class UserAdmin(admin.ModelAdmin):
    pass


admin.site.register(get_user_model(), auth_admin.UserAdmin)
