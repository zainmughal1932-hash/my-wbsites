// Floating hearts
const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['💖', '💗', '💕', '🌸', '✨', '💝', '🌷'];

function spawnHeart() {
  const el = document.createElement('div');
  el.classList.add('heart');
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  const dur = 6 + Math.random() * 8;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = Math.random() * 4 + 's';
  heartsBg.appendChild(el);
  setTimeout(() => el.remove(), (dur + 4) * 1000);
}

// Spawn hearts continuously
setInterval(spawnHeart, 600);
for (let i = 0; i < 10; i++) spawnHeart();

// Confetti
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colors = ['#ff6eb4', '#ffd700', '#ff3d9a', '#c084fc', '#f9a8d4', '#fff'];
let particles = [];
let animating = false;

function createParticles(count) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 4,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 6,
      drift: (Math.random() - 0.5) * 2,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.angle * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    p.y += p.speed;
    p.x += p.drift;
    p.angle += p.spin;
  });
  particles = particles.filter(p => p.y < canvas.height + 20);
  if (particles.length > 0) requestAnimationFrame(drawParticles);
  else { animating = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

function triggerCelebration() {
  createParticles(180);
  if (!animating) { animating = true; drawParticles(); }

  // Burst more waves
  setTimeout(() => createParticles(120), 600);
  setTimeout(() => createParticles(100), 1200);
}

// Auto-trigger on load after a short delay
setTimeout(triggerCelebration, 800);

// Background music — autoplay on first interaction
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
}

function toggleMusic() {
  startMusic();
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.textContent = '🎵';
    musicBtn.classList.remove('muted');
  } else {
    bgMusic.pause();
    musicBtn.textContent = '🔇';
    musicBtn.classList.add('muted');
  }
}

// Try autoplay on load, fallback to first click
window.addEventListener('load', () => {
  bgMusic.volume = 0.5;
  bgMusic.play().then(() => { musicStarted = true; }).catch(() => {});
});

document.body.addEventListener('click', startMusic, { once: true });
