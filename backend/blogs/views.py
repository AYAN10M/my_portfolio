from rest_framework import viewsets, filters
from .models import Blog
from .serializers import BlogSerializer, BlogListSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset         = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field     = 'slug'
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['title', 'excerpt', 'tags']

    def get_queryset(self):
        qs = super().get_queryset()
        # Public users only see published posts
        if not self.request.user.is_authenticated:
            qs = qs.filter(published=True)
        return qs

    def get_serializer_class(self):
        # Use lighter serializer for list actions
        if self.action == 'list':
            return BlogListSerializer
        return BlogSerializer