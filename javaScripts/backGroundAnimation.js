document.addEventListener("DOMContentLoaded", function () {
  const background = document.querySelector(".background");
  
  for (let i = 0; i < 100; i++) {
      let span = document.createElement("span");
      span.style.position = "absolute";
      span.style.width = "1vmin";
      span.style.height = "1vmin";
      span.style.borderRadius = "50%";
      span.style.backfaceVisibility = "hidden";
      span.style.color = getRandomColor();
      span.style.top = Math.random() * 100 + "%";
      span.style.left = Math.random() * 100 + "%";
      span.style.animation = `move ${Math.random() * 200 + 50}s linear infinite`;
      span.style.boxShadow = `2vmin 0 ${Math.random() + 0.5}vmin currentColor`;
      span.style.transformOrigin = `${Math.random() * 30 - 15}vw ${Math.random() * 30 - 15}vh`;
      background.appendChild(span);
  }

  // Smooth scrolling fix
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 60,
                  behavior: "smooth"
              });
          }
      });
  });

});

function getRandomColor() {
  const colors = ["#007bff", "#00d5ff", "#00b3ff"];
  return colors[Math.floor(Math.random() * colors.length)];
}
