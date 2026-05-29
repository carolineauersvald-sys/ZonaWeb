// ==========================================
// ABRIGO AGROFORTE - INTELIGÊNCIA DO SITE
// Sustentabilidade, Produção e Meio Ambiente
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initProjectFilter();
    initTestimonialSlider();
    initContactForm();
});

/**
 * 1. MENU MOBILE RESPONSIVO
 * Gerencia a abertura e fechamento do menu em dispositivos móveis.
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
            
            // Acessibilidade (Aria-Expanded)
            const isOpen = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }
}

/**
 * 2. FILTRO DINÂMICO DE PROJETOS
 * Permite filtrar as iniciativas entre "Produção", "Meio Ambiente" e "Cultura".
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove classe ativa de todos os botões e adiciona ao clicado
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Filtra os cards com uma animação suave
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }
}

/**
 * 3. CARROSSEL DE DEPOIMENTOS/PARCEIROS
 * Transição automática e manual de depoimentos sobre o impacto do abrigo.
 */
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('slide-active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('slide-active');
    }

    // Avança o slide automaticamente
    let autoSlide = setInterval(() => showSlide(currentSlide + 1), slideInterval);

    // Controles de Próximo/Anterior (Opcional, se existirem os botões no HTML)
    const nextBtn = document.querySelector('.slider-next');
    const prevBtn = document.querySelector('.slider-prev');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlide);
            showSlide(currentSlide + 1);
            autoSlide = setInterval(() => showSlide(currentSlide + 1), slideInterval);
        });

        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlide);
            showSlide(currentSlide - 1);
            autoSlide = setInterval(() => showSlide(currentSlide + 1), slideInterval);
        });
    }
}

/**
 * 4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO/VOLUNTARIADO
 * Garante que as mensagens enviadas ao Agroforte tenham dados válidos.
 */
function initContactForm() {
    const form = document.querySelector('#agroforte-contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            const responseMessage = document.querySelector('.form-response');

            // Validação simples
            if (!name || !email || !message) {
                showFormFeedback(responseMessage, 'Por favor, preencha todos os campos.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFormFeedback(responseMessage, 'Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Simulação de envio (integre com sua API/Servidor aqui)
            showFormFeedback(responseMessage, 'Enviando sua mensagem...', 'info');

            setTimeout(() => {
                showFormFeedback(responseMessage, 'Obrigado pelo contato! O Abrigo Agroforte responderá em breve.', 'success');
                form.reset();
            }, 1500);
        });
    }
}

// Funções Auxiliares para o Formulário
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormFeedback(element, msg, type) {
    if (!element) return;
    element.textContent = msg;
    element.className = `form-response ${type}`; // Aplica classes CSS como .error, .success
}
