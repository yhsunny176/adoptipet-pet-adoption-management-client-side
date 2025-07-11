import Footer from "@/components/navbar/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div>
            <header className="py-8 bg-background-secondary">
                <nav className="max-w-full lg:max-w-7xl xl:max-w-9/12 mx-auto">
                    <Navbar />
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;
