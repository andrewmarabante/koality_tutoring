import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const TypingText = ({ text = "Lesson Submitted", speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      const nextChar = text[currentIndex];
      if (nextChar !== undefined) {
        setDisplayedText((prev) => prev + nextChar);
        currentIndex++;
        if (!showConfetti) setShowConfetti(true);
      } else {
        clearInterval(interval);
        setTimeout(() => setShowConfetti(false), 5000); // Auto stop
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <>
      {showConfetti && <Confetti width={width} height={height}  gravity={.3}/>}
      <span style={{ fontFamily: 'monospace' }}>
        {displayedText}
      </span>
    </>
  );
};

export default TypingText;
