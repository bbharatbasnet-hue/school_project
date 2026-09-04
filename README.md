# Junior Cambridge Secondary School — Register & Login (Django + SQLite)

A working authentication backend for the register/login pages: a custom
User model with roles, role-aware registration, and a role-based dashboard
redirect — built to sit behind the `register.html` / `login.html` designs
from the static site (same navy/crimson/gold CSS is reused as-is).

## What's included

| File | Purpose |
|---|---|
| `accounts/models.py` | `User` (custom, role: student/teacher/admin), `Student`, `Teacher` — one-to-one profiles created at signup |
| `accounts/forms.py` | `RegistrationForm` (role-aware: validates admission number vs employee ID, password match, password strength via Django's validators, duplicate email) and `LoginForm` (authenticates by email, blocks unapproved teacher accounts) |
| `accounts/views.py` | `register_view`, `login_view`, `logout_view`, `dashboard_view` (routes to a student or teacher dashboard, or `/admin/` for admins) |
| `accounts/urls.py` | `/accounts/register/`, `/accounts/login/`, `/accounts/logout/`, `/accounts/dashboard/` |
| `accounts/admin.py` | Admin screens for `User`, `Student`, `Teacher` — includes the `is_approved` toggle for teacher accounts |
| `accounts/templates/accounts/` | `register.html`, `login.html` (Django versions of the pages you already have, wired to real forms), plus placeholder `dashboard_student.html` / `dashboard_teacher.html` |
| `accounts/static/accounts/` | Same `style.css` / `main.js` from the static school site |

## How registration works

1. Person picks **Student** or **Teacher** on the register page (a hidden `role` field switches, same as the static version's JS).
2. Student registration requires an **Admission Number**; teacher registration requires an **Employee ID** — both must be unique, checked server-side.
3. Passwords are validated against Django's built-in password validators (min length, not too common, not all-numeric) in addition to the client-side strength meter.
4. On success, a `User` row is created plus a matching `Student` or `Teacher` profile row.
5. **Teacher accounts start with `is_approved = False`** and can't log in until an admin flips that switch in `/admin/` — this models the real-world need to vet staff accounts before granting portal access. Student accounts can log in immediately.

## How login works

- Login is by **email + password** (the form authenticates against the custom `User` model, which uses email as the username internally).
- After login, `dashboard_view` checks `request.user.role` and renders the matching dashboard — student, teacher, or a redirect to `/admin/` for admin users.

## Installation

```bash
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser  # creates an admin account
python manage.py runserver
```

Visit:
- **Register:** http://127.0.0.1:8000/accounts/register/
- **Login:** http://127.0.0.1:8000/accounts/login/
- **Admin:** http://127.0.0.1:8000/admin/ (approve teacher accounts here)

A pre-migrated `db.sqlite3` is included with one working superuser:
- **Email/username:** `admin@example.com`
- **Password:** `admin12345`

**Change or remove this before deploying anywhere public.**

## Tested end-to-end
Before packaging, I ran this against a live dev server:
- Register a student → 302 redirect (success) → login → dashboard renders their name and admission number. ✔
- Register a teacher → account created but flagged unapproved → login attempt correctly blocked with "awaiting admin approval." ✔
- Registering a second account with an already-used email → correctly rejected with "already exists." ✔

## Next steps to connect this to the rest of the school site
- Copy `register.html` / `login.html`'s markup differences (if any) back into the static site once you're happy, or serve the static site's other pages (`about.html`, `admissions.html`, etc.) as Django templates too so the whole site shares one login state.
- Add `@login_required` views for homework, attendance, and results once those models exist (the school project's earlier model sketch — `Student`, `Teacher`, `Result`, `Attendance`, `Homework` — is a good starting point to merge in).
- Swap `EMAIL_BACKEND` to real SMTP if you want a "verify your email" or "forgot password" flow — Django's built-in `PasswordResetView` drops in cleanly on top of this.
