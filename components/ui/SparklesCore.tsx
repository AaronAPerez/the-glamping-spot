'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the SparklesCore component
 */
interface SparklesCoreProps {
  /**
   * ID for the canvas element
   */
  id?: string;
  
  /**
   * Background color of the canvas
   * @default '#000'
   */
  background?: string;
  
  /**
   * Minimum size of particles
   * @default 0.4
   */
  minSize?: number;
  
  /**
   * Maximum size of particles
   * @default 1.5
   */
  maxSize?: number;
  
  /**
   * Color of the particles
   * @default '#FFF'
   */
  particleColor?: string;
  
  /**
   * Density of particles (higher = more particles)
   * @default 100
   */
  particleDensity?: number;
  
  /**
   * CSS class names for the component
   */
  className?: string;
  
  /**
   * Whether to pause animation
   * @default false
   */
  isPaused?: boolean;
}

/**
 * Interface for particles used in the animation
 */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

/**
 * SparklesCore component creates a canvas with animated sparkle particles
 * for a magical, interactive background effect
 */
export const SparklesCore = ({
  id,
  background = '#000',
  minSize = 0.4,
  maxSize = 1.5,
  particleColor = '#FFF',
  className,
  particleDensity = 100,
  isPaused = false
}: SparklesCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        setDimensions({
          width: canvasRef.current.parentElement.offsetWidth,
          height: canvasRef.current.parentElement.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const particleCount = Math.min(
      Math.max(Math.floor((dimensions.width * dimensions.height) / 10000) * particleDensity, 30),
      500
    );
    
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * 0.4 - 0.2,
    }));

    setParticles(newParticles);
  }, [dimensions, minSize, maxSize, particleDensity]);

  // Animation loop
  useEffect(() => {
    if (particles.length === 0 || !canvasRef.current || isPaused) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      ctx.fillStyle = particleColor;

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update particle position for next frame
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY = -particle.speedY;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, dimensions, background, particleColor, isPaused]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={cn('block', className)}
      aria-hidden="true"
    />
  );
};