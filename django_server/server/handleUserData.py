from django.contrib.auth.models import User, Group, Permission
from server.models import UserProfileInfo


def createUser(userData):
    required = ["username", "email", "password"]
    missingData = True

    if all(item in userData.keys() for item in required):
        missingData = False

        username = userData["username"]
        password = userData["password"]
        email = userData["email"]

        pacientes = getGroup('Pacientes')

        user, created = User.objects.get_or_create(username=username,
                                                   email=email)

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
    # user.save()

    # u,created = User.objects.get_or_create(userName, userMail)
    # if created:
    #     # user was created
    #     # set the password here
    # else:
    #     # user was retrieved


def getGroup(groupName):
    group, createdGroup = Group.objects.get_or_create(name=groupName)
    # permissions_list = Permission.objects.all()
    # print(permissions_list)
    if createdGroup:
        print("Created {} group".format(groupName))
    return group
