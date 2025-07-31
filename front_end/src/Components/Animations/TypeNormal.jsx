import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const TypeNormal = ({ text = "Lesson Submitted", speed = 100 }) => {
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
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <>
      <span>
        {displayedText}
      </span>
    </>
  );
};

export default TypeNormal;
