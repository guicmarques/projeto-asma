from django.contrib.auth.models import User, Group, Permission
from server.models import UserProfileInfo, AsthmaControlQuestionnaire

from datetime import datetime, timedelta


def createUser(userData):
    required = ["username", "email", "password"]
    missingData = True

    if all(item in userData.keys() for item in required):
        missingData = False

        username = str(userData["username"]).replace(
            ".", "").replace("-", "").replace(" ", "")
        password = str(userData["password"])
        email = str(userData["email"]).replace(" ", "")

        if username and email and password:
            user, created = User.objects.get_or_create(username=username,
                                                       email=email)
        else:
            return True, False

        pacientes = getGroup('Pacientes')

        if created:
            user.set_password(password)
            user.save()
            pacientes.user_set.add(user)

            profileInfo = UserProfileInfo(user=user)

            try:
                if "nome" in userData.keys():
                    profileInfo.nome = userData["nome"]
                if "sobrenome" in userData.keys():
                    profileInfo.sobrenome = userData["sobrenome"]
                if "rg" in userData.keys():
                    profileInfo.rg = int(str(userData["rg"]).replace(
                        ".", "").replace("-", "").replace(" ", ""))
                if "telefone" in userData.keys():
                    profileInfo.telefone = userData["telefone"]
                if "altura" in userData.keys():
                    profileInfo.altura = round(float(
                        str(userData["altura"]).replace(",", ".")), 2)
                if "peso" in userData.keys():
                    profileInfo.peso = round(float(
                        str(userData["peso"]).replace(",", ".")), 1)
                if "token" in userData.keys():
                    profileInfo.altura = userData["token"]

                profileInfo.save()

                return missingData, True
            except Exception as e:
                return str(e), False
        else:
            return missingData, False
    else:
        return missingData, False


def getGroup(groupName):
    group, createdGroup = Group.objects.get_or_create(name=groupName)
    # permissions_list = Permission.objects.all()
    # print(permissions_list)
    if createdGroup:
        print("Created {} group".format(groupName))
    return group


def getUserData(user):
    userData = {}

    userData["username"] = user.username
    userData["email"] = user.email

    try:
        profileInfo = UserProfileInfo.objects.get(user=user)
        userData["nome"] = profileInfo.nome
        userData["sobrenome"] = profileInfo.sobrenome
        userData["rg"] = profileInfo.rg
        userData["telefone"] = profileInfo.telefone
        userData["altura"] = profileInfo.altura
        userData["peso"] = profileInfo.peso
        userData["token"] = profileInfo.token

        return userData
    except Exception as e:
        print(e)
        return userData


def updateUserData(user, userData):
    try:
        profileInfo, _ = UserProfileInfo.objects.get_or_create(user=user)
        if "nome" in userData.keys():
            profileInfo.nome = userData["nome"]
        if "sobrenome" in userData.keys():
            profileInfo.sobrenome = userData["sobrenome"]
        if "rg" in userData.keys():
            profileInfo.rg = int(str(userData["rg"]).replace(
                ".", "").replace("-", "").replace(" ", ""))
        if "telefone" in userData.keys():
            profileInfo.telefone = userData["telefone"]
        if "altura" in userData.keys():
            profileInfo.altura = round(float(
                str(userData["altura"]).replace(",", ".")), 2)
        if "peso" in userData.keys():
            profileInfo.peso = round(float(
                str(userData["peso"]).replace(",", ".")), 1)
        if "token" in userData.keys():
            profileInfo.altura = userData["token"]

        profileInfo.save()

        return True
    except:
        return False


def createACQ(user, answers):
    try:
        acq, _ = AsthmaControlQuestionnaire.objects.get_or_create(
            user=user, date=datetime.now().date())
        try:
            intAnswers = list(map(int, answers.values()))
            if all(answer >= 1 for answer in intAnswers) and all(answer <= 6 for answer in intAnswers):
                acq.question1 = int(answers["1"])
                acq.question2 = int(answers["2"])
                acq.question3 = int(answers["3"])
                acq.question4 = int(answers["4"])
                acq.question5 = int(answers["5"])
                acq.question6 = int(answers["6"])
                acq.question7 = int(answers["7"])
                acq.save()
                return True
            else:
                return "Not all answers are integers between 1 and 6"
        except Exception as e:
            return str(e)
    except Exception as e:
        return str(e)
