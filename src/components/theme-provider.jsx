import { ThemeProviderContext } from "@/contexts/ThemeProviderContext";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, defaultTheme = "light", storageKey = "vite-ui-theme", ...props }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem(storageKey) || defaultTheme;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.add("light");
        }
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider value={value} {...props}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
