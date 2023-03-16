from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializers(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200, default=None, allow_blank=True)
    email = serializers.CharField(max_length=200, default=None, allow_blank=True)
    password = serializers.CharField(max_length=200, default=None, allow_blank=True, write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def validate(self, args):
        email = args.get('email', None)
        username = args.get('username', None)

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "email aready exits"})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "username aready exits"})

        return super().validate(args)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
