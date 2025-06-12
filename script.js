// Global variables
let skillsData = [];
let projectsData = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupNavigation();
    setupMobileMenu();
    setupContactForm();
});

// Initialize portfolio
async function initializePortfolio() {
    try {
        await loadSkills();
        await loadProjects();
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Load skills from JSON
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        skillsData = await response.json();
        renderSkills();
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skills-container').innerHTML = 
            '<div class="loading">Error loading skills data</div>';
    }
}

// Load projects from JSON
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        projectsData = await response.json();
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML = 
            '<div class="loading">Error loading projects data</div>';
    }
}

// SVG Icons for categories
const categoryIcons = {
    "Front-End": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 17L12 22L21 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 12L12 17L21 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "Back-End": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
        <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2"/>
        <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>
        <circle cx="7" cy="9" r="1" fill="currentColor"/>
        <circle cx="12" cy="9" r="1" fill="currentColor"/>
        <circle cx="17" cy="9" r="1" fill="currentColor"/>
    </svg>`,
    "Database": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2"/>
        <path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" stroke="currentColor" stroke-width="2"/>
        <path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    "Tools & Technologies": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
};

// SVG Icons for individual skills
const skillIcons = {
  "HTML": `<i class="fab fa-html5" title="HTML"></i>`,
  "CSS": `<i class="fab fa-css3-alt" title="CSS"></i>`,
  "JavaScript": `<i class="fab fa-js" title="JavaScript"></i>`,
  "React": `<i class="fab fa-react" title="React"></i>`,
  "Flutter": `<i class="fas fa-mobile-alt" title="Flutter"></i>`, // No fab, using fas fallback
  "Tailwind": `<i class="fas fa-wind" title="Tailwind CSS"></i>`, // Custom/fallback
  "Git": `<i class="fab fa-git-alt" title="Git"></i>`,
  "GitHub": `<i class="fab fa-github" title="GitHub"></i>`,
  "Figma": `<i class="fab fa-figma" title="Figma"></i>`,
  "Node.js": `<i class="fab fa-node-js" title="Node.js"></i>`,
  "PHP": `<i class="fab fa-php" title="PHP"></i>`,
  "Laravel": `<i class="fab fa-laravel" title="Laravel"></i>`,
  "Python": `<i class="fab fa-python" title="Python"></i>`,
  "MySQL": `<i class="fas fa-database" title="MySQL"></i>`, // Fallback
  "PostgreSQL": `<i class="fas fa-database" title="PostgreSQL"></i>`,
  "Firebase": `<i class="fas fa-fire" title="Firebase"></i>`, // Fallback
  "MVVM": `<i class="fas fa-diagram-project" title="MVVM"></i>`,
  "MVC": `<i class="fas fa-sitemap" title="MVC"></i>`,
  "Agile Development": `<i class="fas fa-sync-alt" title="Agile Development"></i>`,

    // Custom SVG icons for missing ones
"WPF": `
<svg viewBox="0 0 256 256" width="24" height="24" title="WPF" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="M0 128C0 57.3 57.3 0 128 0s128 57.3 128 128-57.3 128-128 128S0 198.7 0 128z"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="80" fill="white" font-family="Segoe UI">W</text>
</svg>`,
"PyQt5": `
  <svg viewBox="0 0 48 48" width="24" height="24" title="PyQt5" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="48" height="48" rx="8" ry="8" fill="currentColor"/>
    <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="white" font-family="Arial">Qt</text>
  </svg>`
,
"C#": `
  <svg viewBox="0 0 48 48" width="24" height="24" title="C#" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="currentColor"/>
    <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="white" font-family="Arial">C#</text>
  </svg>`
};


// Render skills
function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!skillsData || skillsData.length === 0) {
        skillsContainer.innerHTML = '<div class="loading">No skills data available</div>';
        return;
    }

    const skillsHTML = skillsData.map(category => `
        <div class="skill-category">
            <h3>
                <span class="category-icon">${categoryIcons[category.category] || ''}</span>
                ${category.category}
            </h3>
            <div class="skill-tags">
                ${category.skills.map(skill => `
                    <span class="skill-tag" data-skill="${skill}">
                        <span class="skill-icon">${skillIcons[skill] || ''}</span>
                        ${skill}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');

    skillsContainer.innerHTML = skillsHTML;

    // Add click events to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            highlightSkill(skill);
        });
    });
}
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');

    if (!projectsData || projectsData.length === 0) {
        projectsContainer.innerHTML = '<div class="loading">No projects data available</div>';
        return;
    }

    const githubIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68.003 1.36.092 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>`;

    const playIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.804 8.209l-5.483 3.184A.5.5 0 014 11.684V4.316a.5.5 0 01.82-.387l5.483 3.184a.5.5 0 010 .896z"/>
      </svg>`;

    const projectsHTML = projectsData.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : project.title}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <div class="project-buttons">
                    ${project.githubLink ? `
                        <button class="btn github-btn" data-github="${project.githubLink}" title="View on GitHub">
                            ${githubIconSVG} GitHub
                        </button>` : ''}
                    ${project.playLink ? `
                        <button class="btn play-btn" data-play="${project.playLink}" title="Play Video">
                            ${playIconSVG} Play
                        </button>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;

    // Add click events on buttons
    document.querySelectorAll('.github-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();  // Prevent triggering card click
            const url = btn.getAttribute('data-github');
            if (url) window.open(url, '_blank');
        });
    });

    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const url = btn.getAttribute('data-play');
            if (url) window.open(url, '_blank'); // Or custom video modal logic
        });
    });

    // Add click event to cards (except buttons)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function () {
            const projectId = parseInt(this.getAttribute('data-project-id'), 10);
            const project = projectsData.find(p => p.id === projectId);
            if (project && project.link && project.link !== "#") {
                window.open(project.link, '_blank');
            } else {
                alert("No link available for this project.");
            }
        });
    });
}


// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'rgba(31, 31, 54, 0.98)';
        navLinks.style.padding = '1rem';
        navLinks.style.borderRadius = '0 0 12px 12px';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            submitForm(e); // ✅ pass the event!
        }
    });
}

// Validate contact form
function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName || !lastName || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
}

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    // Add loading state
    form.classList.add('form-submitted');

    fetch('https://formspree.io/f/xrbkzodb', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        form.classList.remove('form-submitted');

        if (response.ok) {
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    showFormMessage(data.errors.map(error => error.message).join(', '), 'error');
                } else {
                    showFormMessage('Oops! Something went wrong. Please try again later.', 'error');
                }
            });
        }
    })
    .catch(error => {
        form.classList.remove('form-submitted');
        showFormMessage('Oops! Network error. Please try again later.', 'error');
    });
}


// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function highlightSkill(skill) {
    // Add visual feedback for skill interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.style.transform = tag.getAttribute('data-skill') === skill ? 'scale(1.1)' : 'scale(1)';
    });
    
    setTimeout(() => {
        skillTags.forEach(tag => {
            tag.style.transform = 'scale(1)';
        });
    }, 300);
}

function showProjectDetails(projectId) {
    const project = projectsData.find(p => p.id === parseInt(projectId));
    if (project) {
        // Create a simple modal or alert with project details
        alert(`Project: ${project.title}\n\nDescription: ${project.description}\n\nTechnologies: ${project.technologies.join(', ')}`);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}-message`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function downloadCV() {
    const cvLink = "https://drive.google.com/file/d/1Q3tIuD4A_x4eOfdSjv_d3c5HJCGg0ypI/view?usp=sharing";
    window.open(cvLink, '_blank');
}


// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// Handle window resize
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        navLinks.style.display = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.flexDirection = '';
        navLinks.style.background = '';
        navLinks.style.padding = '';
        navLinks.style.borderRadius = '';
    }
});
