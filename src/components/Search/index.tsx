import React, { useRef, useState, useCallback } from "react";
import { SearchContext } from "../../App";
import { useContext } from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import SearchSvg from "../../assets/img/search.svg";
import ClearSvg from "../../assets/img/clear.svg";

export default function Search() {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef: any = useRef();

  const clickOnClear = () => {
    setSearchValue("");
    setValue("");
    console.log(inputRef);
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.loupe} src={SearchSvg} alt="loupe" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder="Поиск пиццы"
      />
      {value && (
        <img
          onClick={() => clickOnClear()}
          className={styles.clear}
          src={ClearSvg}
          alt="clear input"
        />
      )}
    </div>
  );
}
