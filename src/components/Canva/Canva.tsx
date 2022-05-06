import { useEffect, useRef } from 'react'

import { SideMenu } from '../SideMenu/SideMenu';

import './canva.scss'

type Vector2 = {
  x: number;
  y: number;
}

type CanvaProps = {
  size?: number;
  width?: number;
  height?: number;
}

export function Canva(props: CanvaProps) {
  
  const canvas = useRef<HTMLCanvasElement>(null);
  const minimaps = useRef<HTMLCanvasElement>(null);

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
    let isDraging: boolean = false;
    let start: Vector2 = { x: 0, y: 0 }
    let end: Vector2 = { x: 0, y: 0 }
    let lineColor: string = "black";
    let pencilSize: number = 14;

    const color = canva.previousSibling?.firstChild?.lastChild;
    const size = canva.previousSibling?.childNodes[1].lastChild?.firstChild;

    const minimapCon = minimap.getContext('2d');
    const context = canva.getContext('2d')

    if (!context) return;
    if (!minimapCon) return;
    if (!color) return;
    if (!size) return;
    
    minimapCon.scale(0.25, 0.25);

    function handleChangeColor(event: any) {
      lineColor = event.target.value
    }

    function handleChangeSize(event: any) {
      pencilSize = event.target.value
    }

    function handleMouseMove(event: MouseEvent) {
      if (isDrawing && context) {
        if (!canva) return;
        if (isDraging) return;

        const rect = canva.getBoundingClientRect();
        start = { x: end.x, y: end.y }
        end   = { x: event.clientX - rect.left, y: event.clientY - rect.top }
        
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = lineColor;
        context.lineWidth = pencilSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
        context.closePath();
      }
    }
    
    function handleMouseDown(event: MouseEvent) {
      if (!canva) return;
      if (event.button !== 0) return;
      const rect = canva.getBoundingClientRect();
      isDrawing = true;
      start = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      end   = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    
    function handleMouseUp() {
      if (!minimapCon) return;
      if (!canva) return;

      minimapCon.drawImage(canva, 0, 0);
      isDrawing = false;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== " ") return;
      if (!canva) return;
      isDraging = true;
      document.body.style.cursor = "grab";
      canva.style.cursor = "grab"
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key !== " ") return;
      if (!canva) return;
      isDraging = false;
      document.body.style.cursor = "default";
      canva.style.cursor = "crosshair";
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp);
    size.addEventListener('change', handleChangeSize)
    color.addEventListener('change', handleChangeColor)
    canva.addEventListener('mousemove', handleMouseMove);
    canva.addEventListener('mousedown', handleMouseDown);
    canva.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      size.removeEventListener('change', handleChangeSize);
      color.removeEventListener('change', handleChangeColor);
      canva.removeEventListener('mousemove', handleMouseMove);
      canva.removeEventListener('mousedown', handleMouseDown);
      canva.removeEventListener('mouseup', handleMouseUp);
    }
    
  }, [props])

  return (
    <>
      <SideMenu />
      
      <canvas id='canvas' ref={canvas}></canvas>

      <section id="minimap">
        <canvas ref={minimaps}></canvas>
      </section>
    </>
  )
}
