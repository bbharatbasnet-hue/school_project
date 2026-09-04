from django.shortcuts import render, redirect

# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def about(request):
    return render(request, 'main/about.html')

def base(request):
    return render(request, 'base.html')

def contact(request):
    return render(request, 'main/contact.html')

def academics(request):
    return render(request, 'main/academics.html')

def admissions(request):
    return render(request, 'main/admissions.html')

def log_in(request):
    return render(request, 'auth/login.html')

def teachers(request):
    return render(request, 'main/teachers.html')

def gallery(request):
    return render(request, 'main/gallery.html')

def news(request):
    return render(request, 'main/news.html')
