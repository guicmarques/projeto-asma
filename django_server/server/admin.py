from django.contrib import admin
from server.models import UserProfileInfo, AsthmaControlQuestionnaire, FitbitFile, Goal
# Register your models here.

admin.site.register(UserProfileInfo)
admin.site.register(AsthmaControlQuestionnaire)
admin.site.register(FitbitFile)
admin.site.register(Goal)
