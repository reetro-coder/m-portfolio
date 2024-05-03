import { useRef, useState, useEffect } from "react";
import { useObserver } from "./custom-hooks";
import Detailer from "./Detailer";

export default function About() {
  const [logos, setLogos] = useState([]);

  let intro =
    "I'm Itachi Uchiha, a React.js virtuoso renowned for seamlessly blending " +
    "React with captivating CSS animations. With a keen eye for design, I " +
    "specialize in crafting seamless user experiences that push the " +
    "boundaries of frontend development. From elegant transitions to stunning " +
    "visual effects, I bring concepts to life, ensuring each interface I " +
    "create leaves a lasting impression.";

  const introElements = [];
  let delay = 0;
  const duration = 10;
  for (let i = 0; i < intro.length; i++) {
    const charRef = useRef(null);
    useObserver(charRef, delay, duration);
    introElements.push(
      <span
        key={i}
        ref={charRef}
        style={{
          color: getComputedStyle(document.body).getPropertyValue("--bg"),
        }}
      >
        {intro[i]}
      </span>
    );
    delay += duration;
  }

  let logoElements = logos.map((logo) => (
    <figure className="about__logo" key={logo.src}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
      />
      <figcaption className="offscreen">css logo</figcaption>
    </figure>
  ));

  useEffect(() => {
    const logoImages = import.meta.glob("../assets/logos/*");
    for (let logoImage in logoImages) {
      logoImage = logoImage.split("/").pop();
      const logoImageObject = new Image();
      logoImageObject.src = `src/assets/logos/${logoImage}`;
      logoImageObject.onload = () => {
        setLogos((old) => [
          ...old,
          {
            src: `src/assets/logos/${logoImage}`,
            alt: logoImage,
            width: logoImageObject.width,
            height: logoImageObject.height,
          },
        ]);
      };
    }
  }, []);

  return (
    <div className="about">
      <div className="section">
        <p className="title">EXPLORE ABOUT ME</p>
        <Detailer num={1} name={"About"} />
        <p>
          {/* todo: remove this after testing*/}
          {introElements}
        </p>
      </div>
      <div className="section">
        <p className="title">EXPERIENCE WITH</p>
        <div className="about__logos">{logoElements}</div>
      </div>
    </div>
  );
}
