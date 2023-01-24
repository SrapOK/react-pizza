import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

interface IPagination {
  changePage: (pageNumber: number) => void;
}

export default function Pagination({ changePage }: IPagination) {
  return (
    <div className={styles.wrapper}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => changePage(event.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
}
