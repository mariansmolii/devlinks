import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const useScreenSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useScreenSize;
