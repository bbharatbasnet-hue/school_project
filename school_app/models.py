"""
Junior Cambridge Secondary School — Accounts Models
======================================================
A single custom User (role: student / teacher / admin) plus a
one-to-one profile per role, created automatically at registration.
"""
# from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


# class User(AbstractUser):
#     """Custom user used for every portal login (student, teacher, admin)."""

#     class Role(models.TextChoices):
#         STUDENT = "student", "Student"
#         TEACHER = "teacher", "Teacher"
#         ADMIN = "admin", "Admin"

#     role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)
#     phone = models.CharField(max_length=20, blank=True)
#     email = models.EmailField(unique=True)

#     REQUIRED_FIELDS = ["email"]

#     def __str__(self):
#         return f"{self.get_full_name() or self.username} ({self.get_role_display()})"

#     @property
#     def is_student(self):
#         return self.role == self.Role.STUDENT

#     @property
#     def is_teacher(self):
#         return self.role == self.Role.TEACHER

#     @property
#     def is_admin_role(self):
#         return self.role == self.Role.ADMIN


# class Student(models.Model):
#     """Created automatically when a User registers with role=student."""
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
#     admission_number = models.CharField(max_length=30, unique=True)
#     school_class = models.CharField(max_length=40, blank=True, help_text="e.g. 'Grade 8'")
#     guardian_name = models.CharField(max_length=120, blank=True)
#     guardian_phone = models.CharField(max_length=20, blank=True)
#     enrolled_date = models.DateField(default=timezone.now)

#     def __str__(self):
#         return f"{self.user.get_full_name()} ({self.admission_number})"


# class Teacher(models.Model):
#     """Created automatically when a User registers with role=teacher."""
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="teacher_profile")
#     employee_id = models.CharField(max_length=30, unique=True)
#     subject_specialty = models.CharField(max_length=120, blank=True)
#     qualification = models.CharField(max_length=150, blank=True)
#     joined_date = models.DateField(default=timezone.now)
#     is_approved = models.BooleanField(
#         default=False,
#         help_text="Teacher accounts require admin approval before first login."
#     )

#     def __str__(self):
#         return f"{self.user.get_full_name()} ({self.employee_id})"


class Contact(models.Model):
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    def __str__(self):
        return self.full_name



# class Student(models.Model):
#     f_name = models.CharField(max_length=100)
#     admission_number = models.CharField(max_length=30, unique= True)
#     email_adress = models.EmailField()
#     p_number = models.CharField(max_length=15)
#     password = models.CharField(max_length=128)
#     confirm_password = models.CharField(max_length=128)

#     def __str__(self):
#         return self.f_name