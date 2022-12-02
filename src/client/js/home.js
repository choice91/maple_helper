const $characterPlusBtn = document.querySelector(
  '.home-container__add-character'
);
const $characterDeleteBtn = document.querySelector(
  '.home-container__delete-character'
);
const $table = document.querySelector('.home-container__table');
const $modal = document.querySelector('.modal');
const $modalInput = document.querySelector('.modal__input');
const $modalSubmitBtn = document.querySelector('.modal__submit');
const $modalCancelBtn = document.querySelector('.modal__cancel');
const $modalErrorMsg = document.querySelector('.modal__error-msg');

const hiddenModal = () => $modal.classList.add('hidden');
const showErrorMsg = () => $modalErrorMsg.classList.remove('hidden');
const hiddenErrorMsg = () => $modalErrorMsg.classList.add('hidden');

const openModal = () => {
  $modalInput.value = '';
  $modal.classList.remove('hidden');
};

const addCharacter = async () => {
  const nickname = $modalInput.value;

  try {
    const response = await (
      await fetch('/quest/nickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
        }),
      })
    ).json();

    if (!response.ok) {
      showErrorMsg();
      $modalErrorMsg.textContent = response.message;
      return;
    }

    const ul = document.createElement('ul');
    const nicknameBlock = document.createElement('li');
    nicknameBlock.innerText = nickname;
    ul.appendChild(nicknameBlock);

    for (let i = 0; i < 10; i += 1) {
      const li = document.createElement('li');
      li.innerHTML = '<input type="checkbox" />';
      ul.appendChild(li);
    }

    $table.appendChild(ul);

    hiddenModal();
  } catch (err) {
    console.error(err);
    alert('알 수 없는 에러 발생. 다시 시도해주세요.');
  }
};

const addCharacterEnter = (e) => {
  if (e.keyCode === 13 && $modalInput.value !== '') {
    e.preventDefault();
    $modalSubmitBtn.click();
  }
};

const deleteCharacter = () => {
  console.log('삭제');
  hiddenModal();
};

const modalCancel = () => {
  hiddenModal();
  hiddenErrorMsg();
};

$characterPlusBtn.addEventListener('click', openModal);
$characterDeleteBtn.addEventListener('click', deleteCharacter);
$modalInput.addEventListener('keydown', addCharacterEnter);
$modalSubmitBtn.addEventListener('click', addCharacter);
$modalCancelBtn.addEventListener('click', modalCancel);
