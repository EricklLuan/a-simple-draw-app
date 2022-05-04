import { useEffect, useRef, useState } from 'react'
import { Canva } from '../../components/Canva/Canva'

import './home.scss'

type Vector2 = {
  x: number;
  y: number;
}

export function Home() {
  const [ canvasPosi, setCanvasPosi ] = useState<Vector2>({ x: 0, y: 0 });
  const [ canvasSize ] = useState<Vector2>({ x: 500, y: 500 });

  const home = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
  }, [])

  return (
    <div className="Home fill-parent" ref={home}>
      <Canva
        color='black'
        size={5}
        width={canvasSize.x}
        height={canvasSize.y}
      />
    </div>
  )
}