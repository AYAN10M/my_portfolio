# Alex Chen – Developer Portfolio

A modern, minimal portfolio + blog website built with React, Vite, and Tailwind CSS.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 📁 Project Structure

```
src/
├── context/index.jsx      # ThemeContext, AuthContext, DataContext (CRUD)
├── data/data.js           # All dummy data — replace with API calls later
├── hooks/index.js         # useDebounce, usePagination, useLocalStorage, etc.
├── components/
│   ├── UI.jsx             # Reusable: Skeleton, Tag, Pagination, SearchInput
│   ├── Navbar.jsx         # Sticky navbar with dark mode + mobile menu
│   ├── Footer.jsx         # Footer + CustomCursor
│   ├── ProjectCard.jsx    # Project preview card
│   ├── BlogCard.jsx       # Blog post preview card
│   └── ProtectedRoute.jsx # Admin route guard
└── pages/
    ├── Home.jsx           # Landing page (hero, featured, stats, blogs)
    ├── Projects.jsx       # Projects grid with search + tag filter
    ├── ProjectDetail.jsx  # Full project detail page
    ├── Blog.jsx           # Blog grid with search + tag filter
    ├── BlogDetail.jsx     # Full blog post with markdown rendering
    ├── About.jsx          # Bio, skills, experience timeline
    ├── Contact.jsx        # Contact form + social links
    └── admin/
        ├── Login.jsx      # Admin login (admin / admin123)
        ├── AdminLayout.jsx # Sidebar layout
        ├── Dashboard.jsx  # Stats overview
        ├── AdminProjects.jsx # Projects CRUD
        └── AdminBlogs.jsx    # Blogs CRUD
```

## 🔐 Admin Panel

Visit `/admin/login` and use:
- **Username:** admin
- **Password:** admin123

## 🌐 Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

The `vercel.json` handles SPA routing.

## 🔗 Connecting to Django Later

Replace functions in `src/context/index.jsx` with fetch calls:

```js
// Example: replace deleteProject with:
const deleteProject = async (id) => {
  await fetch(`/api/projects/${id}/`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  setProjects(prev => prev.filter(p => p.id !== id));
};
```

## 💡 Learning Notes

| React concept       | Flutter equivalent     | Django equivalent      |
|---------------------|------------------------|------------------------|
| Context + Provider  | Provider package       | N/A (server state)     |
| useDebounce hook    | Timer utility          | Query params on API    |
| localStorage auth   | SharedPreferences      | JWT tokens             |
| data/data.js        | Hardcoded Dart lists   | Django ORM Models      |
| React Router        | go_router              | urls.py (API routes)   |
