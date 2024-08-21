import React from "react";
import "./MenuSort.css";

export interface SortOption {
  value: string;
  label: string;
}

export interface SortProps {
  handleSortOrder: (category: string) => void;
  options: SortOption[];
  value: string;
  name: string;
}

const MenuSort = ({ handleSortOrder, options, value, name }: SortProps) => {
  return (
    <div>
      <select
        className="menu__sort"
        name={name}
        id={name}
        value={value}
        onChange={(event) => handleSortOrder(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MenuSort;
