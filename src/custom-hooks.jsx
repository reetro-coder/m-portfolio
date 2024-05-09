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
        color: getComputedStyle(document.body).getPropertyValue(
          "--primary-color"
        ),
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
          color: getComputedStyle(document.body).getPropertyValue("--bg"),
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
            getComputedStyle(document.body).getPropertyValue("--a-bg");
          document.getElementById("projects-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--bg");
          document.getElementById("experience-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--bg");
          break;
        case "projects-detailer":
          document.getElementById("about-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--bg");
          document.getElementById("projects-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--a-bg");
          document.getElementById("experience-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--bg");
          break;
        case "experience-detailer":
          document.getElementById("about-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--bg");
          document.getElementById("projects-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--bg");
          document.getElementById("experience-a").style.background =
            getComputedStyle(document.body).getPropertyValue("--a-bg");
          break;
        default:
          return;
      }
    },
    { threshold: 1 }
  );
}

export { useDataContext, useObserver, useTypeWriter, useSectionObserver };
