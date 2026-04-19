const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const faqItems = document.querySelectorAll('.faq-item');
const revealElements = document.querySelectorAll('.reveal');
const bookingForm = document.querySelector('.booking-form');

// Referencias base del sitio para no repetir búsquedas en el DOM.

// Menú móvil simple para pantallas pequeñas.
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Acordeón en JS puro para la sección de preguntas frecuentes.
faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-question');

    trigger?.addEventListener('click', () => {
        const willOpen = !item.classList.contains('active');

        faqItems.forEach((faq) => faq.classList.remove('active'));

        if (willOpen) {
            item.classList.add('active');
        }
    });
});

// Animación suave al hacer scroll usando Intersection Observer.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

revealElements.forEach((element) => revealObserver.observe(element));

// Demo del formulario: redirige a WhatsApp con el mensaje ya redactado.
if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const name = formData.get('name')?.toString().trim() || '';
        const email = formData.get('email')?.toString().trim() || '';
        const phone = formData.get('phone')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';
        const mode = formData.get('mode')?.toString().trim() || '';

        const whatsappMessage = encodeURIComponent(
            `Hola, me gustaría agendar una sesión.\n\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\nModalidad: ${mode}\nMotivo de consulta: ${message}`
        );

        window.open(`https://wa.me/5210000000000?text=${whatsappMessage}`, '_blank', 'noopener');
    });
}