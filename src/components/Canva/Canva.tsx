import { useEffect, useRef, useState } from 'react'

import './canva.scss'

type Vector2 = {
  x: number;
  y: number;
}

type CanvaProps = {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}

export function Canva(props: CanvaProps) {
  
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ context, setContext ] = useState<CanvasRenderingContext2D | null >(null);  
  
  useEffect(() => {
    const canva = canvas.current;
    if (!canva) return;
    canva.width = props.width ? props.width : 500;
    canva.height = props.height ? props.height : 500;

    let isDrawing: boolean = false;
    let start: Vector2 = { x: 0, y: 0 }
    let end: Vector2 = { x: 0, y: 0 }
    let canvasOffsetX = 0;
    let canvasOffsetY = 0;
    
    setContext(canva.getContext('2d'))
    
    function handleMouseMove(event: MouseEvent) {
      if (isDrawing && context) {
        start = { x: end.x, y: end.y }
        end   = { x: event.clientX - canvasOffsetX, y: event.clientY - canvasOffsetY }
        
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = props.color ? props.color : "black";
        context.lineWidth = props.size ? props.size : 5;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
        context.closePath();
      }
    }
    
    function handleMouseDown(event: MouseEvent) {
      isDrawing = true;
      start = { x: event.clientX - canvasOffsetX, y: event.clientY - canvasOffsetY };
      end   = { x: event.clientX - canvasOffsetX, y: event.clientY - canvasOffsetY };
    }
    
    function handleMouseUp() {
      isDrawing = false;
    }
    
    if (context) {
      canva.addEventListener('mousemove', handleMouseMove);
      canva.addEventListener('mousedown', handleMouseDown);
      canva.addEventListener('mouseup', handleMouseUp);

      canvasOffsetX = canva.offsetLeft;
      canvasOffsetY = canva.offsetTop;
    }

    return () => {
      canva.removeEventListener('mousemove', handleMouseMove);
      canva.removeEventListener('mousedown', handleMouseDown);
      canva.removeEventListener('mouseup', handleMouseUp);
    }
    
  }, [context, props])

  return (
    <canvas
      id='canvas'
      ref={canvas}
    />
  )
}