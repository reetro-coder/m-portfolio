import { useState, useEffect, useRef } from "react";
import {
  useDataContext,
  useTypeWriter,
  useSectionObserver,
} from "../custom-hooks";
import { dotMoveEventHandler } from "../utils";

import Dot from "./Dot";
import Detailer from "./Detailer";

export default function About() {
  const aboutRef = useRef(null);
  const dotRef = useRef(null);
  const aboutDetailerRef = useRef(null);
  useSectionObserver(aboutDetailerRef);

  const about = useTypeWriter(useDataContext().about, 10);
  const [logos, setLogos] = useState([]);

  let logoElements = logos.map((logo) => (
    <figure className="about__logo" key={logo.src}>
      <img
        className="contrast-50"
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
      />
      <figcaption className="offscreen">css logo</figcaption>
    </figure>
  ));

  useEffect(() => {
    const logoImages = import.meta.glob("../../public/assets/logos/*");
    for (let logoImage in logoImages) {
      logoImage = logoImage.split("/").pop();
      const logoImageObject = new Image();
      logoImageObject.src = `assets/logos/${logoImage}`;
      logoImageObject.onload = () => {
        setLogos((old) => [
          ...old,
          {
            src: `assets/logos/${logoImage}`,
            alt: logoImage,
            width: logoImageObject.width,
            height: logoImageObject.height,
          },
        ]);
      };
    }
  }, []);

  return (
    <div
      id="about"
      className="about"
      ref={aboutRef}
      onMouseMove={(e) => dotMoveEventHandler(e, aboutRef, dotRef)}
    >
      <Dot ref={dotRef} />
      <div className="section">
        <p className="title">EXPLORE ABOUT ME</p>
        <div id="about-detailer" ref={aboutDetailerRef}>
          <Detailer num={1} name={"About"} />
        </div>
        <p>{about}</p>
      </div>
      <div className="section">
        <p className="title">EXPERIENCE WITH</p>
        <div className="about__logos">{logoElements}</div>
      </div>
    </div>
  );
}
