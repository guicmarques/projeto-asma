from django.contrib.auth.models import User, Group, Permission
from server.models import UserProfileInfo


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

            if "nome" in userData.keys():
                profileInfo.nome = userData["nome"]
            if "sobrenome" in userData.keys():
                profileInfo.sobrenome = userData["sobrenome"]
            if "rg" in userData.keys():
                profileInfo.rg = userData["rg"]
            if "telefone" in userData.keys():
                profileInfo.telefone = userData["telefone"]
            if "altura" in userData.keys():
                profileInfo.altura = userData["altura"]
            if "peso" in userData.keys():
                profileInfo.peso = userData["peso"]
            if "token" in userData.keys():
                profileInfo.altura = userData["token"]

            profileInfo.save()

            return missingData, True
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
    except:
        return userData


def updateUserData(user, userData):
    try:
        profileInfo, _ = UserProfileInfo.objects.get_or_create(user=user)
        if "nome" in userData.keys():
            profileInfo.nome = userData["nome"]
        if "sobrenome" in userData.keys():
            profileInfo.sobrenome = userData["sobrenome"]
        if "rg" in userData.keys():
            profileInfo.rg = userData["rg"]
        if "telefone" in userData.keys():
            profileInfo.telefone = userData["telefone"]
        if "altura" in userData.keys():
            profileInfo.altura = userData["altura"]
        if "peso" in userData.keys():
            profileInfo.peso = userData["peso"]

        profileInfo.save()

        return True
    except:
        return False
