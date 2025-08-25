import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sample navigation data - in a real app this would likely come from an API
  const navItems = [
    {
      id: 1,
      title: "Home",
      path: "/",
      dropdown: null,
    },
    {
      id: 2,
      title: "Products",
      path: "/products",
      dropdown: [
        { id: 21, title: "Electronics", path: "/products/electronics" },
        { id: 22, title: "Clothing", path: "/products/clothing" },
        { id: 23, title: "Books", path: "/products/books" },
      ],
    },
    {
      id: 3,
      title: "Services",
      path: "/services",
      dropdown: [
        { id: 31, title: "Consulting", path: "/services/consulting" },
        { id: 32, title: "Development", path: "/services/development" },
        { id: 33, title: "Support", path: "/services/support" },
      ],
    },
    {
      id: 4,
      title: "About",
      path: "/about",
      dropdown: null,
    },
    {
      id: 5,
      title: "Contact",
      path: "/contact",
      dropdown: null,
    },
  ];

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-white">
                <span className="font-bold text-xl">MyBrand</span>
              </Link>
            </div>

            {/* Primary Nav for Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <Link
                    to={item.path}
                    className="py-5 px-3 text-white hover:text-gray-300 transition duration-300">
                    {item.title}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible transition duration-150 ease-in-out z-10">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.id}
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        {navItems.map((item) => (
          <div key={item.id} className="relative">
            <Link
              to={item.path}
              className="block py-2 px-4 text-sm text-white hover:bg-gray-700">
              {item.title}
            </Link>

            {/* Mobile Dropdown - Expanded on click rather than hover for mobile */}
            {item.dropdown && (
              <div className="pl-4 bg-gray-700">
                {item.dropdown.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.id}
                    to={dropdownItem.path}
                    className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600">
                    {dropdownItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
