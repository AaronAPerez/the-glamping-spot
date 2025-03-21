'use client';

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the BackgroundBeams component
 */
interface BackgroundBeamsProps {
  /**
   * CSS class to apply to the component
   */
  className?: string;
  
  /**
   * Background color or gradient for the component
   * @default "#111"
   */
  background?: string;
  
  /**
   * Opacity of the beam effect
   * @default 0.5
   */
  opacity?: number;
  
  /**
   * Max number of beams to display
   * @default 12
   */
  maxBeams?: number;
  
  /**
   * Base color for the beams
   * @default "#FFFFFF"
   */
  beamColor?: string;
  
  /**
   * Speed of the beam animations
   * @default "slow"
   */
  speed?: "slow" | "normal" | "fast";
}

/**
 * BackgroundBeams component creates animated light beam effects
 * for a dynamic background or overlay
 */
export function BackgroundBeams({
  className,
  background = "#111",
  opacity = 0.5,
  maxBeams = 12,
  beamColor = "#FFFFFF",
  speed = "slow",
}: BackgroundBeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const beamsRef = useRef<Beam[]>([]);
  const animFrameRef = useRef<number>(0);

  // Define beam class for animation
  class Beam {
    x: number;
    y: number;
    width: number;
    height: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    direction: number;
    
    constructor(
      canvasWidth: number,
      canvasHeight: number,
      beamWidth: number,
      beamHeight: number
    ) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.width = beamWidth;
      this.height = beamHeight;
      this.vx = Math.random() * 0.5 - 0.25;
      this.vy = Math.random() * 0.5 - 0.25;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() * 0.001 - 0.0005) * this.getSpeedMultiplier();
      this.opacity = Math.random() * 0.5 + 0.1;
      this.direction = Math.random() > 0.5 ? 1 : -1;
    }
    
    getSpeedMultiplier() {
      switch (speed) {
        case "slow":
          return 0.5;
        case "fast":
          return 2;
        default:
          return 1;
      }
    }
    
    update(canvasWidth: number, canvasHeight: number) {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed * this.direction;
      
      // Bounce off edges
      if (this.x < 0 || this.x > canvasWidth) {
        this.vx *= -1;
      }
      if (this.y < 0 || this.y > canvasHeight) {
        this.vy *= -1;
      }
    }
    
    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      // Create beam gradient
      const gradient = ctx.createLinearGradient(0, -this.height / 2, 0, this.height / 2);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(0.5, `${beamColor}${Math.round(this.opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize beams
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    
    // Create beams
    const beamHeight = dimensions.height / 3; // Beam height as 1/3 of canvas height
    const beamWidth = 3; // Thin beams
    
    beamsRef.current = Array.from(
      { length: maxBeams },
      () => new Beam(dimensions.width, dimensions.height, beamWidth, beamHeight)
    );
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw background
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw beams
      ctx.globalAlpha = opacity;
      beamsRef.current.forEach((beam) => {
        beam.update(dimensions.width, dimensions.height);
        beam.draw(ctx);
      });
      
      animFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [dimensions, background, opacity, maxBeams, beamColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}