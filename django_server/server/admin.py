from django.contrib import admin

from server.models import (AsthmaControlQuestionnaire, DailyControl,
                           FitbitFile, FitbitProfile, Goal, Milestone,
                           UserProfileInfo)

# Register your models here.

admin.site.register(UserProfileInfo)
admin.site.register(AsthmaControlQuestionnaire)
admin.site.register(DailyControl)
admin.site.register(FitbitFile)
admin.site.register(FitbitProfile)
admin.site.register(Goal)
admin.site.register(Milestone)
