import type { IBlock } from "../types/services/block/Block";

function toggleModal(block: IBlock) {
  const modalRoot = document.querySelector('#modal');
  if (modalRoot) {
    const modalContentEl = modalRoot.querySelector('.modal__content');
    const modalOverlay = modalRoot.querySelector('.modal__overlay');
    const overlayClickHandler = () => toggleModal(block);

    if (modalContentEl && modalOverlay) {
      if (modalContentEl.childElementCount !== 0) {
        modalContentEl.innerHTML = '';
        modalRoot.removeAttribute('class');
        modalOverlay.replaceWith(modalOverlay.cloneNode(true));
      } else {
        modalContentEl.appendChild(block.getContent());
        modalRoot.setAttribute('class', 'opened');
        modalOverlay.addEventListener('click', overlayClickHandler);
      }
    }
  }
}

export default toggleModal;
