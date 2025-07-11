import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./layouts/Authentication/AuthProvider";
import SkeletonProvider from "./components/ui/skeleton-provider";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <SkeletonProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </SkeletonProvider>
        </ThemeProvider>
        <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </StrictMode>
);
