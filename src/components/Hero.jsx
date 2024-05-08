import { useState, useEffect } from "react";

export default function Hero() {
  const [profilePicture, setProfilePicture] = useState({
    src: "assets/default_pp.png",
    width: 512,
    height: 512,
  });

  useEffect(() => {
    let pp_image = new Image();
    pp_image.src = "assets/profile.jpg";
    pp_image.onload = () => {
      setProfilePicture({
        src: "assets/profile.jpg",
        width: pp_image.width,
        height: pp_image.height,
      });
    };
  }, []);

  let buttons = ["Contact Me", "Resume", "Linkedin", "GitHub"];
  let buttonElements = [];
  for (let i = 0; i < buttons.length; i++) {
    buttonElements.push(<button key={i}>{buttons[i]}</button>);
  }
  return (
    <div className="hero">
      <figure className="hero__pp">
        <img
          src={profilePicture.src}
          alt="profile_picture"
          width={profilePicture.width}
          height={profilePicture.height}
        />
        <figcaption className="offscreen">Profile Photo</figcaption>
      </figure>
      <h1 className="c-align">Experienced Front-End Developer.</h1>
      <p className="c-align">
        A proficient Front End Developer adept in React, sculpting captivating
        user interfaces with precision, finesse, and a mastery of CSS.
      </p>
      <div className="hero__buttons">{buttonElements}</div>
    </div>
  );
}
