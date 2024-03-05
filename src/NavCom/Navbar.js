import React from 'react';
import { Button } from "@material-tailwind/react";
import Routing from '../Routing/Routing';
import ChipsProfile from '../Elements/ChipsProfile';


const Navbar = () => {
  return (
    <>
    <nav className="bg-transparent p-4 text-white no-underline  ">

      <div className="container mx-auto flex justify-between items-center">

        <div className="font-bold text-xl">
          <a href='/Welcome'>
            <Button variant="rounded-full" className="rounded-full no-underline text-xl">
              Compta Easy
            </Button>
          </a>  
        </div>

        <div className="space-x-4">

        <a href="/Home" className="hover:underline">
          <Button variant="gradient" className="rounded-full no-underline">
            Home
          </Button>
        </a>

        <a href="/About" className="hover:underline">
          <Button variant="gradient" className="rounded-full">
            About
          </Button>
        </a>

        <a href="/Contact" className="hover:underline">
          <Button variant="gradient" className="rounded-full">
            Contact
          </Button>
        </a>
        <a href="/Contact" className="hover:underline">
          <Button className="rounded-full">
            <ChipsProfile />
          </Button>
        </a>

        </div>
      </div>
    </nav>

    <Routing />

    </>
  );
};

export default Navbar;
