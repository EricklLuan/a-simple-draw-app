import { useState } from 'react';
import { Modal } from '../Modal'

import './modalnewcanva.scss'

type Vector2 = {
  x: number;
  y: number;
}

type ModalNewCanvaProps = {
  isVisible: boolean;
  setIsVisible: (is: boolean) => void;
  titleState: [ title: string, setTitle: (text: string) => void ]
  sizeState: [ size: Vector2, setSize: (size: Vector2) => void ]
}

export function ModalNewCanva(props: ModalNewCanvaProps) {
  
  const [ canvasWidth, setCanvasWidth ] = useState<number>(props.sizeState[0].x);
  const [ canvasHeight, setCanvasHeight ] = useState<number>(props.sizeState[0].y);
  const [ canvasTitle, setCanvasTitle ] = useState<string>(props.titleState[0]);

  function handleSubmitForm(event: any) {
    event.preventDefault();

    props.titleState[1](canvasTitle);
    props.sizeState[1]({ x: canvasWidth, y: canvasHeight });

    props.setIsVisible(false);
  }
  
  return (
    <Modal isVisible={props.isVisible} setIsVisible={props.setIsVisible} className='Modal-New-Canva flex flex-align'>
      <h1>New Canvas</h1>
      <form id="form-new-canva" className="flex" onSubmit={handleSubmitForm}>
        <section id="form-title-input" className="flex">
          <label htmlFor="canva-title">Title: </label>
          <input type="text" name="canva-title" id="canva-title" 
                 defaultValue='undefined' 
                 maxLength={30} 
                 onChange={(event) => setCanvasTitle(event.target.value)}
          />
        </section>
        
        <section id="form-size-input" className="flex">
          <label htmlFor="canva-width">Width: </label>
          <input type="number" name="canva-width" id="canva-width" 
                 defaultValue={500}
                 onChange={(event) => setCanvasWidth(parseInt(event.target.value))}
                 />
        </section>
        
        <section id="form-size-input" className="flex">
          <label htmlFor="canva-height">Height: </label>
          <input type="number" name="canva-height" id="canva-height" 
                 defaultValue={500}
                 onChange={(event) => setCanvasHeight(parseInt(event.target.value))}
                 />
        </section>

        <section id="form-buttons-input" className="flex">
          <button onClick={() => props.setIsVisible(false)}>Cancel</button>
          <button type="submit">Create</button>
        </section>
      </form>
    </Modal>
  )
}