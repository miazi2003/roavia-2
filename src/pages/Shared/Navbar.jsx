import React from "react";
import { NavLink } from "react-router"; 
import useAuth from "../../hook/useAuth";
import logo from "../../assets/logo.png";

// Desktop links: Bright white for active, slightly faded for inactive to create depth
const navLinkClass = ({ isActive }) =>
  isActive
    ? "relative font-semibold text-white after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-[2px] after:bg-white after:rounded-full transition-all duration-300"
    : "relative font-medium text-white/70 hover:text-white after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-white/50 after:rounded-full after:transition-all after:duration-300 transition-colors duration-200";

// Mobile/Dropdown links: Dark green text on a white background for perfect readability
const mobileNavLinkClass = ({ isActive }) =>
  isActive
    ? "font-semibold text-[#3B4E42] bg-[#3B4E42]/10 rounded-lg px-3 py-2 block"
    : "font-medium text-gray-600 hover:text-[#3B4E42] hover:bg-[#3B4E42]/5 rounded-lg px-3 py-2 block transition-colors";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  return (
    // The main background using your exact hex color
    <header className="sticky top-0 z-50 bg-[#3B4E42] shadow-lg transition-all duration-300">
      <div className="navbar  mx-auto px-4 lg:px-16 h-20">
        
        {/* Navbar Start (Logo & Mobile Menu) */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white hover:bg-white/10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            
            {/* Mobile Dropdown (Clean White) */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[60] p-4 shadow-2xl bg-white rounded-2xl w-64 border border-gray-100 gap-2">
              <li><NavLink to="/" className={mobileNavLinkClass}>Home</NavLink></li>
              {user && (
                <>
                  <li><NavLink to="/community" className={mobileNavLinkClass}>Community</NavLink></li>
                  <li><NavLink to="/allPackages" className={mobileNavLinkClass}>Trips</NavLink></li>
                  <li><NavLink to="/dashBoard/profile" className={mobileNavLinkClass}>Dashboard</NavLink></li>
                </>
              )}
              <li><NavLink to="/about" className={mobileNavLinkClass}>About Us</NavLink></li>
              {!user && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                  <NavLink to="/signIn" className="btn btn-outline border-[#3B4E42] text-[#3B4E42] hover:bg-[#3B4E42] hover:text-white hover:border-[#3B4E42] w-full rounded-full">Sign In</NavLink>
                  <NavLink to="/signUp" className="btn bg-[#3B4E42] border-none text-white hover:bg-[#2c3b32] w-full rounded-full shadow-md">Sign Up</NavLink>
                </div>
              )}
            </ul>
          </div>
          
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity ml-2 lg:ml-0">
            {/* brightness-0 invert forces the logo to be solid white */}
            <img src={logo} alt="ROAVIA Logo" className="w-10 h-10 object-contain brightness-0 invert" /> 
            <span className="text-2xl font-black tracking-widest text-white hidden sm:block">
              ROA<span className="text-white/60">VIA</span>
            </span>
          </NavLink>
        </div>

        {/* Navbar Center (Desktop Links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8 px-1">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            {user && (
              <>
                <li><NavLink to="/community" className={navLinkClass}>Community</NavLink></li>
                <li><NavLink to="/allPackages" className={navLinkClass}>Trips</NavLink></li>
                <li><NavLink to="/dashBoard/profile" className={navLinkClass}>Dashboard</NavLink></li>
              </>
            )}
            <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
          </ul>
        </div>

        {/* Navbar End (Auth Buttons & Profile) */}
        <div className="navbar-end space-x-3">
          {!user ? (
            <div className="hidden sm:flex items-center gap-3">
              <NavLink to="/signIn">
                <button className="px-5 py-2.5 text-sm font-semibold text-white bg-transparent hover:bg-white/10 rounded-full transition-all duration-300">
                  Sign In
                </button>
              </NavLink>
              <NavLink to="/signUp">
                <button className="px-6 py-2.5 text-sm font-bold text-[#3B4E42] bg-white hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Sign Up
                </button>
              </NavLink>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-white/50 ring-offset-2 ring-offset-[#3B4E42] hover:ring-white transition-all">
                <div className="w-10 rounded-full bg-white">
                  <img src={user?.photoURL || "/default-avatar.png"} alt="User Avatar" />
                </div>
              </div>
              
              {/* Profile Dropdown (Clean White) */}
              <ul tabIndex={0} className="mt-4 z-[60] p-3 shadow-2xl menu menu-sm dropdown-content bg-white border border-gray-100 rounded-2xl w-64 text-gray-700">
                <li className="text-center p-3 border-b border-gray-100 mb-2">
                  <span className="font-bold text-[#3B4E42] text-base">{user?.displayName || "Adventurer"}</span>
                  <span className="text-xs text-gray-500 mt-1">{user?.email}</span>
                </li>
                {user && (
                  <li>
                    <NavLink to="/dashBoard/profile" className="hover:bg-[#3B4E42]/10 hover:text-[#3B4E42] font-medium rounded-lg py-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/offers" className="hover:bg-[#3B4E42]/10 hover:text-[#3B4E42] font-medium rounded-lg py-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                    Offer Announcements
                  </NavLink>
                </li>
                <li className="mt-2">
                  <button onClick={signOutUser} className="text-red-500 hover:bg-red-50 hover:text-red-600 font-medium rounded-lg py-2.5 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Navbar;