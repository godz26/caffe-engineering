import { useState } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Link } from "react-scroll";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleIsMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <nav
      id="navbar"
      className="flex justify-between items-center w-full bg-white text-black font-bold text-xl"
    >
      <div className="flex items-center ml-14 duration-500 hover:text-orange-700 cursor-pointer">
        <img
          className="w-20 mr-2"
          src="../../../assets/logo.png"
          alt="caffe logo"
        />
        <p>Caffe Engineering</p>
      </div>
      <div>
        <ul className="lg:flex justify-center items-center gap-6 mr-24 hidden">
          <li>
            <a className="p-2 hover:text-orange-700 duration-500" href="#about">
              About Us
            </a>
          </li>
          <li>
            <a
              className="p-2 hover:text-orange-700 duration-500"
              href="#services"
            >
              Services
            </a>
          </li>
          <li>
            <a
              className="p-2 hover:text-orange-700 duration-500"
              href="#projects"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              className="text-black font-normal border-2 duration-500 border-black rounded-xl py-1 px-4 hover:text-white hover:bg-orange-700"
              href="#contact"
            >
              Apply Now
            </a>
          </li>
        </ul>
        <div
          className="flex justify-between items-center lg:hidden mr-10"
          onClick={toggleIsMenu}
        >
          <div>
            {isMenuOpen ? (
              <FaXmark className="text-yellow-700 text-3xl cursor-pointer" />
            ) : (
              <FaBars className="text-yellow-700 text-3xl cursor-pointer" />
            )}
          </div>
        </div>
        <div
          className={`${isMenuOpen ? "flex" : "hidden"} w-full h-fit bg-white p-4 absolute top-[68px] left-0 z-50 lg:hidden`}
          onClick={closeMenu}
        >
          <ul className="flex flex-col justify-center items-center gap-2 w-full">
            <li>
              <a className="p-2 hover:text-orange-700" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a className="p-2 hover:text-orange-700" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="p-2 hover:text-orange-700" href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a
                className="text-black font-normal border-2 border-black rounded-xl py-1 px-4 hover:border-orange-700 hover:text-orange-700 "
                href="#contact"
              >
                Apply Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
