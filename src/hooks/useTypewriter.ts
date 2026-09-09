import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const currentIndexRef = useRef(0);
  const textRef = useRef(text);

  useEffect(() => {
    if (textRef.current !== text) {
      textRef.current = text;
      currentIndexRef.current = 0;
      setDisplayText('');
    }
  }, [text]);

  useEffect(() => {
    if (currentIndexRef.current < textRef.current.length) {
      const timeout = setTimeout(() => {
        setDisplayText(textRef.current.slice(0, currentIndexRef.current + 1));
        currentIndexRef.current += 1;
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [displayText, speed]);

  return displayText;
};

