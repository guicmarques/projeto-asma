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
from server.handleUserData import createUser, getUserData, updateUserData


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

        if missingData or not created:
            request_status = status.HTTP_400_BAD_REQUEST
        else:
            request_status = status.HTTP_200_OK

        return Response({"missingData": missingData, "created": created}, status=request_status)


class UserData(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = getUserData(request.user)

        return Response(data)

    def put(self, request):
        updated = updateUserData(request.user, request.data)

        if not updated:
            request_status = status.HTTP_500_INTERNAL_SERVER_ERROR
        else:
            request_status = status.HTTP_200_OK

        return Response({"updated": updated}, status=request_status)
