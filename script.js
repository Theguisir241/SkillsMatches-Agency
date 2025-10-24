document.addEventListener('DOMContentLoaded', () => {

  /**********************
   * 1. FAQ TOGGLE SMOOTH
   **********************/
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    // Initialisation
    answer.style.maxHeight = '0px';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.4s ease';

    question.addEventListener('click', () => {
      const isOpen = answer.style.maxHeight !== '0px';

      if (isOpen) {
        answer.style.maxHeight = '0px';
        toggle.textContent = '+';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
      }
    });
  });

  /**********************
   * 2. TESTIMONIALS SWIPE BUTTON
   **********************/
  const swipeBtn = document.getElementById('swipe-btn');
  const carousel = document.querySelector('.testimonial-carousel');

  if (swipeBtn && carousel) {
    swipeBtn.addEventListener('click', () => {
      // Scroll smoothly vers la droite
      carousel.scrollBy({ left: 300, behavior: 'smooth' });

      // Faire disparaître le bouton avec transition
      swipeBtn.style.transition = 'opacity 0.5s, transform 0.5s';
      swipeBtn.style.opacity = '0';
      swipeBtn.style.transform = 'translateX(50px)';

      // Retirer le bouton du DOM après la transition
      setTimeout(() => swipeBtn.remove(), 500);
    });
  }

  /**********************
   * 3. HAMBURGER MENU TOGGLE
   **********************/
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  /**********************
   * 4. JS CONNECTION TEST
   **********************/
  console.log('JS connected! Everything is initialized.');

});
