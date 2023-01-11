import React from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {
    const navItems = <>
        <li>
            <Link to="/home" className='text-center btn btn-secondary border border-current'>Home</Link>
        </li>
        <li>
            <button className='btn btn-primary btn-outline my-3'>
                login
            </button>
        </li>
        <li>
            <button className='btn btn-primary btn-outline'>
                Register
            </button>
        </li>
    </>
    return (
        <div className="navbar bg-base-100 py-6 border-b border-gray-300 font-semibold">
            <div className="navbar-start flex-row-reverse justify-between items-center w-full">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="text-xl lg:text-3xl">Retrospective</Link>
            </div>
            <div className="navbar-center hidden lg:flex lg:w-[28%]">
                <ul className="menu menu-horizontal px-1 lg:w-full lg:flex items-center justify-evenly">
                    {navItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;