const fakeCheck = document.getElementById("fakeCheck");
const captchaBox = document.getElementById("captchaBox");
const images = document.querySelectorAll(".captcha-img");
const submitBtn = document.getElementById("submitBtn");
const wrapper = document.querySelector(".captcha-wrapper");

fakeCheck.addEventListener("change", () => {
  captchaBox.classList.remove("hidden");
});

images.forEach(img => {
  img.addEventListener("click", () => {
    img.classList.toggle("selected");
  });
});

submitBtn.addEventListener("click", () => {
  const selected = document.querySelectorAll(".selected");

  if (selected.length === 9) {
    showSuccessScreen();
  } else {
    shakeCaptcha();
  }
});

function showSuccessScreen() {
  wrapper.innerHTML = `
    <div class="success-layout">
      
      <img src="joel_manali.jpeg" class="side-image left-img">

      <div class="success-screen">
        <h1>YAYYYY 💖</h1>
        <p>Now time for flowers and gifts 🌹🎁</p>
      </div>

      <img src="boo.jpeg" class="side-image right-img">

    </div>
  `;

  launchConfetti();
}

function launchConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function shakeCaptcha() {
  captchaBox.classList.add("shake");
  setTimeout(() => {
    captchaBox.classList.remove("shake");
  }, 500);
}