from django.shortcuts import render
from rest_framework import generics, status, serializers
from .serializers import RegisterSerializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


# Create your views here.

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializers
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response({
                "message": "Create succesfully!",
                "user": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
