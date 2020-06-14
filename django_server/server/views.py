import logging
from datetime import datetime

# Create your views here.
from django.contrib.auth.models import Group, User
from django.http import Http404
from django.shortcuts import redirect, render
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

import server.fitbitHandler as fitbitHandler
import server.handleUserData as handleUserData
import server.watsonHandler as watson
from server.serializers import GroupSerializer, UserSerializer


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        group = User.objects.filter(groups__name="Pacientes")
        content = []
        for user in group:
            content.append(user.username)
        return Response(content)


class Test(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response("GET ok")

    def post(self, request):
        return Response(request.data)


class RegisterUser(APIView):
    permission_classes = ()

    def post(self, request):
        missingData, created = handleUserData.createUser(request.data)

        if missingData or not created:
            request_status = status.HTTP_400_BAD_REQUEST
            logging.warn(f"REGISTER error: {missingData}")
        else:
            request_status = status.HTTP_200_OK

        return Response({"missingData": missingData, "created": created}, status=request_status)


class UserData(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = handleUserData.getUserData(request.user)

        return Response(data)

    def put(self, request):
        updated = handleUserData.updateUserData(request.user, request.data)

        if not updated:
            request_status = status.HTTP_500_INTERNAL_SERVER_ERROR
            logging.warn(f"CHANGE USER DATA error: {updated}")
        else:
            request_status = status.HTTP_200_OK

        return Response({"updated": updated}, status=request_status)


class ChangePassword(APIView):
    permission_classes = ()

    def post(self, request):
        try:
            username = request["username"]
            password = request["password"]
            updated = handleUserData.changePassword(username, password)
            if updated == True:
                return Response({"updated": updated}, status=status.HTTP_200_OK)
            else:
                logging.warn(f"PASSWORD CHANGE error: {updated}")
                return Response({"updated": updated}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"updated": e}, status=status.HTTP_400_BAD_REQUEST)


class Questionnaire(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        created = handleUserData.createACQ(request.user, request.data)

        if created != True:
            logging.warn(f"QUESTIONNAIRE created error: {created}")
            request_status = status.HTTP_500_INTERNAL_SERVER_ERROR
        else:
            request_status = status.HTTP_200_OK

        return Response({"created": created}, status=request_status)

    def get(self, request):
        dates = handleUserData.getACQDates(request.user)

        return Response({"dates": dates}, status=status.HTTP_200_OK)


class Daily(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        required = ["note", "pico", "tosse",
                    "chiado", "faltaAr", "acordar", "bombinha"]

        if all(item in request.data.keys() for item in required):
            date = datetime.today().date()
            note = request.data["note"]
            pico = request.data["pico"]
            tosse = request.data["tosse"]
            chiado = request.data["chiado"]
            faltaAr = request.data["faltaAr"]
            acordar = request.data["acordar"]
            bombinha = request.data["bombinha"]

            created = handleUserData.createDaily(request.user, date, note,
                                                 pico, tosse, chiado, faltaAr, acordar, bombinha)

            if created == True:
                request_status = status.HTTP_200_OK
            else:
                logging.warn(created)
                request_status = status.HTTP_400_BAD_REQUEST

        else:
            created = "There are missing keys in request"
            logging.warn(f"DAILY created error: {created}")
            request_status = status.HTTP_400_BAD_REQUEST

        return Response({"created": created}, status=request_status)

    def get(self, request):
        daily = handleUserData.getDaily(request.user)

        return Response(daily)


class Fitbit(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        required = ["date"]

        if all(item in request.data.keys() for item in required):
            date = request.data["date"]
            if "category" not in request.data:
                activity = handleUserData.getFitbitData(request.user, date)
            else:
                # DEPRECATED
                category = request.data["category"]
                data = handleUserData.deprecatedFitbitData(
                    request.user, date, category)
                activity = {"data": data}

            return Response(activity, status=status.HTTP_200_OK)
        else:
            return Response({"data": "There are missing keys in request"}, status=status.HTTP_400_BAD_REQUEST)


# guarda o state do request da pessoa que realizou a autentica��o
fitbitAuths = {}


class FitbitLogin(APIView):
    permission_classes = ()
    global fitbitAuths

    # recebe cpf da pessoa que deseja cadastrar a fitbit � conta
    def get(self, request):
        args = {
            'message': "Insira aqui o CPF utilizado no cadastro do app"}
        return render(request, "health_team/fitbit_login.html", args)

    def post(self, request):
        cpf = request.POST.get('cpf_number')
        fitbitAPI = fitbitHandler.getFitbitAPI(cpf)
        if fitbitAPI is not None:
            url, _ = fitbitAPI.client.authorize_token_url()
            state = url.split("state=")[1]
            fitbitAuths[state] = [fitbitAPI, cpf]
            logging.debug(f"FITBIT LOGIN url: {url}; state: {state}")
            return redirect(url)
        else:
            args = {'message': f"O CPF {cpf} nao esta cadastrado, insira outro"}
            return render(request, "health_team/fitbit_login.html", args)


class FitbitAuth(APIView):
    permission_classes = ()

    def get(self, request):
        code = request.GET.get("code", None)
        state = request.GET.get("state", None)
        fitbitAPI = fitbitAuths[state][0]
        cpf = fitbitAuths[state][1]
        logging.debug(f"cpf: {cpf}; fitbit code: {code}; state: {state}")

        accessToken, refreshToken, userId = fitbitHandler.getTokens(
            fitbitAPI, code)

        if accessToken is not None:
            logging.debug(
                f"userid: {userId}; refresh: {refreshToken}; AT: {accessToken}")
            created, user = fitbitHandler.updateFbProfile(
                accessToken, refreshToken, userId, cpf)
            if created:
                _, fitbitData = fitbitHandler.getActivities(user)
                return Response(fitbitData)
        else:
            logging.warn(f"error gathering fitbit tokens: {userId}")
        text = userId
        return Response(text, status.HTTP_401_UNAUTHORIZED)


class Goals(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        required = ["activity", "quantity", "unit", "daysToEnd"]
        if all(item in request.data.keys() for item in required):
            activity = request.data["activity"]
            quantity = request.data["quantity"]
            unit = request.data["unit"]
            daysToEnd = request.data["daysToEnd"]
            created = handleUserData.createGoal(
                request.user, activity, quantity, unit, daysToEnd)

            if created == True:
                request_status = status.HTTP_200_OK
            else:
                request_status = status.HTTP_400_BAD_REQUEST
                logging.warn(f"GOALS created error: {created}")

        else:
            created = "There are missing keys in request"
            request_status = status.HTTP_400_BAD_REQUEST

        return Response({"created": created}, status=request_status)

    def get(self, request):
        goals = handleUserData.getGoals(request.user)

        return Response(goals)


class Exercises(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if "id" in request.data:
            exercise_id = request.data["id"]
        else:
            exercise_id = None
        exercicios = handleUserData.getExercises(exercise_id)

        return Response(exercicios)


class Barriers(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        required = ["interesse", "tempo", "energia", "faltaAr", "companhia",
                    "dinheiro", "coisas", "seguranca", "clima", "equipamentos"]

        if all(item in request.data.keys() for item in required):

            created = handleUserData.createBarrier(request.user, request.data)

            if created == True:
                request_status = status.HTTP_200_OK
            else:
                request_status = status.HTTP_400_BAD_REQUEST
                logging.warn(f"MILESTONES created error: {created}")

        else:
            created = "There are missing keys in request"
            request_status = status.HTTP_400_BAD_REQUEST

        return Response({"created": created}, status=request_status)

    def get(self, request):
        dates = handleUserData.getBarriersDates(request.user)

        return Response({"dates": dates}, status=status.HTTP_200_OK)


class Milestones(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        if "info" in request.data:
            weekly, daily, steps = handleUserData.getMilestonesInfo(
                request.user)
            data = {"weekly": weekly, "daily": daily, "steps": steps}

            return Response(data=data)

        elif "find" in request.data:
            data = handleUserData.getMilestones(request.user)
            return Response(data=data)
        else:
            return Response({"error": "You must select either info or find"},
                            status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        required = ["name", "level", "quantity"]
        if all(item in request.data.keys() for item in required):
            name = request.data["name"]
            level = request.data["level"]
            quantity = request.data["quantity"]
            created = handleUserData.createMilestone(
                request.user, name, level, quantity)

            if created == True:
                request_status = status.HTTP_200_OK
            else:
                request_status = status.HTTP_400_BAD_REQUEST
                logging.warn(f"MILESTONES created error: {created}")

        else:
            created = "There are missing keys in request"
            request_status = status.HTTP_400_BAD_REQUEST

        return Response({"created": created}, status=request_status)

class Watson(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if "text" in request.data:
            intent, responses = watson.askWatson(request.data["text"])
            request_status = status.HTTP_200_OK

        else:
            intent = ""
            responses = "There are missing keys in request"
            request_status = status.HTTP_400_BAD_REQUEST

        resp = {"intent": intent, "responses": responses}
        
        return Response(resp, status=request_status)
