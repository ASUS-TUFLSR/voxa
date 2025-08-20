"use client";
import { IconType } from "react-icons/lib";
import Logo2 from "./Logo2";
import { FaInstagram, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const links = [FaGithub, FaInstagram, FaLinkedinIn, FaTwitter];

const IconContainer = (props: { icon: IconType }) => {
  return (
    <props.icon
      size={28}
      className="cursor-pointer text-red-800 hover:text-red-600 transition-colors duration-200"
    />
  );
};

const Footer = () => {
  return (
    <section className="bg-orange-200 w-full">
      {/* Top Border */}
      <hr className="h-2 bg-red-900 border-none" />

      <div className="flex flex-col px-6 py-12 md:px-20 md:py-16 gap-10">
        {/* Logo + Social Links */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
          {/* Logo */}
          <Logo2 />

          {/* Social Links */}
          <div className="flex gap-6">
            {links.map((item) => (
              <IconContainer icon={item} key={item.name} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-800/40 w-full" />

        {/* Copyright */}
        <div className="flex justify-center">
          <p className="md:text-lg sm:text-base text-sm text-red-900 flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <span>All Rights Reserved —</span>
            <span className="font-bold">Voxa</span>
            <span>...</span>
          </p>
        </div>
      </div>

      {/* Bottom Border */}
      <hr className="h-2 bg-red-900 border-none" />
    </section>
  );
};

export default Footer;
