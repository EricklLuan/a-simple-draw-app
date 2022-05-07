import { useEffect, useRef, useState } from "react";
import "./sidemenu.scss"

export function SideMenu() {

  const [ size, setSize ] = useState<number>(14);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    const gradientH = context.createLinearGradient(0, 0, canvas.width, 0);
    gradientH.addColorStop(0, "rgb(255, 0, 0)"); 
    gradientH.addColorStop(1/6, "rgb(255, 255, 0)");
    gradientH.addColorStop(2/6, "rgb(0, 255, 0)"); 
    gradientH.addColorStop(3/6, "rgb(0, 255, 255)");
    gradientH.addColorStop(4/6, "rgb(0, 0, 255)");
    gradientH.addColorStop(5/6, "rgb(255, 0, 255)");
    gradientH.addColorStop(1, "rgb(255, 0, 0)"); 

    context.fillStyle = gradientH;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const gradientV = context.createLinearGradient(0, 0, 0, canvas.height);
    gradientV.addColorStop(0, "rgba(255, 255, 255, 1)"); 
    gradientV.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    gradientV.addColorStop(0.5, "rgba(0, 0, 0, 0)"); 
    gradientV.addColorStop(1, "rgba(0, 0, 0, 1)"); 

    context.fillStyle = gradientV;
    context.fillRect(0, 0, canvas.width, canvas.height);

    function handleClickEvent(event: MouseEvent) {
      const x = event.offsetX;
      const y = event.offsetY;

      if (!context) return;
      const img = context.getImageData(x, y, 1, 1);

      console.log(img.data[0], img.data[1], img.data[2]);
    }

    canvas.addEventListener('click', handleClickEvent);

    return () => {
      canvas.removeEventListener('click', handleClickEvent);
    }

  }, []);

  function handleChangeSize(event: any) {
    setSize(event.target.value)
  }

  return(
    <menu className="Toolbar-Menu" type="toolbar">
      <div id="color">
        <label htmlFor="color-picker">Pencil Color: </label>
        <input type="color" name="color-picker" id="color-picker" />
      </div>

      <div id="size">
        <label htmlFor="change-size">Pencil Size: </label>
        <section>
          <input type="range" name="size-range" id="size-range" min={5} max={200} onChange={handleChangeSize}/>
          <span>{size}px</span>
        </section>
      </div>

      <canvas id="color-wheel" width={300} height={200} ref={canvasRef}>

      </canvas>
    </menu>
  )
}