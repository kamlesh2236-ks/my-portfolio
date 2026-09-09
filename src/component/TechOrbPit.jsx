import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import "./TechOrbPit.css";

import reactLogo from "../assets/react.svg";
import nodeLogo from "../assets/nodejs.svg";
import mongoLogo from "../assets/mongo.svg";
import expressLogo from "../assets/express.svg";
import githubLogo from "../assets/GitHub.svg";
import jsLogo from "../assets/JavaScript.svg";
import tsLogo from "../assets/TypeScript.svg";
import htmlLogo from "../assets/HTML5.svg";
import cssLogo from "../assets/CSS3.svg";
import tailwindLogo from "../assets/Tailwind CSS.svg";
import gitLogo from "../assets/Git.svg";
import phpLogo from "../assets/PHP.svg";
import mysqlLogo from "../assets/MySQL.svg";
import bootstrapLogo from "../assets/Bootstrap.svg";
import nextLogo from "../assets/Next.js.svg";
import dockerLogo from "../assets/Docker.svg";
import facebookLogo from "../assets/Facebook.svg";
import androidStudio from "../assets/Android Studio.svg";
import canvaLogo from "../assets/Canva.svg";
import cLogo from "../assets/C.svg";
import chromeLogo from "../assets/Chrome.svg";
import linkedinLogo from "../assets/LinkedIn.svg";
import postmanLogo from "../assets/Postman.svg";
import visualStudioLogo from "../assets/visualStudio.svg";
import viteJsLogo from "../assets/Vitejs.svg";


const LOGOS = [
    reactLogo, nodeLogo, mongoLogo, expressLogo, githubLogo,
    jsLogo, tsLogo, htmlLogo, cssLogo, tailwindLogo,
    gitLogo, phpLogo, mysqlLogo, bootstrapLogo, nextLogo, dockerLogo,
    facebookLogo, androidStudio, canvaLogo, cLogo, chromeLogo, linkedinLogo,
    postmanLogo, visualStudioLogo, viteJsLogo,
];

const TechOrbPit = ({ mouseRef }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [size, setSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const el = containerRef.current;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ w: Math.round(width), h: Math.round(height) });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!size.w || !size.h) return;

        const { Engine, World, Bodies, Body, Runner, Events, Common } = Matter;
        const { w: width, h: height } = size;

        const engine = Engine.create();
        engine.gravity.y = 0;
        engine.gravity.x = 0;
        const world = engine.world;

        const wallOpts = { isStatic: true, restitution: 0.2, render: { visible: false } };
        const walls = [
            Bodies.rectangle(width / 2, -20, width, 40, wallOpts),
            Bodies.rectangle(width / 2, height + 20, width, 40, wallOpts),
            Bodies.rectangle(-20, height / 2, 40, height, wallOpts),
            Bodies.rectangle(width + 20, height / 2, 40, height, wallOpts),
        ];
        World.add(world, walls);

        const balls = LOGOS.map((logo) => {
            const minRadius = Math.max(12, Math.min(24, width * 0.045));
            const maxRadius = Math.max(16, Math.min(32, width * 0.065));

            const r = Common.random(minRadius, maxRadius);
            const x = Common.random(r, width - r);
            const y = Common.random(r, height - r);
            const body = Bodies.circle(x, y, r, {
                mass: r / 20,
                friction: 0,
                frictionAir: 0.02,
            });
            body.plugin = { radius: r, logo };
            return body;
        });
        World.add(world, balls);

        const attractorRadius = Math.max(14, Math.min(34, width * 0.05));

        const attractorBody = Bodies.circle(
            width / 2,
            height / 2,
            attractorRadius,
            {
                isStatic: true,
            }
        );
        World.add(world, attractorBody);

        const runner = Runner.create();
        Runner.run(runner, engine);

        Events.on(engine, "afterUpdate", () => {
            const m = mouseRef.current;
            if (!m || !m.active) return;

            Body.translate(attractorBody, {
                x: (m.x - attractorBody.position.x) * 0.12,
                y: (m.y - attractorBody.position.y) * 0.12,
            });

            balls.forEach((body) => {
                const fx = (attractorBody.position.x - body.position.x) * 1e-6;
                const fy = (attractorBody.position.y - body.position.y) * 1e-6;
                Body.applyForce(body, body.position, { x: fx, y: fy });
            });
        });

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;

        const imgCache = {};
        LOGOS.forEach((src) => {
            const img = new Image();
            img.src = src;
            imgCache[src] = img;
        });

        let rafId;
        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            balls.forEach((body) => {
                const { radius: r, logo } = body.plugin;
                const img = imgCache[logo];
                ctx.save();
                ctx.translate(body.position.x, body.position.y);
                ctx.rotate(body.angle);
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = "rgba(255,255,255,0.06)";
                ctx.fill();
                ctx.save();
                ctx.clip();
                if (img.complete) ctx.drawImage(img, -r, -r, r * 2, r * 2);
                ctx.restore();
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = "rgba(255,255,255,0.15)";
                ctx.stroke();
                ctx.restore();
            });

            ctx.beginPath();
            ctx.arc(
                attractorBody.position.x,
                attractorBody.position.y,
                attractorRadius,
                0,
                Math.PI * 2
            ); ctx.fillStyle = "#050505";
            ctx.fill();

            rafId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(rafId);
            Runner.stop(runner);
            Engine.clear(engine);
            World.clear(world, false);
        };
    }, [size, mouseRef]);

    return (
        <div className="tech-orb-pit" ref={containerRef}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default TechOrbPit;