import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = ({ color = "#2563eb", height = 40, width = 4, radius = 2, margin = 2, loading = true, className = "" }) => {
    return (
        <div className={`flex justify-center items-center w-full h-full ${className}`}>
            <ScaleLoader
                color={color}
                height={height}
                width={width}
                radius={radius}
                margin={margin}
                loading={loading}
            />
        </div>
    );
};

export default Loader;
