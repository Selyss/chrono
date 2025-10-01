import { useEffect, useState } from "react";
import "./FlipDigit.css";

interface FlipDigitProps {
  currentValue: string;
  previousValue: string;
  showSeam: boolean;
}

const FlipDigit = ({
  currentValue,
  previousValue,
  showSeam,
}: FlipDigitProps) => {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (currentValue !== previousValue) {
      setIsFlipping(true);

      // Animation timing handled by CSS

      // Reset flip state after animation completes
      setTimeout(() => {
        setIsFlipping(false);
      }, 350);
    }
  }, [currentValue, previousValue]);

  return (
    <div className="flip-digit">
      <div className={`digit-container ${isFlipping ? "flipping" : ""}`}>
        {/* Static back panels */}
        <div className="digit-panel static-top">
          <div className="digit-content">
            <span>{currentValue}</span>
          </div>
        </div>
        <div className="digit-panel static-bottom">
          <div className="digit-content bottom">
            <span>{currentValue}</span>
          </div>
        </div>

        {/* Animated panels */}
        {isFlipping && (
          <>
            <div className="digit-panel flip-top">
              <div className="digit-content">
                <span>{previousValue}</span>
              </div>
            </div>
            <div className="digit-panel flip-bottom">
              <div className="digit-content bottom">
                <span>{currentValue}</span>
              </div>
            </div>
          </>
        )}

        {showSeam && <div className="seam" />}
      </div>
    </div>
  );
};

export default FlipDigit;
