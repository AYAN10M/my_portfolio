from django.contrib import admin
from .models import Blog

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'published', 'date', 'created_at')
    list_filter = ('published', 'date')
    search_fields = ('title', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
