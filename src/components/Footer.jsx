import { Link } from "react-scroll";
import {
  FaArrowUp,
  FaCopyright,
  FaFacebook,
  FaEnvelope,
  FaFacebookMessenger,
} from "react-icons/fa";
export const Footer = () => {
  return (
    <>
      <div className="bg-black text-white flex flex-col justify-center items-center gap-2 p-5">
        <div className="flex justify-center items-center gap-2">
          <FaCopyright className="fill-orange-700 lg:size-5 size-8" />
          <p>2025 Caffe Engineering, All Rights Reserved.</p>
        </div>
        <div className="text-white flex gap-4">
          <a href="https://www.facebook.com/caffeengineering" target="blank">
            <FaFacebook className="lg:size-5 size-8" />
          </a>
          <a href="mailto:caffeengineering.ladyros2021@gmail.com">
            <FaEnvelope className="lg:size-5 size-8" />
          </a>
          <a
            href="https://www.facebook.com/messages/t/311288022867857"
            target="blank"
          >
            <FaFacebookMessenger className="lg:size-5 size-8" />
          </a>
        </div>
      </div>
      <div
        id="icon-box"
        className="bg-orange-700 z-[100] text-white p-3 rounded-full hover:bg-orange-300 hover:text-black cursor-pointer fixed lg:bottom right-6 bottom-6 animate-bounce duration-1000"
      >
        <Link to="navbar" spy={true} offset={-100} smooth={true}>
          <FaArrowUp className="size-6" />
        </Link>
      </div>
    </>
  );
};
