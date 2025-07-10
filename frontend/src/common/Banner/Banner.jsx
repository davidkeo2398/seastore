import React, { useEffect, useState } from "react";
import "./Banner.css";

const banners = [
  {
    image:
      "https://tepbac.com/upload/advertiment/ge_image/2025/05/tepbac-tai-tro-2025-05_1747042886.png",
    title: "Ưu Đãi Mùa Hè Thủy Sản!",
    desc: "Giảm giá lên đến 50% cho các sản phẩm thủy sản. Mua ngay!",
  },
  {
    image:
      "https://binhphuoc.gov.vn/uploads/binhphuoc/news/2022_11/nuoi-trong-thuy-san.png",
    title: "Sản Phẩm Thủy Sản Mới",
    desc: "Khám phá các sản phẩm thủy sản mới nhất của chúng tôi.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6r89XSTtRN_dkAlX8rQWgDYd1-DomyN7dIQ&s",
    title: "Ưu Đãi Đặc Biệt Cho Đại Lý",
    desc: "Nhận ưu đãi độc quyền dành riêng cho các đại lý thủy sản.",
  },
  {
    image:
      "https://www.phaplyvatruyenthong.vn/uploads/news/size800/news1/9/822-nhan-chuyen-nhuong-dien-tich-dat-nuoi-trong-thuy-san-co-bi-phap-luat-cam-khong.png",
    title: "Xu Hướng Nuôi Trồng Thủy Sản 2025",
    desc: "Khám phá các xu hướng nuôi trồng thủy sản nổi bật trong năm nay.",
  },
];

export default function Banner() {
  const [bgIndex, setBgIndex] = useState(0);// banner hiện tại mặc định là 0
  const [fade, setFade] = useState(true);// mờ, banner hiện tại đang hiển thị

  // tg chuyển
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
    // xóa interval khi component bị unmount
  }, [bgIndex]);

  //auto +
  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setBgIndex((prev) => (prev + 1) % banners.length);
      setFade(true);
    }, 100);
  };
  
  //mannaual -
  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setBgIndex((prev) => (prev - 1 + banners.length) % banners.length);
      setFade(true);
    }, 500);
  };

  // dấu chấm ở banner
  const handleDotClick = (idx) => {
    if (idx === bgIndex) return;
    setFade(false);
    setTimeout(() => {
      setBgIndex(idx);
      setFade(true);
    }, 500);
  };

  return (
    <div
      className={`banner${fade ? " fade-in" : " fade-out"}`} // t: mờ dần, f: mất đi
      style={{ backgroundImage: `url('${banners[bgIndex].image}')` }}
    >
      <div className="banner-blur"></div>
      {/* Arrow left */}
      <button
        className="banner-arrow left"
        onClick={handlePrev}
        aria-label="Previous"
      >
        &#8592;
      </button>
      {/* Arrow right */}
      <button
        className="banner-arrow right"
        onClick={handleNext}
        aria-label="Next"
      >
        &#8594;
      </button>
      <div className="banner-content">
        <h2 className="banner-title">{banners[bgIndex].title}</h2>
        <p className="banner-desc">{banners[bgIndex].desc}</p>
      </div>
      {/* Dots */}
      <div className="banner-dots">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`banner-dot${idx === bgIndex ? " active" : ""}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
