"use client"
import { IconType } from "react-icons/lib";
import Logo2 from "./Logo2";
import {FaInstagram, FaGithub, FaLinkedinIn, FaTwitter} from "react-icons/fa"
const links = [FaGithub, FaInstagram, FaLinkedinIn, FaTwitter]

const IconContainer = (props:{icon:IconType}) => {
    return <props.icon size={25} className="cursor-pointer" />
}

const Footer = () => {
    return (
        <section className="bg-orange-200 w-full h-full" >
            <hr className="p-3" />
            <div className="flex flex-col p-20 xs:gap-8 md:gap-6 " >
                <div className="flex md:flex-row xs:flex-col md:justify-between xs:justify-center items-center " >
                    <div>
                        <Logo2/>
                    </div>
                    <div className="flex p-2 gap-6 " >
                        {links.map((item) => (
                            <IconContainer icon={item} key={item.toString()} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;