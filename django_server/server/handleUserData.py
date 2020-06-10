import base64
import json
import operator
import os
from collections import Counter
from datetime import date, datetime, timedelta
from enum import Enum

import numpy as np
import pandas as pd
from django.contrib.auth.models import Group, Permission, User

import server.settings as settings
from server.fitbitHandler import getActivities, updateFbProfile
from server.models import (AsthmaControlQuestionnaire, DailyControl,
                           FitbitFile, Goal, UserProfileInfo)


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
                if "imagem" in userData.keys():
                    imgdata = base64.b64decode(userData["imagem"])
                    filename = user.username + ".jpg"
                    directory = "./media/userImage/"
                    if not os.path.exists(directory):
                        os.makedirs(directory)
                    filepath = os.path.join(directory, filename)
                    with open(filepath, 'wb') as f:
                        f.write(imgdata)
                    profileInfo.imagem = "userImage/{}".format(filename)
                if "token" in userData.keys():
                    profileInfo.token = userData["token"]

                profileInfo.save()

                # FOR TESTING PURPOSES ONLY
                fbTokens = settings.fitbitTokens
                accessT = fbTokens["access_token"]
                refreshT = fbTokens["refresh_token"]
                fbUserId = fbTokens["userId"]
                _ = updateFbProfile(
                    accessT, refreshT, fbUserId, username)

                heartRate = FitbitFile(user=user, category="heart-rate",
                                       path="fitbit/heart-rate-2019-03-14.csv",
                                       date=datetime.now().date())
                heartRate.save()
                dailySteps = FitbitFile(user=user, category="daily-steps",
                                        path="fitbit/daily-steps-2020-05-27.csv",
                                        date=datetime(year=2020, month=5, day=27).date())
                dailySteps.save()
                dailySteps = FitbitFile(user=user, category="daily-steps",
                                        path="fitbit/daily-steps-2020-05-28.csv",
                                        date=datetime(year=2020, month=5, day=28).date())
                dailySteps.save()
                dailySteps = FitbitFile(user=user, category="daily-steps",
                                        path="fitbit/daily-steps-2020-06-04.csv",
                                        date=datetime(year=2020, month=6, day=4).date())
                dailySteps.save()

                return missingData, True
            except Exception as e:
                return str(e), True
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
    # TESTING enquanto não tiver banco de dados de tokens
    userData["tokenValidado"] = True

    try:
        profileInfo = UserProfileInfo.objects.get(user=user)
        userData["nome"] = profileInfo.nome
        userData["sobrenome"] = profileInfo.sobrenome
        userData["rg"] = profileInfo.rg
        userData["telefone"] = profileInfo.telefone
        userData["altura"] = profileInfo.altura
        userData["peso"] = profileInfo.peso
        if profileInfo.imagem != "":
            with open(profileInfo.imagem.path, "rb") as image_file:
                userData["imagem"] = base64.b64encode(image_file.read())
        else:
            userData["imagem"] = ""
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
        if "imagem" in userData.keys():
            imgdata = base64.b64decode(userData["imagem"])
            filename = user.username + ".jpg"
            directory = "./media/userImage/"
            filepath = os.path.join(directory, filename)
            with open(filepath, 'wb') as f:
                f.write(imgdata)
            profileInfo.imagem = "userImage/{}".format(filename)
        if "token" in userData.keys():
            profileInfo.token = userData["token"]

        profileInfo.save()

        return True
    except:
        return False


def changePassword(username, password):
    try:
        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()
        return True
    except Exception as e:
        return str(e)


def createACQ(user, answers):
    try:
        acq, _ = AsthmaControlQuestionnaire.objects.get_or_create(
            user=user, date=datetime.now().date())
        try:
            intAnswers = list(map(int, answers.values()))
            if all(answer >= 0 for answer in intAnswers) and all(answer <= 6 for answer in intAnswers):
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
                return "Not all answers are integers between 0 and 6"
        except Exception as e:
            return str(e)
    except Exception as e:
        return str(e)


def getACQ(user):
    dates = []

    questionnaires = AsthmaControlQuestionnaire.objects.filter(user=user)
    for quest in questionnaires:
        dates.append(quest.date.strftime("%Y-%m-%d"))

    return sorted(dates)


def getFitbitData(user, dates):
    activities = {}
    # TESTE COM AUTENTICAÇÃO DO MICHELET
    # user = User.objects.get(username='Michelet')
    if len(dates) == 0:
        dt, activity = getActivities(user, date=None)
        activities[dt] = activity

    elif type(dates) == list:
        for date in dates:
            dt, activity = getActivities(user, date)
            activities[dt] = activity

    elif type(dates) == str:
        dt, activity = getActivities(user, dates)
        activities[dt] = activity

    return activities


def deprecatedFitbitData(user, date, category):
    response = []

    if date == "" and category == "":
        files = FitbitFile.objects.filter(user=user)
        for file in files:
            data = {}
            content = pd.read_csv(file.path)
            for col in content.columns:
                data[col] = list(content[col])
            response.append(
                {"date": file.date, "category": file.category, "data": data})
    elif date != "" and category != "":
        date = datetime.strptime(date, "%d/%m/%Y").date()
        files = FitbitFile.objects.filter(
            user=user, date=date, category=category)
        for file in files:
            data = {}
            content = pd.read_csv(file.path)
            for col in content.columns:
                data[col] = list(content[col])
            response.append(
                {"date": file.date, "category": file.category, "data": data})
    elif date == "":
        files = FitbitFile.objects.filter(user=user, category=category)
        for file in files:
            data = {}
            content = pd.read_csv(file.path)
            for col in content.columns:
                data[col] = list(content[col])
            response.append(
                {"date": file.date, "category": file.category, "data": data})
    elif category == "":
        date = datetime.strptime(date, "%d/%m/%Y").date()
        files = FitbitFile.objects.filter(user=user, date=date)
        for file in files:
            data = {}
            content = pd.read_csv(file.path)
            for col in content.columns:
                data[col] = list(content[col])
            response.append(
                {"date": file.date, "category": file.category, "data": data})

    return response


def createGoal(user, activity, quantity, unit, daysToEnd):
    try:
        goal, _ = Goal.objects.get_or_create(user=user, activity=activity)
        try:
            goal.quantity = int(quantity)
            goal.unit = unit
            goal.startDate = datetime.now().date()
            goal.endDate = datetime.now().date()+timedelta(days=int(daysToEnd))
            goal.save()
            return True
        except Exception as e:
            return str(e)
    except Exception as e:
        return str(e)


def getGoals(user):
    # returns active goals
    activeGoals = []
    inactiveGoals = []

    goals = Goal.objects.filter(user=user)
    for goal in goals:
        if datetime.today().date() <= goal.endDate:
            data = {}
            data["activity"] = goal.activity
            data["quantity"] = goal.quantity
            data["unit"] = goal.unit
            data["startDate"] = goal.startDate
            data["endDate"] = goal.endDate

            activeGoals.append(data)
        else:
            data = {}
            data["activity"] = goal.activity
            data["quantity"] = goal.quantity
            data["unit"] = goal.unit
            data["startDate"] = goal.startDate
            data["endDate"] = goal.endDate

            inactiveGoals.append(data)

    return {"activeGoals": activeGoals, "inactiveGoals": inactiveGoals}


def createDaily(user, date, notes, pico, tosse, chiado, faltaAr, acordar, bombinha):
    try:
        control, _ = DailyControl.objects.get_or_create(user=user, date=date)
        try:
            control.notes = notes
            if type(pico) == list and len(pico) == 3:
                control.pico1 = pico[0]
                control.pico2 = pico[1]
                control.pico3 = pico[2]
            elif type(pico) == list and len(pico) == 1:
                control.pico1 = pico[0]
            else:
                return "'pico' should be a 3 item array"
            control.tosse = True if tosse == 'true' or tosse == True else False
            control.chiado = True if chiado == 'true' or tosse == True else False
            control.faltaDeAr = True if faltaAr == 'true' or tosse == True else False
            control.acordar = True if acordar == 'true' or tosse == True else False
            control.bombinha = True if bombinha == 'true' or tosse == True else False
            control.save()
            return True
        except Exception as e:
            return str(e)
    except Exception as e:
        return str(e)


def getDaily(user):
    response = {}

    controls = DailyControl.objects.filter(user=user)
    for control in controls:
        controlResponse = {}
        controlResponse['notes'] = control.notes
        if control.pico1 and control.pico2 and control.pico3:
            controlResponse['pico'] = [
                control.pico1, control.pico2, control.pico3]
        controlResponse['tosse'] = control.tosse
        controlResponse['chiado'] = control.chiado
        controlResponse['faltaDeAr'] = control.faltaDeAr
        controlResponse['acordar'] = control.acordar
        controlResponse['bombinha'] = control.bombinha
        response[control.date.strftime("%Y-%m-%d")] = controlResponse

    return response


def getExercises():
    with open('media/exercicios.json', encoding="ISO-8859-1") as json_file:
        data = json.load(json_file)

    return data


def consecutiveDates(dates):
    dates = sorted([datetime.strptime(date, "%Y-%m-%d").date()
                    for date in dates])

    consecutive = 0

    if len(dates) > 0:
        first_date = dates[0]
        dates_delta = [(date - first_date).days for date in dates]

        # uses index to decrement delta
        sequence = [e - i for i, e in enumerate(dates_delta)]
        # counts each value in list
        counter = Counter(sequence)
        # gets max key
        max_key = max(counter.items(), key=operator.itemgetter(1))[0]
        # gets max key value
        consecutive = counter[max_key]

        # for i, seq in enumerate(sequence):
        #     if start == None and seq == max_key:
        #         start = dates[i]
        #     if seq == max_key:
        #         end = dates[i]

    return consecutive


def consecutiveWeeks(dates):
    dates = sorted([datetime.strptime(date, "%Y-%m-%d").date()
                    for date in dates])
    consecutive = 0

    if len(dates) > 0:
        week_numbers = [date.isocalendar()[1] for date in dates]
        week_numbers = list(np.unique(week_numbers))

        # uses index to decrement delta
        sequence = [e - i for i, e in enumerate(week_numbers)]
        # counts each value in list
        counter = Counter(sequence)
        # gets max key
        max_key = max(counter.items(), key=operator.itemgetter(1))[0]
        # gets max key value
        consecutive = counter[max_key]

    return consecutive


def getConsecStepsDays(user):
    goals = Goal.objects.filter(user=user, activity="Caminhada")
    maxDays = 0
    for goal in goals:
        start = goal.startDate
        end = goal.endDate
        noSteps = goal.quantity
        dateRange = pd.date_range(start=start, end=end).to_list()

        fitbitData = getFitbitData(user, dateRange)
        steps = {date: fitbitData[date]["summary"]["steps"]
                 for date in fitbitData}

        completeDays = [date for date in steps if steps[date] > noSteps]
        consecDays = consecutiveDates(completeDays)

        if consecDays > maxDays:
            maxDays = consecDays

    return maxDays


def getMilestonesInfo(user):
    # questionario semanal
    weeklyDates = getACQ(user)
    consecWeekly = consecutiveWeeks(weeklyDates)
    # questionario diario
    dailyDates = list(getDaily(user).keys())
    consecDaily = consecutiveDates(dailyDates)
    # dias que andou 5000 passos
    consecSteps = getConsecStepsDays(user)

    return consecWeekly, consecDaily, consecSteps


def createMilestone(user, name, level, quantity):
    try:
        milestone, _ = Milestone.objects.get_or_create(user=user, name=name)
        try:
            milestone.level = level
            milestone.quantity = quantity
            milestone.save()
            return True
        except Exception as e:
            return str(e)
    except Exception as e:
        return str(e)


def getMilestones(user):
    milestones = Milestone.objects.filter(user=user)
    data = {}
    for milestone in milestones:
        name = milestone.name
        level = milestone.level
        quantity = milestone.quantity
        data[name] = {"level": level, "quantity": quantity}

    return data
