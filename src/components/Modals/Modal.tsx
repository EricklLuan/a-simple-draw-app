import { ReactNode } from "react"
import './modal.scss'

type ModalProps = {
  className?: string;
  isVisible: boolean;
  setIsVisible: (is: boolean) => void;
  children?: ReactNode;
}

export function Modal(props: ModalProps) {

  if (!props.isVisible) return null

  function handleCloseModal(event: any) {
    if (event.target === event.currentTarget) props.setIsVisible(false);
  }

  return (
    <div className="Modal flex flex-center fill-page" onClick={handleCloseModal}>
      <main className="modal-box">
        <section className={`${props.className} modal-content`}>
          {props.children}
        </section>
      </main>
    </div>
  )
}