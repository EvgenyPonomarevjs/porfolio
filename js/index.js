
//const bigBox = prompt('Привет друзья');

const presentOrderBtn = document.querySelector('.present__order-btn');
const pageOverlayModal = document.querySelector('.page__overlay_modal');
const modalClose = document.querySelector('.modal__close');
//Удаление элимента
//presentOrderBtn.remove();
//Изменить текст в элементе
//presentOrderBtn.textContent = 'Кликни'
//Добавить верстку
//presentOrderBtn.innerHTML = '<h1>Кликни</h1>';
//Добавление класса
//pageOverlayModal.classList.add('page__overlay_modal_open')
//Удаление класса
//pageOverlayModal.classList.remove('page__overlay_modal_open')

const handlerModel = (openBtn, modal, openSelector, closeTrigger, sk) => {
//Переменная прозрачности
  let opacity = 0;
  const speed = {
    slow: 10,
    medium: 5,
    fast: 1,
    default: 3,
  };
  //Вещаем на кнопку событие клика и сразу задаем событие открытие модалки
  openBtn.addEventListener('click', () => {
    //При открытие опасити равно 0
    modal.style.opacity = opacity
    modal.classList.add(openSelector)

    //Интервальная функция
    const timer = setInterval(() => {
      //Увкличивать опасити на 0.02
      opacity += 0.02;
      modal.style.opacity = opacity
      //Если опасити >=1 остановить timer
      if (opacity >= 1) clearInterval(timer)
      //Тернарный оператор. Если то что мы передали наййдется то вернется это число, если нет то андефайд(0-false/1 и далее true)
    }, speed[sk] ? speed[sk] : speed.default)
  })
  closeTrigger.addEventListener('click', () => {

    const timer = setInterval(() => {
      opacity -= 0.02;
      modal.style.opacity = opacity;
      if (opacity <=0) {
      clearInterval(timer)
      modal.classList.remove(openSelector)
      }
    }, speed[sk] ? speed[sk] : speed.default)
  })
};
handlerModel(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 'slow');
//Открыте и закрытие модального окна (все что выше!!!)


