import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import Routing from '../Routing/Routing';
// import ProfileMenu from '../Elements/ProfileMenu';


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggleDropdown1 = () => {
    setIsOpen1((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-transparent p-4 text-white no-underline  ">

        <div className="container mx-auto flex justify-between items-center">

          <div className="font-bold text-xl">
            <a href='/'>
              <Button variant="rounded-full" className="rounded-full no-underline text-xl">
                Compta Easy
              </Button>
            </a>
          </div>

          <div className="space-x-4">

            <a href="/News" className="hover:underline">
              <Button variant="gradient" className="rounded-full no-underline">
                News
              </Button>
            </a>

            <a href='/Calc'>
              <Button>
                Calculate
              </Button>
            </a>


            <div className="relative inline-block text-left">
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="text-white bg-gray-700/60 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                variant="rounded-full"
                onClick={handleToggleDropdown1}
              >
                Tools
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isOpen1 && (
                <div
                  id="dropdownDivider"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <a href="/Booking" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Booking
                      </a>
                    </li>

                  </ul>

                </div>
              )}
            </div>

            <div className="relative inline-block text-left">
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="text-white bg-gray-700/60 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                variant="rounded-full"
                onClick={handleToggleDropdown}
              >
                Information
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  id="dropdownDivider"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <a href="/About" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        About
                      </a>
                    </li>

                    <li>
                      <a href="/Contact" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Contact
                      </a>
                    </li>

                  </ul>

                </div>
              )}
            </div>





            {/* should be a if condiciont, if the user didn't singup it will shouw him the sing up
              if he's a usr it will the following be appear in his page <ProfileMenu /> */}

            <a href="/Login" className="hover:underline">
              <Button className="rounded-full">
                Sign Up
              </Button>
            </a>

            {/* <a className="hover:underline">
              <Button className="w-fit">
                <ProfileMenu />
              </Button>
            </a> */}

          </div>
        </div>
      </nav>

      <Routing />

    </>
  );
};

export default Navbar;
