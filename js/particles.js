"use strict";

export class Cluster {
  constructor() {
    this.particleAmount = 10;
    this.maxSpeed = 2;
    this.particleRadius = 10;
    this.particleColor = "black";

    this.animationIsInfinite = false;
    this.duration = 1000;
    this.counter = 0;
    this.animationOver = false;

    this.particles = [];

    this.resizeCanvas = this.#setCanvasSize.bind(this);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.#init();
  }

  #init() {
    this.#setCanvasSize();
    document.body.append(this.canvas);
    for (let i = 0; i < this.particleAmount; i++) {
      this.particles.push(
        new Particle(
          this.canvas,
          this.maxSpeed,
          this.particleRadius,
          this.particleColor
        )
      );
    }
  }

  #setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].x =
        Math.random() * (this.canvas.width - this.particles[i].radius) +
        this.particles[i].radius;
      this.particles[i].y =
        Math.random() * (this.canvas.height - this.particles[i].radius) +
        this.particles[i].radius;
    }
  }

  #render() {
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

  #animate() {
    if (!this.animationIsInfinite)
      if (this.animationOver) {
        this.off();
        return;
      }
    this.#render();
    requestAnimationFrame(this.#animate.bind(this));
  }

  off() {
    window.removeEventListener("resize", this.resizeCanvas);
    this.animationIsInfinite = false;
    this.animationOver = true;
  }

  on() {
    window.addEventListener("resize", this.resizeCanvas);
    this.animationIsInfinite = true;
    this.animationOver = false;
    this.#animate();
  }
}

class Particle {
  constructor(canvas, maxSpeed, radius, color) {
    this.x = Math.random() * (canvas.width - radius) + radius;
    this.y = Math.random() * (canvas.height - radius) + radius;
    this.vx = Math.random() * (maxSpeed * 2) - maxSpeed * -1;
    this.vy = Math.random() * (maxSpeed * 2) - maxSpeed * -1;

    this.radius = radius;
    this.color = color;

    this.canvas = canvas;

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
    this.y += this.vy;

    if (this.x > this.canvas.width - this.radius) {
      this.x = this.canvas.width - this.radius;
      this.vx *= -1;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    }
    if (this.y > this.canvas.height - this.radius) {
      this.y = this.canvas.height - this.radius;
      this.vy *= -1;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    }
  }
}

const cluster = new Cluster();
cluster.on();

// cluster.off() // Removes window event listener & stops animation
