# from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from django.urls import path, include
from server import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('auth/token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('auth/token/refresh/',
         jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('register/', views.RegisterUser.as_view(), name='register')
]
