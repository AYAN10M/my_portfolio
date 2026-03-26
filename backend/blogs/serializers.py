from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Blog
        fields = '__all__'

class BlogListSerializer(serializers.ModelSerializer):
    """Lighter serializer for list view — excludes full markdown content"""
    class Meta:
        model  = Blog
        exclude = ['content']