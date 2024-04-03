const swiperForm = new Swiper('.form', {
  slidesPerView: 1,
  effect: "cube",
  // Запрещает прокрутку мышкой
  allowTouchMove: false,
});

const swiperFeedback = new Swiper('.feedback__slider', {
  spaceBetween: 20,
  slidesPerView: 2.7,
});

const butNext = document.querySelectorAll('.form__next');
butNext.forEach(element => {
  // Клик по кнопке
  element.addEventListener('click', function(){
    const slide = element.closest('.form__slide');
    const require = slide.querySelectorAll('.require');
    const radioButtonsInSlide = slide.querySelectorAll('.require[type="radio"]');
    let errors = false;

    // Пребираем все input'ы
    for(let i = 0; i < require.length; i++){
      let element = require[i];

      // Убираем все ошибки
      formRemoveError(element);

      // Вешаем событие на снятие ошибки
      element.addEventListener('click', function(){
        formRemoveError(this);
      });

      // Проверяем input'ы
      if(element.value.trim() === "") {
        formAddError(element);
        errors = true;
        // alert('Заполните обязательные поля!');
      }
    }

    // Проверяем radioButtons
    let radioChecked = false;
    if(radioButtonsInSlide.length == 0){ // Проверяем есть ли вообще radio
      radioChecked = true; // Кнопок нет
    }else{
      radioChecked = false; // Кнопки есть
    }

    radioButtonsInSlide.forEach(element => { // Проверяем есть ли выбранные
      if(element.checked) {                  
        radioChecked = true;
      }
    });

    if(radioChecked == false){
      radioButtonsInSlide.forEach(element => {
        formAddError(element);
      });
      errors = true;
    }

    if(errors == false) {
      swiperForm.slideNext();
    }

  });
});

function formAddError(input) {
  input.classList.add('_error');

  // Если радио
  if(input.type == 'radio'){
    let label = input.nextElementSibling;
    if(label.tagName.toLowerCase() == 'label')
      label.classList.add('_error');
  }
}

function formRemoveError(input) {
  input.classList.remove('_error');

  // Если радио
  if(input.type == 'radio'){
    let block = input.parentNode;
    let els = block.querySelectorAll('input, label');
    els.forEach(element => {
      element.classList.remove('_error');
    })
  }
}