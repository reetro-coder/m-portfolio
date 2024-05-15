import { forwardRef } from "react";

const Dot = forwardRef(function Demo(props, ref) {
  return (
    <div className="dot" ref={ref}>
      <div className="dot__wings"></div>
      <div className="dot__head"></div>
    </div>
  );
});

export default Dot;
