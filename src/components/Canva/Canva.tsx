import { useEffect, useRef } from 'react'

import './canva.scss'

type Vector2 = {
  x: number;
  y: number;
}

type CanvaProps = {
  title: string;
  width?: number;
  height?: number;
}

export function Canva(props: CanvaProps) {

  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canva = canvas.current;

    if (!canva) return;
    
    let isDrawing: boolean = false;
    let isDraging: boolean = false;
    let isEraser: boolean = false;
    let isPencil: boolean = true;

    let start: Vector2 = { x: 0, y: 0 }
    let end: Vector2 = { x: 0, y: 0 }
    let pencilSize: number = 14;
    let scale: number = 1;

    const home = canva.parentElement;
    const context = canva.getContext('2d')
    
    if (!home) return;
    const tools = canva.parentElement.previousSibling?.childNodes[0].firstChild;
    const color = canva.parentElement.previousSibling?.childNodes[1].lastChild?.firstChild;
    const size = canva.parentElement.previousSibling?.childNodes[2].firstChild?.firstChild?.lastChild;
    
    if (!tools) return;
    if (!color) return;
    if (!size) return;
    if (!context) return;
    
    function handleMouseLeave() { isDrawing = false; }
    function handleChangeSize(event: any) { pencilSize = event.target.value; }
    function handleMouseMove(event: MouseEvent) {
      if (isPencil) {
        if (isDrawing && context) {
          if (!canva) return;
          if (!color) return;
          if (isDraging) return;
  
          start = { x: end.x, y: end.y }
          end   = { x: event.offsetX, y: event.offsetY}
          
          context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = `${color.textContent}`;
            context.lineWidth = pencilSize;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.stroke();
          context.closePath();
        }
      } else if (isEraser) {
        if (isDrawing && context) {
          if (!canva) return;
          if (isDraging) return;
  
          start = { x: end.x, y: end.y }
          end   = { x: event.offsetX, y: event.offsetY}
          
          context.beginPath();
            context.globalCompositeOperation = 'destination-out'
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.lineWidth = pencilSize;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            context.stroke();
          context.closePath();
        }
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
      if (!canva) return;
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
    
    // Zoom In and Zoom out
    function handleWheelEvent(event: WheelEvent) {
      if (event.deltaY < 0 && scale < 10.0) {
        if (!canva) return;
        scale += 0.1;
        canva.style.transform = `scale(${scale}, ${scale})`
      } else if (event.deltaY > 0 && scale > 0.2) {
        if (!canva) return;
        scale -= 0.1;
        canva.style.transform = `scale(${scale}, ${scale})`
      }
    }
    
    function handleSaveImage() {
      if (!canva) return;
      const data = canva.toDataURL('image/png', 1.0);
      const a = document.createElement('a');
      a.href = data;
      a.download = `${props.title}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    function handleChangeToolToPencil(event: any) {
      isEraser = false;
      isPencil = true;
      event.currentTarget.style.boxShadow = `0px -2px 4px gray`;
      event.currentTarget.style.transition = `box-shadow 0.5s ease-in-out`
      event.currentTarget.parentElement.parentElement.childNodes[3].firstChild.style.boxShadow = `none`;
    }

    function handleChangeToolToEraser(event: any) {
      isPencil = false;
      isEraser = true;
      event.currentTarget.style.boxShadow = `-1px -2px 3px rgba(128, 128, 128, 0.6)`
      event.currentTarget.style.transition = `box-shadow 0.5s ease-in-out`
      event.currentTarget.parentElement.parentElement.childNodes[2].firstChild.style.boxShadow = `none`;
    }
    
    home.addEventListener('wheel', handleWheelEvent);
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp);

    tools.childNodes[1].childNodes[0].addEventListener('click', handleSaveImage);
    tools.childNodes[2].childNodes[0].addEventListener('click', handleChangeToolToPencil);
    tools.childNodes[3].childNodes[0].addEventListener('click', handleChangeToolToEraser);
    size.addEventListener('change', handleChangeSize)
    
    canva.addEventListener('mousemove', handleMouseMove);
    canva.addEventListener('mousedown', handleMouseDown);
    canva.addEventListener('mouseup', handleMouseUp);
    canva.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      home.removeEventListener('wheel', handleWheelEvent);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
     
      tools.childNodes[1].childNodes[0].removeEventListener('click', handleSaveImage);
      tools.childNodes[2].childNodes[0].removeEventListener('click', handleChangeToolToPencil);
      tools.childNodes[3].childNodes[0].removeEventListener('click', handleChangeToolToEraser);
      size.removeEventListener('change', handleChangeSize);
     
      canva.removeEventListener('mousemove', handleMouseMove);
      canva.removeEventListener('mousedown', handleMouseDown);
      canva.removeEventListener('mouseup', handleMouseUp);
      canva.removeEventListener('mouseleave', handleMouseLeave);
    }
    
  }, [props.title])

  return (
    <>
      <canvas width={props.width} height={props.height} id='canvas' ref={canvas}></canvas>
    </>
  )
}
