'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SignaturePadProps {
  label?: string;
  error?: string;
  onChange: (dataUrl: string | null) => void;
  className?: string;
}

/**
 * Generic canvas-based signature capture. Reports the signature back to the
 * parent as a PNG data URL via onChange — has no knowledge of waivers or
 * any other domain, so it's reusable anywhere an e-signature is needed.
 */
export function SignaturePad({ label = 'Signature', error, onChange, className }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const hasStrokeRef = useRef(false);

  const [isEmpty, setIsEmpty] = useState(true);

  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas?.getContext('2d') ?? null;
  }, []);

  // Match canvas backing resolution to its displayed size for crisp lines.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    ctx?.scale(ratio, ratio);
    if (ctx) {
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#111827';
    }
  }, []);

  const pointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = getContext();
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const { x, y } = pointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const ctx = getContext();
    if (!ctx) return;
    const { x, y } = pointerPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    hasStrokeRef.current = true;
  };

  const finishStroke = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (hasStrokeRef.current) {
      setIsEmpty(false);
      onChange(canvasRef.current?.toDataURL('image/png') ?? null);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasStrokeRef.current = false;
    setIsEmpty(true);
    onChange(null);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="block text-sm font-medium text-gray-700">{label}</span>
        <button
          type="button"
          onClick={handleClear}
          disabled={isEmpty}
          className="text-xs font-medium text-gray-500 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:underline"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={isEmpty ? 'Empty signature pad' : 'Captured signature'}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishStroke}
        onPointerLeave={finishStroke}
        className={cn(
          'w-full h-36 rounded-lg border bg-white touch-none cursor-crosshair',
          error ? 'border-red-400' : 'border-gray-300'
        )}
      />
      <p className="mt-1 text-xs text-gray-400">Sign using your mouse, trackpad, or finger.</p>
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
