from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import Group, User
from django.http import Http404
from rest_framework import viewsets
from server.serializers import UserSerializer, GroupSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from server.handleUserData import createUser


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
    def post(self, request):
        missingData, created = createUser(request.data)
        if missingData:
            return Response("There are missing fields in your request", status=status.HTTP_400_BAD_REQUEST)
        if not created:
            return Response("This user is already created", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("New user {} created".format(request.data["username"]))
