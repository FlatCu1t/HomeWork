const slides = document.querySelector('.carousel-slides');
const slideCount = document.querySelectorAll('.carousel-slide').length;
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

    function showNextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlidePosition();
}

function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlidePosition();
}

prevButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide);

//setInterval(showNextSlide, 3000);

//HEADER

const header_slides = document.querySelector('.header_carousel-slides');
const header_slideCount = document.querySelectorAll('.header_carousel-slide').length;
const header_prevButton = document.getElementById('header_prev');
const header_nextButton = document.getElementById('header_next');
let header_currentIndex = 0;

function header_updateSlidePosition() {
    header_slides.style.transform = `translateX(-${header_currentIndex * 100}%)`;
}

function header_showNextSlide() {
    header_currentIndex = (header_currentIndex + 1) % header_slideCount;
    header_updateSlidePosition();
}

function header_showPrevSlide() {
    header_currentIndex = (header_currentIndex - 1 + header_slideCount) % header_slideCount;
    header_updateSlidePosition();
}

header_prevButton.addEventListener('click', header_showPrevSlide);
header_nextButton.addEventListener('click', header_showNextSlide);

setInterval(header_showNextSlide, 3500);