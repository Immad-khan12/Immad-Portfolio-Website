// ─────────────────────────────────────────────────────────────
//  Sara content yahin se aata hai. Kuch badalna ho to sirf yahan badlo.
// ─────────────────────────────────────────────────────────────

const whatsappNumber = "923304344535"; // country code ke saath, + ya spaces ke baghair

export const config = {
    developer: {
        name: "Immad",
        fullName: "Muhammad Immad Shahzad",
        heroFirst: "Immad",
        heroLast: "Shahzad",
        initials: "MI",
        title: "Full Stack Python & Web Developer",
        rolePrefix: "Full Stack",
        roles: ["Python Developer", "Web Developer"],
        description: "Full Stack Python & Web Developer from Lahore, Pakistan. I build and deploy full-stack web apps with React, FastAPI, Django and MongoDB/MySQL."
    },
    social: {
        github: "Immad-khan12",
        email: "immadshahzad216@gmail.com",
        location: "Lahore, Pakistan"
    },
    whatsapp: {
        number: whatsappNumber,
        display: "+92 330 4344535",
        letsTalkMessage: "Hi Immad! I saw your portfolio and I'd like to talk.",
        hireMessage: "Hi Immad! I saw your portfolio and I'd like to hire you for a project."
    },
    resume: {
        file: "/Muhammad_Immad_Shahzad_Resume.pdf",
        downloadName: "Muhammad_Immad_Shahzad_Resume.pdf"
    },
    about: {
        title: "About Me",
        description: "I'm Muhammad Immad Shahzad, a Full Stack Python and Web Developer from Lahore, Pakistan. I build and deploy production-ready web apps with React, FastAPI, Django and MongoDB/MySQL, featuring secure JWT authentication, real-time collaboration and automated CI/CD. I've shipped three live full-stack applications and completed internships in full-stack development, machine learning, enterprise AI (SAP Joule at Coca-Cola Icecek) and software testing. I'm currently pursuing a BS in Computer Science at Superior University, Lahore."
    },
    experiences: [
        {
            position: "Software Development Intern",
            company: "Raheem Solutions Pvt. Ltd.",
            period: "Sep 2026 - Present",
            location: "Lahore, Pakistan",
            description: "Functional and integration testing on the bepal.ai web platform. Found and documented 10-15 page-reload bugs, and now working on fixes while moving toward backend tasks.",
            responsibilities: [],
            technologies: ["Testing", "QA", "Frontend Debugging", "Bug Reporting"]
        },
        {
            position: "Machine Learning Intern",
            company: "flyrank.ai (Remote)",
            period: "Jul 2026 - Present",
            location: "Remote",
            description: "A 12-week applied ML program covering core AI/ML concepts, data processing and model training, with hands-on assignments applied alongside full-stack skills.",
            responsibilities: [],
            technologies: ["Machine Learning", "Python", "Data Processing"]
        },
        {
            position: "Digital Technology Intern",
            company: "Coca-Cola Icecek (CCI)",
            period: "Aug 2026 - Sep 2026",
            location: "Gulberg, Lahore",
            description: "6-week onsite internship working with SAP Joule, SAP's AI copilot: Machine Performance Deviation Advisor, Procurement Command Center and Limited-Stock Exception Management. Delivered presentations on findings and use cases.",
            responsibilities: [],
            technologies: ["SAP Joule", "Enterprise AI", "Presentation", "Research"]
        },
        {
            position: "Full Stack Web Developer Intern",
            company: "Teyzix Core",
            period: "Apr 2026 - May 2026",
            location: "Lahore (Remote)",
            description: "Built and deployed the TEYZIX CORE Portal (React, FastAPI, MongoDB Atlas) with JWT-secured APIs and an admin dashboard. Set up CI/CD, fixed production CORS issues and delivered 3 full-stack apps in 2 months.",
            responsibilities: [],
            technologies: ["React", "FastAPI", "MongoDB", "CI/CD", "JWT"]
        },
        {
            position: "Full Stack Python Developer Course",
            company: "PNY Trainings",
            period: "2025",
            location: "Lahore, Pakistan",
            description: "6-month professional training in full-stack Python development (certified Nov 2025).",
            responsibilities: [],
            technologies: ["Python", "Django", "SQL"]
        },
        {
            position: "BS Computer Science",
            company: "Superior University, Lahore",
            period: "2024",
            location: "Lahore, Pakistan",
            description: "Currently in the 6th semester. Active in the Computer Science Club and Tech Innovation Society, and I mentor peers in HTML, CSS, SEO and web development.",
            responsibilities: [],
            technologies: ["DSA", "Networks", "Software Engineering"]
        }
    ],
    // Pehle 5 projects home page ke Work section me dikhte hain, baaqi "See All Works" me.
    // "live" ho to card live site kholega, warna GitHub.
    projects: [
        {
            id: 1,
            skills: ["React.js", "Node.js", "Socket.io", "WebSockets", "Yjs (CRDT)", "TipTap", "MongoDB Atlas", "Tailwind CSS", "Role-Based Access", "Vercel", "Render"],
            title: "SyncSpace",
            category: "Real-Time Collaboration",
            technologies: "React, Node.js, Socket.io, Yjs (CRDT), TipTap, MongoDB Atlas, Tailwind",
            image: "/images/projects/syncspace.webp",
            description: "Production-grade real-time collaborative document editor: CRDT-powered live sync, live cursors and presence, role-based access (Admin / Editor / Viewer), version history, auto-save and a Ctrl+K command palette. Deployed on Vercel + Render.",
            live: "https://syncspace-ivory.vercel.app",
            featured: true, // hero me Live Demo button
            github: "https://github.com/Immad-khan12/syncspace"
        },
        {
            id: 2,
            skills: ["React.js", "FastAPI", "MongoDB Atlas", "PyMongo", "JWT", "REST APIs", "Swagger/OpenAPI", "CORS", "CI/CD", "Netlify", "Render"],
            title: "TEYZIX CORE Portal",
            category: "Full-Stack Platform",
            technologies: "React.js, FastAPI, MongoDB Atlas, JWT, Swagger",
            image: "/images/projects/teyzix.webp",
            description: "Internship management platform with JWT authentication, an admin dashboard, search/filter listings and Swagger API docs. Frontend on Netlify, API on Render.",
            live: "https://teyzix-core-portal.netlify.app",
            featured: true, // hero me Live Demo button
            github: "https://github.com/Immad-khan12/Teyzix-core-portal"
        },
        {
            id: 3,
            skills: ["React.js", "Django REST Framework", "MySQL", "Django ORM", "Role-Based Auth", "REST APIs", "Netlify"],
            title: "Royal Feast",
            category: "Restaurant Ordering System",
            technologies: "React.js, Django REST Framework, MySQL, Netlify",
            image: "/images/projects/royalfeast.webp",
            description: "Restaurant ordering system with menu browsing, cart, order placement and role-based authentication.",
            live: "https://teal-madeleine-c107e5.netlify.app",
            featured: false,
            github: "https://github.com/Immad-khan12/Royal-Feast"
        },
        {
            id: 4,
            skills: ["Python", "Agentic AI", "Generative AI"],
            title: "Jarvis",
            category: "Agentic AI (In Progress)",
            technologies: "Python, Agentic AI",
            image: "/images/projects/jarvis.webp",
            description: "An agentic AI assistant currently under active development.",
            live: "",
            featured: false,
            github: "https://github.com/Immad-khan12/Jarvis-Agentic-Assistant"
        },
        {
            id: 5,
            skills: ["JavaScript", "HTML5 Canvas", "CSS3", "Computer Vision", "Object Detection", "NMS", "IoU"],
            title: "AutoDetect CV",
            category: "Computer Vision Simulation",
            technologies: "JavaScript, HTML5 Canvas, CSS3",
            image: "/images/projects/autodetect.webp",
            description: "Browser-based simulation of an object detection pipeline: 5 object classes, bounding boxes, confidence scores, NMS, IoU, precision/recall metrics and a detection heatmap.",
            live: "",
            featured: false,
            github: "https://github.com/Immad-khan12/Car-Detection-System"
        },
        {
            id: 6,
            skills: ["Python", "Tkinter", "Dijkstra", "Prim's MST", "Graph Algorithms", "Data Structures & Algorithms"],
            title: "Fire Truck Emergency Routing",
            category: "Algorithms / Desktop App",
            technologies: "Python, Tkinter, Dijkstra, Prim's MST",
            image: "/images/projects/firetruck.webp",
            description: "Shortest-route dispatch across 7 Lahore areas and 2 fire stations using Dijkstra and Prim's MST.",
            live: "",
            featured: false,
            github: "https://github.com/Immad-khan12/fire-truck-emergency-system"
        },
        {
            id: 7,
            skills: ["PHP", "MySQL", "CSRF Protection", "Client-Server Architecture", "File Chunking", "Audit Logs", "XAMPP"],
            title: "NetShare",
            category: "Networking / Web",
            technologies: "PHP, MySQL, CSRF Protection",
            image: "/images/projects/netshare.webp",
            description: "LAN file transfer app with 512 KB chunked transfers, speed measurement, CSRF protection and audit logs.",
            live: "",
            featured: false,
            github: "https://github.com/Immad-khan12/Centralized-File-Sharing-System"
        },
        {
            id: 8,
            skills: ["Django", "Django ORM", "Role-Based Access", "CRUD Operations", "MVC Architecture"],
            title: "Student Result System",
            category: "Django Web App",
            technologies: "Django, Role-Based CRUD",
            image: "/images/projects/studentresult.webp",
            description: "Student result management system with role-based CRUD operations.",
            live: "",
            featured: false,
            github: "https://github.com/Immadkhan12/student-result-system"
        },
        {
            id: 9,
            skills: ["PHP", "MySQL", "Role-Based Access", "CRUD Operations", "XAMPP"],
            title: "Quiz System",
            category: "PHP Web App",
            technologies: "PHP, MySQL, Role-Based CRUD",
            image: "/images/projects/quiz.webp",
            description: "Quiz platform with role-based CRUD for admins and students.",
            live: "",
            featured: false,
            github: "https://github.com/Immad-khan12/quiz_system"
        }
    ],
    certifications: [
        {"title": "AI Fluency: Framework & Foundations", "issuer": "Anthropic", "date": "2026", "id": "fe8c50946c37bde75663da34a7650a07", "icon": "🧠"},
        {"title": "Claude 101", "issuer": "Anthropic · Claude Academy", "date": "2026", "id": "fe8c50946c37bde75663da34a7650a07", "icon": "🤖"},
        {"title": "Full Stack Python Developer (6 Months)", "issuer": "PNY Trainings", "date": "Nov 2025", "id": "FSP-38-11-12802", "icon": "🐍"},
        {"title": "Full Stack Developer Internship", "issuer": "Teyzix Core", "date": "May 2026", "id": "", "icon": "💻"},
        {"title": "Digital Technology Internship (SAP Joule)", "issuer": "Coca-Cola Icecek, Lahore", "date": "Sep 2026", "id": "", "icon": "🏭"},
        {"title": "Introduction to SQL", "issuer": "Sololearn × Superior University", "date": "Dec 2025", "id": "", "icon": "🗄️"},
        {"title": "IEEE Future Tech 2026 Webinar", "issuer": "IEEE Lahore Section & Superior University", "date": "Apr 2026", "id": "", "icon": "📡"}
    ],
    contact: {
        email: "immadshahzad216@gmail.com",
        github: "https://github.com/Immad-khan12",
        linkedin: "https://linkedin.com/in/immad-shahzad-010511347",
        instagram: "https://instagram.com/immad_khan17"
    },
    skillCategories: [
        { title: "Languages", icon: "\ud83d\udcbb", color: "#4285f4", items: ["Python", "JavaScript", "PHP", "C++", "C#", "Java", "SQL", "HTML5", "CSS3"] },
        { title: "Frontend", icon: "\ud83c\udfa8", color: "#ec4899", items: ["React.js", "JSX", "Tailwind CSS", "Bootstrap", "Framer Motion", "HTML5 Canvas", "AJAX", "Responsive Web Design"] },
        { title: "Backend", icon: "\u2699\ufe0f", color: "#22c55e", items: ["FastAPI", "Django", "Django REST Framework", "Laravel", "Node.js", "REST APIs", "JWT", "WebSockets", "Socket.io"] },
        { title: "Databases", icon: "\ud83d\uddc4\ufe0f", color: "#f59e0b", items: ["MongoDB (Atlas)", "MySQL", "SQLite", "PyMongo", "Django ORM"] },
        { title: "AI / ML / Algorithms", icon: "\ud83e\udde0", color: "#a855f7", items: ["Machine Learning fundamentals", "Computer Vision (object detection, NMS, IoU)", "Matplotlib", "Dijkstra", "Prim's MST", "Generative AI Fluency (Anthropic)", "SAP Joule (enterprise AI)"] },
        { title: "Core Concepts", icon: "\ud83d\udcd0", color: "#06b6d4", items: ["Object-Oriented Programming", "Data Structures & Algorithms", "MVC Architecture", "RESTful API Design", "Authentication & Authorization (JWT, RBAC)", "Database Design", "CRUD Operations", "SEO"] },
        { title: "Networking", icon: "\ud83c\udf10", color: "#14b8a6", items: ["TCP/IP", "HTTP", "Client-Server Architecture", "Session Management", "CORS"] },
        { title: "Testing & Security", icon: "\ud83d\udee1\ufe0f", color: "#ef4444", items: ["Functional Testing", "Integration Testing", "Bug Reporting", "Frontend Debugging", "CSRF / XSS / SQL Injection Prevention", "Swagger / OpenAPI"] },
        { title: "Tools & Cloud", icon: "\u2601\ufe0f", color: "#6366f1", items: ["Git", "GitHub", "CI/CD", "Netlify", "Render", "Vercel", "XAMPP", "Tkinter", "SAP (enterprise modules)"] },
        { title: "Professional Skills", icon: "\ud83e\udd1d", color: "#f43f5e", items: ["Technical Presentation", "Research", "Mentoring", "Team Collaboration", "Problem Solving"] }
    ],
    skills: {
        develop: {
            title: "BACKEND & AI",
            description: "APIs, databases and applied machine learning",
            details: "I build REST APIs with FastAPI, Django REST Framework, Laravel and Node.js, secured with JWT and role-based access. I work with MongoDB, MySQL and SQLite, real-time systems (WebSockets, CRDT) and ML fundamentals including computer vision.",
            tools: ["Python", "FastAPI", "Django", "Laravel", "Node.js", "REST APIs", "JWT", "WebSockets", "MongoDB", "MySQL", "Machine Learning", "SAP Joule"]
        },
        design: {
            title: "FRONTEND & QA",
            description: "Responsive UIs, testing and deployment",
            details: "I create responsive interfaces with React, Tailwind CSS and Framer Motion, test them with functional and integration testing, and ship them through CI/CD to Netlify, Render and Vercel.",
            tools: ["React.js", "JavaScript", "Tailwind CSS", "Bootstrap", "HTML5 / CSS3", "Framer Motion", "Testing / QA", "Git & GitHub", "CI/CD", "Netlify", "Vercel", "Render"]
        }
    }
};

const enc = encodeURIComponent;
export const whatsappLink = (message: string) =>
    `https://wa.me/${config.whatsapp.number}?text=${enc(message)}`;
export const letsTalkLink = whatsappLink(config.whatsapp.letsTalkMessage);
export const hireLink = config.contact.linkedin; // Hire Me opens your LinkedIn profile