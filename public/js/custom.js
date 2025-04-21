function getYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // 숫자 타입 (암시적)
    const yearElement = document.querySelector("#displayYear");

    if (yearElement) {
        yearElement.innerHTML = currentYear.toString(); // 문자열로 변환
    } else {
        console.error("Element with id 'displayYear' not found.");
    }
}

// DOM이 로드된 후 실행되도록 설정
document.addEventListener("DOMContentLoaded", getYear);

// Slick Slider 초기화
$('.custom_slick_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    fade: true,
    adaptiveHeight: true,
    asNavFor: '.slick_slider_nav',
    responsive: [{
        breakpoint: 768,
        settings: {
            dots: false
        }
    }]
});

$('.slick_slider_nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.custom_slick_slider',
    centerMode: false,
    focusOnSelect: true,
    variableWidth: true
});
