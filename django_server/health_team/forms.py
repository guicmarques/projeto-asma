from django import forms
from health_team.models import User, UserProfileInfo, AsthmaControlQuestionnaire, FitbitFile


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control form-control-user'}))

    class Meta():
        model = User
        fields = ('username', 'email', 'password')
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'email': forms.EmailInput(attrs={'class': 'form-control form-control-user'}),
            
        }

class UserFormForProfile(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control form-control-user'}))

    class Meta():
        model = User
        labels = {
        "username": "CPF"
        }
        fields = ('username', 'email', 'password')
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'email': forms.EmailInput(attrs={'class': 'form-control form-control-user'}),
            
        }


class UserProfileInfoForm(forms.ModelForm):
    class Meta():
        model = UserProfileInfo
        fields = ('nome', 'sobrenome', 'rg', 'altura', 'peso',
                  'telefone', 'token','nascimento')

        labels = {
        "token": "RGHC"
        }


        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'sobrenome': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'rg': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'altura': forms.TextInput(attrs={'class': 'form-control form-control-user','placeholder':"1.60"}),
            'peso': forms.TextInput(attrs={'class': 'form-control form-control-user','placeholder':"40"}),
            'telefone': forms.NumberInput(attrs={'class': 'form-control form-control-user','type':'tel'}),
            'token': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'nascimento': forms.DateInput(attrs={'class': 'form-control form-control-user','type':'date'}),        
        }


