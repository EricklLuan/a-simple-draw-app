import { useState } from "react";

import { Modal } from "../Modals/Modal"

import creditsIcon from "../../assets/creator-icon.svg"
import twitterIcon from "../../assets/twitter.svg"
import githubIcon from "../../assets/github.svg"
import iconIcon from "../../assets/i-icon.png"

import "./credits.scss"

export function Credits() {

  const [ visible, setVisible ] = useState<boolean>(false);

  return(
    <>
      <Modal isVisible={visible} setIsVisible={setVisible} className="Modal-Credits">
        <h1>Criador</h1>
        <main>
          <img src={iconIcon} alt="its i" />
          <p>Erick Luan</p>
          <section id="creator-info">
            <a href="https://github.com/EricklLuan/a-simple-draw-app" target="_blank"> <img src={githubIcon} alt="" /> </a>
            <a href="https://twitter.com/EricklLuan" target="_blank"> <img src={twitterIcon} alt="" /> </a>
          </section>
        </main>
      </Modal>

      <button onClick={() => setVisible(true)} className="Credits-Button flex flex-center">
        <img src={creditsIcon} alt="pessoa com linhas ao lado" />
        <section id="tootip">Créditos</section>
      </button>
    </>
  );
}