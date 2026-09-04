from django.contrib import messages
from .models import  Contact
from django.shortcuts import render, redirect
import re # this regiex



from django.contrib.auth.models import User as AuthUser
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
# login as auth_login, logout as auth_logout
# from django.contrib.auth.decorators import login_required
# from .forms import RegistrationForm, LoginForm


def index(request):
    return render(request, 'main/index.html')


def base(request):
    return render(request, 'base.html')


def index(request):
    return render(request, 'main/index.html')


def contact(request):
    if request.method == "POST":
        full_name = request.POST.get("full_name")
        phone_number = request.POST.get("phone_number")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        Contact.objects.create(
            full_name=full_name,
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


# Register start

def register(request):
    if request.method == "POST":
        username = request.POST.get("username")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if password == confirm_password:
            try:
                if AuthUser.objects.filter(username = username).exists():
                    messages.error(request, "already exists username")
                    return redirect('register')
                if AuthUser.objects.filter(email = email).exists:
                    messages.error(request, "already used email")
                    return redirect("register")
                
                if not email.endswith('@gmail.com'):
                    messages.error(request, "please enter a valid gmail address")
                    return redirect ("register")
                
                if len(password)<8:
                    messages.error(request, "at least 8 character")
                    return redirect('register')
                elif not re.search(r'[A-Z]', password):
                    messages.error(request, "enter atleast letters")
                    return redirect('register')

                elif not re.search(r'[0-9]', password):
                    messages.error(request, 'enter altelast 0-9')
                    return redirect('register')
            

                # validate_password(password)

                AuthUser.objects.create_user(
                    username= username,
                    first_name = first_name,
                    last_name = last_name,
                    email = email,
                    password = password,
        
                )
                messages.success(request, "account cretead sucessfully")
                return redirect('index')
            except ValidationError as e:
                for error in e.messages:
                    messages.error(request, error)
                    return redirect('register')
    
    return render(request, 'auth/register.html')


# register end 



def log_in(request):
    return render(request, 'auth/login.html')