/**
 * CENTRALIZED DATA FILE
 * All dummy data lives here. Later, replace these with API calls.
 * Think of this as your "mock database" for now.
 *
 * 💡 LEARNING TIP (Flutter/Django):
 * In your Django backend later, each of these arrays will become a Model.
 * e.g., projects → Project model, blogs → BlogPost model
 * In Flutter, you'll serialize these into Dart classes.
 */

// ─── PORTFOLIO OWNER INFO ─────────────────────────────────────────────
export const ownerInfo = {
  name: "Ayan Haldar",
  role: "Flutter Developer & Aspiring Cybersecurity Enthusiast",
  tagline: "I love to build things which solve real world problems.",
  bio: `Hey, I'm Ayan. A developer who loves the intersection of design and engineering.
I specialize in React, Flutter, and Python/Django — building everything from 
sleek mobile apps to robust REST APIs. I care deeply about developer experience, 
clean code, and interfaces that just feel right.

When I'm not coding, I'm writing about it.`,
  location: "Kolkata, West Bengal, India",
  email: "alex@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
  socials: {
    github: "https://github.com/AYAN10M",
    twitter: "https://twitter.com",
    linkedin: "https://www.linkedin.com/in/haldar-ayan/",
    dribbble: "https://dribbble.com",
  },
};

// ─── SKILLS ──────────────────────────────────────────────────────────
export const skills = [
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"] },
  { category: "Mobile", items: ["Flutter", "Dart", "React Native"] },
  { category: "Backend", items: ["Python", "Django", "Django REST Framework", "Node.js", "PostgreSQL"] },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel", "AWS"] },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────
export const experience = [
  {
    company: "TechCorp Inc.",
    role: "Senior Frontend Engineer",
    period: "2022 – Present",
    description: "Led the redesign of the main product dashboard. Improved performance by 40% and reduced bundle size by 30%.",
  },
  {
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "2020 – 2022",
    description: "Built the entire backend API using Django REST Framework. Developed the Flutter mobile app from scratch.",
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2018 – 2020",
    description: "Delivered 15+ client projects ranging from e-commerce sites to custom CMS solutions.",
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────
// 💡 Each project will later map to a Django Model with these same fields
export const projects = [
  {
    id: "1",
    title: "NoteFlow – AI Note Taking App",
    slug: "noteflow",
    shortDesc: "A beautiful note-taking app powered by AI for smart organization.",
    description: `NoteFlow is a minimalist note-taking application that uses AI to automatically organize, tag, and summarize your notes. Built with React on the frontend and Django as the backend API.

## Key Features
- AI-powered note categorization using OpenAI GPT
- Real-time collaborative editing
- Markdown support with live preview
- Cross-device sync via REST API

## Architecture
The app follows a clean separation of concerns: React handles all UI state, while Django REST Framework exposes clean endpoints. Authentication is handled via JWT tokens.`,
    coverImage: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    ],
    tags: ["React", "Django", "AI", "PostgreSQL"],
    techStack: ["React 18", "Django REST Framework", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: 2024,
  },
  {
    id: "2",
    title: "ShopDash – E-commerce Dashboard",
    slug: "shopdash",
    shortDesc: "Real-time analytics dashboard for online store owners.",
    description: `ShopDash provides store owners with real-time insights into sales, inventory, and customer behavior. This was a full-stack project with a Flutter mobile companion app.

## What I Built
- Interactive charts with real-time data updates
- Inventory management system
- Flutter mobile app for on-the-go stats
- Push notification system`,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"],
    tags: ["Flutter", "React", "Django", "Charts"],
    techStack: ["Flutter", "React", "Django", "Chart.js", "Redis", "WebSockets"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: 2024,
  },
  {
    id: "3",
    title: "DevLink – Developer Networking App",
    slug: "devlink",
    shortDesc: "A platform for developers to showcase work and connect.",
    description: `DevLink is like LinkedIn, but designed specifically for developers. Features include code snippet sharing, GitHub integration, and project collaboration tools.`,
    coverImage: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"],
    tags: ["React", "Node.js", "ML"],
    techStack: ["React", "Node.js", "MongoDB", "GitHub API", "Python ML"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    year: 2023,
  },
  {
    id: "4",
    title: "ClimaTrack – Weather Flutter App",
    slug: "climatrack",
    shortDesc: "Beautiful cross-platform weather app built with Flutter.",
    description: `ClimaTrack is a production-ready Flutter app that displays weather with beautiful animations. My first serious Flutter project — learned a ton about state management with BLoC and API integration.`,
    coverImage: "https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80"],
    tags: ["Flutter", "Dart", "API"],
    techStack: ["Flutter", "Dart", "BLoC", "OpenWeather API", "Hive"],
    liveUrl: null,
    githubUrl: "https://github.com",
    featured: false,
    year: 2023,
  },
  {
    id: "5",
    title: "TaskBoard – Kanban for Teams",
    slug: "taskboard",
    shortDesc: "Collaborative kanban board with real-time updates.",
    description: `A Trello-inspired task management app with drag-and-drop, real-time collaboration using Django Channels (WebSockets), and a clean React frontend.`,
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"],
    tags: ["React", "Django", "WebSockets"],
    techStack: ["React", "Django Channels", "WebSockets", "PostgreSQL", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    year: 2023,
  },
  {
    id: "6",
    title: "PaletteAI – Color Generator",
    slug: "paletteai",
    shortDesc: "Generate beautiful color palettes using AI descriptions.",
    description: `Type "sunset over mountains" and PaletteAI returns a 5-color palette. Built as a fun experiment with OpenAI's API and Python backend.`,
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80"],
    tags: ["Python", "AI", "React"],
    techStack: ["React", "Python", "FastAPI", "OpenAI API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    year: 2022,
  },
];

// ─── BLOG POSTS ───────────────────────────────────────────────────────
// 💡 In Django, this becomes a BlogPost model with a TextField for content (markdown)
export const blogs = [
  {
    id: "1",
    title: "Building REST APIs with Django REST Framework – A Beginner's Guide",
    slug: "drf-beginners-guide",
    excerpt: "Django REST Framework makes it surprisingly easy to build powerful APIs. Let me walk you through building your first API from scratch.",
    content: `# Building REST APIs with Django REST Framework

Django REST Framework (DRF) is one of the best tools for building web APIs. If you're coming from Flutter and want a Python backend, this is where you start.

## Setting Up

\`\`\`python
# Install DRF
pip install djangorestframework

# settings.py
INSTALLED_APPS = [
    ...
    'rest_framework',
]
\`\`\`

## Your First Serializer

Serializers are like forms, but for APIs. They convert your Python objects to JSON (and back).

\`\`\`python
from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'tags', 'created_at']
\`\`\`

## Creating Views

\`\`\`python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
\`\`\`

## Connecting from Flutter

Once your API is running, connecting from Flutter is straightforward using the \`http\` or \`dio\` package.

\`\`\`dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<Project>> fetchProjects() async {
  final response = await http.get(
    Uri.parse('https://your-api.com/api/projects/'),
  );
  
  if (response.statusCode == 200) {
    final List data = jsonDecode(response.body);
    return data.map((j) => Project.fromJson(j)).toList();
  } else {
    throw Exception('Failed to load projects');
  }
}
\`\`\`

## Next Steps

- Add authentication with JWT using \`djangorestframework-simplejwt\`
- Set up CORS for your React frontend
- Deploy to Railway or Render (both have free tiers!)

DRF is incredibly powerful. Once you understand serializers and viewsets, you can build almost anything.`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tags: ["Django", "Python", "API", "Flutter"],
    readTime: "8 min read",
    date: "2024-03-15",
    published: true,
  },
  {
    id: "2",
    title: "Flutter State Management: When to Use What",
    slug: "flutter-state-management",
    excerpt: "Provider, Riverpod, BLoC, GetX — there are too many choices. Here's how I actually think about state management in Flutter.",
    content: `# Flutter State Management: When to Use What

State management in Flutter can feel overwhelming. Let me give you a practical framework.

## The Simple Rule

**Start simple, upgrade when needed.**

\`\`\`dart
// Level 1: setState - for simple local state
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \$_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
\`\`\`

## When setState Is Not Enough

Use Provider or Riverpod when:
- State needs to be shared between multiple widgets
- State persists across navigation
- You're making API calls

\`\`\`dart
// Using Riverpod
final projectsProvider = FutureProvider<List<Project>>((ref) async {
  return await fetchProjects();
});

// In your widget
class ProjectsScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final projectsAsync = ref.watch(projectsProvider);
    
    return projectsAsync.when(
      data: (projects) => ProjectList(projects: projects),
      loading: () => CircularProgressIndicator(),
      error: (err, stack) => Text('Error: \$err'),
    );
  }
}
\`\`\`

## My Personal Recommendation

- **Learning projects**: setState + InheritedWidget
- **Medium apps**: Provider or Riverpod  
- **Large apps**: Riverpod or BLoC

Don't overcomplicate it early. setState is totally valid for simple things.`,
    coverImage: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
    tags: ["Flutter", "Dart", "State Management"],
    readTime: "6 min read",
    date: "2024-02-28",
    published: true,
  },
  {
    id: "3",
    title: "Why I Switched from Create React App to Vite",
    slug: "vite-vs-create-react-app",
    excerpt: "Cold starts in 200ms instead of 30 seconds. Here's what changed when I moved all my projects to Vite.",
    content: `# Why I Switched from Create React App to Vite

If you're still using Create React App, you're missing out on a dramatically better development experience.

## The Problem with CRA

CRA was great in 2017. But today, it's slow. Really slow.

\`\`\`bash
# CRA: Cold start
Starting development server... (30-60 seconds)

# Vite: Cold start
VITE v5.0.0  ready in 200ms
\`\`\`

## Vite's Secret

Vite uses native ES modules in development. No bundling. Your browser handles the imports.

\`\`\`javascript
// vite.config.js - That's basically it
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
\`\`\`

## Migration is Easy

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

The main things to update:
- Move \`index.html\` to project root
- Update env variables from \`REACT_APP_\` to \`VITE_\`
- Update \`process.env\` to \`import.meta.env\`

## Verdict

Switch immediately. You'll never look back.`,
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    tags: ["React", "Vite", "JavaScript", "Tools"],
    readTime: "4 min read",
    date: "2024-01-20",
    published: true,
  },
  {
    id: "4",
    title: "Deploying Django to Railway in 10 Minutes",
    slug: "django-railway-deployment",
    excerpt: "Railway makes Django deployment almost too easy. Here's a step-by-step walkthrough that actually works.",
    content: `# Deploying Django to Railway in 10 Minutes

Railway is currently my favorite platform for Django deployment. It's Heroku-like but actually maintained and affordable.

## Prerequisites

\`\`\`bash
pip install gunicorn whitenoise psycopg2-binary python-dotenv
pip freeze > requirements.txt
\`\`\`

## Configure settings.py

\`\`\`python
import os
from pathlib import Path

DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

# Database - Railway provides DATABASE_URL automatically
import dj_database_url
DATABASES = {
    'default': dj_database_url.config(default=os.getenv('DATABASE_URL'))
}

# Static files with Whitenoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
\`\`\`

## Procfile

\`\`\`
web: gunicorn myproject.wsgi --log-file -
\`\`\`

## Deploy

\`\`\`bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
\`\`\`

That's genuinely it. Railway auto-detects your Procfile and deploys in ~2 minutes.`,
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
    tags: ["Django", "Python", "Deployment", "DevOps"],
    readTime: "5 min read",
    date: "2023-12-05",
    published: true,
  },
];

// ─── ALL UNIQUE TAGS ──────────────────────────────────────────────────
export const allProjectTags = [...new Set(projects.flatMap((p) => p.tags))].sort();
export const allBlogTags = [...new Set(blogs.flatMap((b) => b.tags))].sort();
