import React from "react";
import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col mt-52">
      <main className="flex-grow">{/* Your page content goes here */}</main>
      <footer className="bg-black py-16 px-10 text-gray-300">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-[#41A4FF]">
            React With Nest JS
          </h3>
          <p className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio non
            nemo veniam, natus accusantium. Praesentium, doloribus mollitia
            dignissimos similique optio
          </p>
          <div className="flex justify-start gap-10 my-6">
            <FaWhatsappSquare size={30} />
            <FaFacebookSquare size={30} />
            <FaInstagramSquare size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
