import { useEffect, useRef, useState } from 'react'
import { Canva } from '../../components/Canva/Canva'

import './home.scss'

type Vector2 = {
  x: number;
  y: number;
}

export function Home() {
  const [ color, setColor ] = useState<string>("");
  const [ canvasSize ] = useState<Vector2>({ x: 600, y: 700 });
  
  const homes = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const home = homes.current;
    const canva = document.getElementById('canvas')
    if (!home) return;
    if (!canva) return;
    
    let isMouseDown: boolean = false;
    let isKeyDown: boolean = false;
    let x: number = window.innerWidth/2 - canvasSize.x/2, 
        y: number = window.innerHeight/2 - canvasSize.y/2;
    canva.style.left = `${x}px`
    canva.style.top = `${y}px`

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== " ") return;
      isKeyDown = true;
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key !== " ") return;
      isKeyDown = false;
    }

    function handleMouseMove(event: MouseEvent) {
      if (!canva) return;
      if (!isMouseDown || !isKeyDown) return;

      x += (event.movementX);
      y += (event.movementY) ;

      canva.style.left = `${x}px`;
      canva.style.top = `${y}px`;
    }

    function handleMouseDown(event: MouseEvent) {
      isMouseDown = true;
    }

    function handleMouseUp() {
      isMouseDown = false;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    home.addEventListener('mousemove', handleMouseMove);
    home.addEventListener('mousedown', handleMouseDown);
    home.addEventListener('mouseup', handleMouseUp);
 
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      home.removeEventListener('mousemove', handleMouseMove);
      home.removeEventListener('mousedown', handleMouseDown);
      home.removeEventListener('mouseup', handleMouseUp);
    }

  }, [canvasSize])

  function handleChangeColor(event: any) {
    setColor(event.target.value)
  }

  return (
    <div className="Home fill-parent" ref={homes}>
      <section id="menu">
        <input type="color" onChange={handleChangeColor}/>
      </section>
      <Canva
        color={color}
        size={14}
        width={canvasSize.x}
        height={canvasSize.y}
      ></Canva>
    </div>
  )
}