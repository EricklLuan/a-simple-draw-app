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
    let pencilSize: number = 14;
    let scale: number = 1;

    const color = canva.previousSibling?.childNodes[1]?.lastChild?.firstChild;
    const size = canva.previousSibling?.childNodes[2].lastChild?.firstChild;
    const minimapCon = minimap.getContext('2d');
    const context = canva.getContext('2d')

    if (!context) return;
    if (!minimapCon) return;
    if (!color) return;
    if (!size) return;
    
    minimapCon.scale(0.25, 0.25);
    
    function handleChangeSize(event: any) { pencilSize = event.target.value; }
    function handleMouseLeave() { isDrawing = false; }
    function handleMouseMove(event: MouseEvent) {
      if (isDrawing && context) {
        if (!canva) return;
        if (!color) return;
        if (isDraging) return;

        start = { x: end.x, y: end.y }
        end   = { x: event.offsetX, y: event.offsetY}
        
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = `${color.textContent}`;
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
      isDrawing = true;
      start = { x: event.offsetX, y: event.offsetY };
      end   = { x: event.offsetX, y: event.offsetY };
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
    
    function handleWheelEvent(event: WheelEvent) {
      if (event.deltaY < 0 && scale < 2.0) {
        if (!canva) return;
        scale += 0.1;
        canva.style.transform = `scale(${scale}, ${scale})`
      } else if (event.deltaY > 0 && scale > 0.2) {
        if (!canva) return;
        scale -= 0.1;
        canva.style.transform = `scale(${scale}, ${scale})`
      }
    }
    
    window.addEventListener('wheel', handleWheelEvent);
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp);
    size.addEventListener('change', handleChangeSize)
    canva.addEventListener('mousemove', handleMouseMove);
    canva.addEventListener('mousedown', handleMouseDown);
    canva.addEventListener('mouseup', handleMouseUp);
    canva.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('wheel', handleWheelEvent);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      size.removeEventListener('change', handleChangeSize);
      canva.removeEventListener('mousemove', handleMouseMove);
      canva.removeEventListener('mousedown', handleMouseDown);
      canva.removeEventListener('mouseup', handleMouseUp);
      canva.removeEventListener('mouseleave', handleMouseLeave);
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
