"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ text }: { text: string }) {
  const domRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(text);

  useEffect(() => {
    // 1. Remove commas so the regex can capture continuous numbers properly
    const sanitizedText = text.replace(/,/g, "");

    // 2. Capture (prefix) (number) (suffix)
    const match = sanitizedText.match(/(.*?)(\d+(?:\.\d+)?)(.*)/);

    const currentRef = domRef.current;
    if (!match || !currentRef) {
      return;
    }

    const prefix = match[1];
    const targetValue = parseFloat(match[2]);
    const suffix = match[3];
    const isFloat = match[2].includes(".");
    const decimals = isFloat ? match[2].split(".")[1].length : 0;

    const formatNumber = (val: number) => {
      if (isFloat) {
        return val.toFixed(decimals);
      }
      return Math.floor(val).toLocaleString("en-US");
    };

    let animationFrameId: number | null = null;
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out power2 (1 - (1 - progress)^2)
      const easeOut = 1 - Math.pow(1 - progress, 2);
      const currentVal = targetValue * easeOut;

      setDisplayValue(`${prefix}${formatNumber(currentVal)}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(`${prefix}${formatNumber(targetValue)}${suffix}`);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTime = null;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            setDisplayValue(`${prefix}${formatNumber(0)}${suffix}`);
            animationFrameId = requestAnimationFrame(animate);
          } else {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return <span ref={domRef}>{displayValue}</span>;
}
