import { useState } from "react";
import "./sidemenu.scss"

export function SideMenu() {

  const [ size, setSize ] = useState<number>(14);

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
    </menu>
  )
}