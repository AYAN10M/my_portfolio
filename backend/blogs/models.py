from django.db import models

class Blog(models.Model):
    title      = models.CharField(max_length=200)
    slug       = models.SlugField(unique=True)
    excerpt    = models.CharField(max_length=400)
    content    = models.TextField()             # stores markdown
    cover_image = models.URLField(blank=True)
    tags       = models.JSONField(default=list)
    read_time  = models.CharField(max_length=20, default='5 min read')
    date       = models.DateField()
    published  = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title