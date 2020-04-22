from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import Group, User
from django.http import Http404
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from server.serializers import UserSerializer, GroupSerializer
import server.handleUserData as handleUserData


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

    def post(self, request):
        try:
            print(request.data["teste"])
            content = {'message': 'Hello, World!',
                       'data': request.data["teste"]}
            return Response(content, status=status.HTTP_200_OK)
        except:
            return Response("Couldn't get data", status=status.HTTP_400_BAD_REQUEST)


class RegisterUser(APIView):
    permission_classes = ()

    def post(self, request):
        missingData, created = handleUserData.createUser(request.data)

        if missingData or not created:
            request_status = status.HTTP_400_BAD_REQUEST
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
        else:
            request_status = status.HTTP_200_OK

        return Response({"updated": updated}, status=request_status)


class Questionnaire(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        created = handleUserData.createACQ(request.user, request.data)

        if created != True:
            request_status = status.HTTP_500_INTERNAL_SERVER_ERROR
        else:
            request_status = status.HTTP_200_OK

        return Response({"created": created}, status=request_status)


class Fitbit(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        required = ["date", "category"]

        if all(item in request.data.keys() for item in required):
            date = request.data["date"]
            category = request.data["category"]
            files = handleUserData.getFitbitData(request.user, date, category)

            return Response({"data": files}, status=status.HTTP_200_OK)
        else:
            return Response({"data": ""}, status=status.HTTP_400_BAD_REQUEST)
