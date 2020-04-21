from django import forms
from server.models import UserProfileInfo, User


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
