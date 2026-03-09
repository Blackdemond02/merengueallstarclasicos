/**
 * Merengue All Star Clásicos - Funcionalidades
 * Scroll suave, animaciones al scroll, menú responsive, hover effects
 */

(function () {
    'use strict';

    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');
    const yearEl = document.getElementById('year');

    // ========== Año en el footer ==========
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ========== Navbar: scroll y clase scrolled ==========
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();

    // ========== Menú hamburguesa (móvil) ==========
    function toggleMenu() {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (
            navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)
        ) {
            toggleMenu();
        }
    });

    // ========== Scroll suave para enlaces internos ==========
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Animación al aparecer elementos (Intersection Observer) ==========
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });

    // ========== Hover effects suaves en tarjetas (refuerzo visual opcional) ==========
    const cards = document.querySelectorAll('.card, .instagram__item');
    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // ========== Vídeos en Novedades: play al hover, pause al salir ==========
    const novedadCards = document.querySelectorAll('.card--novedad');
    novedadCards.forEach(function (card) {
        const video = card.querySelector('.card__video');
        if (!video) return;
        // Intentar reproducir al cargar (autoplay puede estar bloqueado por el navegador)
        video.play().catch(function () {});
        card.addEventListener('mouseenter', function () {
            video.play().catch(function () {});
        });
        card.addEventListener('mouseleave', function () {
            video.pause();
        });
    });
})();
