export default function Menu() {
  return (
    <div className="menu">
      <a id="about-a" className="menu__a" href="#about">
        About
      </a>{" "}
      {/* todo: add references */}
      <a id="projects-a" className="menu__a" href="#">
        Projects
      </a>
      <a id="experience-a" className="menu__a" href="#experience">
        Experience
      </a>
    </div>
  );
}
