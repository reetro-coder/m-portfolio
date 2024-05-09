import { useContext, useEffect, useRef } from "react";
import DataContext from "./context/DataContext";

/* CONTEXT */
const useDataContext = () => useContext(DataContext);

function useObserver(ref, delay, duration) {
  useEffect(() => {
    /* The default options for IntersectionObserver watches for intersections
        with device viewport and callback gets triggered as soon as the element is visible */
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
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
        observer.unobserve(ref.current);
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);
}

function useTypeWriter(text, duration) {
  const textElements = [];
  let delay = 0;
  for (let i = 0; i < text.length; i++) {
    const charRef = useRef(null);
    useObserver(charRef, delay, duration);
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

export { useObserver, useTypeWriter, useDataContext };
