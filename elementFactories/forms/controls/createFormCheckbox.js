/** Creates a form checkbox. */
export function createFormCheckbox(id, labelText, name, checked = false) {
  // title div
  const containerDiv = document.createElement('div');
  containerDiv.className = 'form-control';
  // label
  const label = document.createElement('label');
  label.className = 'label-container';
  label.for = id;
  // TODO: find out if you can append child elements next to text node
  label.textContent = labelText;
  // checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.name = name;
  checkbox.checked = checked;
  label.appendChild(checkbox);
  // checkmark (?)
  const checkmarkOverlay = document.createElement('span');
  checkmarkOverlay.className = 'checkmark';
  label.appendChild(checkmarkOverlay);
  containerDiv.appendChild(label);
  // end label
  return containerDiv;
}
