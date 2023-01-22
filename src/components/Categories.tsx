import React, { useState } from "react";

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = ["Все", "Мясные", "Вегетарианская", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={i}
              onClick={() => setActiveIndex(i)}
              className={activeIndex === i ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
