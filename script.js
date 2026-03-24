// Pong Game in JavaScript

// Set up the canvas
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Get the displayed size of the canvas
const displayWidth = canvas.clientWidth;
const displayHeight = canvas.clientHeight;

// Set the internal resolution (game logic uses this)
canvas.width = displayWidth;
canvas.height = displayHeight;

// Create the paddle
const paddleWidth = 10, paddleHeight = 100;
let player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#00f', dy: 0 };
let computer = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#f00', dy: 0 };

// Create the ball
const ballSize = 10;
let ball = { x: canvas.width / 2, y: canvas.height / 2, size: ballSize, speed: 4, dx: 4, dy: 4, color: '#0f0' };

// Initialize the score
let playerScore = 0, computerScore = 0;

// Move paddles
function movePaddles() {
    player.y += player.dy;
    computer.y += computer.dy;
    // Prevent paddles from going out of bounds
    if(player.y < 0) player.y = 0;
    if(player.y + paddleHeight > canvas.height) player.y = canvas.height - paddleHeight;
    if(computer.y < 0) computer.y = 0;
    if(computer.y + paddleHeight > canvas.height) computer.y = canvas.height - paddleHeight;
}

// Draw paddles and ball
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw player paddle
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
    // Draw computer paddle
    context.fillStyle = computer.color;
    context.fillRect(computer.x, computer.y, computer.width, computer.height);
    // Draw ball
    context.fillStyle = ball.color;
    context.fillRect(ball.x, ball.y, ball.size, ball.size);
}

// Update the game
function update() {
    // Move paddles
    movePaddles();
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top/bottom
    if(ball.y + ball.size > canvas.height || ball.y < 0) {
        ball.dy *= -1;
    }
    // Ball collision with paddles
    if(ball.x < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx *= -1;
    }
    if(ball.x + ball.size > computer.x && ball.y > computer.y && ball.y < computer.y + computer.height) {
        ball.dx *= -1;
    }
    // Scoring
    if(ball.x < 0) {
        computerScore++;
        resetBall();
    }
    if(ball.x > canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Reset ball position and speed
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = 4 * (Math.random() < 0.5 ? 1 : -1);
}

// Control paddles
function control(event) {
    switch(event.key) {
        case "ArrowUp":
            player.dy = -8;
            break;
        case "ArrowDown":
            player.dy = 8;
            break;
    }
}

// Stop moving when key is released
function stopControl(event) {
    switch(event.key) {
        case "ArrowUp":
        case "ArrowDown":
            player.dy = 0;
            break;
    }
}

// Computer AI
function ai() {
    if(ball.dy < 0) {
        computer.y -= 4;
    } else {
        computer.y += 4;
    }
}

// Game loop
function gameLoop() {
    ai();
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', control);
document.addEventListener('keyup', stopControl);

// Start the game
gameLoop();

// Display score
setInterval(() => {
    console.log(`Player: ${playerScore} - Computer: ${computerScore}`);
}, 1000);
// Update score display
function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Call updateScore whenever the ball is reset
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
    ball.dy = 4 * (Math.random() < 0.5 ? 1 : -1);
    updateScore();
}
