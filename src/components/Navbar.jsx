import React, { useState } from 'react';
import { Links } from "./constants/Links";
import { Outlet, Link } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="sm:hidden">
                {/* Hamburger menu icon */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="block text-[#D83F31] hover:text-red-700 p-2 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <>
                                <rect width="24" height="2" rx="1" ry="1" />
                                <rect y="8" width="24" height="2" rx="1" ry="1" />
                                <rect y="16" width="24" height="2" rx="1" ry="1" />
                            </>
                        ) : (
                            <>
                                <path
                                    fillRule="evenodd"
                                    d="M2 4a1 1 0 0 1 2 0h16a1 1 0 0 1 0 2H4a1 1 0 0 1-2 0zM2 11a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 7a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H2z"
                                />
                            </>
                        )}
                    </svg>

                </button>
            </div>

            <ul
                className={`${menuOpen
                        ? 'flex flex-col md:flex sm:justify-between sm:flex-row'
                        : 'flex-row sm:flex md:flex xsm:hidden justify-between'
                    } font-bold mt-0 p-2 rounded-xl bg-[#F5FCCD] shadow-lg text-[#D83F31]  md:flex-row  md:justify-around lg:flex-row`}
            >
                {Links.map((li, index) => (
                    <li
                        key={index}
                        className={`cursor-pointer p-2 hover:rounded-xl hover:shadow-lg hover:bg-white`}
                    >
                        <Link to={li.Link}>{li.title}</Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </>
    );
}

export default Navbar;
