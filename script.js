document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.slide-item');
    const totalSlides = slides.length;

    // 요소가 없을 경우 오류 방지
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
        
        if (currentIndex <= 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }
        
        if (currentIndex >= totalSlides - slidesVisible) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    function updateSliderPosition() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const newTransform = -currentIndex * slideWidth;
        sliderContainer.style.transform = `translateX(${newTransform}px)`;
        updateButtonsState();
    }

    nextBtn.addEventListener('click', () => {
        if (!nextBtn.classList.contains('disabled')) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (!prevBtn.classList.contains('disabled')) {
            currentIndex--;
            updateSliderPosition();
        }
    });
    
    window.addEventListener('resize', () => {
        sliderContainer.style.transition = 'none';
        updateSliderPosition();
        setTimeout(() => {
            sliderContainer.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });

    updateSliderPosition();
});

        const newTransform = -currentIndex * slideWidth;
        sliderContainer.style.transform = `translateX(${newTransform}px)`;
        updateButtonsState(); // 슬라이드 위치 변경 후 버튼 상태 업데이트
    }

    nextBtn.addEventListener('click', () => {
        if (!nextBtn.classList.contains('disabled')) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (!prevBtn.classList.contains('disabled')) {
            currentIndex--;
            updateSliderPosition();
        }
    });
    
    window.addEventListener('resize', () => {
        sliderContainer.style.transition = 'none';
        updateSliderPosition();
        setTimeout(() => {
            sliderContainer.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });

    // 초기 로딩 시 위치 및 버튼 상태 설정
    updateSliderPosition();
});