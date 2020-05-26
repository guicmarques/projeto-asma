from django.conf.urls import url
from health_team import views

# SET THE NAMESPACE!
app_name = 'health_team'

# Be careful setting the name to just /login use userlogin instead!
urlpatterns = [
    url(r'^register/$', views.register, name='register'),
    url(r'^user_login/$', views.user_login, name='user_login'),
    url(r'^table.html$', views.table, name='table'),
    url(r'^profile.html$', views.profile, name='profile'),
    url(r'^blank-1.html$', views.cadastroPaciente, name='cadastroPaciente'),
    url(r'^pacienteGraficos.html$', views.pacienteGraficos, name='pacienteGraficos'),

]
