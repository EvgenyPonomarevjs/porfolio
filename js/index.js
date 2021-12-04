// //открытие и скрытие header
// function toggletoggleCloseHeade() {
//   document.getElementById("close").classList.toggle("close__header");
// }
// function toggleOpenHeader() {
//   document.getElementById("close").classList.toggle("close__header");
// }

const disabledScroll = () => {
  //добавление отступа из-за отсутствия скрола
  const widthScroll = window.innerWidth - document.body.offsetWidth;
 // document.querySelector('.page__header').style.left = `calc(50% - ${720 + widthScroll/2}px)`
  
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
  overflow: hidden;
  top: -${document.body.scrollPosition}px;
  left: 0;
  height: 100vh;
  padding-right: ${widthScroll}px;
  `;
}
const enabledScroll = () => {
  document.body.style.cssText = '';
  window.scroll({top: document.body.scrollPosition})
}

{
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
const openModal = () => {
  disabledScroll();
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
};

const closeModal =  () => {
  enabledScroll();
  const timer = setInterval(() => {
    opacity -= 0.02;
    modal.style.opacity = opacity;
    if (opacity <=0) {
    clearInterval(timer)
    modal.classList.remove(openSelector)
    }
  }, speed[sk] ? speed[sk] : speed.default)
};

  //Вещаем на кнопку событие клика и сразу задаем событие открытие модалки
  openBtn.addEventListener('click', openModal);
  closeTrigger.addEventListener('click', closeModal);

  //event-объект события который создается в момент клика
  modal.addEventListener('click', (event) =>{
    if (event.target === modal) { 
    closeModal()  
    }

  })
};
handlerModel(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 'slow');
//Открыте и закрытие модального окна (все что выше!!!)
}

{
  const headerContactsBurger = document.querySelector('.header__contacts-burger');
  const headerContacts = document.querySelector('.header__contacts');

  const handlerBurger = (openBtn, menu, openSelector) => {
    openBtn.addEventListener('click', () => {
      if (menu.classList.contains(openSelector)) {
        menu.style.height = '';
        menu.classList.remove(openSelector)
      } else {
        
        menu.style.height = menu.scrollHeight + 'px';
        menu.classList.add(openSelector)
      }
    })
  };
  handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open');
}

{//Галерея
  const portfolioList = document.querySelector('.portfolio__list');
  const pageOverlay = document.createElement('div');
  pageOverlay.classList.add('page__overlay');


  portfolioList.addEventListener('click', (event) => {

    const card = event.target.closest('.card');

    if (card) {
      document.body.append(pageOverlay);
      const title = card.querySelector('.card__client');

      const picture = document.createElement('picture');
      picture.style.cssText = `
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 1440px;
      `;

      picture.innerHTML = `
      <source srcset="${card.dataset.fullImage}.avif" type="image/avif">
      <source srcset="${card.dataset.fullImage}.webp" type="image/webp">
      <img src="${card.dataset.fullImage}.jpg" alt="${title.textContent}">
      `;
      pageOverlay.append(picture);
      disabledScroll();
    }
  })
  pageOverlay.addEventListener('click', () => {
    pageOverlay.remove();
    pageOverlay.textContent = '';
    enabledScroll();
  })
}

{//Создания карточек на основе инфо из json
  const COUNT_CARD = 2;
  const portfolioList = document.querySelector('.portfolio__list');
  const portfolioAdd = document.querySelector('.portfolio__add');

  const getData = () => fetch('db.json')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw `Что то пошло не так попробуйте позже, ошибка: ${response.status}`;
        }
      })
      .catch(error => console.error(error));

  const createStore = async () => {
    const data = await getData();
    return {
      data,
      counter: 0,
      count: COUNT_CARD,
      get length() {
        return this.data.length;
      },
      get cardDatd() {
        const renderData = this.data.slice(this.counter, this.counter + this.count)
        this.counter += renderData.length;
        return renderData;
      }
    };
  };

  const renderCard = data => {
    const cards = data.map(({ preview, year, type, client, image }) => {

      const li = document.createElement('li');
      li.classList.add('portfolio__item');

      li.innerHTML = `
        <article class="card" tabindex="0" role="button" aria-label="открыть макет" data-full-image="${image}">
          <picture class="card__picture">
            <source srcset="${preview}.avif" type="image/avif">
            <source srcset="${preview}.webp" type="image/webp">
            <img src="${preview}.jpg" alt="превью game over" width="166" height="103">
          </picture>

          <p class="card__data">
            <span class="card__client">Клиент: ${client}</span>
            <time class="card__date" datetime="${year}">год: ${year}</time>
          </p>

          <h3 class="card__title">${type}</h3>
        </article>
      `;

      return li;
    })
    portfolioList.append(...cards)
  };
  const inintPortfolio = async () => {
    const store = await createStore();
    renderCard(store.cardDatd);
    portfolioAdd.addEventListener('click', () => {
      renderCard(store.cardDatd);
      if (store.length === store.counter) {
        portfolioAdd.remove();
      }
    })
  };
  inintPortfolio()
  }

