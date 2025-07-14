import { Search01Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

const SearchBar = ({ value, onChange, placeholder, className = "" }) => {
    return (
        <div className="flex items-center gap-2 bg-base-white border border-card-border-prim rounded-md px-4 py-2 focus-within:ring-1 focus-within:ring-card-br-hover transition w-full">
            <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-gray-medium" />
            <input
                type="text"
                className={`flex-1 outline-none bg-transparent text-base text-black-base placeholder-gray-medium ${className}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-label="Search"
            />
        </div>
    );
};

export default SearchBar;
