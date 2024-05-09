import { useState, useEffect } from "react";
import { useDataContext, useTypeWriter } from "../custom-hooks";
import Detailer from "./Detailer";

export default function About() {
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
    <div id="about" className="about">
      <div className="section">
        <p className="title">EXPLORE ABOUT ME</p>
        <Detailer num={1} name={"About"} />
        <p>{about}</p>
      </div>
      <div className="section">
        <p className="title">EXPERIENCE WITH</p>
        <div className="about__logos">{logoElements}</div>
      </div>
    </div>
  );
}
