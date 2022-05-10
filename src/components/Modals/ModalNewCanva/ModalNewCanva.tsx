import { Modal } from '../Modal'

import './modalnewcanva.scss'

export function ModalNewCanva() {
  return (
    <Modal className='Modal-New-Canva flex flex-align'>
      <h1>New Canvas</h1>
      <form id="form-new-canva" className="flex">
        <section id="form-title-input" className="flex">
          <label htmlFor="canva-title">Title: </label>
          <input type="text" name="canva-title" id="canva-title" maxLength={30}/>
        </section>
        
        <section id="form-size-input" className="flex">
          <label htmlFor="canva-width">Width: </label>
          <input type="number" name="canva-width" id="canva-width" />
        </section>
        
        <section id="form-size-input" className="flex">
          <label htmlFor="canva-height">Height: </label>
          <input type="number" name="canva-height" id="canva-height" />
        </section>

        <section id="form-buttons-input" className="flex">
          <button>Cancel</button>
          <button type="submit">Create</button>
        </section>
      </form>
    </Modal>
  )
}