import { ReactNode } from "react"

import './modal.scss'

type ModalProps = {
  children?: ReactNode;
  className?: string;
}

export function Modal(props: ModalProps) {
  return (
    <div className="Modal flex flex-center fill-page">
      <main className="modal-box">
        <section className={`${props.className} modal-content`}>
          {props.children}
        </section>
      </main>
    </div>
  )
}