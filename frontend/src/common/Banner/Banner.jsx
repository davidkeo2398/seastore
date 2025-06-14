import React, { useEffect, useState } from "react";
import "./Banner.css";

const banners = [
  {
    image:
      "https://tepbac.com/upload/advertiment/ge_image/2025/05/tepbac-tai-tro-2025-05_1747042886.png",
    title: "Big Summer Sale!",
    desc: "Up to 50% off on selected products. Shop now!",
  },
  {
    image:
    "https://binhphuoc.gov.vn/uploads/binhphuoc/news/2022_11/nuoi-trong-thuy-san.png",
    title: "New Arrivals",
    desc: "Check out the latest gadgets and accessories.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6r89XSTtRN_dkAlX8rQWgDYd1-DomyN7dIQ&s",
    title: "Exclusive Deals",
    desc: "Special discounts for members only.",
  },
  {
    image:
      "https://www.phaplyvatruyenthong.vn/uploads/news/size800/news1/9/822-nhan-chuyen-nhuong-dien-tich-dat-nuoi-trong-thuy-san-co-bi-phap-luat-cam-khong.png",
    title: "Tech Trends 2024",
    desc: "Discover the hottest tech trends of the year.",
  },
];

export default function Banner() {
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [bgIndex]);

  // Fade effect
  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setBgIndex((prev) => (prev + 1) % banners.length);
      setFade(true);
    }, 1500);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setBgIndex((prev) => (prev - 1 + banners.length) % banners.length);
      setFade(true);
    }, 500);
  };

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
      className={`banner${fade ? " fade-in" : " fade-out"}`}
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
