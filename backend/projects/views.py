from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset         = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field     = 'slug'           # /api/projects/noteflow/ instead of /api/projects/1/
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['title', 'short_desc', 'tags']

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """GET /api/projects/featured/ — returns only featured projects"""
        featured = Project.objects.filter(featured=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)