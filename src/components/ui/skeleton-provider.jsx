import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const SkeletonProvider = ({ children }) => {
    const baseColor = "#e0e7ef";
    const highlightColor = "#f5f7fa";

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor} duration={2}>
            {children}
        </SkeletonTheme>
    );
};

export default SkeletonProvider;
