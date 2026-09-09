import React, { useEffect, useState } from "react";
import {
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";

import { testimonials } from "../data/testimonials";

import "./testimonial.css";


const getInitials = (name) => {

    if (!name) return "";

    const parts = name.trim().split(/\s+/);

    if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }

    return parts[0].slice(0, 2).toUpperCase();

};


const Testimonial = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(null);
    const [direction, setDirection] = useState("next");
    const [isAnimating, setIsAnimating] = useState(false);
    const [isEntering, setIsEntering] = useState(false);

    const ANIMATION_DURATION = 1100;


    const getNextIndex = () => {
        return activeIndex === testimonials.length - 1
            ? 0
            : activeIndex + 1;
    };


    const getPreviousIndex = () => {
        return activeIndex === 0
            ? testimonials.length - 1
            : activeIndex - 1;
    };


    const startTransition = (index, slideDirection) => {

        if (isAnimating) return;
        if (index === activeIndex) return;

        setNextIndex(index);
        setDirection(slideDirection);
        setIsAnimating(true);
        setIsEntering(false);

        setTimeout(() => {

            setActiveIndex(index);
            setNextIndex(null);
            setIsAnimating(false);
            setIsEntering(false);

        }, ANIMATION_DURATION);

    };


    const nextSlide = () => {
        startTransition(getNextIndex(), "next");
    };


    const previousSlide = () => {
        startTransition(getPreviousIndex(), "prev");
    };


    const goToSlide = (index) => {

        if (index === activeIndex) return;

        const slideDirection = index > activeIndex ? "next" : "prev";

        startTransition(index, slideDirection);

    };


    useEffect(() => {

        if (nextIndex === null) return;

        let raf1, raf2;

        raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
                setIsEntering(true);
            });
        });

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
        };

    }, [nextIndex]);


    useEffect(() => {

        if (isAnimating) return;

        const timer = setTimeout(() => {
            nextSlide();
        }, 6000);

        return () => clearTimeout(timer);

    }, [activeIndex, isAnimating]);


    const currentTestimonial = testimonials[activeIndex];
    const incomingTestimonial =
        nextIndex !== null ? testimonials[nextIndex] : null;


    return (

        <section className="testimonial-section">

            <div className="testimonial-heading-wrap">
                <div className="testimonial-heading-line"></div>
                <h2>What my clients are saying?</h2>
            </div>

            <div className="testimonial-slider">

                <button
                    className="testimonial-arrow testimonial-arrow-left"
                    onClick={previousSlide}
                    disabled={isAnimating}
                    aria-label="Previous testimonial"
                >
                    <IconChevronLeft size={42} stroke={1.5} />
                </button>

                <div className="testimonial-card-stage">

                    <div
                        key={activeIndex}
                        className={`
                            testimonial-card
                            testimonial-current
                            ${isAnimating
                                ? direction === "next" ? "exit-left" : "exit-right"
                                : ""
                            }
                        `}
                    >
                        <TestimonialContent testimonial={currentTestimonial} />
                    </div>

                    {incomingTestimonial && (
                        <div
                            key={nextIndex}
                            className={`
                                testimonial-card
                                testimonial-incoming
                                ${direction === "next" ? "enter-from-right" : "enter-from-left"}
                                ${isEntering ? "enter-active" : ""}
                            `}
                        >
                            <TestimonialContent testimonial={incomingTestimonial} />
                        </div>
                    )}

                </div>

                <button
                    className="testimonial-arrow testimonial-arrow-right"
                    onClick={nextSlide}
                    disabled={isAnimating}
                    aria-label="Next testimonial"
                >
                    <IconChevronRight size={42} stroke={1.5} />
                </button>

            </div>

            <div className="testimonial-dots">

                {testimonials.map((item, index) => (
                    <button
                        key={item.id}
                        className={`testimonial-dot ${index === activeIndex ? "active" : ""}`}
                        onClick={() => goToSlide(index)}
                        disabled={isAnimating}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}

            </div>

        </section>

    );

};


const TestimonialContent = ({ testimonial }) => {

    const [imageError, setImageError] = useState(false);

    const showImage = testimonial.image && !imageError;

    const initials = getInitials(testimonial.name);

    return (

        <div className="testimonial-inner">

            <div className="testimonial-image-wrap">
                {showImage ? (
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="testimonial-image"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="testimonial-image testimonial-image-fallback">
                        {initials}
                    </div>
                )}
            </div>

            <div className="testimonial-content">

                <p className="testimonial-message">
                    "{testimonial.message}"
                </p>

                <div className="testimonial-author">
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.role}</span>
                </div>

            </div>

        </div>

    );

};


export default Testimonial;