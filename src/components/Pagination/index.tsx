import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Pagination.module.scss";

import { setCurrentPage } from "../../redux/slices/filterSlice";

export default function Pagination() {
  const dispatch = useDispatch();

  const changePage = (event: { selected: number }) => {
    dispatch(setCurrentPage(event.selected + 1));
  };

  return (
    <div className={styles.wrapper}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={changePage}
        pageRangeDisplayed={2}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
}
