import { useEffect, useRef, useState } from 'react'

import { ModalNewCanva } from '../../components/Modals/ModalNewCanva/ModalNewCanva'
import { SideMenu } from '../../components/SideMenu/SideMenu'
import { Canva } from '../../components/Canva/Canva'

import './home.scss'

type Vector2 = {
  x: number;
  y: number;
}

export function Home() {
  const [ isVisibleCanvaModal, setIsVisibleCanvaModal ] = useState<boolean>(false);
  
  const [ canvasTitle, setCanvasTitle ] = useState<string>('undefined');
  const [ canvasSize, setCanvasSize ] = useState<Vector2>({ x: 500, y: 500 });
  
  const homes = useRef<HTMLDivElement>(null);
  const menus = useRef<HTMLElement>(null);

  useEffect(() => {
    const home = homes.current;
    const menu = menus.current;
    const canva = document.getElementById('canvas')
    if (!home) return;
    if (!canva) return;
    if (!menu) return;

    menu.style.cursor = "default";

    const newCanva = menu.childNodes[0].firstChild?.firstChild?.firstChild?.firstChild;
    console.log(newCanva);

    if (!newCanva) return;
    
    let isMouseDown: boolean = false;
    let isKeyDown: boolean = false;
    let x: number = home.offsetWidth/2 - canvasSize.x/2 + 100, 
        y: number = home.offsetHeight/2 - canvasSize.y/2;
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

    function handleMouseDown() {
      isMouseDown = true;
    }

    function handleMouseUp() {
      isMouseDown = false;
    }

    function handleOpenModal() {
      setIsVisibleCanvaModal(!isVisibleCanvaModal);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    home.addEventListener('mousemove', handleMouseMove);
    home.addEventListener('mousedown', handleMouseDown);
    home.addEventListener('mouseup', handleMouseUp);
    newCanva.addEventListener('click', handleOpenModal);
 
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      home.removeEventListener('mousemove', handleMouseMove);
      home.removeEventListener('mousedown', handleMouseDown);
      home.removeEventListener('mouseup', handleMouseUp);
      newCanva.removeEventListener('click', handleOpenModal);
    }

  }, [canvasSize, isVisibleCanvaModal])

  return (
    <>
      <SideMenu reference={menus}/>
  
      <main className="Home fill-parent" ref={homes}>
        <Canva
          title={canvasTitle}
          width={canvasSize.x}
          height={canvasSize.y}
        />
      </main>

        <ModalNewCanva isVisible={isVisibleCanvaModal} setIsVisible={setIsVisibleCanvaModal}
          titleState={[canvasTitle, setCanvasTitle]}
          sizeState={[canvasSize, setCanvasSize]}
        />
    </>
  )
}