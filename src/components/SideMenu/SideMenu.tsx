import { useEffect, useRef, useState } from "react";
import "./sidemenu.scss"

export function SideMenu() {

  const [ size, setSize ] = useState<number>(14);
  const [ color, setColor ] = useState<Array<number>>([255, 255, 255]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 250;
    canvas.height = 200;

    const context = canvas.getContext('2d');
    if (!context) return;

    let isClicked: boolean = false;
    let x = 0, y = 0;

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

    context.beginPath();
    context.fillStyle = "black";
    context.lineWidth = 2;
    context.arc(x, y, 7, 0, 2 * Math.PI, false);
    context.stroke();
    context.closePath();
    
    function handleMouseMoveEvent(event: MouseEvent) {
      if (!isClicked) return;
      x = event.offsetX;
      y = event.offsetY;
      
      if (!context) return;
      if (!canvas) return;
      context.fillStyle = gradientH;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = gradientV;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.fillStyle = "black";
      context.lineWidth = 2;
      context.arc(x, y, 7, 0, 2 * Math.PI, false);
      context.stroke();
      context.closePath();
      
      const img = context.getImageData(x, y, 1, 1);
      setColor([img.data[0], img.data[1], img.data[2]])
    }

    function handleClickEvent(event: MouseEvent) {
      isClicked = true;
      x = event.offsetX;
      y = event.offsetY;

      if (!context) return;
      if (!canvas) return;
      context.fillStyle = gradientH;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = gradientV;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.fillStyle = "black";
      context.lineWidth = 2;
      context.arc(x, y, 7, 0, 2 * Math.PI, false);
      context.stroke();
      context.closePath();

      const img = context.getImageData(x, y, 1, 1);
      setColor([img.data[0], img.data[1], img.data[2]])
    }

    function handleMouseLeave() {
      isClicked = false;
    }

    function handleMouseUpEvent() {
      isClicked = false;
    }

    canvas.addEventListener('mousemove', handleMouseMoveEvent);
    canvas.addEventListener('mousedown', handleClickEvent);
    canvas.addEventListener('mouseup', handleMouseUpEvent);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mouseleave', handleClickEvent);
      canvas.removeEventListener('mousedown', handleClickEvent);
      canvas.removeEventListener('mousemove', handleClickEvent);
      canvas.removeEventListener('mouseup', handleClickEvent);
    }

  }, []);

  function handleChangeSize(event: any) {
    setSize(event.target.value)
  }

  return(
    <menu className="Toolbar-Menu" type="toolbar">
      <div id="states">
        <ul>
          <li><button onClick={(event) => {console.log(event)}}></button></li>
          <li><button></button></li>
          <li><button></button></li>
          <li><button></button></li>
          <li><button></button></li>
          <li><button></button></li>
        </ul>
      </div>
      <div id="picker">
        <canvas id="color-wheel" ref={canvasRef}></canvas>
        <span id="color-wheel-text" style={{
          background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        }}>
          <p>rgb({`${color[0]}, ${color[1]}, ${color[2]}`})</p>
        </span>
      </div>

      <div id="size">
        <label htmlFor="change-size">Pencil Size: </label>
        <section>
          <input type="range" name="size-range" id="size-range" min={5} max={200} onChange={handleChangeSize}/>
          <span>{size}px</span>
        </section>
      </div>

    </menu>
  )
}