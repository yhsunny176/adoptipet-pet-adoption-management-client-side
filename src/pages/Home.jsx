import Banner from "@/components/banner/Banner";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router";

const Home = () => {
    return (
        <div>
            <Banner />
        </div>
    );
};

export default Home;
