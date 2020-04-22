from django import forms
<<<<<<< HEAD
from health_team.models import UserProfileInfo
from django.contrib.auth.models import User
=======
from health_team.models import User, UserProfileInfo, AsthmaControlQuestionnaire, FitbitFile
>>>>>>> restAPI


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta():
        model = User
        fields = ('username', 'email', 'password')


class UserProfileInfoForm(forms.ModelForm):
    class Meta():
        model = UserProfileInfo
        fields = ('nome', 'sobrenome', 'rg', 'altura', 'peso',
                  'telefone', 'token')
