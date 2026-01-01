import css from "./Filters.module.css";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Select from "react-select";

import { fetchCategories, fetchWords } from "../../redux/filters/operations";

import {
  selectCategories,
  selectCategory,
  selectVerbType,
  selectQuery,
} from "../../redux/filters/selectors";

import { setCategory, setVerbType, setQuery } from "../../redux/filters/slice";
import "./Filter.css";
import Icon from "../Icon/Icon";

export default function Filters() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectCategory);
  const verbType = useSelector(selectVerbType);
  const query = useSelector(selectQuery);

  // Load categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value, category, verbType) => {
      dispatch(
        fetchWords({
          category,
          verbType,
          query: value.trim(),
        })
      );
    }, 300),
    []
  );

  const options = categories.map((c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1),
  }));

  const selectedOption = options.find((opt) => opt.value === selectedCategory);

  // Handle text input
  const handleInputChange = (e) => {
    const value = e.target.value.trimStart();
    dispatch(setQuery(value));

    // If query empty — fetch by category only
    if (!value.trim()) {
      dispatch(
        fetchWords({
          category: selectedCategory,
          verbType,
          query: "",
        })
      );
      return;
    }

    debouncedSearch(value, selectedCategory, verbType);
  };

  // Category change
  const handleCategoryChange = (option) => {
    const newCategory = option.value;

    dispatch(setCategory(newCategory));

    dispatch(
      fetchWords({
        category: newCategory,
        verbType: newCategory === "verb" ? verbType : null,
        query,
      })
    );
  };

  // Verb type change
  const handleVerbTypeChange = (e) => {
    const type = e.target.value;
    dispatch(setVerbType(type));

    dispatch(
      fetchWords({
        category: "verb",
        verbType: type,
        query,
      })
    );
  };

  return (
    <div className={css.filters}>
      <div className={css.inputCont}>
        <input
          type="text"
          placeholder="Find the word"
          value={query}
          onChange={handleInputChange}
          className={css.input}
        />
        <Icon className={css.iconSearch} name="search" size={20} />
      </div>

      {/* <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className={css.input}
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select> */}

      <Select
        unstyled
        value={selectedOption}
        onChange={handleCategoryChange}
        options={options}
        isSearchable={false}
        className={css.reactSelectContainer}
        classNamePrefix="custom"
      />

      {selectedCategory === "verb" && (
        <div className={css.verbOptions}>
          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              value="regular"
              checked={verbType === "regular"}
              onChange={handleVerbTypeChange}
              className={css.radio}
            />
            Regular
          </label>

          <label className={css.radioLabel}>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              checked={verbType === "irregular"}
              onChange={handleVerbTypeChange}
              className={css.radio}
            />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}
