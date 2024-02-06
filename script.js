const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isSecondMode = false; // Default to first-mode

// Container for note circles
const circles = [];
const colors = ['231,173,255', '229,167,237', '227,161,219', '225,155,201', '223,149,183', '221,143,165', '219,137,147', '217,131,129', '215,125,111', '213,119,93', '211,113,75'];

// Preload audio files
const audios = [];
for (let i = 0; i < 11; i++) {
    const audio = new Audio("./notes/" + i + ".wav");
    audios.push(audio);
}

// Create circle objects
for (let i = 0; i < 11; i++) {
    const circle = {
        ind: i,
        x: (i + 1) * canvas.width / 12,
        y: canvas.height / 2 + (Math.PI * 2) * (-30) * Math.sin(i * Math.PI / 5),
        radius: 25,
        scale: 1,
        audio: audios[i], // Assign preloaded audio
        playable: true,
        lastPlayedTime: 0,
        color: colors[i],
        ripple: {
            active: false,
            scale: 0.75,
            opacity: 1,
        },
    };

    circles.push(circle);
}

// Function to draw the circles
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        if (circle.ripple.active) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius * circle.ripple.scale, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(${circle.color}, ${circle.ripple.opacity})`;
            ctx.fill();
            updateRipple(circle);
        }

        // Draw main circles
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius * circle.scale, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${circle.color}, 1)`;
        ctx.fill();
    }
}

// Function to play the assigned WAV file
function playWav(circle) {
    if (!circle.playable) return;
    const currentTime = Date.now();
    if (currentTime - circle.lastPlayedTime >= 500) {
        circle.audio.currentTime = 0; // Reset the audio to the beginning
        circle.audio.play();
        circle.lastPlayedTime = currentTime;
    }
}

// The rest of your code for event listeners and animations remains the same
