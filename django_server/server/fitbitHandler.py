from datetime import datetime, timedelta
import urllib.request

import pandas as pd
from django.contrib.auth.models import User

import fitbit
from server.models import FitbitProfile
import server.settings as settings

clientSettings = settings.fitbitClient
CLIENT_ID = clientSettings["CLIENT_ID"]
CLIENT_SECRET = clientSettings["CLIENT_SECRET"]

server_ip = settings.server_ip


def getAddress():
    external_ip = urllib.request.urlopen(
        'https://api.ipify.org').read().decode('utf8')

    if external_ip == server_ip:
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
    if accessToken is not None and cpf is not None:
        user = User.objects.get(username=cpf)
        fbProfile, _ = FitbitProfile.objects.get_or_create(user=user)
        fbProfile.accessToken = accessToken
        fbProfile.refreshToken = refreshToken
        fbProfile.userId = userId
        fbProfile.save()
        return True

    return False


def updateTokens(user, tokenDict):
    profile = FitbitProfile.objects.get(user=user)
    if "refresh_token" in tokenDict:
        profile.refreshToken = tokenDict["refresh_token"]
    if "access_token" in tokenDict:
        profile.accessToken = tokenDict["access_token"]
    profile.save()


def getActivities(user, date=None):
    profile = FitbitProfile.objects.get(user=user)
    accessT = profile.accessToken
    refreshT = profile.refreshToken

    if date is None:
        date = datetime.today().strftime("%Y-%m-%d")

    client = fitbit.Fitbit(CLIENT_ID, CLIENT_SECRET, oauth2=True,
                           access_token=accessT, refresh_token=refreshT,
                           refresh_cb=updateTokens)

    activities = client.activities(date=date)

    return date, activities
