from django.shortcuts import render,redirect
from django.views import View

# Create your views here.
def index_view(request):
    return render(request,'index.html')

def playback_view(request):
    return render(request,'playback.html')