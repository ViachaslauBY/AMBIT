export function initHeroSlider() {
  const slider = document.querySelector('.hero__slider');
  if (!slider) return;

  const track = slider.querySelector('.hero__slider-track');
  const slides = slider.querySelectorAll('.hero__slide');
  const prevBtn = slider.querySelector('.hero__arrow--prev');
  const nextBtn = slider.querySelector('.hero__arrow--next');
  
  if (slides.length === 0 || !track) return;

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

  // Обработчики кнопок
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Клавиатурное управление
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });
}