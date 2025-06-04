import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact">
          <h3>Khách hàng</h3>
          <p>Quyền và nghĩa vụ của người mua</p>
          <p>Quy định đổi trả</p>
          <p>Phương thức thanh toán</p>
          <p>Góp ý khiếu nại</p>
        </div>
        <div className="footer-section hours">
          <h3>Hỗ trợ</h3>
          <p>Gọi mua: 0866 159 422 (7:30 - 21:00)</p>
          <p>Đăng bán: 0866 154 422 (9:00 - 18:00)</p>
          <p>Khiếu nại: 0866 803 772 (7:30 - 21:00)</p>
          <p>Bảo hành: 0866 803 772 (9:00 - 18:00)</p>
        </div>
        <div className="footer-section review">
          <h3>Kênh review</h3>
          <p>Youtube</p>
          <p>Tiktok</p>
          <p>Facebook</p>
        </div>
        <div className="footer-section logo">
          <div className="logo-container flex flex-col items-center text-bold
            text-2xl">
            <h3>Farmext Shop</h3>
            <img
              src="/images/whale_5729775.png"
              alt="Farmext Logo"
              className="footer-logo"
            />
            
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Farmext eShop - Sản phẩm mai diền tư thương, thực ăn, con giống và chởo trai nuôi thủy sản</p>
        <p>Sản phẩm mai diền tư đàu vào cho ngành thủy sản đàu tiên ở Việt Nam</p>
        <p>Đầu vào chăt lượng, đổi thông thương họi thủy sản!</p>
        
      </div>
    </footer>
  );
};

export default Footer;