from django.contrib import admin

from apiApp.models import todo_data, user_credentials

# Register your models here.
admin.site.register(user_credentials)
admin.site.register(todo_data)

