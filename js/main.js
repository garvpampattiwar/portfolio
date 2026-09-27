/**
 * GARV ABHAY PAMPATTIWAR - CORE JAVASCRIPT
 * Handles navigation, mobile menu, scroll reveal animations, and contact form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 1. Mobile Navigation Toggle
  // --------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const allNavLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
      }
    });
  }

  // --------------------------------------------------
  // 2. Active Section Spy on Scroll
  // --------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.scrollY;
    let currentId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy();

  // --------------------------------------------------
  // 3. Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --------------------------------------------------
  // 4. Contact Form Submission Handling
  // --------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      const permissionCheck = document.getElementById('permission-check').checked;

      if (!firstName || !email || !message) {
        formFeedback.textContent = 'Please fill out your name, email, and message.';
        formFeedback.style.color = '#f87171';
        formFeedback.style.display = 'block';
        return;
      }

      if (!permissionCheck) {
        formFeedback.textContent = 'Please check the box granting permission to contact you.';
        formFeedback.style.color = '#fbbf24';
        formFeedback.style.display = 'block';
        return;
      }

      // Generate mailto link as direct reliable fallback
      const fullName = `${firstName} ${lastName}`.trim();
      const encodedSubject = encodeURIComponent(`Portfolio Message from ${fullName}`);
      const encodedBody = encodeURIComponent(`From: ${fullName} (${email})\n\nMessage:\n${message}\n\n[Permission to reply provided: Yes]`);
      const mailtoUrl = `mailto:garvpampattiwar@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      formFeedback.textContent = 'Opening your email client... Thank you for reaching out!';
      formFeedback.style.color = '#4ade80';
      formFeedback.style.display = 'block';

      // Launch email client
      window.location.href = mailtoUrl;

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset();
      }, 1800);
    });
  }
});
