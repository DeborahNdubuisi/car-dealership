import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

const servicesList = [
  { name: "Car Sale", path: "/car-sale" },
  { name: "Car Rent", path: "/car-rent" },
  { name: "Car Lease", path: "/car-lease" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // mobile main menu
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // mobile expandable list
  const location = useLocation();
  const servicesRef = useRef(null);

  // close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // close services dropdown when clicking outside (desktop)
  useEffect(() => {
    function handleClick(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Background changes based on route
  const getBgColor = () => {
    switch (location.pathname) {
      case "/":
        return "bg-[#07182a]";
      case "/car-sale":
        return "bg-[#081f33]";
      case "/car-rent":
        return "bg-[#09263d]";
      case "/car-lease":
        return "bg-[#0b2942]";
      default:
        return "bg-[#07182a]";
    }
  };

  const bgClass = getBgColor();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all duration-500 ease-in-out ${bgClass} shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 relative">
            <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white font-bold">
              <svg
                width="18"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-95"
              >
                <path
                  d="M3 11L12 4l9 7"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 22V12h10v10"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-white font-semibold tracking-wide">
                CAR <span className="font-light">DEALERSHIP</span>
              </div>
            </div>
            <div className="absolute -bottom-1 left-0 w-14 h-1 bg-red-500 rounded" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors font-medium ${
                  isActive ? "text-red-400" : "text-white hover:text-red-300"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `transition-colors font-medium ${
                  isActive ? "text-red-400" : "text-white hover:text-red-300"
                }`
              }
            >
              About Us
            </NavLink>

            {/* Services dropdown wrapper */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              {/* trigger */}
              <button
                onClick={() => setServicesOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  servicesOpen
                    ? "text-red-400"
                    : "text-white hover:text-red-300"
                }`}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${
                    servicesOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M5 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* dropdown - positioned directly under trigger */}
              <div
                className={`absolute left-0 top-full mt-0 w-56 text-white rounded-b-lg shadow-xl border-t border-white/10 overflow-hidden transform transition duration-150 origin-top-left z-50
                  ${
                    servicesOpen
                      ? "opacity-100 scale-100 visible pointer-events-auto"
                      : "opacity-0 scale-95 invisible pointer-events-none"
                  }`}
                style={{
                  // inline fallback background; inner container uses exact bgClass
                  background: "rgba(7,24,42,0.98)",
                }}
              >
                <div className={`${bgClass} p-2`}>
                  <ul>
                    {servicesList.map((s) => (
                      <li key={s.path}>
                        <NavLink
                          to={s.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm transition-colors rounded ${
                              isActive
                                ? "text-red-400 font-semibold bg-white/5"
                                : "text-white hover:text-red-300 hover:bg-white/5"
                            }`
                          }
                          onClick={() => setServicesOpen(false)}
                        >
                          {s.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `transition-colors font-medium ${
                  isActive ? "text-red-400" : "text-white hover:text-red-300"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4 text-white/70">
            {[
              { icon: <FaFacebookF />, href: "/contact-us" },
              { icon: <FaInstagram />, href: "/contact-us" },
              { icon: <FaYoutube />, href: "/contact-us" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="hover:text-red-400 transition-transform duration-300 hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                // when opening mobile main menu, ensure mobile services collapsed
                setMenuOpen((s) => {
                  const next = !s;
                  if (!next) setMobileServicesOpen(false);
                  return next;
                });
              }}
              className="p-2 rounded border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/5 border-t border-white/5 transition-all">
          <div className="px-4 py-4 flex flex-col gap-3 text-white/90">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-1 ${isActive ? "text-red-400" : "hover:text-red-300"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `py-1 ${isActive ? "text-red-400" : "hover:text-red-300"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </NavLink>

            {/* Mobile expandable Services */}
            <div className=" pt-3 pb-2">
              <button
                onClick={() => setMobileServicesOpen((s) => !s)}
                className="w-full flex items-center justify-between text-left py-2 font-medium text-white hover:text-red-300"
                aria-expanded={mobileServicesOpen}
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    mobileServicesOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M5 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`mt-1 pl-4 transition-all ${
                  mobileServicesOpen ? "max-h-60" : "max-h-0 overflow-hidden"
                }`}
              >
                {servicesList.map((s) => (
                  <NavLink
                    key={s.path}
                    to={s.path}
                    className={({ isActive }) =>
                      `block py-2 text-sm ${
                        isActive
                          ? "text-red-400 font-semibold"
                          : "text-white/90 hover:text-red-300"
                      }`
                    }
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileServicesOpen(false); // ensure it closes
                    }}
                  >
                    {s.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                `py-1 ${isActive ? "text-red-400" : "hover:text-red-300"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
