/**
 * CENTRALIZED DATA FILE
 * Static portfolio owner info, skills, and education/certifications.
 * Projects and blogs now come from the Django API.
 */

// ─── PORTFOLIO OWNER INFO ─────────────────────────────────────────────
export const ownerInfo = {
  name: "Ayan Haldar",
  role: "Full Stack Developer | Flutter & Django",
  tagline: "I love to build things which solve real world problems.",
  bio: `Hey, I'm Ayan — a B.Tech IT student at Bengal Institute of Technology, Kolkata.
I specialize in Flutter, Django, and React — building everything from 
cross-platform mobile apps to robust REST APIs. I'm passionate about clean 
architecture, developer experience, and interfaces that just feel right.

I'm an AWS Certified Cloud Foundations Graduate and love exploring the 
intersection of mobile development and backend engineering.`,
  location: "Kolkata, West Bengal, India",
  email: "ayanhaldarofficial@gmail.com",
  phone: "+91-9062401335",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayan&backgroundColor=b6e3f4",
  socials: {
    github: "https://github.com/AYAN10M",
    linkedin: "https://www.linkedin.com/in/haldar-ayan/",
  },
};

// ─── SKILLS ──────────────────────────────────────────────────────────
export const skills = [
  { category: "Languages", items: ["Python", "Java", "Dart", "JavaScript", "C", "C++", "HTML", "CSS"] },
  { category: "Frameworks", items: ["Flutter", "Django", "Django REST Framework", "React", "Tailwind CSS"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL"] },
  { category: "Tools & Libraries", items: ["Git", "GitHub", "Figma", "VS Code", "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Google Maps API"] },
  { category: "Core Concepts", items: ["OOP", "DBMS", "Operating Systems", "RESTful APIs", "Cloud Computing"] },
];

// ─── EDUCATION ────────────────────────────────────────────────────────
export const education = [
  {
    institution: "Bengal Institute of Technology, Kolkata",
    degree: "B.Tech, Information Technology",
    period: "2022 – 2026",
    grade: "7.6 CGPA",
  },
  {
    institution: "Kendriya Vidyalaya No. 2 Salt Lake, CBSE",
    degree: "Senior Secondary (12th)",
    period: "2020 – 2022",
    grade: "80.4%",
  },
  {
    institution: "Kendriya Vidyalaya No. 2 Salt Lake, CBSE",
    degree: "Secondary (10th)",
    period: "2018 – 2020",
    grade: "86.6%",
  },
];

// ─── CERTIFICATIONS ───────────────────────────────────────────────────
export const certifications = [
  {
    title: "AWS Academy Cloud Foundations Graduate",
    issuer: "AWS Academy",
  },
  {
    title: "SAP Certification",
    issuer: "SAP",
  },
];

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────
export const achievements = [
  "3rd Place — Poster Presentation on Natural Language Processing (NLP) at college tech fest",
  "3rd Place — Biotechellence for developing Arduino-based plant health detection system",
];

// ─── EXPERIENCE (Projects from resume — for the About page timeline) ─
export const experience = [
  {
    company: "Personal Project",
    role: "Expire Tracker — Smart Home Item Management App",
    period: "Flutter, Django REST Framework, PostgreSQL",
    description: "Built a mobile app to track expiry dates with QR code scanning, automated push notifications for expiry alerts, and PostgreSQL backend for data persistence.",
  },
  {
    company: "Personal Project",
    role: "RollCall — Geo-Location Based Attendance System",
    period: "Flutter, Google Maps API",
    description: "Developed a real-time location-verified attendance app using Google Maps API for geofencing with secure attendance marking and location validation.",
  },
  {
    company: "Personal Project",
    role: "Hotel Management System — CLI Application",
    period: "Python, MySQL",
    description: "Created a terminal-based hotel management system with booking/billing features, MySQL database integration, room availability tracking, and OOP architecture.",
  },
];
