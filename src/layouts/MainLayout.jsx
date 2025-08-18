import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div>
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="flex flex-col min-h-max py-12 bg-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;
