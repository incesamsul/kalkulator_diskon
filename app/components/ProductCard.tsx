import React from "react";
import AddToCart from "./Add ToCart";
import styles from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <main>
      <div className="bg-[#f5f5f5] p-5 rounded-lg">
        <AddToCart />
      </div>
    </main>
  );
};

export default ProductCard;
