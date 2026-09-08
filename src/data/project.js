import pangatImg from "../assets/mainwebhome.png";
import pangatTab from "../assets/tabimage.png";
import project2Img from "../assets/manormaimg.png";
import project3Img from "../assets/gitapharmacy.png";
import project4Img from "../assets/rajlaxmi.png";
import project5Img from "../assets/smartsteps.png";

export const projects = [
  {
    id: 1,
    title: "Pangat",
    titleColor: "#f54a00",
    subtitle: "(Restaurant Billing and Table QR Ordering)",

    description:
      "Pangat POS is a modern SaaS-based restaurant management system that helps businesses manage orders, billing, inventory, tables, and daily operations from a centralized platform.",

    image: pangatImg,
    tabFrame: pangatTab,

    technologies: [
      "#react.js",
      "#node.js",
      "#express.js",
      "#mongoDB",
      "#cloudinary",
      "#groqAI",
      "#css",
      "#redis",
    ],

    link: "https://pangat-main.vercel.app",
  },

  {
    id:2,
    title: "Smart Steps Learning Hub",
    titleColor: "linear-gradient(90deg, #c026d3, #1e40af)",
    subtitle: "(Interactive Learning & Educational Platform)",

    description: "An interactive educational platform developed for a London-based international Fiverr client, focused on delivering a clean, accessible, and engaging digital learning experience for students.",
    image: project5Img,
    tabFrame: pangatTab,
    technologies: ["#react", "#tailwind", "#canva"],
    link: "https://smart-steps-leraning.netlify.app"
  },

  {
    id: 3,
    title: "Manorma Groups of Education",
    titleColor: "#026874",
    subtitle: "(Education Management & Learning Platform)",

    description:
      "Manorama Groups of Education is a modern educational platform designed to provide students with easy access to courses, learning resources, academic information, and educational services through a centralized digital experience.",

    image: project2Img,
    tabFrame: pangatTab,

    technologies: ["#html", "#css", "#mysql", "#php", "#javascript"],

    link: "https://www.manormagroups.com/",
  },

  {
    id: 4,
    title: "Manorma Gita College of Pharmacy",
    titleColor: "linear-gradient(135deg, #007a68 0%, #00e5c0 100%)",
    subtitle: "(Pharmaceutical Education & Career Development Platform)",

    description:
      "A modern digital platform for Manorma Gita College of Pharmacy, designed to showcase pharmaceutical programs, admissions, campus facilities, research, scholarships, student resources, and career opportunities through a centralized educational experience.",

    image: project3Img,
    tabFrame: pangatTab,

    technologies: ["#html", "#css", "#mysql", "#php", "#javascript"],

    link: "https://www.manormagroups.com/Manorma_Gita_College_Of_Pharmacy",
  },

  {
    id: 5,
    title: "RajLaxmi Pharma",
    titleColor: "linear-gradient(160deg, #1dbdb3 0%, #13a099 42%, #0d7a75 100%)",
    subtitle: "(Online Pharmacy & Healthcare E-Commerce Platform)",

    description:
      "A modern online pharmacy platform that enables customers to explore medicines, Ayurvedic products, surgical supplies, baby care, and health supplements, with features for online ordering, home delivery, and affordable generic medicines.",

    image: project4Img,
    tabFrame: pangatTab,

    technologies: ["#html", "#css", "#mysql", "#php", "#javascript"],

    link: "https://www.manormagroups.com/rajlaxmi_pharma/index",
  },
];
