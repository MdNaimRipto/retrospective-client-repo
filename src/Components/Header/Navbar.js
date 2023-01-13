import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { AuthContext } from '../../ContextProvider/UserContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
            .then(() => {

            })
            .catch(err => console.error(err))
    }
    const navItems = <>
        {
            !user?.uid &&
            <>
                <li>
                    <Link to="/login" className='btn btn-primary btn-outline my-3 mr-3'>
                        login
                    </Link>
                </li>
                <li>
                    <Link to="/register" className='btn btn-primary btn-outline'>
                        Register
                    </Link>
                </li>
            </>
        }
        {
            user?.uid &&
            <div className="dropdown dropdown-end hidden lg:block">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.photoURL} alt="UserImage" referrerPolicy="no-referrer" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-52 ">
                    <li>
                        <button className='btn bg-[#FFFFFF] btn-disabled mb-3 mx-auto'>
                            {user?.displayName}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className='mx-auto btn btn-outline btn-primary'>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        }
    </>
    return (
        <div className="navbar bg-base-100 py-6 border-b border-gray-300 font-semibold">
            <div className="navbar-start flex-row-reverse justify-between items-center w-full">
                <div className='flex items-center'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    {
                        user?.uid &&
                        <div className="dropdown dropdown-end lg:hidden block">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="UserImage" referrerPolicy="no-referrer" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-52 ">
                                <li>
                                    <button className='btn bg-[#FFFFFF] btn-disabled mb-3 mx-auto'>
                                        {user?.displayName}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className='mx-auto btn btn-outline btn-primary'>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
                <Link to="/" className="text-xl lg:text-3xl">Retrospective</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 lg:w-full lg:flex items-center justify-evenly">
                    {navItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;