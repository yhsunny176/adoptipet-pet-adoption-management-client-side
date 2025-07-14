import React from "react";
import Select from "react-select";
import { petCategoryOptions } from "@/utils/pet_categories";

const CategorySelect = ({
    value,
    onChange,
    placeholder = "Select category",
    options = petCategoryOptions,
    isClearable = true,
}) => {
    return (
        <Select
            className="w-full"
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isClearable={isClearable}
            styles={{
                control: (base) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    borderColor: "#e5e7eb",
                    minHeight: "46px",
                    boxShadow: "none",
                    cursor: "pointer",
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? "#f43f5e" : state.isFocused ? "#fda4af" : undefined,
                    color: state.isSelected ? "#fff" : "#1f2937",
                }),
            }}
        />
    );
};

export default CategorySelect;
