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

from django.urls import include, path
from django.contrib import admin
from django.conf.urls import url, include,re_path
from health_team import views
from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    # Site
    url(r'^$', views.table, name='index'),
    url(r'^table.html$', views.table, name='table'),
    url(r'^blank-1.html$', views.cadastroPaciente, name='cadastroPaciente'),
    url(r'^blank-12.html$', views.cadastroPaciente2, name='cadastroPaciente2'),
    url(r'^404$', views.erro_404, name='erro_404'),
    # Uso Interno
    re_path(r'^favicon\.ico$', favicon_view),
    url(r'^2$', views.index, name='index2'),
    url(r'^special/', views.special, name='special'),
    url(r'^health_team/', include('health_team.urls')),
    url(r'^rest/', include('server.urls')),
    url(r'^logout/$', views.user_logout, name='logout'),
]
