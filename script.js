// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navbar.classList.toggle('menu-open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for backdrop effect
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight || 0;
        const scrollPos = window.scrollY + navbarHeight + 2;

        let found = false;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (!found && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                found = true;
            }
        });
        // إذا لم يتم العثور على أي قسم، فعل أول رابط (Home)
        if (!found) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            if (navLinks[0]) navLinks[0].classList.add('active');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Initialize animations
    initializeAnimations();
    
    // Initialize skills
    initializeSkills();
    
    // Initialize projects
    initializeProjects();
    
    // Initialize experience
    initializeExperience();
    
    // Initialize education
    initializeEducation();
    
    // Initialize contact form
    initializeContactForm();
});

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.section-header, .about-text, .about-stats, .skill-card, .project-card, .timeline-item, .education-card, .contact-item, .contact-form');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        observer.observe(el);
        
        // Add stagger effect
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Skills data and initialization
function initializeSkills() {
    const skillsData = [
        { name: 'C#', level: 90, icon: 'fas fa-code' },
        { name: 'ASP.NET Core', level: 85, icon: 'fas fa-globe' },
        { name: 'Entity Framework', level: 80, icon: 'fas fa-database' },
        { name: 'SQL Server', level: 85, icon: 'fas fa-server' },
        { name: 'RESTful APIs', level: 88, icon: 'fas fa-exchange-alt' },
        { name: 'Git & GitHub', level: 82, icon: 'fab fa-git-alt' },
        { name: 'Redis', level: 75, icon: 'fas fa-memory' },
        { name: 'JWT Auth', level: 80, icon: 'fas fa-shield-alt' },
        { name: 'Clean Architecture', level: 78, icon: 'fas fa-layer-group' },
        { name: 'CQRS', level: 75, icon: 'fas fa-arrows-alt-h' },
        { name: 'SignalR', level: 70, icon: 'fas fa-broadcast-tower' },
        { name: 'AutoMapper', level: 80, icon: 'fas fa-map' }
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-progress">
                <div class="skill-progress-bar" data-level="${skill.level}"></div>
            </div>
        `;
        skillsGrid.appendChild(skillCard);
    });

    // Animate skill progress bars when in view
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress-bar');
                const level = progressBar.dataset.level;
                setTimeout(() => {
                    progressBar.style.width = `${level}%`;
                }, 300);
            }
        });
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });
}

// Projects data and initialization
function initializeProjects() {
    const projectsData = [
        {
            title: 'Evolvify - Soft Skills Learning Platform',
            description: 'A scalable backend for an educational platform using ASP.NET Core Web API. Features AI-powered course recommendations, community features, and interactive quiz system.',
            technologies: ['ASP.NET Core', 'Clean Architecture', 'CQRS', 'JWT', 'AutoMapper', 'FluentValidation', 'Stripe'],
            github: 'https://github.com/hishamabdalla/Evolvify',
            demo: 'https://github.com/hishamabdalla/Evolvify',
            icon: 'fas fa-graduation-cap'
        },
        {
            title: 'Restaurant Management API',
            description: 'Secure RESTful API built with Clean Architecture and CQRS patterns. Features role-based authorization, custom middleware, and comprehensive logging.',
            technologies: ['ASP.NET Core', 'MediatR', 'FluentValidation', 'AutoMapper', 'Serilog'],
            github: 'https://github.com/hishamabdalla/Restaurant-API',
            demo: 'https://github.com/hishamabdalla/Restaurant-API',
            icon: 'fas fa-utensils'
        },
        {
            title: 'WebStore API',
            description: 'Scalable e-commerce API using Onion Architecture with Repository and Unit of Work patterns. Includes JWT authentication and Redis caching.',
            technologies: ['ASP.NET Core', 'Onion Architecture', 'JWT', 'Redis', 'Repository Pattern'],
            github: 'https://github.com/hishamabdalla/WebStore-API',
            demo: 'https://github.com/hishamabdalla/WebStore-API',
            icon: 'fas fa-shopping-cart'
        },
        {
            title: 'Nilura - E-Commerce Platform',
            description: 'Full-stack e-commerce platform with Stripe payment integration, admin/customer roles, and secure authentication workflows using N-Tier architecture.',
            technologies: ['ASP.NET MVC', 'Entity Framework', 'Stripe', 'N-Tier Architecture'],
            github: 'https://github.com/hishamabdalla/Nilura',
            demo: 'https://github.com/hishamabdalla/Nilura',
            icon: 'fas fa-store'
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link github-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                    <a href="${project.demo}" class="project-link demo-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Experience data and initialization
function initializeExperience() {
    const experienceData = [
        {
            title: 'Full-Stack Development Trainee',
            company: 'Digital Egypt Pioneers Initiative (DEPI)',
            duration: 'Apr 2024 – Oct 2024',
            description: 'Developed web applications using C#, ASP.NET MVC, Entity Framework Core, LINQ, and SQL Server. Created RESTful APIs and collaborated on version-controlled projects using GitHub. Contributed to a team-based graduation project, enhancing skills in agile development and collaboration.'
        },
        {
            title: 'ASP.NET Development Trainee',
            company: 'Information Technology Institute (ITI)',
            duration: 'Jul 2024 – Sep 2024',
            description: 'Built full-stack web applications with C#, ASP.NET MVC, and Entity Framework Core. Implemented secure authentication, role-based access controls, and optimized SQL Server queries. Developed hands-on expertise in building maintainable and scalable web solutions.'
        }
    ];

    const timeline = document.querySelector('.timeline');
    
    experienceData.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <div class="company">${exp.company}</div>
                <div class="duration">${exp.duration}</div>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Education data and initialization
function initializeEducation() {
    const educationData = [
        {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'Mansoura University, Faculty of Computer & Information Sciences',
            year: '2021 – 2025',
            description: 'Currently pursuing my degree with a focus on software engineering, algorithms, and modern development practices. Building a strong foundation in computer science principles and practical programming skills.'
        },
        {
            degree: 'Digital Egypt Pioneers Initiative (DEPI)',
            institution: 'Full-Stack Development Certification',
            year: '2024',
            description: 'Intensive training program covering full-stack web development with C#, ASP.NET, and modern development practices. Completed team-based projects and collaborative development workflows.'
        },
        {
            degree: 'Information Technology Institute (ITI)',
            institution: 'ASP.NET MVC Training Certification',
            year: '2024',
            description: 'Specialized training in ASP.NET MVC development, focusing on building secure, scalable web applications with Entity Framework Core and SQL Server integration.'
        }
    ];

    const educationGrid = document.querySelector('.education-grid');
    
    educationData.forEach(edu => {
        const educationCard = document.createElement('div');
        educationCard.className = 'education-card';
        educationCard.innerHTML = `
            <h3>${edu.degree}</h3>
            <div class="institution">${edu.institution}</div>
            <div class="year">${edu.year}</div>
            <div class="description">${edu.description}</div>
        `;
        educationGrid.appendChild(educationCard);
    });
}

// Contact form initialization
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple form validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-left: 4px solid #3b82f6;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            .notification.success {
                border-left-color: #10b981;
            }
            .notification.error {
                border-left-color: #ef4444;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #6b7280;
            }
            .notification-close:hover {
                color: #374151;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Typing animation for hero section
function initializeTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const titles = ['.NET Backend Developer', 'ASP.NET Core Developer', 'C# Developer', 'API Developer', 'Software Engineer'];
    let currentIndex = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function type() {
        const currentTitle = titles[currentIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentTitle.substring(0, currentChar - 1);
            currentChar--;
        } else {
            heroSubtitle.textContent = currentTitle.substring(0, currentChar + 1);
            currentChar++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentChar === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation after page load
    setTimeout(type, 1000);
}

// Initialize typing animation
window.addEventListener('load', initializeTypingAnimation);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 You found the easter egg! Thanks for exploring my portfolio!', 'success');
        konamiCode = [];
    }
});

// Performance optimization - Lazy load images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Hero Section Functionality
function initializeHero() {
    // Code window typing effect
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.animation = `code-reveal 0.6s ease-out ${index * 0.15}s forwards`;
    });

    // Tech orbit icons positioning
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        const angle = (index * 360) / techIcons.length;
        icon.style.setProperty('--angle', `${angle}deg`);
    });

    // Smooth scroll for hero scroll-down button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// CV Download functionality
function initializeCVDownload() {
    const cvDownloadBtn = document.querySelector('a[download="Hisham_Abdalla_CV.pdf"]');
    
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function(e) {
            // Add visual feedback
            const originalText = this.querySelector('span').textContent;
            const icon = this.querySelector('i');
            const span = this.querySelector('span');
            
            // Change button text temporarily
            span.textContent = 'Downloading...';
            icon.className = 'fas fa-spinner fa-spin';
            
            // Reset after a short delay
            setTimeout(() => {
                span.textContent = originalText;
                icon.className = 'fas fa-download';
                
                // Show success notification
                showNotification('CV downloaded successfully!', 'success');
            }, 1500);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Initialize Hero when DOM is ready
document.addEventListener('DOMContentLoaded', initializeHero);

// Initialize CV Download
document.addEventListener('DOMContentLoaded', initializeCVDownload);
