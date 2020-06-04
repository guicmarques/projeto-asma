import logging
import urllib.request
from datetime import datetime, timedelta

import pandas as pd
from django.contrib.auth.models import User

import fitbit
import server.settings as settings
from server.models import FitbitProfile

clientSettings = settings.fitbitClient
CLIENT_ID = clientSettings["CLIENT_ID"]
CLIENT_SECRET = clientSettings["CLIENT_SECRET"]

server_ip = settings.server_ip


logFile = 'server.log'
datefmt = '%d/%m/%Y %H:%M:%S'
fmt = '[%(asctime)s] %(levelname)s: %(message)s'
logging.basicConfig(filename=logFile, filemode='a',
                    level=logging.DEBUG, datefmt=datefmt, format=fmt)


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
    except Exception as e:
        logging.warn(str(e))
        return None, None, str(e)

    accessToken = str(fitbitAPI.client.session.token['access_token'])
    refreshToken = str(fitbitAPI.client.session.token['refresh_token'])
    userId = str(fitbitAPI.client.session.token['user_id'])

    return accessToken, refreshToken, userId


def updateFbProfile(accessToken=None, refreshToken=None, userId=None, cpf=None):
    logging.warn(
        f"Username: {cpf}; Refresh token:{refreshToken}; Access token:{accessToken}")
    if accessToken is not None and cpf is not None:
        user = User.objects.get(username=cpf)
        fbProfile, _ = FitbitProfile.objects.get_or_create(user=user)
        fbProfile.accessToken = accessToken
        fbProfile.refreshToken = refreshToken
        fbProfile.userId = userId
        fbProfile.save()
        return True, user

    return False, None


actualUser = None


# def updateTokens(tokenDict):
#     global actualUser
#     user = actualUser
#     print(tokenDict)
#     logging.debug(f"tokenDict: {tokenDict}")
#     profile = FitbitProfile.objects.get(user=user)
#     if "refresh_token" in tokenDict:
#         profile.refreshToken = tokenDict["refresh_token"]
#     if "access_token" in tokenDict:
#         profile.accessToken = tokenDict["access_token"]
#     profile.save()

def r_cb(token):
    """ Called when the OAuth token has been refreshed """
    global actualUser
    user = actualUser

    logging.debug(f"tokenDict: {token}")
    access_token = token['access_token']
    refresh_token = token['refresh_token']
    expires_at = token['expires_at']
    profile = FitbitProfile.objects.get(user=user)
    profile.refreshToken = refresh_token
    profile.accessToken = access_token
    profile.save()


def getActivities(user, date=None):
    global actualUser
    profile = FitbitProfile.objects.get(user=user)
    accessT = profile.accessToken
    refreshT = profile.refreshToken

    if date is None:
        date = datetime.today().strftime("%Y-%m-%d")

    actualUser = user

    client = fitbit.Fitbit(CLIENT_ID, CLIENT_SECRET, oauth2=True,
                           access_token=accessT, refresh_token=refreshT,
                           refresh_cb=r_cb)

    activities = client.activities(date=date)

    return date, activities
