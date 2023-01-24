import React, { useState } from "react";

interface ICategoriesProps {
  categoryId: number;
  clickOnCategory: (id: number) => void;
}

export default function Categories({
  categoryId,
  clickOnCategory,
}: ICategoriesProps) {
  const categories = ["Все", "Мясные", "Вегетарианская", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={i}
              onClick={() => clickOnCategory(i)}
              className={categoryId === i ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
