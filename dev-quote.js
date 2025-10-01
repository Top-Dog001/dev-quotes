const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nav.right");
const prevBtn = document.querySelector(".nav.left");
const progressContainer = document.getElementById("progressContainer");

let current = 0;
const slideCount = slides.length;
let progressFills = [];

// create segmented progress bars
for (let i = 0; i < slideCount; i++) {
  const segment = document.createElement("div");
  segment.classList.add("progress-segment");

  const fill = document.createElement("div");
  fill.classList.add("progress-fill");

  segment.appendChild(fill);
  progressContainer.appendChild(segment);

  progressFills.push(fill);
}

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
  });
  resetProgress(index);
}

function resetProgress(index) {
  progressFills.forEach((fill, i) => {
    fill.style.transition = "none";
    fill.style.width = i < index ? "100%" : "0";
  });

  const activeFill = progressFills[index];
  activeFill.style.transition = "none";
  activeFill.style.width = "0";

  requestAnimationFrame(() => {
    activeFill.style.transition = "width 2s linear";
    activeFill.style.width = "100%";
  });
}

function nextSlide() {
  current = (current + 1) % slideCount;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slideCount) % slideCount;
  showSlide(current);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// hide nav after 7s (still clickable)
setTimeout(() => {
  document.querySelectorAll(".nav").forEach(nav => nav.classList.add("hidden"));
}, 7000);

// init
showSlide(current);