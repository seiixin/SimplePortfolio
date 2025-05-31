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

// Render skills
function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!skillsData || skillsData.length === 0) {
        skillsContainer.innerHTML = '<div class="loading">No skills data available</div>';
        return;
    }

    const skillsHTML = skillsData.map(category => `
        <div class="skill-category">
            <h3>${category.category}</h3>
            <div class="skill-tags">
                ${category.skills.map(skill => `
                    <span class="skill-tag" data-skill="${skill}">${skill}</span>
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

// Render projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    if (!projectsData || projectsData.length === 0) {
        projectsContainer.innerHTML = '<div class="loading">No projects data available</div>';
        return;
    }

    const projectsHTML = projectsData.map(project => `
        <div class="project-card" data-project-id="${project.id}">
            <div class="project-image">
                ${project.image || project.title}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;

    // Add click events to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            showProjectDetails(projectId);
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
            submitForm();
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

// Submit contact form
function submitForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Add loading state
    form.classList.add('form-submitted');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        form.classList.remove('form-submitted');
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        form.reset();
    }, 1500);
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
    // Implement CV download functionality
    alert('CV download functionality would be implemented here. Please provide the CV file path.');
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
