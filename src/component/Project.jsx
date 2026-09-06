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
  const platformRef = useRef(null);

  useLayoutEffect(() => {

    const section = sectionRef.current;
    const platform = platformRef.current;

    if (!section || !platform) return;

    const stages = section.querySelectorAll(".project-stage");

    if (!stages.length) return;

    const movePlatform = (stage) => {

      const sectionRect =
        section.getBoundingClientRect();

      const stageRect =
        stage.getBoundingClientRect();

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


    // Initial position
    const firstPosition =
      movePlatform(stages[0]);

    gsap.set(platform, {
      x: firstPosition.x,
      y: firstPosition.y,
    });


    // Create movement for every project
    stages.forEach((stage, index) => {

      if (index === 0) return;

      ScrollTrigger.create({

        trigger: stage,

        start: "top 70%",
        end: "top 25%",

        scrub: 1.5,

        onUpdate: (self) => {
          const previousStage = stages[index - 1];
          const currentStage = stages[index];

          const previous = movePlatform(previousStage);
          const current = movePlatform(currentStage);

          const x = gsap.utils.interpolate(
            previous.x,
            current.x,
            self.progress
          );

          const y = gsap.utils.interpolate(
            previous.y,
            current.y,
            self.progress
          );

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

    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      ScrollTrigger.getAll().forEach(
        trigger => trigger.kill()
      );

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


      {/* SINGLE MOVING PLATFORM */}

      <img
        ref={platformRef}
        src={skillPlatform}
        className="scroll-platform"
        alt=""
      />
    </section>
  );
};

export default Projects;