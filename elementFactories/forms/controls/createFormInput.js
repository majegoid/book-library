/** Creates a form input control. */
export function createFormInput(id, labelText, name, placeholder = '') {
  if (placeholder === '') {
    placeholder = labelText;
  }
  // title div
  const containerDiv = document.createElement('div');
  containerDiv.className = 'form-control';
  // label
  const label = document.createElement('label');
  label.for = id;
  label.textContent = labelText;
  containerDiv.appendChild(label);
  // input
  const input = document.createElement('input');
  input.type = 'text';
  input.id = id;
  input.name = name;
  input.placeholder = placeholder;
  containerDiv.appendChild(input);
  // success icon
  const successIcon = document.createElement('i');
  successIcon.className = 'fas fa-check-circle';
  containerDiv.appendChild(successIcon);
  // error icon
  const errorIcon = document.createElement('i');
  errorIcon.className = 'fas fa-exclamation-circle';
  containerDiv.appendChild(errorIcon);
  // error message
  const errorMessage = document.createElement('small');
  errorMessage.textContent = 'Error message';
  containerDiv.appendChild(errorMessage);
  return containerDiv;
}
