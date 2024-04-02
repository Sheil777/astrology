const swiperForm = new Swiper('.form', {
  slidesPerView: 1,
  effect: "cube",
  // allowTouchMove: false,
});

const swiperFeedback = new Swiper('.feedback__slider', {
  spaceBetween: 20,
  slidesPerView: 2.7,
});

const butNext = document.querySelectorAll('.form__next');
butNext.forEach(element => {
  element.addEventListener('click', function(){
    const slide = element.closest('.form__slide');
    const require = slide.querySelectorAll('.require');

    console.log(require);

    // Смена слайда
    // swiperForm.slideNext();
  });
});