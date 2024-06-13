"use strict";

export class Cluster {
  constructor() {
    this.particleAmount = 10;
    this.maxSpeed = 2;
    this.particleRadius = 10;
    this.particlesColor = "black";

    this.animationIsInfinite = false;
    this.duration = 1000;
    this.counter = 0;
    this.animationOver = false;

    this.particles = [];

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.init();
  }
  init() {
    this.#setCanvasSize();
    for (let i = 0; i < this.particleAmount; i++) {
      this.particles.push(
        new Particle(
          this.canvas,
          this.maxSpeed,
          this.particleRadius,
          this.particlesColor
        )
      );
    }
  }

  #setCanvasSize() {
    // this.canvas.classList.add("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.append(this.canvas);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(this.ctx);
      this.particles[i].update();
    }
    if (!this.animationIsInfinite) {
      this.counter++;
      if (this.counter >= this.duration) this.animationOver = true;
    }
  }

  animate() {
    if (!this.animationIsInfinite) if (this.animationOver) return;
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }
}

class Particle {
  constructor(canvas, maxSpeed, radius, color) {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = Math.random() * (maxSpeed * 2) - maxSpeed * -1;
    this.vy = Math.random() * (maxSpeed * 2) - maxSpeed * -1;

    this.radius = radius;
    this.color = color;

    this.maxX = canvas.width;
    this.maxY = canvas.height;
    this.#init();
  }

  #init() {}

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    if (this.x > this.maxX - this.radius) this.vx *= -1;
    if (this.x < 0 + this.radius) this.vx *= -1;

    this.y += this.vy;
    if (this.y > this.maxY - this.radius) this.vy *= -1;
    if (this.y < 0 + this.radius) this.vy *= -1;
  }
}

const cluster = new Cluster();
cluster.animate();
