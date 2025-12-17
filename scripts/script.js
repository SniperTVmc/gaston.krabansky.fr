

// Dynamic current year in footer

const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;


// Theme toggle with system preference detection


const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function applyTheme(theme) {
    body.className = theme + '-theme';
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
}

applyTheme(getInitialTheme());

themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    applyTheme(newTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});


// Smooth scrolling for anchor links


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Contact form submission using Web3Forms


const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    formMessage.style.display = 'none';
    formMessage.textContent = "Envoi en cours...";
    formMessage.style.color = '#7f8c8d';
    formMessage.style.display = 'block';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (response.ok && result.success) {
            formMessage.textContent = "✅ Message envoyé avec succès ! Merci de m'avoir contacté.";
            formMessage.style.color = '#27ae60';
            form.reset();
        } else {
            console.error('Web3Forms Error:', result.message);
            formMessage.textContent = "❌ Erreur lors de l'envoi. Veuillez réessayer ou m'envoyer un mail directement.";
            formMessage.style.color = '#c0392b';
        }

    } catch (error) {
        formMessage.textContent = "❌ Erreur lors de l'envoi. Veuillez réessayer ou m'envoyer un mail directement.";
        formMessage.style.color = '#c0392b';
        console.error('Erreur du formulaire:', error);
    }
});


// Slider functionality for projects section


const grid = document.querySelector('.projects-grid');
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dotsContainer = document.querySelector('.slider-dots');

let index = 0;

function getCardWidth() {
    return document.querySelector('.project-card').offsetWidth;
}

function updateSlider() {
    grid.style.transform = `translateX(-${index * getCardWidth()}px)`;
    updateDots();
}

function createDots() {
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            index = i;
            updateSlider();
        });

        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    index = (index + 1) % cards.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    updateSlider();
});

createDots();