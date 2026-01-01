import css from "./Filters.module.css";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import { fetchCategories, fetchWords } from "../../redux/filters/operations";

import {
  selectCategories,
  selectCategory,
  selectVerbType,
  selectQuery,
} from "../../redux/filters/selectors";

import { setCategory, setVerbType, setQuery } from "../../redux/filters/slice";

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
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
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
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className={css.input}
      />

      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {selectedCategory === "verb" && (
        <div className={css.verbOptions}>
          <label>
            <input
              type="radio"
              name="verbType"
              value="regular"
              checked={verbType === "regular"}
              onChange={handleVerbTypeChange}
              className={css.input}
            />
            Regular
          </label>

          <label>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              checked={verbType === "irregular"}
              onChange={handleVerbTypeChange}
            />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}
