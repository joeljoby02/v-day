const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const topImage = document.getElementById("topImage");

let noClickCount = 0;
let yesScale = 1;
let dodgeMode = false;
let dodgeInterval = null;

const questions = [
    "Are you sure you dont want to be pooka's valentine :(",
    "Really sure? 😭",
    "Think again otherwise I will be shad 💔",
    "Last chance before I go all andar bandar shundar 😳"
];

const images = [
    "sad_1.gif",
    "sad_3.gif",
    "sad_4.gif",
    "sad_2.gif"
];

noBtn.addEventListener("click", () => {

    if (dodgeMode) return; // Prevent clicking once dodge starts

    if (noClickCount < questions.length) {
        question.textContent = questions[noClickCount];
        topImage.src = images[noClickCount];
    }

    noClickCount++;
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;

    if (noClickCount >= 4) {
        activateDodgeMode();
    }
});

function activateDodgeMode() {
    dodgeMode = true;

    noBtn.style.position = "fixed";
    noBtn.style.zIndex = "1000";
    noBtn.style.pointerEvents = "none"; // 🚫 Cannot click anymore

    moveNoButton();

    // 🔥 Auto move every 700ms
    dodgeInterval = setInterval(moveNoButton, 700);
}

function moveNoButton() {
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const yesRect = yesBtn.getBoundingClientRect();

    let randomX, randomY;
    let safe = false;

    while (!safe) {
        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;

        const padding = 100;

        const overlapsYes =
            randomX < yesRect.right + padding &&
            randomX + buttonWidth > yesRect.left - padding &&
            randomY < yesRect.bottom + padding &&
            randomY + buttonHeight > yesRect.top - padding;

        if (!overlapsYes) {
            safe = true;
        }
    }

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

yesBtn.addEventListener("click", () => {
    if (dodgeInterval) clearInterval(dodgeInterval);

    document.body.innerHTML = `
        <div style="
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            height:100vh;
            background:pink;
            text-align:center;
            padding:20px;
        ">
            
            <h1 style="font-size:3rem;">YAYYYYY 💖💖💖</h1>
            <p style="font-size:1.5rem;">
                Me happy happy happy 
            </p>

            <img src="happy.gif" 
                 style="width:250px; margin-top:20px; border-radius:15px;">

            <button 
                onclick="window.location.href='captcha.html'" 
                style="
                    margin-top:30px;
                    padding:14px 25px;
                    font-size:1rem;
                    border:none;
                    border-radius:25px;
                    background:#ff4d6d;
                    color:white;
                    cursor:pointer;
                    transition:0.3s;
                "
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'"
            >
                Now let's see if you remember your valentine or are you just a robot
            </button>
        </div>
    `;
});