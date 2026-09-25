"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: FadeInProps) {
  // Normalize delay: if it's > 10, it's likely ms, otherwise it's seconds
  const normalizedDelay = delay > 10 ? delay / 1000 : delay;

  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return { y: 40, x: 0 };
      case "down": return { y: -40, x: 0 };
      case "left": return { x: 40, y: 0 };
      case "right": return { x: -40, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          transition: { 
            type: "spring",
            damping: 25,
            stiffness: 120,
            delay: normalizedDelay,
            duration: 0.8
          }
        }
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
