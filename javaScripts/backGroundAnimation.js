document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  let stars = [];
  const starCount = 40; // Total number of active stars

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  class Star {
    constructor() {
      this.init();
      // Randomize initial positions so the screen is full at start
      if (this.type === "horizontal") {
        this.x = Math.random() * canvas.width;
      } else {
        this.y = Math.random() * canvas.height;
      }
    }

    init() {
      // 50% horizontal, 50% vertical
      this.type = Math.random() > 0.5 ? "horizontal" : "vertical";
      this.size = 4; // 4 by 4 pixels
      
      this.speed = Math.random() * 2 + 1; // Speed variation
      
      if (this.type === "horizontal") {
        this.y = Math.floor(Math.random() * canvas.height); // random vertical position
        this.x = -this.size; // start off-screen to the left
        this.vx = this.speed;
        this.vy = 0;
      } else {
        this.x = Math.floor(Math.random() * canvas.width); // random horizontal position
        this.y = -this.size; // start off-screen top
        this.vx = 0;
        this.vy = this.speed;
      }
    }

    draw() {
      // Transparent 50%
      ctx.fillStyle = "rgba(0, 158, 129, 0.15)";
      ctx.beginPath();
      // 4 by 4 square
      ctx.rect(this.x, this.y, this.size, this.size);
      ctx.fill();
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

  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }
    requestAnimationFrame(animate);
  }

  initStars();
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
