from django.contrib import admin
from server.models import UserProfileInfo, User
# Register your models here.

admin.site.register(User)
admin.site.register(UserProfileInfo)
