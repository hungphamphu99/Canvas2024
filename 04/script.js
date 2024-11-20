const ball = document.querySelector('.ball');
const container = document.querySelector('.container');

let g = 9.8; 
let initialHeight = 500; 
let position = initialHeight;
let velocity = 50; 
let interval = 60; 
let ground = 0; 
let energyLossFactor = 0.6; 

// Hàm cập nhật
function update() {
  // Tăng vận tốc do gia tốc trọng trường
  velocity += g * (interval / 1000); // v = g.t

  // Tính vị trí mới
  position -= velocity * (interval / 1000); // s = v.t

  // Kiểm tra chạm đất
  if (position <= ground) {
    position = ground; // Đặt lại vị trí bóng ở mặt đất

    // Tính năng lượng sau va chạm
    let kineticEnergy = (1 / 2) * velocity ** 2; // Động năng tại thời điểm chạm đất
    let remainingEnergy = kineticEnergy * energyLossFactor; // Năng lượng còn lại

    // Tính vận tốc phục hồi từ năng lượng còn lại
    velocity = Math.sqrt(2 * remainingEnergy); // v = sqrt(2 * E / m)

    // Đảo chiều vận tốc để bóng nảy lên
    velocity = -velocity;

    // Dừng khi năng lượng còn lại rất nhỏ
    if (remainingEnergy < 1) {
      position = ground;
      velocity = 0;
      return; // Ngừng cập nhật
    }
  }

  // Cập nhật vị trí bóng trong giao diện
  ball.style.bottom = `${position}px`;
}

// Chạy animation
setInterval(update, interval);
