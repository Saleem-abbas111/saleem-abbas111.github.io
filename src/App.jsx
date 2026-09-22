import profile from "./data/profile.json";
import projectsData from "./data/projects.json";
import dashboardsData from "./data/dashboards.json";
import skillsData from "./data/skills.json";
import certificationsData from "./data/certifications.json";
import experienceData from "./data/experience.json";

const projects = projectsData.items;
const dashboards = dashboardsData.items;
const skills = skillsData.items;
const certifications = certificationsData.items;
const experience = experienceData.items;

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import DashboardGallery from "./components/DashboardGallery.jsx";
import Skills from "./components/Skills.jsx";
import Certifications from "./components/Certifications.jsx";
import Experience from "./components/Experience.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Nav name={profile.name} />
      <main>
        <Hero profile={profile} />
        <Projects projects={projects} />
        <DashboardGallery dashboards={dashboards} githubUrl={profile.githubUrl} />
        <Skills skills={skills} />
        <Certifications certifications={certifications} />
        <Experience experience={experience} />
      </main>
      <Footer name={profile.name} githubUrl={profile.githubUrl} />
    </>
  );
}
