// К ссылкам, при клике на которые, должен открываться popup
// нужно дописать класс popup-link
//
// Объекты, которые должны закрывать popup - .popup-close
//
// Фиксированным объектам (которые прыгают при открытии)
// прописать .lock-padding

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const popupCloseIcon = document.querySelectorAll('.popup-close');

let unlock = true;

const timeout = 800; // transition в css

// Открытие popup при клике на .popup-link
if(popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', ''); // Имя popup который нужно открыть
            const currentPopup = document.getElementById(popupName); // Popup который должны открыть
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

// Закрытие popup при клике на .popup-close
if(popupCloseIcon.length > 0) {
    for(let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if(currentPopup && unlock){
        // Если есть открытые popup'ы, то закрываем их
        const popupActive = document.querySelector('.popup.open');
        if(popupActive){
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }

        // Открываем popup
        currentPopup.classList.add('open');

        // Добавляем событие для закрытия popup
        if(!currentPopup.classList.contains('popup__noClose')){
            currentPopup.addEventListener('click', function (e){
                // Если у родителей нажатой области нет .popup__content, значит это темная область
                if(!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }
}

function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + 'px';

    // Всем тегам с классом lockPadding добавляем справа отступ на ширину полосы скролла
    if(lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            // let paddingRight = getComputedStyle(el).paddingRight;
            // el.style.paddingRight = parseInt(paddingRight) + parseInt(lockPaddingValue) + "px";
            el.style.paddingRight = lockPaddingValue;
            el.style.boxSizing = 'border-box'; // Моя дописка, вдруг в css его нет
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function (){
        unlock = true;
    }, timeout);
}

function popupClose(popupActive, doUnlock = true){
    if(unlock) {
        popupActive.classList.remove('open');
        if(doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyUnlock(){
    setTimeout(function () {
        if(lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                //el.style.paddingRight = '0px';
                el.removeAttribute('style');
            }
        }
        body.style.paddingRight = '0px';
        if(document.querySelector(".header_phone") == null) // Если открыто мобильное меню
            body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function (){
        unlock = true;
    }, timeout);
}

// Закрытие popup по нажатию на кнопку Esc
document.addEventListener('keydown', function (e){
    if(e.which == 27) {
        const popupActive = document.querySelector('.popup.open');
        if(!popupActive.classList.contains('popup__noClose'))
            popupClose(popupActive);
    }
});
