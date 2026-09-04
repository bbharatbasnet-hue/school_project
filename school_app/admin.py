from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import User as AuthUser
from .models import  Contact
# from .models import User, Student, Teacher, Contact


# @admin.register(User)
# class UserAdmin(BaseUserAdmin):
#     list_display = ("username", "email", "first_name", "last_name", "role", "is_active", "is_staff")
#     list_filter = ("role", "is_active", "is_staff")
#     fieldsets = BaseUserAdmin.fieldsets + (
#         ("Role & Contact", {"fields": ("role", "phone")}),
#     )
#     add_fieldsets = BaseUserAdmin.add_fieldsets + (
#         ("Role & Contact", {"fields": ("role", "email", "phone")}),
#     )


# @admin.register(Student)
# class StudentAdmin(admin.ModelAdmin):
#     list_display = ("admission_number", "user", "school_class", "enrolled_date")
#     search_fields = ("admission_number", "user__first_name", "user__last_name")
#     list_filter = ("school_class",)


# @admin.register(Teacher)
# class TeacherAdmin(admin.ModelAdmin):
#     list_display = ("employee_id", "user", "subject_specialty", "is_approved")
#     list_filter = ("is_approved",)
#     list_editable = ("is_approved",)
#     search_fields = ("employee_id", "user__first_name", "user__last_name")


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'phone_number', 'email', 'subject', 'message')


# @admin.register(Student)
# class StudentAdmin(admin.ModelAdmin):
#     list_display = (
#         'id',
#         'f_name',
#         'admission_number',
#         'email_adress',
#         'p_number',
#         'password',
#         'confirm_password',
#     )