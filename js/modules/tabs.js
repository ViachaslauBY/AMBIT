export function initSolutionsTabs() {
  const tabLinks = document.querySelectorAll('.solutions__tab-link');
  const tabContents = document.querySelectorAll('.solutions-tab');

  if (tabLinks.length === 0) return;

  function switchTab(targetId) {
    // Скрываем все табы
    tabContents.forEach(content => {
      content.classList.remove('solutions-tab--active');
    });

    // Деактивируем все ссылки
    tabLinks.forEach(link => {
      link.classList.remove('solutions__tab-link--active');
      link.setAttribute('aria-selected', 'false');
      link.setAttribute('tabindex', '-1');
    });

    // Активируем целевой таб
    const targetContent = document.getElementById(targetId);
    const activeLink = document.querySelector(`[aria-controls="${targetId}"]`);

    if (targetContent && activeLink) {
      targetContent.classList.add('solutions-tab--active');
      activeLink.classList.add('solutions__tab-link--active');
      activeLink.setAttribute('aria-selected', 'true');
      activeLink.setAttribute('tabindex', '0');
    }
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('aria-controls');
      switchTab(tabId);
    });

    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const tabId = link.getAttribute('aria-controls');
        switchTab(tabId);
      }
    });
  });
}