import { ReactNode, useEffect, useRef, useState } from 'react'

import './canva.scss'

type Vector2 = {
  x: number;
  y: number;
}

type CanvaProps = {
  children?: ReactNode;
  color?: string;
  size?: number;
  width?: number;
  height?: number;
}

export function Canva(props: CanvaProps) {
  
  const canvas = useRef<HTMLCanvasElement>(null);
  const minimaps = useRef<HTMLCanvasElement>(null);
  const [ context, setContext ] = useState<CanvasRenderingContext2D | null >(null);

  useEffect(() => {
    const canva = canvas.current;
    const minimap = minimaps.current;
    if (!canva) return;
    if (!minimap) return;
    canva.width = props.width? props.width : 500;
    canva.height = props.height? props.height : 500;
    minimap.width = props.width? props.width/4 : 500/4;
    minimap.height = props.height? props.height/4 : 500/4;

    let isDrawing: boolean = false;
    let start: Vector2 = { x: 0, y: 0 }
    let end: Vector2 = { x: 0, y: 0 }
    
    const minimapCon = minimap.getContext('2d');
    setContext(canva.getContext('2d'))
    if (!context) return;
    if (!minimapCon) return;
    minimapCon.scale(0.25, 0.25);

    function handleMouseMove(event: MouseEvent) {
      if (isDrawing && context) {
        if (!canva) return;
        const rect = canva.getBoundingClientRect();
        start = { x: end.x, y: end.y }
        end   = { x: event.clientX - rect.left, y: event.clientY - rect.top }
        
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
      if (!canva) return;
      const rect = canva.getBoundingClientRect();
      start = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      end   = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    
    function handleMouseUp() {
      if (!minimapCon) return;
      if (!canva) return;
      minimapCon.drawImage(canva, 0, 0);
      isDrawing = false;
    }
    
    if (context) {
      canva.addEventListener('mousemove', handleMouseMove);
      canva.addEventListener('mousedown', handleMouseDown);
      canva.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      canva.removeEventListener('mousemove', handleMouseMove);
      canva.removeEventListener('mousedown', handleMouseDown);
      canva.removeEventListener('mouseup', handleMouseUp);
    }
    
  }, [context, props])

  return (
    <>
      <canvas id='canvas' ref={canvas}>
      </canvas>
      <section id="minimap">
        <canvas ref={minimaps}>
        </canvas>
        <span> {props.children} </span>
      </section>
    </>
  )
}