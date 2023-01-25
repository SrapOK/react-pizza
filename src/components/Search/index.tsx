import React from "react";
import { SearchContext } from "../../App";
import { useContext } from "react";

import styles from "./Search.module.scss";
import SearchSvg from "../../assets/img/search.svg";
import ClearSvg from "../../assets/img/clear.svg";

export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <img className={styles.loupe} src={SearchSvg} alt="loupe" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Поиск пиццы"
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          className={styles.clear}
          src={ClearSvg}
          alt="clear input"
        />
      )}
    </div>
  );
}
