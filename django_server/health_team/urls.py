from django.conf.urls import url
from django.urls import  path
from health_team import views

# SET THE NAMESPACE!
app_name = 'health_team'

# Be careful setting the name to just /login use userlogin instead!
urlpatterns = [
    url(r'^register/$', views.register, name='register'),
    url(r'^user_login/$', views.user_login, name='user_login'),
    url(r'^user_login/forgot-password.html$', views.forgot_password, name='forgot_password'),
    url(r'^user_login/register.html$', views.register_account, name='register_account'),
    url(r'^user_login/register2.html$', views.register_account2, name='register_account2'),
    url(r'^table.html$', views.table, name='table'),
    url(r'^profile.html$', views.profile, name='profile'),
    url(r'^blank-1.html$', views.cadastroPaciente, name='cadastroPaciente'),
    url(r'^pacienteGraficos.html$', views.pacienteGraficos, name='pacienteGraficos'),
    url(r'^table_test.html$', views.tableTest, name='table_test'),
    path('graphs/<slug:username>', views.pacienteGraficos2, name='table_test2'),
    path('metas/<slug:username>', views.pageMetas, name='metas'),

]
