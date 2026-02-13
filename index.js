const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const topImage = document.getElementById("topImage");

let noClickCount = 0;
let yesScale = 1;
let dodgeMode = false;

const questions = [
    "Are you sure? 🥺",
    "Really sure? 😭",
    "Think again! 💔",
    "Last chance before I panic 😳"
];

const images = [
    "images/image2.gif",
    "images/image3.gif",
    "images/image4.gif",
    "images/image5.gif"
];

noBtn.addEventListener("click", () => {

    if (noClickCount < questions.length) {
        question.textContent = questions[noClickCount];
        topImage.src = images[noClickCount];
    }

    noClickCount++;

    // Grow YES button
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Activate dodge mode after 4 clicks
    if (noClickCount >= 4) {
        dodgeMode = true;
        noBtn.style.position = "fixed";
    }
});

function moveNoButton() {
    if (!dodgeMode) return;

    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// Desktop hover dodge
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile touch dodge
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
    document.body.innerHTML = `
        <div style="
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            height:100vh;
            background:pink;
            text-align:center;
            padding:20px;">
            
            <h1 style="font-size:3rem;">YAYYYYY 💖💖💖</h1>
            <p style="font-size:1.5rem;">You just made me the happiest person alive 🥰</p>
            <img src="happy.jpg" style="width:250px; margin-top:20px;">
        </div>
    `;
});