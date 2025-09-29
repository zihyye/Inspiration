document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.slide-item');
    const totalSlides = slides.length;

    if (!sliderContainer || !prevBtn || !nextBtn || slides.length === 0) {
        console.error("슬라이더 필수 요소가 없습니다.");
        return;
    }

    let currentIndex = 0;

    function getSlidesVisible() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function updateButtonsState() {
        const slidesVisible = getSlidesVisible();
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= totalSlides - slidesVisible;

        // CSS 스타일 적용을 위해 disabled 클래스도 추가/제거
        prevBtn.classList.toggle('disabled', prevBtn.disabled);
        nextBtn.classList.toggle('disabled', nextBtn.disabled);
    }

    function updateSliderPosition() {
        // --- 핵심 변경점 ---
        // '너비'를 계산하는 대신, 이동할 목표 슬라이드의 '실제 위치'를 직접 가져옵니다.
        // 이 방법은 패딩, 여백, 소수점 오차 등 모든 문제를 해결합니다.
        const targetSlide = slides[currentIndex];
        const newTransformValue = -targetSlide.offsetLeft;
        
        sliderContainer.style.transform = `translateX(${newTransformValue}px)`;
        updateButtonsState();
    }

    nextBtn.addEventListener('click', () => {
        if (!nextBtn.disabled) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (!prevBtn.disabled) {
            currentIndex--;
            updateSliderPosition();
        }
    });
    
    window.addEventListener('resize', () => {
        sliderContainer.style.transition = 'none'; // 리사이즈 중에는 애니메이션 효과를 잠시 끔
        updateSliderPosition();
        // 약간의 딜레이 후 애니메이션 효과를 다시 켬
        setTimeout(() => {
            sliderContainer.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });

    // 초기 로딩 시 위치 및 버튼 상태 설정
    updateSliderPosition();
});
