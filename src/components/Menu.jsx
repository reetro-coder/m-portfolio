export default function Menu() {
  return (
    // todo: fix scroll based off of sticky pos
    <div className="menu">
      <a className="menu__a" href="#about">
        About
      </a>{" "}
      {/* todo: add references */}
      <a className="menu__a" href="#">
        Project
      </a>
      <a className="menu__a" href="#experience">
        Experience
      </a>
    </div>
  );
}
