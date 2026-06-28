const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const target = { x: 50, y: 150, width: 50, height: 20, speed: 3 };
const ball = { x: 300, y: 390, radius: 5, active: false };

function drawTarget() {
  ctx.fillStyle = 'red';
  ctx.fillRect(target.x, target.y, target.width, target.height);
}

function drawBall() {
  if (ball.active) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move target
  target.x += target.speed;
  if (target.x + target.width > canvas.width || target.x < 0) {
    target.speed *= -1;
  }

  // Move ball if active
  if (ball.active) {
    ball.y -= 5;
    if (ball.y < 0) ball.active = false;

    // Check collision with target
    if (
      ball.x > target.x &&
      ball.x < target.x + target.width &&
      ball.y > target.y &&
      ball.y < target.y + target.height
    ) {
      alert('🎯 Hit!');
      ball.active = false;
      ball.y = 390;
    }
  }

  drawTarget();
  drawBall();

  requestAnimationFrame(update);
}

// On canvas click - shoot ball from bottom center
canvas.addEventListener('click', () => {
  if (!ball.active) {
    ball.active = true;
    ball.x = canvas.width / 2;
    ball.y = 390;
  }
});

update();
