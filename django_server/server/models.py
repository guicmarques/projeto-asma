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


class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.CharField(max_length=100, blank=True)
    quantity = models.CharField(max_length=100, blank=True)
    unit = models.CharField(max_length=20, blank=True)
    startDate = models.DateField(blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)
