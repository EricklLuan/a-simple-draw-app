import { useEffect, useRef, useState } from 'react'
import { Canva } from '../../components/Canva/Canva'

import './home.scss'

type Vector2 = {
  x: number;
  y: number;
}

export function Home() {
  const [ posX, setPosX ] = useState(0);
  const [ posY, setPosY ] = useState(0);
  const [ canvasSize ] = useState<Vector2>({ x: 500, y: 500 });

  const canvas = document.getElementById("canvas")
  const home = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const homeRef = home.current;
    if (!homeRef) return;
    let isDown: boolean = false;
    let isClicked: boolean = false;
    let position: Vector2 = { x: (homeRef.offsetWidth/2) - (canvasSize.x/2), y: (homeRef.offsetHeight/2) - (canvasSize.y/2)};

    setPosX(position.x); setPosY(position.y);

    homeRef.addEventListener('mousemove', (event: MouseEvent) => {
      if (!homeRef) return;
      if (isDown && isClicked){
        
        position.x = event.pageX;
        position.y = event.pageY;
        
        canvas?.animate({ left: `${event.pageX}px`, top: `${event.pageY}px` }, 2000)
        setPosX(position.x); setPosY(position.y);
      }
    })

    homeRef.addEventListener('mousedown', (event: MouseEvent) => {
      isClicked = true;
    })

    homeRef.addEventListener('mouseup', () => {
      isClicked = false;
    })

    window.addEventListener('keyup', (event) => {
      if (event.key === " ") {
        isDown = false;
      }
    })

    window.addEventListener('keydown', (event) => {
      if (event.key === " ") {
        isDown = true;
      }
    })

    return () => {
      homeRef.removeEventListener('mousemove', () => {});
      homeRef.removeEventListener('mousedown', () => {});
      homeRef.removeEventListener('mouseup', () => {});
    }

  }, [canvas, canvasSize])

  return (
    <div className="Home fill-parent" ref={home}>
      <Canva 
        color='black'
        size={10}
        width={500}
        height={500}
        x={posX}
        y={posY}
      />
    </div>
  )
}