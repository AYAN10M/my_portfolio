from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'featured', 'year', 'created_at')
    list_filter = ('featured', 'year')
    search_fields = ('title', 'short_desc')
    prepopulated_fields = {'slug': ('title',)}
