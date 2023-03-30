from django.urls import path
from . import views

urlpatterns = [
    path('public/v1/composite/get-radio/', views.RadioAPIView.as_view()),
    path('streaming/<str:id>/', views.GetStreamingDetailAPIView.as_view()),
]
