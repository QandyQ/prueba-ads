// ============================================
// FUNCIONALIDADES PRINCIPALES DEL SITIO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initLatestArticlesBackground();
    initRewardedAdButton();
});

// ============================================
// NAVEGACIÓN Y SCROLL SUAVE
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si es un enlace interno (#)
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// ANIMACIONES AL DESPLAZARSE
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a tarjetas
    const cards = document.querySelectorAll('.feature-card, .category-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// FONDO DINÁMICO EN ÚLTIMOS ARTÍCULOS
// ============================================
function initLatestArticlesBackground() {
    const section = document.querySelector('.latest-articles-section');
    const backgroundLayer = document.querySelector('.latest-articles-bg');
    const cards = document.querySelectorAll('.latest-article-card');

    if (!section || !backgroundLayer || !cards.length) {
        return;
    }

    const resetBackground = () => {
        backgroundLayer.style.opacity = '0';
        backgroundLayer.style.backgroundImage = 'none';
    };

    const showBackground = (imageUrl) => {
        backgroundLayer.style.backgroundImage = `linear-gradient(rgba(15, 35, 68, 0.18), rgba(15, 35, 68, 0.18)), url("${imageUrl}")`;
        backgroundLayer.style.opacity = '1';
    };

    cards.forEach(card => {
        const imageUrl = card.dataset.articleBg;
        const cardSurface = card.firstElementChild;

        card.addEventListener('mouseenter', () => {
            if (imageUrl) {
                showBackground(imageUrl);
            }

            if (cardSurface) {
                cardSurface.style.transform = 'translateY(-5px)';
                cardSurface.style.boxShadow = 'var(--shadow-lg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (cardSurface) {
                cardSurface.style.transform = 'translateY(0)';
                cardSurface.style.boxShadow = 'var(--shadow-md)';
            }
        });

        card.addEventListener('focus', () => {
            if (imageUrl) {
                showBackground(imageUrl);
            }
        });

        card.addEventListener('blur', () => {
            const activeElement = document.activeElement;

            if (!section.contains(activeElement)) {
                resetBackground();
            }
        });
    });

    section.addEventListener('mouseleave', resetBackground);
    resetBackground();
}

// ============================================
// REWARDED AD DE MONETAG
// ============================================
function initRewardedAdButton() {
    const rewardedAdButton = document.getElementById('rewarded-ad-button');

    if (!rewardedAdButton) {
        return;
    }

    rewardedAdButton.addEventListener('click', async () => {
        if (typeof show_11057393 !== 'function') {
            showNotification('El anuncio no está disponible en este momento.', 'warning');
            return;
        }

        rewardedAdButton.disabled = true;
        rewardedAdButton.textContent = 'Cargando...';

        try {
            await show_11057393('pop');
            showNotification('Anuncio completado. Aquí puedes dar la recompensa.', 'success');
        } catch (error) {
            logError('Error al mostrar el anuncio recompensado', error);
        } finally {
            rewardedAdButton.disabled = false;
            rewardedAdButton.textContent = 'Ver anuncio';
        }
    });
}

// ============================================
// FUNCIONES HELPER
// ============================================

/**
 * Log de errores
 */
function logError(message, error) {
    console.error(`[Lo Curioso] ${message}:`, error);
}

/**
 * Mostrar notificación
 */
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}
