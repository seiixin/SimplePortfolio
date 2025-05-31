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
    "Tools": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
};

// SVG Icons for individual skills
const skillIcons = {
    // Front-End
    "HTML": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 12H7a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" fill="currentColor"/>
        <path d="M13 8H7a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" fill="currentColor"/>
        <path d="M7 16h6a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm2 0h14v14H5V5Z" fill="currentColor"/>
    </svg>`,
    "CSS": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18-3h-3a2 2 0 0 1 2 2v3m0 6v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "JavaScript": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 8L3 12L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17 8L21 12L17 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 4L10 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "React": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
        <path d="M12 1C16.5 4.5 20 8.5 20 12S16.5 19.5 12 23C7.5 19.5 4 15.5 4 12S7.5 4.5 12 1Z" stroke="currentColor" stroke-width="2"/>
        <path d="M12 1C7.5 4.5 4 8.5 4 12S7.5 19.5 12 23C16.5 19.5 20 15.5 20 12S16.5 4.5 12 1Z" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    "Flutter": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 2L7.5 8L10.5 11L16.5 5L13.5 2Z" fill="currentColor"/>
        <path d="M13.5 8.5L10.5 11.5L13.5 14.5L16.5 11.5L13.5 8.5Z" fill="currentColor"/>
        <path d="M7.5 16L13.5 22L16.5 19L10.5 13L7.5 16Z" fill="currentColor"/>
    </svg>`,
    "Tailwind": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.81 9.24 12.41 9.84C13.39 10.82 14.56 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.19 8.76 16.59 8.16C15.61 7.18 14.44 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.81 15.24 7.41 15.84C8.39 16.82 9.56 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.19 14.76 11.59 14.16C10.61 13.18 9.44 12 7 12Z" fill="currentColor"/>
    </svg>`,
    
    // Back-End
    "PHP": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" stroke-width="2"/>
        <path d="M7 10H9C10.1 10 11 10.9 11 12S10.1 14 9 14H7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M13 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M17 10H19C20.1 10 21 10.9 21 12S20.1 14 19 14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    "Laravel": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7L9 4L15 7L21 4V17L15 20L9 17L3 20V7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 4V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 7V20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "Node.js": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "Python": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3C6.34 3 5 4.34 5 6V10C5 11.66 6.34 13 8 13H16C17.66 13 19 14.34 19 16V18C19 19.66 17.66 21 16 21H8C6.34 21 5 19.66 5 18V16" stroke="currentColor" stroke-width="2"/>
        <circle cx="8" cy="6" r="1" fill="currentColor"/>
        <circle cx="16" cy="18" r="1" fill="currentColor"/>
    </svg>`,
    
    // Database
    "MySQL": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2"/>
        <path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" stroke="currentColor" stroke-width="2"/>
        <path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    "Firebase": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 8.5L9 12L12.5 8.5L9 5L5.5 8.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M12.5 8.5L16 12L19.5 8.5L16 5L12.5 8.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M9 12L12.5 15.5L16 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M5.5 15.5L9 19L12.5 15.5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <path d="M12.5 15.5L16 19L19.5 15.5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>`,
    
    // Tools
    "Git": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L12 15L22 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 12V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "GitHub": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19C4 20.5 4 16.5 2 16M22 22V18.13A3.37 3.37 0 0 0 21.07 15.13A9.78 9.78 0 0 0 22 9A10.05 10.05 0 0 0 20 4.77 9.28 9.28 0 0 0 12 2A9.28 9.28 0 0 0 4 4.77A10.05 10.05 0 0 0 2 9A9.78 9.78 0 0 0 2.93 15.13A3.37 3.37 0 0 0 2 18.13V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "Docker": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12H20L22 10L20 8H16V12Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <rect x="12" y="8" width="3" height="4" stroke="currentColor" stroke-width="2"/>
        <rect x="8" y="8" width="3" height="4" stroke="currentColor" stroke-width="2"/>
        <rect x="4" y="8" width="3" height="4" stroke="currentColor" stroke-width="2"/>
        <rect x="8" y="4" width="3" height="4" stroke="currentColor" stroke-width="2"/>
        <rect x="12" y="4" width="3" height="4" stroke="currentColor" stroke-width="2"/>
        <path d="M2 16H22" stroke="currentColor" stroke-width="2"/>
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
