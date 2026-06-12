export function initSolutionsTabs() {
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