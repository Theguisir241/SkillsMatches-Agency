document.addEventListener("DOMContentLoaded", () => {
  const baseColors = ['#CFF7E1', '#C7E6FF', '#D9C8FF', '#FBD0B5', '#FFE9B5'];

  const sections = document.querySelectorAll('section:not(#new-hero-id):not(#navbar):not(#Faq)');

  sections.forEach(section => {
    section.style.position = 'relative';
    section.style.overflow = 'hidden';

    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-bg');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    section.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    const particles = [];
    const numParticles = 15;
    const padding = 20;

    for (let i = 0; i < numParticles; i++) {
      const corner = Math.random() < 0.5 ? 'topRight' : 'bottomLeft';
      let x, y;
      if (corner === 'topRight') {
        x = canvas.width * 0.7 + Math.random() * canvas.width * 0.3 - padding;
        y = Math.random() * canvas.height * 0.3 + padding;
      } else {
        x = Math.random() * canvas.width * 0.3 + padding;
        y = canvas.height * 0.7 + Math.random() * canvas.height * 0.3 - padding;
      }

      particles.push({
        x,
        y,
        radius: 30 + Math.random() * 50,
        baseColor: baseColors[Math.floor(Math.random() * baseColors.length)],
        color: baseColors[Math.floor(Math.random() * baseColors.length)],
        speedX: -0.02 + Math.random() * 0.1,
        speedY: -0.03 + Math.random() * 0.1,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: 0.001 + Math.random() * 0.003,
        scale: 0.6 + Math.random() * 0.8,
        scaleSpeed: 0.0002 + Math.random() * 0.001,
        opacity: 0.4 + Math.random() * 0.25,
        depth: 0.6 + Math.random() * 0.6,
        colorShift: Math.random() * 360
      });
    }

    // === Version sans scintillement ===
    function shiftColor(color, shift) {
      return `hsl(${shift % 360}, 80%, 80%)`; // suppression du Math.random()
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.colorShift += 0.05; // variation douce et constante
        const dynamicColor = shiftColor(p.colorShift, p.colorShift);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(p.scale * p.depth, p.scale * p.depth);

        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI);
        ctx.fillStyle = dynamicColor;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = dynamicColor;
        ctx.shadowBlur = 10 * p.depth;
        ctx.fill();
        ctx.restore();

        p.x += p.speedX * p.depth;
        p.y += p.speedY * p.depth;
        p.angle += p.angleSpeed;
        p.scale += p.scaleSpeed;

        if (p.scale > 1.2 || p.scale < 0.5) p.scaleSpeed *= -1;

        if (p.x - p.radius < 0) p.speedX *= -1;
        if (p.x + p.radius > canvas.width) p.speedX *= -1;
        if (p.y - p.radius < 0) p.speedY *= -1;
        if (p.y + p.radius > canvas.height) p.speedY *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    });
  });
});
