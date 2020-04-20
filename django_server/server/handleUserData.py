from django.contrib.auth.models import User
from health_team.forms import UserForm, UserProfileInfoForm


def createUser(userData):
    username = userData["username"]
    password = userData["password"]
    email = userData["email"]

    user = User.objects.create_user(username=username,
                                    password=password,
                                    email=email)
    # user.save()

    # u,created = User.objects.get_or_create(userName, userMail)
    # if created:
    #     # user was created
    #     # set the password here
    # else:
    #     # user was retrieved
