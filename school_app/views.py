from django.contrib import messages
# from django.contrib.auth import login as auth_login, logout as auth_logout

# from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

# from .forms import RegistrationForm, LoginForm
from .models import  Contact

def index(request):
    return render(request, 'main/index.html')


def base(request):
    return render(request, 'base.html')


def index(request):
    return render(request, 'main/index.html')


def contact(request):
    if request.method == "POST":
        name = request.POST.get("full_name")
        phone_number = request.POST.get("phone_number")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        Contact.objects.create(
            name=name,
            phone_number=phone_number,
            email=email,
            subject=subject,
            message=message
        )

        messages.success(request, "Your message has been sent successfully!")

        return redirect("contact")

    return render(request, 'main/contact.html')


def about(request):
    return render(request, 'main/about.html')


def academics(request):
    return render(request, 'main/academics.html')


def admissions(request):
    return render(request, 'main/admissions.html')


def gallery(request):
    return render(request, 'main/gallery.html')


def news(request):
    return render(request, 'main/news.html')


def teachers(request):
    return render(request, 'main/teachers.html')


def register(request):
    return render(request, 'auth/register.html')


def log_in(request):
    return render(request, 'auth/login.html')