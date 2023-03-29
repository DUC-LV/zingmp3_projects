from django.urls import path
from . import views

urlpatterns = [
    path('update/streaming/', views.StreamingAPIView.as_view()),
    path('update/host/', views.HostAPIView.as_view()),
    path('update/program/', views.ProgramAPIView.as_view()),
]
