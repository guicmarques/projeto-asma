"""django_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework import routers
from django.urls import include, path
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from health_team import views
from server import views as server_views

router = routers.DefaultRouter()
router.register(r'users', server_views.UserViewSet)
router.register(r'groups', server_views.GroupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^special/', views.special, name='special'),
    url(r'^health_team/', include('health_team.urls')),
    url(r'^logout/$', views.user_logout, name='logout'),
    path('rest/', include(router.urls)),
    path('rest/api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
