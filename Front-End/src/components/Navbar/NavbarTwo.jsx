import { ArrowDown, X, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarTwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileDropdown = (id) => {
    setMobileDropdownOpen((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-md" : "bg-green-600"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center text-white">
              <span className="font-bold text-xl">MyBrand</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  to={item.path}
                  className="py-2 px-3 text-white hover:text-gray-300 transition"
                >
                  {item.title}
                </Link>
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible transition z-10">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        to={dropdownItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {dropdownItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-2">
          {navItems.map((item) => (
            <div key={item.id} className="border-b border-gray-700 py-2">
              <div
                onClick={() =>
                  item.dropdown ? toggleMobileDropdown(item.id) : setIsOpen(false)
                }
                className="flex justify-between items-center cursor-pointer"
              >
                <Link to={item.path} className="text-white block">
                  {item.title}
                </Link>
                {item.dropdown && (
                  <ArrowDown
                    className={`transition-transform duration-300 ${
                      mobileDropdownOpen === item.id ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                )}
              </div>

              {item.dropdown && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileDropdownOpen === item.id ? "max-h-40" : "max-h-0"
                  } pl-4`}
                >
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.id}
                      to={dropdownItem.path}
                      className="block py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      {dropdownItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavbarTwo;
