from django.db import models

# Create your models here.


class imcModel(models.Model):
    peso = models.CharField(max_length=5)
    altura = models.CharField(max_length=5)
