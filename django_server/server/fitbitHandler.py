import datetime
import urllib.request

import pandas as pd
from django.contrib.auth.models import User

import fitbit
from server.models import FitbitProfile

CLIENT_ID = '22BLM2'
CLIENT_SECRET = 'cc2624c521d83c8ac8058c1e276d4614'


def getAddress():
    external_ip = urllib.request.urlopen(
        'https://api.ipify.org').read().decode('utf8')

    if external_ip == "3.225.179.134":
        return "https://"+external_ip+"/rest/fitbit/auth/"
    else:
        return "https://localhost:8000/rest/fitbit/auth/"


def getFitbitAPI(cpf):
    users = User.objects.filter(username=cpf)
    if len(users) > 0:
        redirect_uri = getAddress()

        fitbitAPI = fitbit.api.Fitbit(CLIENT_ID, CLIENT_SECRET,
                                      redirect_uri=redirect_uri, timeout=10)

        return fitbitAPI
    else:
        return None


def getTokens(fitbitAPI, code):
    try:
        fitbitAPI.client.fetch_access_token(code)
    except:
        return None, None, None

    accessToken = str(fitbitAPI.client.session.token['access_token'])
    refreshToken = str(fitbitAPI.client.session.token['refresh_token'])
    userId = str(fitbitAPI.client.session.token['user_id'])

    return accessToken, refreshToken, userId


def updateFbProfile(accessToken=None, refreshToken=None, userId=None, cpf=None):
    print(f"Access token: {accessToken}\n")
    if accessToken is not None and cpf is not None:
        user = User.objects.get(username=cpf)
        fbProfile, created = FitbitProfile.objects.get_or_create(user=user)
        print(created)
        fbProfile.accessToken = accessToken
        fbProfile.refreshToken = refreshToken
        fbProfile.userId = userId
        fbProfile.save()
        return True

    return False


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
