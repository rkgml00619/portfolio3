const swiperInterior = new Swiper('.swiper.interior', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    loopAdditionalSlides: 1,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
    
    breakpoints: {
        768: {
            slidesPerView: 3,
            centeredSlides: true,
        },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

const swiperItems = new Swiper('.swiper.items', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    loopAdditionalSlides: 1,
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 0,
    
    breakpoints: {
        768: {
            slidesPerView: 3,
            centeredSlides: true,
        },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});