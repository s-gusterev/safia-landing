import 'normalize.css';
import '../styles/main.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  heroImageDark,
  heroImageLight,
  cardsDark,
  cardsLight,
} from './constans';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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

if (
  !('ontouchstart' in window || navigator.maxTouchPoints > 0) ||
  window.matchMedia('(min-width: 769px)').matches
) {
  gsap.set('.features__item', {
    opacity: 0,
    y: -32,
    scale: 0.8,
    filter: 'blur(25px)',
  });

  gsap.set('.hero__item', {
    opacity: 0,
    scale: 0.8,
  });

  gsap.set('.features__banner', {
    opacity: 0.8,

    scale: 0.9,
    filter: 'blur(15px)',
  });

  gsap.set('.work__item', {
    opacity: 0.8,

    scale: 0.9,
    filter: 'blur(15px)',
  });

  gsap.set('.pricing__item:nth-child(1), .pricing__item:nth-child(3)', {
    opacity: 0.1,
    y: 20,
    scale: 0.9,
  });

  gsap.set('.pricing__item:nth-child(2)', {
    y: 0,
    scale: 1,
  });

  gsap.to('.features__item', {
    scrollTrigger: {
      trigger: '.features__list',
      start: 'top 90%',
      end: 'top 10%',
      scrub: true,

      toggleActions: 'play reverse play reverse',
    },
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    stagger: {
      each: 3,
    },
    duration: 6,
    ease: 'power2.out',
  });

  gsap.to('.hero__item', {
    scrollTrigger: {
      trigger: '.hero__image',
      start: 'top 40%',

      scrub: true,
    },

    opacity: 1,
    scale: 1,

    stagger: {
      each: 3,
    },
    duration: 6,
    ease: 'power2.out',
  });

  gsap.to('.features__banner', {
    scrollTrigger: {
      trigger: '.features__list',
      start: 'bottom 50%',

      scrub: true,
    },

    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    stagger: {
      each: 1,
    },
    duration: 1,
  });

  gsap.to('.work__item', {
    scrollTrigger: {
      trigger: '.work',
      start: 'top 90%',
      end: 'bottom 50%',
      scrub: true,
    },

    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    stagger: {
      each: 1,
    },
    duration: 1,
  });

  gsap.to('.pricing__item', {
    scrollTrigger: {
      trigger: '.pricing__list',
      start: 'top 70%',
      end: 'top 20%',
      scrub: true,
    },
    y: 0,
    opacity: 1,
    stagger: {
      each: 3,
    },
    duration: 10,
    ease: 'power1.in',
  });
}
