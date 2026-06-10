export function initBurgerMenu() {
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