from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class UserProfileInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50, blank=True)
    sobrenome = models.CharField(max_length=50, blank=True)
    rg = models.IntegerField(blank=True)
    telefone = models.CharField(max_length=14, blank=True)
    altura = models.CharField(max_length=4, blank=True)
    peso = models.CharField(max_length=4, blank=True)
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


def fitbit_path(instance, filename):
    return "fitbit/{}/{}/{}".format(instance.user.username, instance.category, filename)


class FitbitFile(models.Model):
    user = models.ForeignKey(
        User, unique_for_date="date", on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    path = models.FileField(upload_to=fitbit_path)
    date = models.DateField()

    def __str__(self):
        return self.user.username + "-" + self.category + "-" + self.date.strftime("%d/%m/%Y")
