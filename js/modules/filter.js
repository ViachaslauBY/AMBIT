export function initNewsFilter() {
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