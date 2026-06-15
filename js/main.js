// ----------------------------------------------------------------------BurgerMenu-------------------------------
function initBurgerMenu() {
  const burger = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('.header__mobile-menu');
  const overlay = document.querySelector('.header__overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (!burger || !mobileMenu) return;

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('header__mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    overlay.classList.add('header__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('header__mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('header__overlay--visible');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Клик по бургеру
  burger.addEventListener('click', toggleMenu);

  // Клик по overlay (закрытие)
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Закрытие при клике по ссылке
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      burger.focus();
    }
  });

  // Закрытие при ресайзе на десктоп
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && burger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}



// ----------------------------------------------------------------------Slider-----------------------------------
function initHeroSlider() {
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



// ----------------------------------------------------------------------Tabs-----------------------------------
function initSolutionsTabs() {
  const tabs = document.querySelectorAll('.solutions__tab');
  const panels = document.querySelectorAll('.solutions__panel');
  const indicator = document.querySelector('.solutions__tab-indicator');
  const tabsContainer = document.querySelector('.solutions__tabs');

  if (tabs.length === 0 || panels.length === 0) return;

  function updateIndicator(activeTab) {
    if (!indicator || !tabsContainer) return;
    
    const tabsRect = tabsContainer.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    
    // Позиция относительно контейнера табов
    const left = tabRect.left - tabsRect.left;
    const width = tabRect.width;
    
    indicator.style.left = `${left}px`;
    indicator.style.width = `${width}px`;
  }

  function switchTab(targetTab) {
    tabs.forEach(tab => {
      tab.classList.remove('solutions__tab--active');
      tab.setAttribute('aria-selected', 'false');
    });

    panels.forEach(panel => {
      panel.classList.remove('solutions__panel--active');
      panel.hidden = true;
    });

    targetTab.classList.add('solutions__tab--active');
    targetTab.setAttribute('aria-selected', 'true');

    const targetPanelId = targetTab.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
      targetPanel.classList.add('solutions__panel--active');
      targetPanel.hidden = false;
    }

    updateIndicator(targetTab);
  }

  // Инициализация
  const activeTab = document.querySelector('.solutions__tab--active');
  if (activeTab) {
    setTimeout(() => updateIndicator(activeTab), 10);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab));

    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIndex = Array.from(tabs).indexOf(tab);
        const nextIndex = e.key === 'ArrowRight'
          ? (currentIndex + 1) % tabs.length
          : (currentIndex - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        switchTab(tabs[nextIndex]);
      }
    });
  });

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.solutions__tab--active');
    if (currentActive) updateIndicator(currentActive);
  });
}



// ----------------------------------------------------------------------Filter----------------------------------
function initNewsFilter() {
  const filterBtns = document.querySelectorAll('.news__filter-btn');
  const allLink = document.querySelector('.news__all-link');
  const viewBtns = document.querySelectorAll('.news__view-btn');
  const sortBtns = document.querySelectorAll('.news__sort-btn');
  const gridContainer = document.querySelector('.news__grid');
  const listContainer = document.querySelector('.news__list');
  const gridCards = document.querySelectorAll('.news-card');
  const listItems = document.querySelectorAll('.news__list-item');

  let currentFilter = 'all';
  let currentView = 'grid';

  // Применение фильтра
  function applyFilter(category) {
    currentFilter = category;

    // Фильтрация карточек (сетка)
    gridCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.classList.remove('news-card--hidden');
      } else {
        card.classList.add('news-card--hidden');
      }
    });

    // Фильтрация элементов списка
    listItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        item.classList.remove('news__list-item--hidden');
      } else {
        item.classList.add('news__list-item--hidden');
      }
    });

    // Обновление активных кнопок фильтров
    filterBtns.forEach(btn => {
      btn.classList.remove('news__filter-btn--active');
    });

    const activeFilterBtn = document.querySelector(`.news__filter-btn[data-filter="${category}"]`);
    if (activeFilterBtn) {
      activeFilterBtn.classList.add('news__filter-btn--active');
    }

    // Обновление ссылки "Все новости"
    if (allLink) {
      if (category === 'all') {
        allLink.style.color = '#c8102e';
        allLink.style.fontWeight = '700';
      } else {
        allLink.style.color = '#1a1a1a';
        allLink.style.fontWeight = '500';
      }
    }
  }

  // Переключение вида
  function switchView(viewType) {
    currentView = viewType;

    if (viewType === 'grid') {
      gridContainer.classList.remove('news__grid--hidden');
      listContainer.classList.remove('news__list--visible');
    } else if (viewType === 'list') {
      gridContainer.classList.add('news__grid--hidden');
      listContainer.classList.add('news__list--visible');
    }

    // Обновление активных кнопок вида
    viewBtns.forEach(btn => {
      btn.classList.remove('news__view-btn--active');
    });

    const activeViewBtn = document.querySelector(`.news__view-btn[data-view="${viewType}"]`);
    if (activeViewBtn) {
      activeViewBtn.classList.add('news__view-btn--active');
    }
  }

  // Обработчики фильтров
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      applyFilter(category);
    });
  });

  // Обработчик "Все новости"
  if (allLink) {
    allLink.addEventListener('click', () => {
      applyFilter('all');
    });
  }

  // Обработчики вида
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const viewType = btn.getAttribute('data-view');
      switchView(viewType);
    });
  });

  // Обработчики сортировки (только визуальное переключение)
  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sortBtns.forEach(b => b.classList.remove('news__sort-btn--active'));
      btn.classList.add('news__sort-btn--active');
    });
  });

  // Инициализация
  applyFilter('all');
  switchView('grid');
}







document.addEventListener('DOMContentLoaded', function() {
  initBurgerMenu();
  initHeroSlider();
  initSolutionsTabs();
  initNewsFilter();
});