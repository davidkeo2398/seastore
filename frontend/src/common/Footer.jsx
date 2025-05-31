import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <h3>Khách hàng</h3>
          <p>Quyên tại Nghĩa vụ ngõd mua</p>
          <p>Quy định đổi trả</p>
          <p>Phương thức thanh toán</p>
          <p>Góp ý khiếu nại</p>
          <p>Tài vụ dùng</p>
        </div>
        <div className="footer-section hours">
          <h3>Hộ trợ</h3>
          <p>Gọi mua: 0866 159 422 (7:30 - 21:00)</p>
          <p>Ký thưu: 0866 156 422 (9:00 - 18:00)</p>
          <p>Đăng bán: 0866 154 422 (9:00 - 18:00)</p>
          <p>Khieu nại: 0866 803 772 (7:30 - 21:00)</p>
          <p>Bảo hành: 0866 803 772 (9:00 - 18:00)</p>
        </div>
        <div className="footer-section review">
          <h3>Kênh review</h3>
          <p>Youtube</p>
          <p>Tiktok</p>
          <p>Facebook</p>
        </div>
        <div className="footer-section logo">
          <div className="logo-container">
            <img
              src="https://placehold.co/150x150?text=Farmext"
              alt="Farmext Logo"
              className="footer-logo"
            />
            <p>Đã đăng ký với Bộ Công Thương</p>
            <img
              src="https://via.placeholder.com/50?text=Verified"
              alt="Verified"
              className="verified-icon"
            />
          </div>
          <div className="app-links">
            <p>Đăng kêt nối với nhà tiêu nhàn hàng</p>
            <div className="app-icons">
              <img
                src="https://via.placeholder.com/30?text=Android"
                alt="Android"
                className="app-icon"
              />
              <img
                src="https://via.placeholder.com/30?text=iOS"
                alt="iOS"
                className="app-icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Farmext eShop - Sản phẩm mai diền tư thương, thực ăn, con giống và chởo trai nuôi thủy sản</p>
        <p>Sản phẩm mai diền tư đàu vào cho ngành thủy sản đàu tiên ở Việt Nam</p>
        <p>Đầu vào chăt lượng, đổi thông thương họi thủy sản!</p>
        <div className="zalo-icon">
          <img
            src="https://via.placeholder.com/40?text=Zalo"
            alt="Zalo"
            className="zalo-logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;