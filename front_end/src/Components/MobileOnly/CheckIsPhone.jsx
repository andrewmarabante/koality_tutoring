import { useState, useEffect } from 'react';

export default function CheckIsPhone(breakpoint = 600) {
  const [isPhone, setIsPhone] = useState(() => window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isPhone;
}
