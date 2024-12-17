const canvas = document.getElementById('pendulumCanvas');
const ctx = canvas.getContext('2d');

// Tham số con lắc
const L = 200;   // Chiều dài dây con lắc (px)
const g = 9.8;   // Gia tốc trọng trường (m/s^2)
const alpha = Math.PI / 4;  // Góc ban đầu (radian)

let t = 0;         // Thời gian (s)
const dt = 0.05;   // Bước thời gian (s)

let theta = alpha;       // Góc ban đầu
let thetaDot = 0;        // Vận tốc góc ban đầu (rad/s)

// Hàm tính gia tốc góc
function calcAcceleration(theta) {
    return - (g / L) * Math.sin(theta);
}

// Hàm vẽ con lắc
function drawPendulum() {
    const x = L * Math.sin(theta) + canvas.width / 2;
    const y = L * Math.cos(theta) + 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ dây con lắc
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 100);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Vẽ quả con lắc
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
}

// Hàm cập nhật trạng thái con lắc
function updatePendulum() {
    const acceleration = calcAcceleration(theta);   // Tính gia tốc
    thetaDot += acceleration * dt;                 // Cập nhật vận tốc
    theta += thetaDot * dt;                        // Cập nhật góc

    drawPendulum();
}

// Hàm chạy mô phỏng
function animate() {
    updatePendulum();
    t += dt;
    requestAnimationFrame(animate);
}

// Bắt đầu mô phỏng
animate();
