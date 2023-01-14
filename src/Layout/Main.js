import React from 'react';
import { Outlet } from "react-router-dom"
import Navbar from '../Components/Header/Navbar';

const Main = () => {
    return (
        <div className='container mx-auto w-[96%] md:w-[84%]'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;