from django.db import models

class Project(models.Model):
    title       = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True)
    short_desc  = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    cover_image = models.URLField(blank=True)
    tags        = models.JSONField(default=list)
    tech_stack  = models.JSONField(default=list)
    live_url    = models.URLField(blank=True)
    github_url  = models.URLField(blank=True)
    featured    = models.BooleanField(default=False)
    year        = models.IntegerField(default=2024)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title