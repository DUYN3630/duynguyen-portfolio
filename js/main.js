document.addEventListener('DOMContentLoaded', () => {

    // === PHẦN 1: LOGIC ANIMATION KHI CUỘN ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // === PHẦN 2: LOGIC CHO PROJECT FILTER ===
    const filterButtonsContainer = document.querySelector('#filter-buttons');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtonsContainer) {
        const filterButtons = filterButtonsContainer.querySelectorAll('.filter-btn');
        
        filterButtonsContainer.addEventListener('click', (e) => {
            const clickedButton = e.target.closest('.filter-btn');
            if (!clickedButton) return;
            const filterValue = clickedButton.dataset.filter;
            
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-gray-900', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100', 'border', 'border-gray-200', 'shadow-sm');
            });
            clickedButton.classList.add('bg-gray-900', 'text-white');
            clickedButton.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100', 'border', 'border-gray-200', 'shadow-sm');
            
            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Update project images manually if needed
    const project1Img = document.querySelector('.project-card[data-category="fullstack"] img');
    if (project1Img) project1Img.src = "/f7c8379f-357e-4a81-b47e-546598664d8c.jpg";

    // === PHẦN 3: LOGIC CHO EXPERIENCE TABS ===
    const expGrid = document.getElementById('experience-grid');
    const btnWork = document.getElementById('btn-work');
    const btnOrg = document.getElementById('btn-org');

    if (expGrid) {
        // (Dữ liệu data_experiences của bạn nằm ở đây...)
        const experiences = {
            work: [
                { 
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`, 
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
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6" y1="6" y2="6"/><line x1="6" x2="6" y1="18" y2="18"/></svg>`, 
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
        const activeClass = "bg-gray-900 text-white";
        const inactiveClass = "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100";
        const checkIcon = `<svg class="flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        function createExpCardHTML(item) {
            const responsibilitiesHTML = item.responsibilities.map(res => `<li class="flex items-start gap-2 text-gray-600">${checkIcon}<span>${res}</span></li>`).join('');
            const stackHTML = item.stack.map(tech => `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">${tech}</span>`).join('');
            return `<div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl"><div class="flex items-start gap-4"><span class="inline-block p-3 bg-gray-100 text-gray-700 rounded-lg">${item.icon}</span><div class="flex-1"><h3 class="text-xl font-semibold text-gray-900">${item.title}</h3><p class="text-gray-600">${item.company}</p><p class="text-sm text-gray-500">${item.date}</p></div></div><div class="space-y-2"><h4 class="font-medium text-gray-700">Responsibilities:</h4><ul class="space-y-2">${responsibilitiesHTML}</ul></div><div class="space-y-3"><h4 class="font-medium text-gray-700">Tech Stack:</h4><div class="flex flex-wrap gap-2">${stackHTML}</div></div></div>`;
        }
        function renderExpCards(category) {
            expGrid.innerHTML = '';
            const data = experiences[category];
            if (data && data.length > 0) {
                expGrid.innerHTML = data.map(createExpCardHTML).join('');
            } else {
                expGrid.innerHTML = `<p class="text-gray-500 col-span-full text-center">Không có kinh nghiệm nào để hiển thị.</p>`;
            }
        }
        
        if (btnWork) {
            btnWork.addEventListener('click', () => {
                btnWork.className = btnWork.className.replace(inactiveClass, activeClass);
                if (btnOrg) btnOrg.className = btnOrg.className.replace(activeClass, inactiveClass);
                renderExpCards('work');
            });
        }
        if (btnOrg) {
            btnOrg.addEventListener('click', () => {
                btnOrg.className = btnOrg.className.replace(inactiveClass, activeClass);
                if (btnWork) btnWork.className = btnWork.className.replace(activeClass, inactiveClass);
                renderExpCards('organization');
            });
        }
        renderExpCards('work');
    }

    // === PHẦN 4: LOGIC CHO SKILLS TABS (TỪ SECTION 6) ===
    const skillsGrid = document.getElementById('skills-grid');
    const skillToggleContainer = document.getElementById('skill-toggle-buttons');

    if (skillsGrid && skillToggleContainer) {
        // (Dữ liệu skillsData của bạn nằm ở đây...)
        const skillsData = {
            frontend: [
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H9l-1 4H4v11h16V6h-4Z"/><path d="M4 11h16"/></svg>`, name: "JavaScript / HTML / CSS", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-3.12 19.5A10 10 0 0 0 12 22a10 10 0 0 0 3.12-19.5A10 10 0 0 0 12 2z"/><ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)"/></svg>`, name: "React 18 / Vite 8", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`, name: "Redux Toolkit / Mongoose 9", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/></svg>`, name: "Framer Motion / Chart.js", level: "Advanced" },
            ],
            backend: [
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-3.12 19.5A10 10 0 0 0 12 22a10 10 0 0 0 3.12-19.5A10 10 0 0 0 12 2z"/></svg>`, name: "Node.js / Express 5", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M4 15h16"/><path d="M4 11h16"/><path d="M4 7h16"/></svg>`, name: "ASP.NET Core / MVC", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>`, name: "C# / WinForms", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`, name: "JWT / OAuth 2.0 / Firebase", level: "Advanced" },
            ],
            tools: [
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`, name: "Git / GitHub", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/></svg>`, name: "Postman / Swagger UI", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>`, name: "Vercel / Render / Azure", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, name: "Vitest / VS Code", level: "Advanced" },
            ],
            ai: [
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>`, name: "Gemini 2.0 SDK", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, name: "mongo-sanitize / bcrypt", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/></svg>`, name: "Multer / Nodemailer", level: "Advanced" },
            ],
            soft: [
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`, name: "Teamwork", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`, name: "Communication", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`, name: "Problem Solving", level: "Advanced" },
                { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>`, name: "Agile/Scrum", level: "Advanced" },
            ]
        };

        const skillActiveClass = "bg-gray-900 text-white";
        const skillInactiveClass = "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100";
        const skillButtons = skillToggleContainer.querySelectorAll('.btn-toggle');

        function createSkillCardHTML(item) {
            return `<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full"><div class="p-3 bg-gray-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">${item.icon}</div><div class="flex-1 flex flex-col justify-center"><h3 class="text-sm font-bold text-gray-900 leading-tight">${item.name}</h3><p class="text-[10px] font-black uppercase text-indigo-500 mt-2 tracking-tighter bg-indigo-50 px-2 py-0.5 rounded-md inline-block w-fit mx-auto">${item.level}</p></div></div>`;
        }
        function renderSkills(category) {
            skillsGrid.innerHTML = '';
            const data = skillsData[category];
            if (data && data.length > 0) {
                skillsGrid.innerHTML = data.map(createSkillCardHTML).join('');
            } else {
                skillsGrid.innerHTML = `<p class="text-gray-500 col-span-full text-center">Không có kỹ năng nào để hiển thị.</p>`;
            }
        }
        skillButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                skillButtons.forEach(btn => {
                    btn.className = btn.className.replace(skillActiveClass, skillInactiveClass);
                });
                button.className = button.className.replace(skillInactiveClass, skillActiveClass);
                renderSkills(category);
            });
        });
        renderSkills('frontend');
    }

    // === PHẦN 5: LOGIC CHO TESTIMONIAL MODAL (TỪ SECTION 7) ===
    const addBtn = document.getElementById('add-testimonial-btn');
    const modal = document.getElementById('testimonial-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal-btn');
    const form = document.getElementById('testimonial-form');
    const emptyState = document.getElementById('empty-state');
    const listContainer = document.getElementById('testimonials-list');

    if (addBtn && modal && modalContent && closeBtn && form && emptyState && listContainer) {
        
        function openModal() {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }
        function closeModal() {
            modalContent.classList.add('scale-95', 'opacity-0');
            modalContent.classList.remove('scale-100', 'opacity-100');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
        addBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const name = e.target.name.value;
            const role = e.target.role.value;
            const message = e.target.message.value;
            console.log("New Testimonial:", { name, role, message });
            const newTestimonialHTML = `<div class="bg-gray-50 border border-gray-100 p-6 rounded-xl shadow-sm"><p class="text-gray-700 italic mb-4">"${message}"</p><div class="flex items-center"><div><p class="font-semibold text-gray-900">${name}</p>${role ? `<p class="text-sm text-gray-500">${role}</p>` : ''}</div></div></div>`;
            emptyState.classList.add('hidden');
            listContainer.classList.remove('hidden');
            listContainer.insertAdjacentHTML('beforeend', newTestimonialHTML);
            closeModal();
            form.reset();
        });
    }
    
    // === PHẦN 6: LOGIC CHO CONTACT ME TABS (TỪ SECTION 8/9) ===
    const contactBtn = document.getElementById('contact-btn');
    const supportBtn = document.getElementById('support-btn');
    const contactContent = document.getElementById('contact-content');
    const supportContent = document.getElementById('support-content');

    if (contactBtn && supportBtn && contactContent && supportContent) {
        const activeClasses = ['bg-gray-900', 'text-white', 'shadow'];
        const inactiveClasses = ['text-gray-700', 'hover:bg-gray-100'];

        contactBtn.addEventListener('click', () => {
            contactContent.classList.remove('hidden');
            supportContent.classList.add('hidden');
            contactBtn.classList.add(...activeClasses);
            contactBtn.classList.remove(...inactiveClasses);
            supportBtn.classList.add(...inactiveClasses);
            supportBtn.classList.remove(...activeClasses);
        });
        supportBtn.addEventListener('click', () => {
            contactContent.classList.add('hidden');
            supportContent.classList.remove('hidden');
            supportBtn.classList.add(...activeClasses);
            supportBtn.classList.remove(...inactiveClasses);
            contactBtn.classList.add(...inactiveClasses);
            contactBtn.classList.remove(...activeClasses);
        });
    }

    // === PHẦN 7: LOGIC MỚI CHO NÚT SCROLL-TO-TOP (TỪ SECTION 9) ===
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // 1. Logic Ẩn/Hiện nút khi cuộn
        window.onscroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        };

        // 2. Logic Click để cuộn lên đầu trang
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Cuộn mượt (yêu cầu class="scroll-smooth" trên thẻ <html>)
            });
        });
    }

}); // <- DẤU NGOẶC ĐÓNG CUỐI CÙNG CỦA 'DOMContentLoaded'