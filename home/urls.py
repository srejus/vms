from django.urls import path
from .views import *

urlpatterns = [
    path('',index_view,name='index_view'),
    path('playback',playback_view,name='playback_view'),
    path('cameras',camera_view,name='camera_view'),
]