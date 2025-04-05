const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slider = document.querySelector('.slider');
const indicators = document.querySelectorAll('.indicator');
let slideIndex = 1; // Start from the first image (which is the second element due to cloning)
let isPaused = false;

function updateSlider() {
    const offset = slideIndex * -100 / 3;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === (slideIndex - 1) % 3);
    });
}

prevButton.addEventListener('click', () => {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : 9;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    slideIndex = (slideIndex < 10) ? slideIndex + 1 : 1;
    updateSlider();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        slideIndex = index + 1;
        updateSlider();
    });
});

function autoSlide() {
    if (!isPaused) {
        slideIndex = (slideIndex < 10) ? slideIndex + 1 : 1;
        updateSlider();
    }
}

setInterval(autoSlide, 3000);

document.querySelector('.slider-container').addEventListener('mouseover', () => {
    isPaused = true;
});

document.querySelector('.slider-container').addEventListener('mouseout', () => {
    isPaused = false;
});

// Handle infinite loop effect
slider.addEventListener('transitionend', () => {
    if (slideIndex === 0) {
        slider.style.transition = 'none';
        slideIndex = 9;
        slider.style.transform = `translateX(${-900 / 3}%)`;
    } else if (slideIndex === 10) {
        slider.style.transition = 'none';
        slideIndex = 1;
        slider.style.transform = `translateX(${-100 / 3}%)`;
    }
});

// Initial setup
updateSlider();
