'use client';

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

/**
 * Interface for a word in the TypewriterEffect
 */
interface TypewriterEffectWord {
  /**
   * Text content of the word
   */
  text: string;
  /**
   * Optional CSS class names for the word
   */
  className?: string;
}

/**
 * Props for the TypewriterEffect component
 */
interface TypewriterEffectProps {
  /**
   * Array of words to display in the typewriter effect
   */
  words: TypewriterEffectWord[];
  /**
   * CSS class name for the container
   */
  className?: string;
  /**
   * CSS class name for the wrapper element
   */
  wrapperClassName?: string;
  /**
   * Animation delay between each character in seconds
   * @default 0.07
   */
  cursorClassName?: string;
  /**
   * Whether to show a cursor
   * @default true
   */
  showCursor?: boolean;
  /**
   * Animation delay between each character in seconds
   * @default 0.07
   */
  animationDelay?: number;
  /**
   * Whether to repeat the animation
   * @default false
   */
  repeat?: boolean;
  /**
   * Repeat delay in seconds
   * @default 5
   */
  repeatDelay?: number;
}

/**
 * TypewriterEffect component creates an animated text effect
 * where words appear to be typed out one character at a time
 */
export function TypewriterEffect({
  words,
  className,
  wrapperClassName,
  cursorClassName,
  showCursor = true,
  animationDelay = 0.07,
  repeat = false,
  repeatDelay = 5,
}: TypewriterEffectProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Run the animation when the component comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const wordsSequence = [
        // First, set all words to be invisible
        [
          ".word",
          {
            opacity: 0,
            y: 20,
          },
          { duration: 0 }
        ],
        // Then animate each word in with a staggered delay
        [
          ".word",
          {
            opacity: 1,
            y: 0,
          },
          {
            duration: 0.3,
            delay: stagger(0.1),
            at: "+0"
          }
        ],
        // For each word, animate each character in
        ...words.map((_, wordIndex) => [
          `.word-${wordIndex} .character`,
          {
            opacity: 1,
            x: 0,
          },
          {
            duration: 0.3,
            delay: stagger(animationDelay),
            at: "+0.1"
          }
        ]),
        // If a cursor is shown, animate it to be visible
        showCursor ? [
          ".cursor",
          {
            opacity: 1,
          },
          { duration: 0.2, at: "+0" }
        ] : [] as any
      ].filter(Boolean);

      animate(wordsSequence);
      setHasAnimated(true);
      
      // If repeat is true, run the animation again after a delay
      if (repeat) {
        setTimeout(() => {
          setHasAnimated(false);
        }, repeatDelay * 1000);
      }
    }
  }, [isInView, animate, words, animationDelay, repeat, repeatDelay, hasAnimated, showCursor]);

  return (
    <motion.div
      ref={scope}
      className={cn("text-center flex flex-col items-center justify-center", wrapperClassName)}
    >
      <div className={cn("inline-block relative", className)}>
        {words.map((word, wordIndex) => {
          return (
            <div key={wordIndex} className={cn("word inline-block whitespace-nowrap", `word-${wordIndex}`)}>
              {wordIndex > 0 && <span>&nbsp;</span>}
              {word.text.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  className={cn("character inline-block", word.className)}
                  initial={{ opacity: 0, x: 20 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          );
        })}
        {showCursor && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={cn("cursor inline-block ml-1", cursorClassName)}
          >
            |
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}