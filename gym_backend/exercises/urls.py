from django.urls import path
from .views import ExerciseSearchView

urlpatterns = [
    path('search/', ExerciseSearchView.as_view(), name='exercise-search'),
]
