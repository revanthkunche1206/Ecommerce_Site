from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('buy.html', views.buy, name='buy'),
]
