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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GSAPScrollSmoother from "./components/GSAPScrollSmoother";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GSAPScrollSmoother />
        <SkeletonProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </SkeletonProvider>
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
