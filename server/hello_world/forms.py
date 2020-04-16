from django import forms


class imcForm(forms.Form):
    altura = forms.CharField(help_text="Insira sua altura")
    peso = forms.CharField(help_text="Insira seu peso")

    altura = forms.CharField(
        max_length=5,
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "Sua altura em metros"
        })
    )
    peso = forms.CharField(
        max_length=5,
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "Seu peso em kg"
        })
    )
