"use client"
import SimpleParallax from "simple-parallax-js";
import Banner from "./components/Banners/page";
import Navbar from "./components/Navbar/page";
import ListPost from "./components/Listpost/page";


export default function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <ListPost />
        </>
    )
}