import 'normalize.css';
import '../styles/main.css';

import {
  heroImageDark,
  heroImageLight,
  cardsDark,
  cardsLight,
} from './constans';

const themeToggleBtn = document.getElementById('theme-toggle');
const heroImage = document.querySelector(
  '.hero__image img',
) as HTMLImageElement;
const savedTheme = localStorage.getItem('theme');

function setHeroImage(theme: string) {
  if (theme === 'dark') {
    if (heroImage) {
      heroImage.src = heroImageDark;
    }
  } else {
    heroImage.src = heroImageLight;
  }
}

function setCards(theme: string) {
  const cards = document.querySelectorAll(
    '.card-prime__image img',
  ) as NodeListOf<HTMLImageElement>;
  if (cards) {
    cards.forEach((card, index) => {
      if (theme === 'light') {
        card.src = cardsLight[index];
      } else {
        card.src = cardsDark[index];
      }
    });
  }
}

function setTheme(theme: string) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = document.body.className;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  setHeroImage(newTheme);
  setCards(newTheme);
}

if (savedTheme) {
  setTheme(savedTheme);
  setHeroImage(savedTheme);
  setCards(savedTheme);
} else {
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  setTheme(prefersDarkScheme ? 'dark' : 'light');
  setHeroImage(prefersDarkScheme ? 'dark' : 'light');
  setCards(prefersDarkScheme ? 'dark' : 'light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}
