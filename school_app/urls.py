from django.urls import path

from .views import *


urlpatterns = [
    path('', index, name='index'),
    path('about/', about, name='about'),
    path('base/', base, name='base'),
    path('contact/', contact, name='contact'),
    path('academics/', academics, name='academics'),
    path('admissions/', admissions, name='admissions'),
    path('login/', log_in, name='login'),
    path('teachers/', teachers, name='teachers'),
    path('gallery/', gallery, name='gallery'),
    path('news/', news, name='news'),

]
