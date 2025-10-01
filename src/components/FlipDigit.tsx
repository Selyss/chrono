import React, { useCallback, useEffect, useRef } from "react";
import "./FlipDigit.css";

interface FlipDigitProps {
  digit: string;
  isHour: boolean;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ digit, isHour }) => {
  const flipCardRef = useRef<HTMLDivElement>(null);

  const flip = useCallback((newNumber: string) => {
    const flipCard = flipCardRef.current;
    if (!flipCard) return;

    const topHalf = flipCard.querySelector(".top") as HTMLElement;
    const bottomHalf = flipCard.querySelector(".bottom") as HTMLElement;

    if (!topHalf || !bottomHalf) return;

    const startNumber = topHalf.textContent;
    if (newNumber === startNumber) return;

    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    topHalf.textContent = startNumber || "";
    bottomHalf.textContent = startNumber || "";
    topFlip.textContent = startNumber || "";
    bottomFlip.textContent = newNumber;

    topFlip.addEventListener("animationstart", () => {
      topHalf.textContent = newNumber;
    });

    topFlip.addEventListener("animationend", () => {
      topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", () => {
      bottomHalf.textContent = newNumber;
      bottomFlip.remove();
    });

    flipCard.append(topFlip, bottomFlip);
  }, []);

  useEffect(() => {
    flip(digit);
  }, [digit, flip]);

  return (
    <div className="flip_container">
      <div
        className="flip-card"
        ref={flipCardRef}
        data-hour-tens={isHour ? "true" : undefined}
        data-minute-tens={!isHour ? "true" : undefined}
      >
        <div className="top">{digit}</div>
        <div className="bottom">{digit}</div>
      </div>
    </div>
  );
};

export default FlipDigit;
