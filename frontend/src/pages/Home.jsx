import React from "react";
import "../css/home.css";
import ProductList from "@/common/ProductList";
import CategoriesList from "@/common/Categories/CategoriesList";
import Banner from "@/common/Banner/Banner";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Apple's latest flagship smartphone with A17 chip.",
    price: 1199,
    rate: 4.8,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    description: "The newest Galaxy with advanced AI camera.",
    price: 999,
    rate: 4.7,
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-s921bzadmea/gallery/levant-galaxy-s24-s921-sm-s921bzadmea-537982982?$650_519_PNG$",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling headphones.",
    price: 399,
    rate: 4.9,
    image: "https://cdn.sony.com/image/sony-wh-1000xm5-black.png",
  },
  {
    id: 4,
    name: "MacBook Air M3",
    description: "Ultra-thin laptop with Apple M3 chip.",
    price: 1299,
    rate: 4.95,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-13-midnight-gallery1-202402?wid=2000&hei=1536&fmt=jpeg&qlt=90&.v=1707348936757",
  },
  {
    id: 5,
    name: "Dell XPS 13",
    description: "Compact and powerful ultrabook from Dell.",
    price: 1099,
    rate: 4.7,
    image:
      "https://i.dell.com/sites/csimages/Video_Imagery/all/xps-13-9310-laptop-campaign-hero-504x350-ng.psd",
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    description: "Latest Apple Watch with advanced health features.",
    price: 499,
    rate: 4.8,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQKX3_VW_34FR+watch-case-45-alum-silver-nc-9s_VW_34FR_WF_CO_GEO_US?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1693186741448",
  },
];

export default function Home() {
  return (
    <div className="home-container" >
      <Banner />
      <CategoriesList />
      <ProductList products={products} />
      
    </div>
  );
}
