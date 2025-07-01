// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');
const scrollLinks = document.querySelectorAll('a[href^="#"]');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Smooth Scroll for anchor links
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Accordion functionality
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const content = document.getElementById(header.getAttribute('aria-controls'));
        
        // Close all other accordion items
        if (!isExpanded) {
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.querySelector('i').classList.remove('fa-minus');
                    otherHeader.querySelector('i').classList.add('fa-plus');
                    document.getElementById(otherHeader.getAttribute('aria-controls')).style.maxHeight = null;
                }
            });
        }
        
        // Toggle current item
        header.setAttribute('aria-expanded', !isExpanded);
        if (isExpanded) {
            content.style.maxHeight = null;
            header.querySelector('i').classList.remove('fa-minus');
            header.querySelector('i').classList.add('fa-plus');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            header.querySelector('i').classList.remove('fa-plus');
            header.querySelector('i').classList.add('fa-minus');
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    formInputs.forEach(input => {
        const errorMessage = input.nextElementSibling;
        
        if (input.required && !input.value.trim()) {
            input.classList.add('error');
            errorMessage.textContent = 'Este campo es obligatorio';
            errorMessage.style.display = 'block';
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            input.classList.add('error');
            errorMessage.textContent = 'Por favor ingresa un email válido';
            errorMessage.style.display = 'block';
            isValid = false;
        } else {
            input.classList.remove('error');
            errorMessage.style.display = 'none';
        }
    });
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Formulario enviado con éxito!');
        contactForm.reset();
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize Swiper for gallery slider
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Initialize AOS for scroll animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lightbox initialization
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'albumLabel': 'Imagen %1 de %2'
});