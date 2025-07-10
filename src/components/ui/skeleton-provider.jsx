import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const SkeletonProvider = ({ children }) => {
    const baseColor = "#FEE2E2";
    const highlightColor = "#FECACA";

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor} duration={2}>
            {children}
        </SkeletonTheme>
    );
};

export default SkeletonProvider;
