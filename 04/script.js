const ball = document.getElementById('ball');
const container = document.getElementById('container');

let gravity = 9.8; // Acceleration due to gravity (m/s^2)
let bounceEfficiency = 0.7; // Energy retained after each bounce
let velocity = 0; // Initial velocity
let position = container.clientHeight - ball.offsetHeight; // Start at the top
let isFalling = true;
let animationFrame;

// Set the ball at the top of the container initially
ball.style.bottom = `${position}px`;

function updateBallPosition() {
  if (isFalling) {
    velocity += gravity * 0.016; // Increase velocity with gravity (16ms/frame)
    position -= velocity;

    if (position <= 0) {
      // Ball hits the ground
      position = 0;
      velocity = -velocity * bounceEfficiency; // Reverse velocity with bounce efficiency
      if (Math.abs(velocity) < 1) {
        // Stop bouncing if velocity is too low
        cancelAnimationFrame(animationFrame);
        return;
      }
    }
  } else {
    // Ball rising
    velocity -= gravity * 0.016; // Decrease velocity
    position -= velocity;

    if (velocity > 0) {
      isFalling = true;
    }
  }

  // Update ball position
  ball.style.bottom = `${position}px`;
  animationFrame = requestAnimationFrame(updateBallPosition);
}

// Start the animation
updateBallPosition();
