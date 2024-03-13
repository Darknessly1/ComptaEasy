import React from 'react';
import {
    Button,
} from "@material-tailwind/react";

const Welcome = () => {
  return (
    <>
    <div className="h-screen flex items-center  justify-center flex-col min-h-screen bg-gray-700/50 m-4">
      <div className="text-white text-center">
        <h1 className="text-7xl font-bold mb-4 not-italic hover:italic">Welcome to ComtaEasy</h1>
        <p className="text-xl mb-8 font-bold">
          Your go-to platform for accounting information and resources.
        </p>

        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            placeholder="Search for accounting topics..."
            className="p-2 border border-double border-green rounded-l w-64 focus:outline-none"
          />
          <Button className=" text-black p-2 m-2 rounded-r" color="amber">
            Search
          </Button>
        </div>

        <p className="h2 text-xl font-bold">
          Not sure where to start? Explore our curated content or use the search
          bar to find specific topics.
        </p>
      </div>
    </div>
    
    </>
  );
};

export default Welcome;
