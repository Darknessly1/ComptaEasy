import React, { useState, useEffect, useRef } from 'react';

export default DropdownButton = ({ label, menuItems }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
  
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuOpen(false);
        }
      };
  
      document.addEventListener('click', handleOutsideClick);
  
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, []);
  
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  
    return (
      <div className="relative inline-block" ref={menuRef}>
        <button
          onClick={toggleMenu}
          data-ripple-light="true"
          data-popover-target={`menu-${label.toLowerCase()}`}
          className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          {label} Menu
        </button>
  
        {isMenuOpen && (
          <ul
            role="menu"
            data-popover={`menu-${label.toLowerCase()}`}
            data-popover-placement="bottom"
            className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
          >
            {menuItems.map((item, index) => (
              <li
                key={index}
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  