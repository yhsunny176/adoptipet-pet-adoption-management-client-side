import Error from "@/components/Error";
import React from "react";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-primary">
            <Error />
        </div>
    );
};

export default ErrorPage;
