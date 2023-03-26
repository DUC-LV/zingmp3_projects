from django.urls import path
from . import views

urlpatterns = [
    path('hub/<str:id>/', views.TopicCategoryDetail.as_view()),
]
