import { useRef } from "react";
import { useDataContext } from "../custom-hooks";
import { dotMoveEventHandler } from "../utils";

import Dot from "./Dot";

export default function Hero() {
  const heroRef = useRef(null);
  const dotRef = useRef(null);
  const data = useDataContext();

  let titleElements = [];
  for (let i = 0; i < data.title.length; i++) {
    titleElements.push(
      <span key={i} className="hero__title__char">
        {data.title[i]}
      </span>
    );
  }

  // todo: setup buttons using context-api
  let buttons = ["Contact Me", "Resume", "Linkedin", "GitHub"];
  let buttonElements = [];
  for (let i = 0; i < buttons.length; i++) {
    buttonElements.push(
      <button key={i} className="hero__button nowrap">
        {buttons[i]}
      </button>
    );
  }

  return (
    <div
      className="hero"
      onMouseMove={(e) => dotMoveEventHandler(e, heroRef, dotRef)}
      ref={heroRef}
    >
      <Dot ref={dotRef} />
      <h1 className="hero__h1">{titleElements}</h1>
      <div className="hero__buttons">{buttonElements}</div>
    </div>
  );
}
