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


class UserProfileInfoForm(forms.ModelForm):
    class Meta():
        model = UserProfileInfo
        fields = ('nome', 'sobrenome', 'rg', 'altura', 'peso',
                  'telefone', 'token','nascimento')


        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'sobrenome': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'rg': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'altura': forms.NumberInput(attrs={'class': 'form-control form-control-user'}),
            'peso': forms.NumberInput(attrs={'class': 'form-control form-control-user'}),
            'telefone': forms.NumberInput(attrs={'class': 'form-control form-control-user'}),
            'RGHC': forms.TextInput(attrs={'class': 'form-control form-control-user'}),
            'nascimento': forms.DateInput(attrs={'class': 'form-control form-control-user'}),        
        }


