document.addEventListener("DOMContentLoaded", () => {
  const swiperForm = new Swiper('.form', {
    slidesPerView: 1,
    effect: "cube",
    // Запрещает прокрутку мышкой
    allowTouchMove: false,
  });

  const swiperFeedback = new Swiper('.feedback__slider', {

    slidesPerView: 1,
    spaceBetween: 25,

    breakpoints: {
      724: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 2.7,
        spaceBetween: 20,
      }
    },
  });

  // Фалажок в форме на времени рождения
  // В случае клика удаляем ошибки и обрабатываем input'ы
  const gButtonNR = document.querySelector('#form-notRemember');
  const gInputs = gButtonNR.closest('.form__slide').querySelectorAll('.require');
  gButtonNR.addEventListener('change', function(){
    gInputs.forEach(element => {
      formRemoveError(element);

      element.value = "";
      if(gButtonNR.checked)
        element.setAttribute('readonly', '');
      else
        element.removeAttribute('readonly');
    })
  })

  const butNext = document.querySelectorAll('.form__next');
  butNext.forEach(element => {
    // Клик по кнопке
    element.addEventListener('click', function(){
      const slide = element.closest('.form__slide');
      const require = slide.querySelectorAll('.require');
      const radioButtonsInSlide = slide.querySelectorAll('.require[type="radio"]');
      const buttonNoRemember = slide.querySelector('#form-notRemember');
      let errors = false;
      let butNRchecked = false;

      if(buttonNoRemember){
        if(buttonNoRemember.checked){
          butNRchecked = true;
        }
      }

      // Пребираем все input'ы
      if(!butNRchecked){
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



  // Бег полосочек
  document.querySelector('.form__done').addEventListener('click', function(){
    const popupComp = document.querySelectorAll('.popup-calc__completed');

      let prog = 0;
      let indexEl = 0;
      let timerId = setInterval(() => {
        let element = popupComp[indexEl];
        let span = element.querySelector('span');
        let percent = prog + '%';

        element.style.width = percent;
        span.textContent = percent;

        prog++;
      
        if(prog == 101){
          indexEl++;
          prog = 0;
        }
        
        if(indexEl == popupComp.length)
          clearInterval(timerId);
      }, 10);
    });

});
