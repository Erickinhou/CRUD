window.addEventListener('load', start);

var globalNames = ['um', 'dois', 'três', 'quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  inputName = document.querySelector('#inputName');

  perventFormSubmit();
  activateInput();
  render();
}
function perventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');

  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(name) {
    globalNames.push(name);
  }

  function updateName(name) {
    globalNames[currentIndex] = name;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value) {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
      render();
    }
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function createDeleteButton(index) {
  function deleteName() {
    globalNames.splice(index, 1);
    render();
  }

  var button = document.createElement('button');
  button.classList.add('deleteButton');
  button.textContent = 'x';

  button.addEventListener('click', deleteName);
  return button;
}

function createSpan(name, index) {
  function editingItem() {
    inputName.value = name;
    inputName.focus();
    isEditing = true;
    currentIndex = index;
  }

  var span = document.createElement('span');
  span.classList.add('clickable');
  span.textContent = name;

  span.addEventListener('click', editingItem);
  return span;
}

function render() {
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  var ul = document.createElement('ul');
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');

    li.appendChild(createDeleteButton(i));
    li.appendChild(createSpan(currentName, i));
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
