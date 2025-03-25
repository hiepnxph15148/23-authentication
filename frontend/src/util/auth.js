import { redirect } from 'react-router-dom';

// Tính toán thời gian còn lại của token
export function getTokenDuration() {
  // Lấy thời gian hết hạn của token từ localStorage
  const storedExpirationDate = localStorage.getItem('expiration');
  
  // Chuyển đổi chuỗi thời gian thành đối tượng Date
  const expirationDate = new Date(storedExpirationDate);
  
  // Lấy thời gian hiện tại
  const now = new Date();
  
  // Tính khoảng thời gian còn lại bằng cách lấy thời gian hết hạn trừ đi thời gian hiện tại
  // Kết quả trả về là số milliseconds
  const duration = expirationDate.getTime() - now.getTime();
  
  return duration;
}

// Lấy token xác thực từ localStorage và kiểm tra tính hợp lệ
export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

// Hàm loader để lấy token bảo vệ route
export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

// Kiểm tra xem người dùng đã xác thực chưa, chuyển hướng đến trang auth nếu chưa
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}