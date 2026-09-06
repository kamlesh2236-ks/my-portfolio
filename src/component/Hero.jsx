import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/theme.context";
import { gsap } from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";

import { IconSun, IconMoon, IconArrowNarrowRight } from "@tabler/icons-react";

import "./Hero.css";

import blackName from "../assets/blackname.svg";
import lightNameImg from "../assets/whitename.svg";

import reactSvg from "../assets/react.svg";
import nodeSvg from "../assets/nodejs.svg";
import mongoSvg from "../assets/mongo.svg";
import expressSvg from "../assets/express.svg";
import blackimg from "../assets/blackmy.png"

import TechOrbPit from "./TechOrbPit";

const Hero = () => {
  const { theme, toggleTheme } = useTheme();

  const imageRef = useRef(null);

  const [isaboutOpen, setisAboutOpen] = useState(false);

  const heroRef = useRef(null);
  const textWrapRef = useRef(null);
  const glowRef = useRef(null);
  const avatarRef = useRef(null);

  const mouseRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });

  const quickRefs = useRef({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        ".name",
        {
          x: -120,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
      )

        .fromTo(
          ".name-logo svg",
          {
            y: -80,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.65",
        )

        .fromTo(
          ".role",
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55",
        )

        .fromTo(
          ".about-me-button",
          {
            y: 25,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.4)",
          },
          "-=0.45",
        );
    });

    return () => ctx.revert();
  }, []);

  /* =====================================================
     LOGO INTRO
  ===================================================== */

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "bounce.out",
      },
    );
  }, []);

  useEffect(() => {
    if (!isaboutOpen) return;

    gsap.fromTo(
      ".about-modal",
      {
        x: "-100%",
        opacity: 0,
      },
      {
        x: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
    );
  }, [isaboutOpen]);

  /* =====================================================
     MOUSE PARALLAX
  ===================================================== */

  useEffect(() => {
    if (!textWrapRef.current || !avatarRef.current || !glowRef.current) {
      return;
    }

    quickRefs.current = {
      textRotY: gsap.quickTo(textWrapRef.current, "rotateY", {
        duration: 0.9,
        ease: "power3.out",
      }),

      textRotX: gsap.quickTo(textWrapRef.current, "rotateX", {
        duration: 0.9,
        ease: "power3.out",
      }),

      textX: gsap.quickTo(textWrapRef.current, "x", {
        duration: 0.9,
        ease: "power3.out",
      }),

      textY: gsap.quickTo(textWrapRef.current, "y", {
        duration: 0.9,
        ease: "power3.out",
      }),

      avatarRotY: gsap.quickTo(avatarRef.current, "rotateY", {
        duration: 0.6,
        ease: "power3.out",
      }),

      avatarRotX: gsap.quickTo(avatarRef.current, "rotateX", {
        duration: 0.6,
        ease: "power3.out",
      }),

      glowX: gsap.quickTo(glowRef.current, "x", {
        duration: 0.3,
        ease: "power3.out",
      }),

      glowY: gsap.quickTo(glowRef.current, "y", {
        duration: 0.3,
        ease: "power3.out",
      }),
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;

    const py = (e.clientY - rect.top) / rect.height;

    const relX = px - 0.5;
    const relY = py - 0.5;

    mouseRef.current = {
      x: e.clientX - rect.left,

      y: e.clientY - rect.top,

      active: true,
    };

    const q = quickRefs.current;

    if (!q.textRotY) return;

    /* TEXT */

    q.textRotY(relX * 6);

    q.textRotX(-relY * 6);

    q.textX(relX * 12);

    q.textY(relY * 8);

    /* AVATAR */

    q.avatarRotY(relX * 18);

    q.avatarRotX(-relY * 18);

    /* CURSOR GLOW */

    q.glowX(e.clientX - rect.left);

    q.glowY(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;

    const q = quickRefs.current;

    if (!q.textRotY) return;

    q.textRotY(0);

    q.textRotX(0);

    q.textX(0);

    q.textY(0);

    q.avatarRotY(0);

    q.avatarRotX(0);
  };

  return (
    <section
      className="hero-section"
      data-theme={theme}
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-contour-ui">
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="contourGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7657E8" />

              <stop offset="45%" stopColor="#8B5CF6" />

              <stop offset="72%" stopColor="#7350D8" />

              <stop offset="100%" stopColor="#5C42B5" />
            </linearGradient>
          </defs>

          <g
            fill="none"
            stroke="url(#contourGradient)"
            strokeWidth="1"
            opacity="0.28"
          >
            {/* ==========================================
                LEFT TOP CONTOUR
            =========================================== */}

            <path d="M-80 60 C120 20 250 25 390 90 C470 128 465 175 385 200 C290 230 190 250 125 305 C60 360 20 430 -90 445" />

            <path d="M-80 68 C120 28 250 33 390 98 C470 136 465 183 385 208 C290 238 190 258 125 313 C60 368 20 438 -90 453" />

            <path d="M-80 76 C120 36 250 41 390 106 C470 144 465 191 385 216 C290 246 190 266 125 321 C60 376 20 446 -90 461" />

            <path d="M-80 84 C120 44 250 49 390 114 C470 152 465 199 385 224 C290 254 190 274 125 329 C60 384 20 454 -90 469" />

            <path d="M-80 92 C120 52 250 57 390 122 C470 160 465 207 385 232 C290 262 190 282 125 337 C60 392 20 462 -90 477" />

            <path d="M-80 100 C120 60 250 65 390 130 C470 168 465 215 385 240 C290 270 190 290 125 345 C60 400 20 470 -90 485" />

            <path d="M-80 108 C120 68 250 73 390 138 C470 176 465 223 385 248 C290 278 190 298 125 353 C60 408 20 478 -90 493" />

            <path d="M-80 116 C120 76 250 81 390 146 C470 184 465 231 385 256 C290 286 190 306 125 361 C60 416 20 486 -90 501" />

            <path d="M-80 124 C120 84 250 89 390 154 C470 192 465 239 385 264 C290 294 190 314 125 369 C60 424 20 494 -90 509" />

            <path d="M-80 132 C120 92 250 97 390 162 C470 200 465 247 385 272 C290 302 190 322 125 377 C60 432 20 502 -90 517" />

            <path d="M-80 140 C120 100 250 105 390 170 C470 208 465 255 385 280 C290 310 190 330 125 385 C60 440 20 510 -90 525" />

            <path d="M-80 148 C120 108 250 113 390 178 C470 216 465 263 385 288 C290 318 190 338 125 393 C60 448 20 518 -90 533" />

            <path d="M-80 156 C120 116 250 121 390 186 C470 224 465 271 385 296 C290 326 190 346 125 401 C60 456 20 526 -90 541" />

            <path d="M-80 164 C120 124 250 129 390 194 C470 232 465 279 385 304 C290 334 190 354 125 409 C60 464 20 534 -90 549" />

            <path d="M-80 172 C120 132 250 137 390 202 C470 240 465 287 385 312 C290 342 190 362 125 417 C60 472 20 542 -90 557" />

            <path d="M-80 180 C120 140 250 145 390 210 C470 248 465 295 385 320 C290 350 190 370 125 425 C60 480 20 550 -90 565" />

            <path d="M-80 188 C120 148 250 153 390 218 C470 256 465 303 385 328 C290 358 190 378 125 433 C60 488 20 558 -90 573" />

            <path d="M-80 196 C120 156 250 161 390 226 C470 264 465 311 385 336 C290 366 190 386 125 441 C60 496 20 566 -90 581" />

            <path d="M-80 204 C120 164 250 169 390 234 C470 272 465 319 385 344 C290 374 190 394 125 449 C60 504 20 574 -90 589" />

            <path d="M-80 212 C120 172 250 177 390 242 C470 280 465 327 385 352 C290 382 190 402 125 457 C60 512 20 582 -90 597" />

            {/* ==========================================
                LEFT INNER FLOW
            =========================================== */}

            <path d="M140 -30 C270 30 345 75 355 130 C365 185 330 225 255 260 C180 295 125 330 105 390 C85 450 105 520 175 560" />

            <path d="M153 -30 C283 30 358 75 368 130 C378 185 343 225 268 260 C193 295 138 330 118 390 C98 450 118 520 188 560" />

            <path d="M166 -30 C296 30 371 75 381 130 C391 185 356 225 281 260 C206 295 151 330 131 390 C111 450 131 520 201 560" />

            <path d="M179 -30 C309 30 384 75 394 130 C404 185 369 225 294 260 C219 295 164 330 144 390 C124 450 144 520 214 560" />

            <path d="M192 -30 C322 30 397 75 407 130 C417 185 382 225 307 260 C232 295 177 330 157 390 C137 450 157 520 227 560" />

            <path d="M205 -30 C335 30 410 75 420 130 C430 185 395 225 320 260 C245 295 190 330 170 390 C150 450 170 520 240 560" />

            {/* ==========================================
                RIGHT TOP
            =========================================== */}

            <path d="M1030 20 C1160 20 1300 5 1510 -40" />

            <path d="M1025 28 C1160 28 1300 13 1510 -32" />

            <path d="M1020 36 C1160 36 1300 21 1510 -24" />

            <path d="M1015 44 C1160 44 1300 29 1510 -16" />

            <path d="M1010 52 C1160 52 1300 37 1510 -8" />

            <path d="M1005 60 C1160 60 1300 45 1510 0" />

            <path d="M1000 68 C1160 68 1300 53 1510 8" />

            <path d="M995 76 C1160 76 1300 61 1510 16" />

            <path d="M990 84 C1160 84 1300 69 1510 24" />

            <path d="M985 92 C1160 92 1300 77 1510 32" />

            <path d="M980 100 C1160 100 1300 85 1510 40" />

            <path d="M975 108 C1160 108 1300 93 1510 48" />

            <path d="M970 116 C1160 116 1300 101 1510 56" />

            <path d="M965 124 C1160 124 1300 109 1510 64" />

            <path d="M960 132 C1160 132 1300 117 1510 72" />

            <path d="M955 140 C1160 140 1300 125 1510 80" />

            <path d="M950 148 C1160 148 1300 133 1510 88" />

            <path d="M945 156 C1160 156 1300 141 1510 96" />

            <path d="M940 164 C1160 164 1300 149 1510 104" />

            <path d="M935 172 C1160 172 1300 157 1510 112" />

            {/* ==========================================
                RIGHT BENDING FORM
            =========================================== */}

            <path d="M1040 15 C1045 80 1030 130 970 175 C910 220 875 245 900 285 C925 325 1000 330 1110 330 C1240 330 1340 350 1500 420" />

            <path d="M1051 15 C1056 80 1041 130 981 175 C921 220 886 245 911 285 C936 325 1011 330 1121 330 C1251 330 1351 350 1511 420" />

            <path d="M1062 15 C1067 80 1052 130 992 175 C932 220 897 245 922 285 C947 325 1022 330 1132 330 C1262 330 1362 350 1522 420" />

            <path d="M1073 15 C1078 80 1063 130 1003 175 C943 220 908 245 933 285 C958 325 1033 330 1143 330 C1273 330 1373 350 1533 420" />

            <path d="M1084 15 C1089 80 1074 130 1014 175 C954 220 919 245 944 285 C969 325 1044 330 1154 330 C1284 330 1384 350 1544 420" />

            <path d="M1095 15 C1100 80 1085 130 1025 175 C965 220 930 245 955 285 C980 325 1055 330 1165 330 C1295 330 1395 350 1555 420" />

            <path d="M1106 15 C1111 80 1096 130 1036 175 C976 220 941 245 966 285 C991 325 1066 330 1176 330 C1306 330 1406 350 1566 420" />

            <path d="M1117 15 C1122 80 1107 130 1047 175 C987 220 952 245 977 285 C1002 325 1077 330 1187 330 C1317 330 1417 350 1577 420" />

            <path d="M1128 15 C1133 80 1118 130 1058 175 C998 220 963 245 988 285 C1013 325 1088 330 1198 330 C1328 330 1428 350 1588 420" />

            {/* ==========================================
                RIGHT LOWER FLOW
            =========================================== */}

            <path d="M890 350 C1010 390 1120 385 1200 350 C1280 315 1360 325 1500 390" />

            <path d="M885 360 C1005 400 1115 395 1195 360 C1275 325 1355 335 1495 400" />

            <path d="M880 370 C1000 410 1110 405 1190 370 C1270 335 1350 345 1490 410" />

            <path d="M875 380 C995 420 1105 415 1185 380 C1265 345 1345 355 1485 420" />

            <path d="M870 390 C990 430 1100 425 1180 390 C1260 355 1340 365 1480 430" />

            <path d="M865 400 C985 440 1095 435 1175 400 C1255 365 1335 375 1475 440" />

            <path d="M860 410 C980 450 1090 445 1170 410 C1250 375 1330 385 1470 450" />

            <path d="M855 420 C975 460 1085 455 1165 420 C1245 385 1325 395 1465 460" />

            <path d="M850 430 C970 470 1080 465 1160 430 C1240 395 1320 405 1460 470" />
          </g>
        </svg>
      </div>

      {/* =================================================
          CURSOR GLOW
      ================================================= */}

      <div className="cursor-glow" ref={glowRef} />

      {/* ================================================= BACKGROUND ORBS ================================================= */}
      <div className="bg-orb orb-one" />

      <div className="bg-orb orb-two" />

      {/* ================================================= TECH ORB ================================================= */}
      <TechOrbPit mouseRef={mouseRef} />

      {/* ================================================= GRAIN ================================================= */}
      <div className="grain-overlay" />

      {/* ================================================= NAVBAR ================================================= */}
      <div className="nav">
        <div className="text">
          <img
            ref={imageRef}
            src={theme === "dark" ? lightNameImg : blackName}
            alt="Kamlesh Kumar"
          />
        </div>

        <button
          className="light-icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <IconSun stroke={1.75} size={25} />
          ) : (
            <IconMoon stroke={1.75} size={25} />
          )}
        </button>
      </div>

      <div className="mid-section">
        <div className="mid-section-text" ref={textWrapRef}>
          <h1 className="name">Kamlesh Kumar</h1>

          <div className="role">
            <span>MERN Stack Developer</span>
          </div>

          <button
            className="about-me-button"
            onClick={() => setisAboutOpen(true)}
          >
            <span className="about-me-btn-text">About Me</span>

            <IconArrowNarrowRight size={20} stroke={2} />
          </button>
        </div>

        {/* =================================================
            K LOGO
        ================================================= */}

        <div className="name-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="650"
            height="650"
            viewBox="0 0 512 512"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* LEFT */}
              <linearGradient
                id="leftAurora"
                x1="54"
                y1="342"
                x2="224"
                y2="117"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#5B8CFF" />

                <stop offset="55%" stopColor="#7C5CFC" />

                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>

              {/* RIGHT */}
              <linearGradient
                id="rightAurora"
                x1="211"
                y1="303"
                x2="458"
                y2="37"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#7C5CFC" />

                <stop offset="45%" stopColor="#5B8CFF" />

                <stop offset="78%" stopColor="#00D9FF" />

                <stop offset="100%" stopColor="#FF4ECD" />
              </linearGradient>
            </defs>

            {/* LEFT SMALL PIECE */}

            <path
              d="
                M74 117
                H169
                L224 215
                L151 342
                H54
                L124 217
                Z
              "
              fill="url(#leftAurora)"
            />

            {/* RIGHT LARGE PIECE */}

            <path
              d="
                M361 37
                H458
                L311 300
                L403 472
                L307 475
                L211 303
                Z
              "
              fill="url(#rightAurora)"
            />
          </svg>
        </div>

        <div className="social-icons">

          <a
            href="https://www.linkedin.com/in/kamlesh-kumar-763367299"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>

          <a href="mailto:kamleshkumar223678@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>

          <a
            href="https://www.instagram.com/kumar_k_ks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="https://x.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>

          <a
            href="https://https://github.com/kamlesh2236-ks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>

        </div>
      </div>

      {isaboutOpen && (
        <div
          className="aboutModal-overlay"
          onClick={() => setisAboutOpen(false)}
        >
          <div className="about-modal" onClick={(e) => e.stopPropagation()}>
            {/* MODAL HEADER */}

            <div className="about-head">
              <h1>About Me</h1>

              <button
                onClick={() => setisAboutOpen(false)}
                aria-label="Close about modal"
              >
                <FontAwesomeIcon icon={faXmark} className="Modal-closeBtn" />
              </button>
            </div>
            {/* MODAL BODY */}

            <div className="about-body">
              {/* LEFT */}

              <div className="about-left">
                <p>
                  I help business owners and busy web developers to design &amp;
                  develop creative websites that fits their vision and attracts
                  the visitors to stay for ever. Technologies and tools that I
                  use to create such awesome websites.
                </p>

                <div className="skills">
                  <p>#react.js</p>

                  <p>#node.js</p>

                  <p>#express</p>

                  <p>#mongoDB</p>

                  <p>#nextjs</p>

                  <p>#html</p>

                  <p>#css</p>

                  <p>#javascript</p>

                  <p>#php</p>

                  <p>#mySql</p>

                  <p>#tailwind</p>

                  <p>#bootstrap</p>

                  <p>#git</p>

                  <p>#github</p>

                  <p>#restApi</p>

                  <p>#cloudinary</p>

                  <p>#gsap</p>

                  <p>#imagekit</p>
                </div>
              </div>

              {/* RIGHT IMAGE */}

              <div className="about-right" ref={avatarRef}>
                <img src={blackimg} alt="About Me" />
              </div>
            </div>

            {/* =================================================
                MERN ICONS
            ================================================= */}

            <div className="mern">
              {/* MONGODB */}

              <div className="mongo-icon">
                <div className="iconName-overlay">
                  <span>MongoDB</span>
                </div>

                <img src={mongoSvg} alt="MongoDB" />

                <h2
                  style={{
                    color: "#4ba74b",
                  }}
                >
                  M
                </h2>
              </div>

              {/* EXPRESS */}

              <div className="express-icon">
                <div className="iconName-overlay">
                  <span>Express.js</span>
                </div>

                <img src={expressSvg} alt="Express.js" />

                <h2>E</h2>
              </div>

              {/* REACT */}

              <div className="react-icon">
                <div className="iconName-overlay">
                  <span>React.js</span>
                </div>

                <img src={reactSvg} alt="React.js" />

                <h2
                  style={{
                    color: "#00d8ff",
                  }}
                >
                  R
                </h2>
              </div>

              {/* NODE */}

              <div className="node-icon">
                <div className="iconName-overlay">
                  <span>Node.js</span>
                </div>

                <img src={nodeSvg} alt="Node.js" />

                <h2
                  style={{
                    color: "#539e43",
                  }}
                >
                  N
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
