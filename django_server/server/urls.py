# from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from django.urls import path, include
from server import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('teste/', views.Test.as_view(), name='teste'),
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('user_data/', views.UserData.as_view(), name='user_data'),
    path('change_password/', views.UserData.as_view(), name='change_password'),
    path('questionnaire/', views.Questionnaire.as_view(), name='questionnaire'),
    path('daily/', views.Daily.as_view(), name='daily'),
    path('fitbit/', views.Fitbit.as_view(), name="fitbit"),
    path('fitbit/login/', views.FitbitLogin.as_view(), name='fitbit_login'),
    path('fitbit/auth/', views.FitbitAuth.as_view(), name='fitbit_auth'),
    path('goals/', views.Goals.as_view(), name="goals"),
    path('exercises/', views.Exercises.as_view(), name="exercises"),
    path('milestones/', views.Milestones.as_view(), name="milestones"),
    path('barriers/', views.Barriers.as_view(), name="barriers"),
    path('watson/', views.Watson.as_view(), name="watson"),
]
