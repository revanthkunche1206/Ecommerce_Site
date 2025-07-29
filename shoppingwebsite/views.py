from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def buy(request):
    return render(request, 'buy.html')
