//menu toggle
// Attend que tout le contenu de la page soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {

  // Sélectionne le bouton hamburger et le menu de navigation par leur ID
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Ajoute un "écouteur d'événement" qui attend un clic sur le hamburger
  hamburger.addEventListener('click', () => {
    // Ajoute/retire la classe 'open' sur le hamburger pour l'animation en croix
    hamburger.classList.toggle('open');
    
    // Ajoute/retire la classe 'active' sur le menu pour le faire apparaître/disparaître
    navLinks.classList.toggle('active');
  });

});
document.addEventListener('DOMContentLoaded', () => {
  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- Back to Top Button Logic (NEW) ---
  const backToTopButton = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    // Show button if page is scrolled more than 300px
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Note: The button is an <a> tag pointing to #hero, so a separate
  // click event for scrolling isn't strictly necessary, but adding it
  // ensures smooth scrolling on all browsers if you decide to remove href="#hero".
  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

//back to top logic 
document.getElementById("backToTopBtn").addEventListener("click", function(e){
  e.preventDefault();
  window.scrollTo({top: 0, behavior: "smooth"});
});
