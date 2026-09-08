import React, { useLayoutEffect, useRef } from "react";
import "./project.css";
import { projects } from "../data/project";
import ProjectCard from "../component/ProjectCard";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import skillPlatform from "../assets/skill_platform_light_on.svg";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {

  const sectionRef = useRef(null);
  const platformRef = useRef(null); // WRAPPER (rig) — platform image + light dono isi ke andar

  useLayoutEffect(() => {

    const section = sectionRef.current;
    const platform = platformRef.current;

    if (!section || !platform) return;

    const stages = section.querySelectorAll(".project-stage");

    if (!stages.length) return;

    const movePlatform = (stage) => {

      const sectionRect = section.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      const x =
        stageRect.left -
        sectionRect.left +
        stageRect.width / 2 -
        platform.offsetWidth / 2;

      const y =
        stageRect.top -
        sectionRect.top +
        stageRect.height / 2 -
        platform.offsetHeight / 2;

      return { x, y };
    };


    // Initial position — pehle stage ke paas, light ON (koi transition nahi ho rahi)
    const firstPosition = movePlatform(stages[0]);

    gsap.set(platform, {
      x: firstPosition.x,
      y: firstPosition.y,
    });

    platform.classList.remove("is-scrolling");


    stages.forEach((stage, index) => {

      if (index === 0) return;

      ScrollTrigger.create({

        trigger: stage,

        start: "top 70%",
        end: "top 25%",

        scrub: 1.5,

        // Transition shuru → light OFF
        onEnter: () => platform.classList.add("is-scrolling"),
        onEnterBack: () => platform.classList.add("is-scrolling"),

        // Transition khatam, platform stage pe settle → light ON
        onLeave: () => platform.classList.remove("is-scrolling"),
        onLeaveBack: () => platform.classList.remove("is-scrolling"),

        onUpdate: (self) => {
          const previousStage = stages[index - 1];
          const currentStage = stages[index];

          const previous = movePlatform(previousStage);
          const current = movePlatform(currentStage);

          const x = gsap.utils.interpolate(previous.x, current.x, self.progress);
          const y = gsap.utils.interpolate(previous.y, current.y, self.progress);

          gsap.to(platform, {
            x,
            y,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        },

      });

    });


    ScrollTrigger.refresh();


    // Resize par position recalculate
    const handleResize = () => {
      const position = movePlatform(stages[0]);

      gsap.set(platform, {
        x: position.x,
        y: position.y,
      });

      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);


  return (
    <section className="project-section" ref={sectionRef}>

      <div className="head-container">
        <h1>Our Latest Work</h1>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>

      {/* SINGLE MOVING PLATFORM + ITS LIGHT — sab saath move karte hain */}
      <div ref={platformRef} className="platform-rig">

        <div className="platform-flare"></div>

        <div className="beam-source">
          <span className="hard-beam b1"></span>
          <span className="hard-beam b2"></span>
          <span className="hard-beam b3"></span>
          <span className="hard-beam b4"></span>
          <span className="hard-beam b5"></span>
        </div>

        <div className="light-particles">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <img
          src={skillPlatform}
          className="scroll-platform"
          alt=""
        />

      </div>

    </section>
  );
};

export default Projects;