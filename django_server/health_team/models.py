from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class UserProfileInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50, blank=True)
    sobrenome = models.CharField(max_length=50, blank=True)
    rg = models.CharField(max_length=12, blank=True)
    cpf = models.CharField(max_length=14, primary_key=True, blank=True)
    telefone = models.CharField(max_length=14, blank=True)
    token = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.user.username
