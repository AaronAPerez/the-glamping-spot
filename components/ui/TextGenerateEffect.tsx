'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";


/**
 * Props for the TextGenerateEffect component
 */
interface TextGenerateEffectProps {
  /**
   * The text to animate
   */
  words: string;
  
  /**
   * CSS class names to apply to the component
   */
  className?: string;
  
  /**
   * Time between each character animation in ms
   * @default 40
   */
  speed?: number;
  
  /**
   * Whether to include the trailing cursor animation
   * @default false
   */
  showCursor?: boolean;
  
  /**
   * Custom element to use as the container
   * @default 'div'
   */
  as?: React.ElementType;
  
  /**
   * Whether animation should start immediately or be delayed
   * @default true
   */
  autoStart?: boolean;
  
  /**
   * Callback function that runs when animation completes
   */
  onComplete?: () => void;
}

/**
 * TextGenerateEffect component creates a typewriter-like animation
 * where text appears to be generated character by character
 */
export function TextGenerateEffect({
  words,
  className,
  speed = 40,
  showCursor = false,
  as: Tag = "div",
  autoStart = true,
  onComplete,
}: TextGenerateEffectProps) {
  // Store the generated text
  const [displayedText, setDisplayedText] = useState("");
  // Track current character position
  const [index, setIndex] = useState(0);
  // Track if animation is complete
  const [isComplete, setIsComplete] = useState(false);
  // Track if animation is in progress
  const [isGenerating, setIsGenerating] = useState(autoStart);

  // Handle text generation animation
  useEffect(() => {
    if (!isGenerating) return;
    
    // If we haven't completed the text
    if (index < words.length) {
      // Set a timeout to add the next character
      const timeout = setTimeout(() => {
        setDisplayedText(words.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      // Animation is complete
      setIsGenerating(false);
      setIsComplete(true);
      onComplete?.();
    }
  }, [index, isGenerating, words, speed, onComplete]);

  // Start the generation if autoStart is true
  useEffect(() => {
    if (autoStart) {
      setIsGenerating(true);
    }
  }, [autoStart]);

  return (
    <>
    <Tag className={cn("inline", className)}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="ml-1 animate-pulse">|</span>
      )}
    </Tag>
    </>
  );
}