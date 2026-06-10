import { initBurgerMenu } from './modules/burger.js';
import { initHeroSlider } from './modules/slider.js';
import { initSolutionsTabs } from './modules/tabs.js';
import { initNewsFilter } from './modules/filter.js';

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu();
  initHeroSlider();
  initSolutionsTabs();
  initNewsFilter();
});