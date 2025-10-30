const colors = ['#CFF7E1', '#C7E6FF', '#D9C8FF', '#FBD0B5', '#FFE9B5'];
const sectionIds = ['about', 'learning-modules'];

sectionIds.forEach(id => {
  const section = document.getElementById(id);
  if(!section) return;

  const canvas = document.createElement('canvas');
  canvas.classList.add('particles-bg');
  section.prepend(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = section.offsetWidth;
  canvas.height = section.offsetHeight;

  const particles = [];
  const numParticles = 35;

  for(let i=0;i<numParticles;i++){
    let x, y;

    // Distribution vers les coins uniquement
    const corner = Math.floor(Math.random()*4); // 0=haut-gauche,1=haut-droite,2=bas-gauche,3=bas-droite
    switch(corner){
      case 0: // haut-gauche
        x = Math.random() * canvas.width * 0.3;
        y = Math.random() * canvas.height * 0.3;
        break;
      case 1: // haut-droite
        x = canvas.width * 0.7 + Math.random() * canvas.width * 0.3;
        y = Math.random() * canvas.height * 0.3;
        break;
      case 2: // bas-gauche
        x = Math.random() * canvas.width * 0.3;
        y = canvas.height * 0.7 + Math.random() * canvas.height * 0.3;
        break;
      case 3: // bas-droite
        x = canvas.width * 0.7 + Math.random() * canvas.width * 0.3;
        y = canvas.height * 0.7 + Math.random() * canvas.height * 0.3;
        break;
    }

    particles.push({
      x: x,
      y: y,
      radius: 30 + Math.random()*50,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: -0.2 + Math.random()*0.4,
      speedY: -0.1 + Math.random()*0.2,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: 0.005 + Math.random()*0.015,
      scale: 0.7 + Math.random()*0.6,
      scaleSpeed: 0.002 + Math.random()*0.003,
      opacity: 0.6 + Math.random()*0.3,
      shadowBlur: 10 + Math.random()*20
    });
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(p.scale, p.scale);

      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI); // semi-cercle
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.shadowBlur;
      ctx.fill();
      ctx.restore();

      // mouvement
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.angleSpeed;

      // oscillation taille
      p.scale += p.scaleSpeed;
      if(p.scale > 1.3 || p.scale < 0.6) p.scaleSpeed *= -1;

      // rebond simple
      if(p.x - p.radius > canvas.width) p.x = -p.radius;
      if(p.x + p.radius < 0) p.x = canvas.width + p.radius;
      if(p.y - p.radius > canvas.height) p.y = -p.radius;
      if(p.y + p.radius < 0) p.y = canvas.height + p.radius;
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  });
});
