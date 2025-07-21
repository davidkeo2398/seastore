// tạo mã code order
module.exports = {
  // Hàm để tạo mã code dựa trên ngày giờ hiện tại
  generateCode: (date) => {
    const now = new Date();
    // 2. Ghép nối các thành phần thời gian lại với nhau

    const code = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(now.getDate()).padStart(2, "0")}${String(
      now.getHours()
    ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
      now.getSeconds()
    ).padStart(2, "0")}${String(now.getMilliseconds()).padStart(3, "0")}`;

    return code;
  },
};
