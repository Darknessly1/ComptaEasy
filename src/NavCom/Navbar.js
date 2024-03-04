import React from 'react';
import { Button } from "@material-tailwind/react";


const Navbar = () => {
  return (
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

        <a href="#" className="hover:underline">
          <Button variant="gradient" className="rounded-full no-underline">
            Home
          </Button>
        </a>

        <a href="/Pages/About.js" className="hover:underline">
          <Button variant="gradient" className="rounded-full">
            About
          </Button>
        </a>
        <a href="#" className="hover:underline">
          <Button variant="gradient" className="rounded-full">
            Contact
          </Button>
        </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
