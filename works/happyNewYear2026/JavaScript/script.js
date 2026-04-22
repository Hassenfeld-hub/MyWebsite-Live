const container = document.getElementById("firework-canvas");
const colors = [
  "#ff3b30",
  "#ff9500",
  "#ffcc00",
  "#4cd964",
  "#5ac8fa",
  "#007aff",
  "#5856d6",
  "#ff2d55",
];
const GRAVITY = 0.08;
const FRICTION = 0.96;
let particles = [];

class Particle {
  constructor(x, y, color) {
    this.element = document.createElement("div");
    this.element.classList.add("particle");
    const size = Math.random() * 15 + 8;
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
    this.element.style.backgroundColor = color;

    this.x = x;
    this.y = y;

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 7 + 2;
    this.vx = Math.cos(angle) * velocity;
    this.vy = Math.sin(angle) * velocity;
    this.life = 1.0;
    this.decay = Math.random() * 0.02 + 0.01;

    container.appendChild(this.element);
  }
  update() {
    this.vx *= FRICTION;
    this.vy *= FRICTION;
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.element.style.opacity = this.life;
  }
}

function animate() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    if (p.life <= 0) {
      p.element.remove();
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}

function createFirework(x, y) {
  const mainColor =
    Math.random() > 0.3
      ? colors[Math.floor(Math.random() * colors.length)]
      : null;
  for (let i = 0; i < 35; i++) {
    const color =
      mainColor || colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }
}

document.addEventListener("pointerdown", (e) => {
  createFirework(e.clientX, e.clientY);
});

setInterval(() => {
  createFirework(
    Math.random() * window.innerWidth,
    Math.random() * (window.innerHeight * 0.7),
  );
}, 1200);

animate();
