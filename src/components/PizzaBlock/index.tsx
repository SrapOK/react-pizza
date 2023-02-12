import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPizza } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";

import { addCartItem } from "../../redux/slices/cartSlice";

interface IPizzaBlockProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export default function PizzaBlock({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}: IPizzaBlockProps) {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeName = ["тонкое", "традиционное"];

  const pizzas = useSelector((state: RootState) => state.cartSlice.items);
  const getCount = (): number => {
    let count = 0;
    for (const obj of pizzas) {
      if (id == obj.id) count += obj.count;
    }
    return count;
  };

  const count = getCount();

  const dispatch = useDispatch();

  const clickOnAdd = () => {
    const item: IPizza = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: typeName[activeType],
      count: 1,
    };

    dispatch(addCartItem(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setActiveType(type)}
              className={activeType === type ? "active" : ""}
            >
              {typeName[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price}</div>
        <button
          onClick={clickOnAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
}
