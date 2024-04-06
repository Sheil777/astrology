// Для работы данного скрипта необходимо только его подключить

const anchors = document.querySelectorAll('a[href*="#"]');

// for (let anchor of anchors) {
//     anchor.addEventListener("click", function (event) {
//         event.preventDefault();
//         const blockID = anchor.getAttribute("href");
//         document.querySelector(''+blockID).scrollIntoView(
//             {
//                 behavior: "smooth",
//                 block: "start"
//             }
//         )
//     })
// }

$('a[href^="#"').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
});