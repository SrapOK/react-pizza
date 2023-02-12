import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import PizzaBlock from "../components/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

import {
  selectCategoryType,
  selectSortType,
  selectCurrentPage,
  setCategoryType,
  setFilters,
  ISortType,
} from "../redux/slices/filterSlice";

export interface IPizzaBlock {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export default function Home() {
  const categoryType = useSelector(selectCategoryType);
  const sortType: ISortType = useSelector(selectSortType);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearching = useRef(false);
  const isMounted = useRef(false);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue, setSearchValue } = useContext(SearchContext);

  const clickOnCategory = (id: number) => {
    dispatch(setCategoryType(id));
  };

  const getPizzas = async () => {
    setIsLoading(true);
    const category = `${categoryType > 0 ? `&category=${categoryType}` : ""}`;
    const search = searchValue ? `&search=${searchValue}` : "";
    const sort = `&sortBy=${sortType.sortProperty}&order=desc`;
    const page = `page=${currentPage}&limit=6`;

    try {
      const res = await axios.get(
        `https://63cd36b40f1d5967f02bf10b.mockapi.io/items?${page}${category}${search}${sort}`
      );
      setItems(res.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sortType: sort,
        })
      );
      isSearching.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearching.current) {
      getPizzas();
    }

    isSearching.current = false;
  }, [categoryType, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryType,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
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
