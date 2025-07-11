import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const themes = ["light", "dark",];

    const handleThemeChange = () => {
        const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(newTheme);
    };
    return (
        <span className="bg-popover text-popover-foreground w-fit rounded-full flex justify-center items-center m-2 p-2">
            <button className="cursor-pointer" onClick={handleThemeChange}>
                {theme === "dark" && (
                    <h1>
                        <Moon></Moon>
                    </h1>
                )}
                {theme === "light" && (
                    <h1>
                        <Sun></Sun>
                    </h1>
                )}
            </button>
        </span>
    );
};

export default ThemeToggle;
