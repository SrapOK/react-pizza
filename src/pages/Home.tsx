import React, { useState, useEffect } from "react";

import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";

interface IHomeProps {
  searchValue: string;
}

interface IPizzaBlock {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export default function Home({ searchValue }: IHomeProps) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryType, setCategoryType] = useState(0);
  const [currentPpage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    const category = `${categoryType > 0 ? `category=${categoryType}` : ""}`;
    const search = searchValue ? `&search=${searchValue}` : "";
    const sort = `&sortBy=${sortType.sortProperty}&order=desc`;
    const page = `page=${currentPpage}&limit=6`;

    fetch(
      `https://63cd36b40f1d5967f02bf10b.mockapi.io/items?${page}${category}${search}${sort}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryType, sortType, searchValue, currentPpage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  const pizzas = items.map((obj: IPizzaBlock) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryType}
          clickOnCategory={(id: number) => setCategoryType(id)}
        />
        <Sort sortType={sortType} clickOnSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination changePage={setCurrentPage} />
    </>
  );
}
