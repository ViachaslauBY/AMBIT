export function initHeroSlider() {
  const slider = document.querySelector('.hero__slider');
  const track = slider ? slider.querySelector('.hero__slider-track') : null;
  const slides = slider ? slider.querySelectorAll('.hero__slide') : [];
  
  const prevBtn = document.querySelector('.hero__arrow--prev');
  const nextBtn = document.querySelector('.hero__arrow--next');
  
  if (!track || slides.length === 0) return;

  const totalSlides = slides.length;
  let currentIndex = 0;
  let isAnimating = false;
  const transitionDuration = 600;

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex = index;
    track.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    setTimeout(() => { isAnimating = false; }, transitionDuration);
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  }

  // 1. Клики по стрелкам
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // 2. Клавиатура
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  // 3. Свайпы пальцем (для мобильных)
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50; // Минимальное расстояние свайпа в пикселях
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide(); // Свайп влево (палец идет влево) -> следующий слайд
      } else {
        prevSlide(); // Свайп вправо (палец идет вправо) -> предыдущий слайд
      }
    }
  }
}