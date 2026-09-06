import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    IconMail,
    IconPhone,
    IconMapPin,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
    IconArrowUpRight,
    IconCheck,
} from "@tabler/icons-react";

import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);


const socialLinks = [
    { label: "GitHub", href: "https://github.com/", icon: IconBrandGithub },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: IconBrandLinkedin },
    { label: "X", href: "https://x.com/", icon: IconBrandX },
];


const Contact = () => {

    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const headingRef = useRef(null);
    const infoRef = useRef(null);
    const formCardRef = useRef(null);
    const fieldsRef = useRef([]);
    const buttonRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("idle"); // idle | sending | sent


    fieldsRef.current = [];

    const addFieldRef = (el) => {
        if (el && !fieldsRef.current.includes(el)) {
            fieldsRef.current.push(el);
        }
    };


    useEffect(() => {

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            tl.fromTo(
                lineRef.current,
                { scaleY: 0 },
                { scaleY: 1, duration: 0.6, ease: "power2.out", transformOrigin: "top" }
            )
                .fromTo(
                    headingRef.current,
                    { opacity: 0, y: 18, scale: 0.94 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
                    "-=0.15"
                )
                .fromTo(
                    infoRef.current,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.25"
                )
                .fromTo(
                    formCardRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
                    "<"
                )
                .fromTo(
                    fieldsRef.current,
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => ctx.revert();

    }, []);


    useEffect(() => {

        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3" });

        const handleMove = (e) => {
            const rect = button.getBoundingClientRect();
            xTo((e.clientX - (rect.left + rect.width / 2)) * 0.25);
            yTo((e.clientY - (rect.top + rect.height / 2)) * 0.35);
        };

        const handleLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", handleMove);
        button.addEventListener("mouseleave", handleLeave);

        return () => {
            button.removeEventListener("mousemove", handleMove);
            button.removeEventListener("mouseleave", handleLeave);
        };

    }, [status]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {

        e.preventDefault();
        if (status === "sending") return;

        setStatus("sending");

        gsap.to(buttonRef.current, {
            scale: 0.96,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
        });

        setTimeout(() => {

            setStatus("sent");

            gsap.fromTo(
                ".contact-success",
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );

        }, 1200);

    };


    return (

        <section className="contact-section" ref={sectionRef}>

            <div className="contact-heading-wrap">
                <div className="contact-heading-line" ref={lineRef}></div>
                <h2 ref={headingRef}>Let's Connect</h2>
            </div>

            <div className="contact-grid">

                <div className="contact-info" ref={infoRef}>

                    <ul className="contact-details">

                        <li>
                            <IconMail size={20} stroke={1.5} />
                            <a href="mailto:kamleshkumar223678@gmail.com">kamleshkumar223678@gmail.com</a>
                        </li>

                        <li>
                            <IconPhone size={20} stroke={1.5} />
                            <span>+91 8084124525</span>
                        </li>

                        <li>
                            <IconMapPin size={20} stroke={1.5} />
                            <span>Patna, Bihar, India</span>
                        </li>

                    </ul>

                    <div className="contact-socials">

                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                key = { social.label }
                                    href = { social.href }
                            target = "_blank"
                            rel = "noreferrer"
                            className = "contact-social-link"
                                >
                                <Icon size={18} stroke={1.5} />
                            { social.label }
                                </a>
                    );
                        })}

                </div>

            </div>

            <div className="contact-form-card" ref={formCardRef}>

                {status === "sent" ? (

                    <div className="contact-success">
                        <IconCheck size={40} stroke={1.5} />
                        <h3>Message sent</h3>
                        <p>Thanks for reaching out — I'll get back to you soon.</p>
                    </div>

                ) : (

                    <form onSubmit={handleSubmit}>

                        <div className="contact-form-row">

                            <div className="contact-field" ref={addFieldRef}>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="contact-field" ref={addFieldRef}>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="contact-field" ref={addFieldRef}>
                            <label htmlFor="subject">Subject</label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact-field" ref={addFieldRef}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="contact-submit"
                            ref={buttonRef}
                            disabled={status === "sending"}
                        >
                            {status === "sending" ? "Sending..." : "Send message"}
                            <IconArrowUpRight size={18} stroke={2} />
                        </button>

                    </form>

                )}

            </div>

        </div>

        </section >

    );

};


export default Contact;