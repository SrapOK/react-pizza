import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

import {
  selectCategoryType,
  selectSortType,
  selectCurrentPage,
  setCategoryType,
} from "../redux/slices/filterSlice";

interface IPizzaBlock {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export default function Home() {
  const categoryType = useSelector(selectCategoryType);
  const sortType = useSelector(selectSortType);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue, setSearchValue } = useContext(SearchContext);

  const clickOnCategory = (id: number) => {
    dispatch(setCategoryType(id));
  };

  useEffect(() => {
    setIsLoading(true);
    const category = `${categoryType > 0 ? `&category=${categoryType}` : ""}`;
    const search = searchValue ? `&search=${searchValue}` : "";
    const sort = `&sortBy=${sortType.sortProperty}&order=desc`;
    const page = `page=${currentPage}&limit=6`;

    axios
      .get(
        `https://63cd36b40f1d5967f02bf10b.mockapi.io/items?${page}${category}${search}${sort}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryType, sortType, searchValue, currentPage]);

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
          clickOnCategory={clickOnCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </>
  );
}
