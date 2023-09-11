import { useRef, type ElementRef, FC } from "react";

const strokeDasharray = 75;

type CircularProgressProps = {
  length: number;
};

const CircularProgress: FC<CircularProgressProps> = ({ length }) => {
  const spinnerRef = useRef<ElementRef<"circle">>(null);

  const strokePercentage = strokeDasharray - (length / 256) * strokeDasharray;

  if (spinnerRef.current) {
    spinnerRef.current.style.setProperty(
      "--stroke-off-set",
      `${
        strokePercentage === strokeDasharray
          ? strokeDasharray
          : strokePercentage > 0
          ? strokePercentage
          : 0
      }`,
    );
  }

  const remainingSize = 256 - length;
  const color =
    strokePercentage < 0
      ? "stroke-red-700"
      : strokePercentage < strokeDasharray * 0.2
      ? "stroke-yellow-500"
      : "stroke-blue-600";

  return (
    <>
      {length > 0 && (
        <div className="relative">
          <svg
            width="28"
            height="28"
            className="relative"
          >
            {remainingSize > -10 && (
              <>
                <circle
                  r="12"
                  cx="14"
                  cy="14"
                  className="track"
                ></circle>
                <circle
                  ref={spinnerRef}
                  r="12"
                  cx="14"
                  cy="14"
                  className={`progress ${color}`}
                ></circle>
              </>
            )}
            <text
              x="14"
              y="16"
              dominantBaseline="middle"
              textAnchor="middle"
              className={`text-sm font-semibold ${
                remainingSize >= 0 ? "fill-yellow-500" : "fill-red-700"
              }`}
            >
              {remainingSize < 20 && remainingSize}
            </text>
          </svg>
        </div>
      )}
    </>
  );
};

export default CircularProgress;
