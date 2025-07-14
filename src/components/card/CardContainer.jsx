import React from "react";

const CardContainer = ({ children }) => {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">{children}</div>;
};

export default CardContainer;
