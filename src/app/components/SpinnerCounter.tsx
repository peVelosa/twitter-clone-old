import { useRef, type ElementRef, FC } from "react";

const strokeDasharray = 65;
type SpinnerCounter = {
  length: number;
};

const SpinnerCounter: FC<SpinnerCounter> = ({ length }) => {
  const spinnerRef = useRef<ElementRef<"circle">>(null);

  const strokePercentage = strokeDasharray - (length / 256) * strokeDasharray;

  if (spinnerRef.current) {
    spinnerRef.current.style.setProperty(
      "--stroke-off-set",
      `${strokePercentage <= 0 ? 0 : strokePercentage}`,
    );
  }

  return (
    <svg
      width="32"
      height="32"
      className="rotate-[15deg]"
    >
      <circle
        r="10"
        cx="16"
        cy="16"
        className="track"
      ></circle>
      <circle
        ref={spinnerRef}
        r="10"
        cx="16"
        cy="16"
        className={`progress ${
          strokePercentage > strokeDasharray * 0.5
            ? "stroke-white"
            : strokePercentage > strokeDasharray * 0.2
            ? "stroke-yellow-500"
            : "stroke-red-700"
        }`}
      ></circle>
    </svg>
  );
};

export default SpinnerCounter;
