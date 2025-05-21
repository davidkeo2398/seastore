import React, { useEffect, useState } from "react";
import "./Banner.css";

const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    title: "Big Summer Sale!",
    desc: "Up to 50% off on selected products. Shop now!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    title: "New Arrivals",
    desc: "Check out the latest gadgets and accessories.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    title: "Exclusive Deals",
    desc: "Special discounts for members only.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
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
