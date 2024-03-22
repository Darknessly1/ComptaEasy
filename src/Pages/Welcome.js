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

          <div class="flex items-center justify-center p-5">
            <div class="rounded-lg p-5">
              <div class="flex">
                <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                  <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none absolute w-5 fill-gray-500 transition">
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                  </svg>
                </div>
                <input type="text" class="w-full max-w-[560px] bg-white pl-2 font-semibold outline-0 text-black" placeholder="" id="" />
                  <input type="button" value="Search" class="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg  font-semibold hover:bg-blue-800 transition-colors"/>
                  </div>
              </div>
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