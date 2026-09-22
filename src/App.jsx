import profile from "./data/profile.json";
import projectsData from "./data/projects.json";
import dashboardsData from "./data/dashboards.json";
import skillsData from "./data/skills.json";
import certificationsData from "./data/certifications.json";
import experienceData from "./data/experience.json";

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import DashboardGallery from "./components/DashboardGallery.jsx";
import Certifications from "./components/Certifications.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Nav profile={profile} />
      <main>
        <Hero profile={profile} />
        <Experience profile={profile} experience={experienceData.items} />
        <Skills skills={skillsData} />
        <Projects projects={projectsData.items} githubUrl={profile.githubUrl} />
        <DashboardGallery dashboards={dashboardsData.items} githubUrl={profile.githubUrl} />
        <Certifications certifications={certificationsData.items} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
