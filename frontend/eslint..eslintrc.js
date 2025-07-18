module.exports = {
  // ... các cấu hình khác của bạn (ví dụ: 'extends: ["react-app"]')
  extends: [
    // ... các extends khác
    'prettier', // Quan trọng: Luôn đặt 'prettier' ở cuối cùng!
  ],
  rules: {
    // Tại đây bạn có thể thêm các quy tắc về "nội dung" của ESLint
    // Ví dụ:
    'no-unused-vars': 'warn', // Cảnh báo khi có biến không được dùng
    'no-console': 'off',      // Cho phép dùng console.log
  },
};