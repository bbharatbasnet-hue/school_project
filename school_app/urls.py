from django.urls import path
from .views import *

urlpatterns = [
    path("base/", base, name="base"),
    path("", index, name="index"),
    path("register/", register, name="register"),
    path("login/", log_in, name="login"),
    path("about/", about, name="about"),
    path("academics/", academics, name="academics"),
    path("admissions/", admissions, name="admissions"),
    path("contact/", contact, name="contact"),
    path("gallery/", gallery, name="gallery"),
    path("news/", news, name="news"),
    path("teachers/", teachers, name="teachers"),
]