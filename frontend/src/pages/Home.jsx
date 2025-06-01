import React from "react";
import "../css/home.css";
import ProductList from "@/pages/ProductList";
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
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling headphones.",
    price: 399,
    rate: 4.9,
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
  },
  {
    id: 4,
    name: "MacBook Air M3",
    description: "Ultra-thin laptop with Apple M3 chip.",
    price: 1299,
    rate: 4.95,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
  },
  {
    id: 5,
    name: "Dell XPS 13",
    description: "Compact and powerful ultrabook from Dell.",
    price: 1099,
    rate: 4.7,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    description: "Latest Apple Watch with advanced health features.",
    price: 499,
    rate: 4.8,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
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
