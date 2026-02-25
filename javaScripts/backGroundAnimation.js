document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  let beams = [];
  const gridSize = 50;
  const beamCount = 8; // Number of active beams

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setCanvasSize();
  // window.addEventListener("resize", setCanvasSize);

  // const colors = ["#ff4d00", "#ff6a00", "#ff8800", "#ffb800"];

  class Beam {
    constructor() {
      this.init();
    }

    init() {
      // this.type = "horizontal";
      // this.size = Math.random() * 150 + 100; // Length of the beam
      // this.speed = Math.random() * 4 + 2;
      // this.color = colors[Math.floor(Math.random() * colors.length)];
      
      // this.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
      // this.x = -this.size;
      // this.vx = this.speed;
      // this.vy = 0;
    }

    draw() {
      const gradient = this.type === "horizontal" 
        ? ctx.createLinearGradient(this.x, this.y, this.x + this.size, this.y)
        : ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.size);

      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.8, this.color);
      gradient.addColorStop(1, "white"); // Head of the beam

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      
      if (this.type === "horizontal") {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y);
      } else {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.size);
      }
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Reset if off screen
      if (this.type === "horizontal" && this.x > canvas.width) {
        this.init();
      } else if (this.type === "vertical" && this.y > canvas.height) {
        this.init();
      }
    }
  }

  function initBeams() {
    beams = [];
    for (let i = 0; i < beamCount; i++) {
      beams.push(new Beam());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < beams.length; i++) {
      beams[i].update();
      beams[i].draw();
    }
    requestAnimationFrame(animate);
  }

  initBeams();
  animate();

  // Smooth scrolling for anchor links (preserving core functionality)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = 60;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
