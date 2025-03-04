'use client'

import { useEffect, useState } from "react";

export const useScreenWidth = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);

      // Set initial width
      setWidth(window.innerWidth);

      // Add event listener for resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };
