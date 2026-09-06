import React from "react";
import {
    IconBrandLinkedin,
    IconBrandX,
    IconBrandInstagram,
    IconMail,
    IconBrandGithub,
} from "@tabler/icons-react";
import nameLogo from "../assets/blackname.svg";
import namelogo2 from "../assets/whitename.svg";

import "./Footer.css";


const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/in/kamlesh-kumar-763367299", icon: IconBrandLinkedin },
    { label: "X", href: "https://x.com/", icon: IconBrandX },
    { label: "Instagram", href: "https://instagram.com/kumar_k_ks", icon: IconBrandInstagram },
    { label: "Email", href: "mailto:kamleshkumar223678@gmail.com", icon: IconMail },
    { label: "GitHub", href: "github.com/kamlesh2236-ks", icon: IconBrandGithub },
];


const Footer = () => {

    const year = new Date().getFullYear();

    return (

        <footer className="site-footer">

            <div className="footer-inner">

                <p className="footer-copy">
                    Kumar &copy; {year}
                </p>

                <div className="footer-logo-wrap">
                    <span className="footer-logo-glow"></span>
                    {/* replace src with your own SVG logo */}
                    <img
                        src={nameLogo}
                        alt="Kumar logo"
                        className="footer-logo"
                    />
                </div>

                <div className="footer-socials">

                    {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label= { social.label }
                                className = "footer-social-link"
                            >
                            <Icon size={19} stroke={1.6} />
                            </a>
                );
                    })}

            </div>

        </div>

        </footer >

    );

};


export default Footer;