const swiperForm = new Swiper('.form', {
  slidesPerView: 1,
  effect: "cube",
  allowTouchMove: false,

});

const swiperFeedback = new Swiper('.feedback__slider', {
  spaceBetween: 20,
  slidesPerView: 2.7,
});

const butNext = document.querySelectorAll('.form__next');
butNext.forEach(element => {
  element.addEventListener('click', function(){
    

    // Смена слайда
    swiperForm.slideNext();
  });
});