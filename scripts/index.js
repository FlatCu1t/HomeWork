import { Functions } from "./functions.js";
const functions = new Functions();

$(function() {
  $('.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    dots: true,
    navText: ['‹', '›'],
    autoplay: false,
    autoplayTimeout: 5000,
  });
  $('[data-fancybox="gallery"]').fancybox({ buttons: ['zoom','slideShow','close'], loop: true, protect: true });
});