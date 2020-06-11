from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


def userImage_path(instance, filename):
    return "userImage/{}".format(filename)


class UserProfileInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50, blank=True)
    sobrenome = models.CharField(max_length=50, blank=True)
    rg = models.IntegerField(blank=True)
    telefone = models.CharField(max_length=14, blank=True)
    altura = models.CharField(max_length=4, blank=True)
    peso = models.CharField(max_length=4, blank=True)
    imagem = models.FileField(upload_to=userImage_path, blank=True)
    token = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.user.username


class AsthmaControlQuestionnaire(models.Model):
    user = models.ForeignKey(
        User, unique_for_date="date", on_delete=models.CASCADE)

    question1 = models.CharField(max_length=1)
    question2 = models.CharField(max_length=1)
    question3 = models.CharField(max_length=1)
    question4 = models.CharField(max_length=1)
    question5 = models.CharField(max_length=1)
    question6 = models.CharField(max_length=1)
    question7 = models.CharField(max_length=1)

    date = models.DateField()

    def __str__(self):
        return self.user.username + " " + self.date.strftime("%d/%m/%Y")


class DailyControl(models.Model):
    user = models.ForeignKey(
        User, unique_for_date="date", on_delete=models.CASCADE)

    date = models.DateField(blank=True, null=True)
    notes = models.CharField(max_length=100)
    pico1 = models.CharField(max_length=10, null=True, blank=True)
    pico2 = models.CharField(max_length=10, null=True, blank=True)
    pico3 = models.CharField(max_length=10, null=True, blank=True)
    tosse = models.BooleanField(null=True)
    chiado = models.BooleanField(null=True)
    faltaDeAr = models.BooleanField(null=True)
    acordar = models.BooleanField(null=True)
    bombinha = models.BooleanField(null=True)


def fitbit_path(instance, filename):
    return "fitbit/{}/{}/{}".format(instance.user.username, instance.category, filename)


class FitbitFile(models.Model):
    user = models.ForeignKey(
        User, unique_for_date="date", on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    path = models.FileField(upload_to=fitbit_path)
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.user.username + "-" + self.category + "-" + self.date.strftime("%d/%m/%Y")


class FitbitProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    accessToken = models.CharField(max_length=500, blank=True)
    refreshToken = models.CharField(max_length=200, blank=True)
    userId = models.CharField(max_length=50, blank=True)


class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.CharField(max_length=100, blank=True)
    quantity = models.CharField(max_length=100, blank=True)
    unit = models.CharField(max_length=20, blank=True)
    startDate = models.DateField(blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)


class PracticeBarriers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(blank=True, null=True)
    # fatores pessoais
    interesse = models.CharField(max_length=1, blank=True, null=True)
    tempo = models.CharField(max_length=1, blank=True, null=True)
    energia = models.CharField(max_length=1, blank=True, null=True)
    faltaAr = models.CharField(max_length=1, blank=True, null=True)
    # fatores sociais
    companhia = models.CharField(max_length=1, blank=True, null=True)
    dinheiro = models.CharField(max_length=1, blank=True, null=True)
    coisas = models.CharField(max_length=1, blank=True, null=True)
    # fatores ambientais
    seguranca = models.CharField(max_length=1, blank=True, null=True)
    clima = models.CharField(max_length=1, blank=True, null=True)
    equipamentos = models.CharField(max_length=1, blank=True, null=True)


class Milestone(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    level = models.CharField(max_length=10, blank=True)
    quantity = models.CharField(max_length=10, blank=True)
