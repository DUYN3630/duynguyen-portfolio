import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeNav, setActiveNav] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [projectFilter, setProjectFilter] = useState('all');
  const [expTab, setExpTab] = useState('work');
  const [skillsTab, setSkillsTab] = useState('technical');
  const [contactTab, setContactTab] = useState('contact');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Khởi tạo Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Logic animation khi cuộn
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 100);

      // Update active nav
      const sections = ['hero', 'projects', 'experience', 'skills', 'contact'];
      let current = 'hero';
      sections.forEach(id => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 100) {
          current = id;
        }
      });
      setActiveNav(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      elementsToAnimate.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Đảm bảo chạy lại lucide khi tab thay đổi
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [expTab, skillsTab, contactTab, projectFilter, testimonials]);

  const projects = [
    { 
      id: 1, 
      title: "Nexus E-com", 
      category: "fullstack", 
      desc: "Full-stack E-commerce platform for Apple ecosystem featuring AI-driven support, real-time dashboard, and secure MoMo QR payments.", 
      tags: ["React 18", "Node.js", "Express 5", "MongoDB", "Gemini 2.0", "Vitest"],
      link: "https://nexus-ecom-git-main-duyn3630s-projects.vercel.app/"
    },
    { 
      id: 2, 
      title: "Task API", 
      category: "backend", 
      desc: "Robust RESTful API design following the MVC pattern with JWT authentication and secure endpoints.", 
      tags: ["Node.js", "Express", "MongoDB", "JWT"],
      link: "https://github.com/DUYN3630/nexus-ecom"
    },
  ];

  const experiences = {
    work: [
      { 
        icon: "shopping-bag", 
        title: "Full-stack Developer", 
        company: "Nexus E-com (Personal Project)", 
        date: "Dec 2025 - Present", 
        responsibilities: [
          "Full-stack Engineering: Xây dựng nền tảng từ đầu bằng React (Vite) và Node.js.",
          "Enterprise Dashboard: Phát triển hệ thống quản trị với trực quan hóa dữ liệu thời gian thực (Chart.js).",
          "AI Integration: Tích hợp Google Gemini API cho chatbot hỗ trợ và chẩn đoán phần cứng tự động.",
          "Security & Logic: Triển khai bảo vệ NoSQL Injection, xác thực JWT/OAuth và luồng thanh toán MoMo QR.",
          "Quality Assurance: Đảm bảo độ ổn định hệ thống thông qua Automated Testing với Vitest.",
          "Live Demo: nexus-ecom-git-main-duyn3630s-projects.vercel.app",
          "GitHub: github.com/DUYN3630/nexus-ecom"
        ], 
        stack: ["React 18", "Vite 8", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "Node.js", "Express 5", "Mongoose 9 (MongoDB)", "Gemini 2.0 SDK", "mongo-sanitize", "bcrypt", "Firebase Admin", "Vitest", "Swagger UI", "Multer", "Nodemailer"] 
      },
      { 
        icon: "server", 
        title: "Backend Developer", 
        company: "Task API (Personal Project)", 
        date: "Oct 2025 - Nov 2025", 
        responsibilities: [
          "API Architecture: Thiết kế RESTful API chuyên nghiệp theo mô hình MVC (Model-View-Controller).",
          "Authentication: Triển khai hệ thống xác thực người dùng an toàn với JWT (JSON Web Token).",
          "Documentation: Tích hợp Swagger UI để cung cấp tài liệu API tương tác và dễ dàng thử nghiệm.",
          "Database Management: Sử dụng MongoDB và Mongoose để quản lý dữ liệu linh hoạt và hiệu quả.",
          "Error Handling: Xây dựng hệ thống xử lý lỗi tập trung (Global Error Handling) nâng cao độ ổn định.",
          "Security: Triển khai các biện pháp bảo vệ ứng dụng chống lại các lỗ hổng bảo mật phổ biến.",
          "GitHub: github.com/DUYN3630/nexus-ecom"
        ], 
        stack: ["Node.js", "Express 5", "MongoDB", "Mongoose 9", "JWT", "Swagger UI", "bcrypt", "Postman"] 
      },
    ],
    organization: []
  };

  const skillsData = {
    technical: {
      languagesFrameworks: [
        { name: "JavaScript / HTML / CSS", level: "Advanced", icon: "code" },
        { name: "C#", level: "Advanced", icon: "terminal" },
        { name: "React 18 / Vite 8", level: "Advanced", icon: "atom" },
        { name: "Node.js / Express 5", level: "Advanced", icon: "zap" },
        { name: "ASP.NET Core / MVC", level: "Advanced", icon: "server" },
        { name: "WinForms", level: "Intermediate", icon: "layout" },
      ],
      librariesSecurity: [
        { name: "Redux Toolkit / Mongoose 9", level: "Advanced", icon: "box" },
        { name: "Framer Motion / Chart.js", level: "Advanced", icon: "activity" },
        { name: "JWT / OAuth 2.0 / Firebase", level: "Advanced", icon: "lock" },
        { name: "mongo-sanitize / bcrypt", level: "Advanced", icon: "shield" },
        { name: "Gemini 2.0 SDK", level: "Advanced", icon: "sparkles" },
      ],
      databaseCloudArch: [
        { name: "MongoDB / SQL Server / MySQL", level: "Advanced", icon: "database" },
        { name: "Vercel / Render / Azure", level: "Advanced", icon: "cloud" },
        { name: "MVC / Client-Server", level: "Advanced", icon: "cpu" },
        { name: "RESTful API / E-commerce", level: "Advanced", icon: "shopping-cart" },
      ]
    },
    softSkills: [
      { name: "Teamwork", icon: "users" },
      { name: "Communication", icon: "message-square" },
      { name: "Problem Solving", icon: "lightbulb" },
      { name: "Agile/Scrum", icon: "refresh-cw" },
    ],
    tools: {
      developer: [
        { name: "Git / GitHub", icon: "github" },
        { name: "Postman / Swagger UI", icon: "send" },
        { name: "Vitest", icon: "check-circle" },
        { name: "Visual Studio / VS Code", icon: "code-2" },
        { name: "Multer / Nodemailer", icon: "mail" },
      ],
      design: [
        { name: "Figma", icon: "figma" },
        { name: "Canva", icon: "image" },
      ]
    }
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTestimonial = {
      name: formData.get('name'),
      role: formData.get('role'),
      message: formData.get('message'),
    };
    setTestimonials([...testimonials, newTestimonial]);
    setIsModalOpen(false);
    e.target.reset();
  };

  return (
    <div className="font-inter">
      {/* 100% ORIGINAL HEADER */}
      <header className={`bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
                
                {/* Logo */}
                <div className="flex items-center gap-2 text-[#1e293b] cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                    <i data-lucide="code-2" className="w-6 h-6 stroke-[2.5px]"></i>
                    <span className="text-2xl font-bold tracking-tight">Duy Nguyen<span className="text-indigo-600">.</span></span>
                </div>

                {/* Navigation Desktop */}
                <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
                    <a href="#hero" className={`nav-item flex items-center gap-2 px-5 py-2.5 rounded-lg ${activeNav === 'hero' ? 'bg-[#1e293b] text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                        <i data-lucide="home" className="w-4 h-4"></i>
                        <span className="font-medium text-sm">Home</span>
                    </a>

                    <a href="#projects" className={`nav-item flex items-center gap-2 px-4 py-2.5 rounded-lg ${activeNav === 'projects' ? 'bg-[#1e293b] text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                        <i data-lucide="layout" className="w-4 h-4"></i>
                        <span className="font-medium text-sm">Projects</span>
                    </a>

                    <a href="#experience" className={`nav-item flex items-center gap-2 px-4 py-2.5 rounded-lg ${activeNav === 'experience' ? 'bg-[#1e293b] text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                        <i data-lucide="book-open" className="w-4 h-4"></i>
                        <span className="font-medium text-sm">Experience</span>
                    </a>

                    <a href="#skills" className={`nav-item flex items-center gap-2 px-4 py-2.5 rounded-lg ${activeNav === 'skills' ? 'bg-[#1e293b] text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                        <i data-lucide="code" className="w-4 h-4"></i>
                        <span className="font-medium text-sm">Skills</span>
                    </a>

                    <a href="#contact" className={`nav-item flex items-center gap-2 px-4 py-2.5 rounded-lg ${activeNav === 'contact' ? 'bg-[#1e293b] text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                        <i data-lucide="mail" className="w-4 h-4"></i>
                        <span className="font-medium text-sm">Contact</span>
                    </a>
                </nav>

                {/* Actions (Mobile Menu Only) */}
                <div className="flex items-center md:hidden">
                    <button className="p-2 text-slate-600">
                        <i data-lucide="menu" className="w-6 h-6"></i>
                    </button>
                </div>
            </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left animate-on-scroll animate-slide-up">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                    Hello, I'm <span className="text-indigo-600">Duy Nguyen</span>
                    <span className="typing-cursor"></span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                    I am a web developer with practical experience building full-stack applications using ASP.NET Core and the Node.js/React ecosystem. Dedicated to pursuing a long-term career in software engineering.
                </p>

                <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Follow me on:</span>
                    <div className="flex gap-3">
                        <a href="https://www.facebook.com/nguyen.uc.duy.314512" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="https://www.instagram.com/lucasdev_01/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a href="#projects" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">View My Work</a>
                    <a href="/CV_DuyNguyen.pdf" download className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">Download CV</a>
                </div>
            </div>
            <div className="flex-1 relative animate-on-scroll animate-drop">
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative z-10">
                    <img src="/hinhcv.jpg" alt="Duy Nguyen" className="w-full h-full object-cover rounded-3xl shadow-2xl" />
                    <div className="absolute -top-4 -left-4 w-full h-full bg-indigo-50 rounded-3xl -z-10"></div>
                </div>
                {/* Floating Icons */}
                <div className="absolute top-0 right-10 float-1"><img src="assets/icon/reactjs.png" alt="React" className="w-12 h-12" /></div>
                <div className="absolute bottom-10 left-10 float-2"><img src="assets/icon/js.png" alt="JS" className="w-12 h-12" /></div>
                <div className="absolute top-20 left-0 float-3"><img src="assets/icon/html.png" alt="HTML" className="w-10 h-10" /></div>
                <div className="absolute bottom-0 right-0 float-4"><img src="assets/icon/css.png" alt="CSS" className="w-10 h-10" /></div>
            </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll animate-slide-up">
                <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                <div id="filter-buttons" className="flex flex-wrap justify-center gap-3 mt-8">
                    <button onClick={() => setProjectFilter('all')} className={`filter-btn px-6 py-2 rounded-full font-medium transition-all shadow-sm ${projectFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}`}>All</button>
                    <button onClick={() => setProjectFilter('frontend')} className={`filter-btn px-6 py-2 rounded-full font-medium transition-all shadow-sm ${projectFilter === 'frontend' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}`}>Frontend</button>
                    <button onClick={() => setProjectFilter('backend')} className={`filter-btn px-6 py-2 rounded-full font-medium transition-all shadow-sm ${projectFilter === 'backend' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}`}>Backend</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.filter(p => projectFilter === 'all' || p.category === projectFilter).map(p => (
                  <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className="project-card bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-2 animate-on-scroll animate-slide-up block">
                      <div className="h-48 bg-gray-200 overflow-hidden">
                          <img src={p.id === 1 ? "/f7c8379f-357e-4a81-b47e-546598664d8c.jpg" : "https://via.placeholder.com/400x300"} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                          <p className="text-gray-600 mb-4">{p.desc}</p>
                          <div className="flex gap-2">
                              {p.tags.map(t => <span key={t} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">{t}</span>)}
                          </div>
                      </div>
                  </a>
                ))}
            </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll animate-slide-up">
                <h2 className="text-3xl font-bold mb-4">Experience</h2>
            </div>

            <div id="experience-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll animate-slide-up">
                {experiences[expTab].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <span className="inline-block p-3 bg-gray-100 text-gray-700 rounded-lg">
                        <i data-lucide={item.icon}></i>
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.company}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700">Responsibilities:</h4>
                      <ul className="space-y-2">
                        {item.responsibilities.map((res, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <i data-lucide="check" className="w-4 h-4 mt-1 text-indigo-600"></i>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.stack.map(tech => <span key={tech} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{tech}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section id="skills" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll animate-slide-up">
                <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">A comprehensive overview of my technical abilities, professional tools, and soft skills.</p>
            </div>

            <div className="space-y-16">
                {/* 1. Technical Skills */}
                <div className="animate-on-scroll animate-slide-up">
                    <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                        <i data-lucide="code-2" className="text-indigo-600"></i>
                        Technical Skills
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {/* Languages & Frameworks */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                            <h4 className="font-bold text-lg mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <i data-lucide="code" className="w-5 h-5 text-blue-500"></i> Languages & Frameworks
                            </h4>
                            <div className="space-y-4 flex-1">
                                {skillsData.technical.languagesFrameworks.map((skill, idx) => (
                                    <div key={idx} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <i data-lucide={skill.icon} className="w-4 h-4"></i>
                                            </div>
                                            <span className="font-medium text-gray-700">{skill.name}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Libraries & Security */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                            <h4 className="font-bold text-lg mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <i data-lucide="shield" className="w-5 h-5 text-green-500"></i> Libraries & Security
                            </h4>
                            <div className="space-y-4 flex-1">
                                {skillsData.technical.librariesSecurity.map((skill, idx) => (
                                    <div key={idx} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                <i data-lucide={skill.icon} className="w-4 h-4"></i>
                                            </div>
                                            <span className="font-medium text-gray-700">{skill.name}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Database, Cloud & Architecture */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                            <h4 className="font-bold text-lg mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <i data-lucide="database" className="w-5 h-5 text-purple-500"></i> DB, Cloud & Architecture
                            </h4>
                            <div className="space-y-4 flex-1">
                                {skillsData.technical.databaseCloudArch.map((skill, idx) => (
                                    <div key={idx} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                <i data-lucide={skill.icon} className="w-4 h-4"></i>
                                            </div>
                                            <span className="font-medium text-gray-700">{skill.name}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{skill.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2 & 3. Soft Skills & Tools */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Soft Skills Section */}
                    <div id="soft-skills-container" className="animate-on-scroll animate-slide-up">
                        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                            <i data-lucide="sparkles" className="text-amber-500"></i>
                            Soft Skills
                        </h3>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4">
                            {skillsData.softSkills.map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
                                    <div className="text-gray-500 group-hover:text-indigo-600 transition-colors">
                                        <i data-lucide={skill.icon} className="w-5 h-5"></i>
                                    </div>
                                    <span className="font-medium text-gray-700">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools Section */}
                    <div id="tools-container" className="animate-on-scroll animate-slide-up">
                        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                            <i data-lucide="wrench" className="text-slate-600"></i>
                            Professional Tools
                        </h3>
                        <div className="space-y-6">
                            {/* Developer Tools Table */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <i data-lucide="terminal" className="w-4 h-4"></i> Developer Tools
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {skillsData.tools.developer.map((tool, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <i data-lucide={tool.icon} className="w-4 h-4 text-gray-400"></i>
                                            <span className="text-sm font-medium text-gray-600">{tool.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Design Tools Table */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <i data-lucide="palette" className="w-4 h-4"></i> Design Tools
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {skillsData.tools.design.map((tool, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <i data-lucide={tool.icon} className="w-4 h-4 text-gray-400"></i>
                                            <span className="text-sm font-medium text-gray-600">{tool.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16 animate-on-scroll animate-slide-up">
                <h2 className="text-3xl font-bold">What People Say</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg">Leave Feedback</button>
            </div>

            {testimonials.length === 0 ? (
              <div id="empty-state" className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">No testimonials yet. Be the first to leave one!</p>
              </div>
            ) : null}

            <div id="testimonials-list" className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${testimonials.length === 0 ? 'hidden' : ''}`}>
                {testimonials.map((t, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 p-6 rounded-xl shadow-sm">
                    <p className="text-gray-700 italic mb-4">"{t.message}"</p>
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-gray-900">{t.name}</p>
                        {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white px-4">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="animate-on-scroll animate-slide-up">
                    <h2 className="text-4xl font-bold mb-6">Let's Talk!</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Interested in working together or just want to say hi? Feel free to reach out.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                <i data-lucide="mail" className="text-indigo-400"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email Me</p>
                                <p className="font-medium">duyn3630@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                <i data-lucide="phone" className="text-indigo-400"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Call Me</p>
                                <p className="font-medium">0971610978</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                <i data-lucide="map-pin" className="text-indigo-400"></i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Location</p>
                                <p className="font-medium">Bình Tân, Tp.HCM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-xl animate-on-scroll animate-slide-up">
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8">
                        <button onClick={() => setContactTab('contact')} className={`flex-1 py-3 rounded-lg font-medium transition-all ${contactTab === 'contact' ? 'bg-gray-900 text-white shadow' : 'text-gray-700 hover:bg-gray-100'}`}>Contact Me</button>
                        <button onClick={() => setContactTab('support')} className={`flex-1 py-3 rounded-lg font-medium transition-all ${contactTab === 'support' ? 'bg-gray-900 text-white shadow' : 'text-gray-700 hover:bg-gray-100'}`}>Support</button>
                    </div>

                    {contactTab === 'contact' ? (
                      <div id="contact-content">
                          <form className="space-y-6">
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" placeholder="Your name" />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                  <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" placeholder="your@email.com" />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                  <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all h-32" placeholder="Your message..."></textarea>
                              </div>
                              <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">Send Message</button>
                          </form>
                      </div>
                    ) : (
                      <div id="support-content" className="text-center py-10">
                          <h3 className="text-xl font-bold mb-4">Looking for help?</h3>
                          <p className="text-gray-600 mb-6">Check out the documentation or join our Discord community.</p>
                          <a href="#" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">Join Discord</a>
                      </div>
                    )}
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-800 bg-gray-900">
          <p>© 2025 Duy Nguyen. Built with ❤️ and React + Vite.</p>
      </footer>

      {/* Testimonial Modal */}
      <div id="testimonial-modal" className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div id="modal-content" className={`bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 transform transition-all duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`}>
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Leave Feedback</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <i data-lucide="x"></i>
                  </button>
              </div>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" placeholder="Your name" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role / Company</label>
                      <input type="text" name="role" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" placeholder="e.g. CEO at Apple" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea name="message" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all h-24" placeholder="How was your experience working with me?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">Submit Feedback</button>
              </form>
          </div>
      </div>

      {/* Scroll to top button */}
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className={`fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-40 ${showScrollTop ? '' : 'hidden'}`}>
          <i data-lucide="chevron-up"></i>
      </button>
    </div>
  );
};

export default App;
