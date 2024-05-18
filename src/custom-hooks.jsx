import { useContext, useEffect, useRef } from "react";
import DataContext from "./context/DataContext";

/* CONTEXT */
const useDataContext = () => useContext(DataContext);

function useObserver(ref, callback, options = {}, observeOnce = false) {
  useEffect(() => {
    /* The default options for IntersectionObserver watches for intersections
        with device viewport and callback gets triggered as soon as the element is visible */
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        if (observeOnce) observer.unobserve(ref.current);
      }
    }, options);
    observer.observe(ref.current);
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);
}

function typeWriterObserverCallback(ref, duration, delay) {
  ref.current.animate(
    [
      {
        color: "var(--primary-color)",
      },
    ],
    {
      fill: "forwards",
      duration: duration,
      delay: delay,
    }
  );
}

function useTypeWriter(text, duration) {
  const textElements = [];
  for (let i = 0, delay = 0; i < text.length; i++) {
    const charRef = useRef(null);
    useObserver(
      charRef,
      () => typeWriterObserverCallback(charRef, duration, delay),
      {},
      true
    );
    textElements.push(
      <span
        key={i}
        ref={charRef}
        style={{
          color: "var(--bg)",
        }}
      >
        {text[i]}
      </span>
    );
    delay += duration;
  }

  return textElements;
}

function useSectionObserver(ref) {
  useObserver(
    ref,
    () => {
      switch (ref.current.id) {
        case "about-detailer":
          document.getElementById("about-a").style.background =
            "var(--theme-gradient)";
          document.getElementById("projects-a").style.background = "var(--bg)";
          document.getElementById("experience-a").style.background =
            "var(--bg)";
          break;
        case "projects-detailer":
          document.getElementById("about-a").style.background = "var(--bg)";
          document.getElementById("projects-a").style.background =
            "var(--theme-gradient)";
          document.getElementById("experience-a").style.background =
            "var(--bg)";
          break;
        case "experience-detailer":
          document.getElementById("about-a").style.background = "var(--bg)";
          document.getElementById("projects-a").style.background = "var(--bg)";
          document.getElementById("experience-a").style.background =
            "var(--theme-gradient)";
          break;
        default:
          return;
      }
    },
    { threshold: 1 }
  );
}

function useExperienceObserver(ref) {
  useObserver(
    ref,
    () => {
      ["even", "odd"].forEach((evenOdd) => {
        const experienceAniElements = document.querySelectorAll(`
          .experience__container:nth-child(${evenOdd}) .experience__data,
          .experience__container:nth-child(${evenOdd}) .experience__timeline
        `);
        experienceAniElements.forEach((element) => {
          element.style.animation = `
            experience-ani-${evenOdd} 1s var(--timing-function) forwards
          `;
        });
      });
    },
    { threshold: 1 },
    true
  );
}

function useAboutLogosObserver(ref) {
  useObserver(
    ref,
    () => {
      console.log("here");
      const aboutLogoElements = document.querySelectorAll(".about__logo");
      aboutLogoElements.forEach((element) => {
        element.style.animation =
          "about__logo-ani 0.5s var(--timing-function) forwards";
      });
    },
    { threshold: 1 },
    true
  );
}

export {
  useDataContext,
  useObserver,
  useTypeWriter,
  useSectionObserver,
  useExperienceObserver,
  useAboutLogosObserver,
};
