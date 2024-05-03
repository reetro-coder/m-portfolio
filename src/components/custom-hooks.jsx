import { useEffect } from "react";

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

export { useObserver };
