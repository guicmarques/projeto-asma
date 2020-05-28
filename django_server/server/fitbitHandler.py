import datetime
import urllib.request

import pandas as pd

from fitbit.api import Fitbit
import server.gather_keys_oauth2 as Oauth2

CLIENT_ID = '22BLM2'
CLIENT_SECRET = 'cc2624c521d83c8ac8058c1e276d4614'


def getAddress():
    external_ip = urllib.request.urlopen(
        'https://api.ipify.org').read().decode('utf8')

    if external_ip == "3.225.179.134":
        return "https://"+external_ip
    else:
        return "localhost"


def getAuthURL():
    ipGlobal = getIP()
    if ipGlobal == "3.225.179.134":
        ip = ipGlobal
    else:
        ip = localhost

    fitbit = Fitbit(client_id, client_secret,
                    redirect_uri=redirect_uri, timeout=10)


if __name__ == "__main__":
    server = Oauth2.OAuth2Server(CLIENT_ID, CLIENT_SECRET)
    server.browser_authorize()
    ACCESS_TOKEN = str(server.fitbit.client.session.token['access_token'])
    REFRESH_TOKEN = str(server.fitbit.client.session.token['refresh_token'])
    auth2_client = fitbit.Fitbit(CLIENT_ID, CLIENT_SECRET, oauth2=True,
                                 access_token=ACCESS_TOKEN, refresh_token=REFRESH_TOKEN)

    profile = server.fitbit.user_profile_get()
    print('You are authorized to access data for the user: {}'.format(
        profile['user']['fullName']))

    print('TOKEN\n=====\n')
    for key, value in server.fitbit.client.session.token.items():
        print('{} = {}'.format(key, value))
