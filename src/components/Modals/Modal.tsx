import { ReactNode, useEffect, useRef, useState } from "react"

import './modal.scss'

type ModalProps = {
  className?: string;
  isVisible: boolean;
  setIsVisible: (is: boolean) => void;
  children?: ReactNode;
}

export function Modal(props: ModalProps) {
  const modalref = useRef<HTMLDivElement>(null);

  // create close animation
  if (!props.isVisible) return null;

  setTimeout(() => {
    if (!modalref.current) return;
    modalref.current.style.top = '0px';
  }, 1)

  function handleCloseModal(event: any) {
    if (event.target === event.currentTarget) props.setIsVisible(false);
  }

  return (
    <div className="Modal flex flex-center fill-page" onClick={handleCloseModal} style={{ cursor: "default" }} ref={modalref}>
      <main className="modal-box">
        <section className={`${props.className} modal-content`}>
          {props.children}
        </section>
      </main>
    </div>
  )
}