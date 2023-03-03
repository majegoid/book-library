/** Toggles the modal display on click of the modal background, then resets the
 * form. */

// MODAL Document Queries
const modalClickBg = document.querySelector('div.modal-click-bg');
const modal = document.querySelector('.modal');

/** Sets up the modal in the DOM. */
function setup() {
  hideModal();
  modalClickBg.onclick = hideModal;
  modal.onclick = (e) => e.stopPropagation();
}

/** Show the Modal. */
function showModal() {
  modalClickBg.style.display = 'block';
}

/** Hide the Modal. */
function hideModal() {
  modalClickBg.style.display = 'none';
}

/** Updates the Modal contents. */
function updateModalContents(modalContents) {
  modal.replaceChildren(modalContents);
}

export const modalController = {
  setup,
  showModal,
  hideModal,
  updateModalContents,
};
