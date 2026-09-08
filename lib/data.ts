export const personal = {
  name: "Wahad Ahmed",
  role: "Full-Stack Web Developer",
  university: "University of Lahore (UOL), Lahore",
  location: "Lahore, Pakistan",
  email: "ahmed.wahad49@gmail.com",
  phone: "+92 300 0000000",
  bio: "I'm a passionate full-stack web developer from Lahore, Pakistan, currently studying at the University of Lahore (UOL). I build fast, scalable, and production-ready web applications using React, Next.js, Node.js, and more. I love turning complex ideas into clean, maintainable code.",
  github: "https://github.com/wahad-ahmed",
  linkedin: "https://pk.linkedin.com/in/wahad-ahmed-916696294?trk=people-guest_people_search-card",
  twitter: "https://twitter.com/wahad_ahmed",
};

export const skills = [
  { name: "React.js",          level: 90, icon: "⚛️",  category: "Frontend" },
  { name: "Next.js",           level: 88, icon: "▲",   category: "Frontend" },
  { name: "JavaScript",        level: 92, icon: "🟡",  category: "Language" },
  { name: "TypeScript",        level: 82, icon: "🔷",  category: "Language" },
  { name: "Node.js / Express", level: 80, icon: "🟢",  category: "Backend"  },
  { name: "Tailwind CSS",      level: 90, icon: "💨",  category: "Frontend" },
  { name: "MongoDB",           level: 75, icon: "🍃",  category: "Database" },
  { name: "PostgreSQL",        level: 68, icon: "🐘",  category: "Database" },
  { name: "Git / GitHub",      level: 88, icon: "🐙",  category: "Tools"    },
  { name: "Docker",            level: 58, icon: "🐳",  category: "DevOps"   },
];

export const projects = [
  {
    id: 1,
    title: "Drive Vitals — Marketing Site",
    description:
      "A modern, high-performance marketing website for Drive Vitals. Built with Next.js and Tailwind CSS featuring smooth animations, responsive design, and optimised SEO to drive conversions.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    github: "https://github.com/wahad-ahmed",
    live: "https://drive-vitals-marketing-site-72fb.vercel.app/",
    featured: true,
    category: "Frontend",
    color: "#00e5ff",
  },
  {
    id: 2,
    title: "Full-Stack E-Commerce",
    description:
      "A production-ready e-commerce platform with product listings, cart management, Stripe payments, admin dashboard, and real-time inventory tracking. — Coming soon.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
    github: "https://github.com/wahad-ahmed",
    live: "#",
    featured: true,
    category: "Full Stack",
    color: "#7c3aed",
  },
  {
    id: 3,
    title: "Real-time Chat App",
    description:
      "End-to-end encrypted real-time chat application with rooms, direct messages, file sharing, emoji reactions, and online presence indicators. — Coming soon.",
    tech: ["Next.js", "Socket.io", "Redis", "MongoDB", "JWT Auth"],
    github: "https://github.com/wahad-ahmed",
    live: "#",
    featured: true,
    category: "Full Stack",
    color: "#10b981",
  },
  {
    id: 4,
    title: "Project Management Tool",
    description:
      "A drag-and-drop project management app with real-time collaboration, task assignment, progress tracking, and team chat inspired by Trello. — Coming soon.",
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL", "Redux"],
    github: "https://github.com/wahad-ahmed",
    live: "#",
    featured: false,
    category: "Full Stack",
    color: "#f59e0b",
  },
  {
    id: 5,
    title: "Developer Blog CMS",
    description:
      "A headless CMS-powered developer blog with MDX support, syntax highlighting, SEO optimisation, and a custom admin panel. — Coming soon.",
    tech: ["Next.js", "MDX", "Prisma", "SQLite", "Tailwind CSS"],
    github: "https://github.com/wahad-ahmed",
    live: "#",
    featured: false,
    category: "Frontend",
    color: "#ec4899",
  },
  {
    id: 6,
    title: "AI Resume Builder",
    description:
      "An AI-powered resume builder that generates tailored resumes using GPT-4, supports multiple templates, PDF export, and ATS scoring. — Coming soon.",
    tech: ["Next.js", "OpenAI API", "PDFKit", "Tailwind CSS", "Prisma"],
    github: "https://github.com/wahad-ahmed",
    live: "#",
    featured: false,
    category: "AI / Full Stack",
    color: "#6366f1",
  },
];

export const orbitItems = [
  { icon: "⚛️",  label: "React",      size: 48, radius: 170, speed: 9,  delay: 0   },
  { icon: "▲",   label: "Next.js",    size: 46, radius: 215, speed: 13, delay: 1.5 },
  { icon: "🟡",  label: "JS",         size: 44, radius: 245, speed: 11, delay: 3   },
  { icon: "🔷",  label: "TypeScript", size: 44, radius: 185, speed: 15, delay: 0.5 },
  { icon: "🟢",  label: "Node.js",    size: 46, radius: 260, speed: 10, delay: 2   },
  { icon: "💨",  label: "Tailwind",   size: 42, radius: 225, speed: 12, delay: 4   },
  { icon: "🐙",  label: "GitHub",     size: 44, radius: 200, speed: 14, delay: 1   },
  { icon: "🍃",  label: "MongoDB",    size: 42, radius: 250, speed: 8,  delay: 3.5 },
];
