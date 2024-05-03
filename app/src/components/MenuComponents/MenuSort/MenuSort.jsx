import React from "react";
import "./MenuSort.css";

const MenuSort = ({ handleSortOrder }) => {
  return (
    <div>
      <select
        className="menu__sort"
        name="menu_sort"
        id="menu_sort"
        onChange={(event) => handleSortOrder(event.target.value)}
      >
        <option value="price-asc">Price - Ascending</option>
        <option value="price-desc">Price - Descending</option>
        <option value="name-asc">Name - Ascending</option>
        <option value="name-desc">Name - Descending</option>
      </select>
    </div>
  );
};

export default MenuSort;
