import 'normalize.css';
import '../styles/main.css';
import heroImageLight from '../assets/images/dashboard-light.webp';
import heroImageDark from '../assets/images/dashboard-dark.webp';

import cardPrime1 from '../assets/images/card-prime-1.webp';
import cardPrime2 from '../assets/images/card-prime-2.webp';
import cardPrime3 from '../assets/images/card-prime-3.webp';

import cardPrime1Light from '../assets/images/card-prime-light-1.png';
import cardPrime2Light from '../assets/images/card-prime-light-2.png';
import cardPrime3Light from '../assets/images/card-prime-light-3.png';

const cardsLight = [cardPrime1Light, cardPrime2Light, cardPrime3Light];
const cardsDark = [cardPrime1, cardPrime2, cardPrime3];

const themeToggleBtn = document.getElementById('theme-toggle');
const heroImage = document.querySelector(
  '.hero__image img',
) as HTMLImageElement;

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

const savedTheme = localStorage.getItem('theme');

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
