const swiper = new Swiper('.swiper.cont1', {
    // 슬라이드 움직이는 것에 대한 기본 옵션
    direction: 'horizontal',
    loop: true,
  
    // 동그라미 버튼에 관련된 옵션
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
        // dynamicBullets: true,
    },
  
    // 좌우 버튼 관련된 옵션
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 자동 실행에 관련된 옵션
    autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
    },

    // 화면 전환효과 flip으로 사용
    effect: 'fade',
    cubeEffect: {
        slideShadows: false,
    },
});