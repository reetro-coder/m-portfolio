import { useDataContext } from "../custom-hooks";
import Detailer from "./Detailer";

export default function Experience() {
  const experiences = useDataContext().experiences;
  const experienceElements = [];
  for (let i = 0; i < experiences.length; i++) {
    experienceElements.push(
      <div className="experience__container" key={i}>
        <div className="experience__detail">
          <figure className="experience__logo">
            <img
              className="contrast-50"
              src={`assets/company_logos/${experiences[i].company}.png`}
              alt={experiences[i].company}
              width={512} // todo: get width and height dynamically
              height={512}
            />
            <figcaption className="offscreen">
              {experiences[i].company}
            </figcaption>
          </figure>
          <div className="experience__timeline nowrap">
            {experiences[i].startDate + " - " + experiences[i].endDate}
          </div>
        </div>
        <div className="experience__data">
          <div>
            <h3>{experiences[i].role}</h3>
            <p className="small-fs">{experiences[i].technologies}</p>
          </div>
          <p className="small-fs">{experiences[i].description}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="experience" className="experience section">
      <Detailer num={3} name={"Experience"} />
      <div className="experience__list">
        <div className="experience__line"></div>
        {experienceElements}
      </div>
    </div>
  );
}
