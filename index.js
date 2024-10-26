document.addEventListener('DOMContentLoaded', () => {
  const words = ['SMART', 'BIG', 'TECH', 'BUZZ', 'COOL'];
  const wordElement = document.getElementById('word');
  let currentIndex = 0;

  function changeWord() {
    wordElement.classList.add('fade-out-left');
    setTimeout(() => {
      wordElement.textContent = words[currentIndex];
      wordElement.classList.remove('fade-out-left');
      wordElement.classList.add('fade-in-left');
      currentIndex = (currentIndex + 1) % words.length;
    }, 500);
  }

  setInterval(changeWord, 2000);
  changeWord();
});

document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201f4_home-hero_01-p-500.webp',
    'https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201fa_home-hero_02.webp',
    'https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201fd_home-hero_03.webp',
    'https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c201f7_home-hero_04.webp',
    'https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64783ebdb52cf8fbc2c20200_home-hero_05.webp'
  ];
  const imgElement = document.getElementById('img-change');
  let currentIndex = 0;

  function changeImg() {
    imgElement.classList.add('fade-out-left');
    setTimeout(() => {
      imgElement.src = images[currentIndex];
      imgElement.classList.remove('fade-out-left');
      imgElement.classList.add('fade-in-left');
      currentIndex = (currentIndex + 1) % images.length;
    }, 500);
  }

  setInterval(changeImg, 2000);
  changeImg();
});

const progressContainer = document.querySelector('.progress-container');
const progress = Array.from(document.querySelectorAll('.progress'));
const status = document.querySelector('.status');
const slides = Array.from(document.getElementsByClassName('carousel-item'));

let currentSlideIndex = 0;

const playNext = (e) => {
  const current = e && e.target;
  let next;

  if (current) {
    const currentIndex = progress.indexOf(current);
    if (currentIndex < progress.length - 1) {
      next = progress[currentIndex + 1];
    }
    current.classList.remove('active');
    current.classList.add('passed');
  }

  if (!next) {
    progress.forEach((el) => {
      el.classList.remove('active', 'passed');
    });
    next = progress[0];
    currentSlideIndex = 0;
  } else {
    currentSlideIndex++;
  }

  next.classList.add('active');

  // Update carousel
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentSlideIndex) {
      slide.classList.add('active');
    }
  });

  status.innerText = 'Current: ' + progress.indexOf(next);
};

const playPrevious = () => {
  let current = document.querySelector('.progress.active');
  let previous;

  if (current) {
    const currentIndex = progress.indexOf(current);
    if (currentIndex > 0) {
      previous = progress[currentIndex - 1];
    }
    current.classList.remove('active');
    current.classList.add('passed');
  }

  if (!previous) {
    progress.forEach((el) => {
      el.classList.remove('active', 'passed');
    });
    previous = progress[progress.length - 1];
    currentSlideIndex = progress.length - 1;
  } else {
    currentSlideIndex--;
  }

  previous.classList.add('active');

  // Update carousel
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentSlideIndex) {
      slide.classList.add('active');
    }
  });

  status.innerText = 'Current: ' + progress.indexOf(previous);
};

const clickHandler = (e) => {
  const clickPosition = e.offsetX / progressContainer.clientWidth;

  if (clickPosition > 0.5) {
    playNext();
  } else {
    playPrevious();
  }
};

progress.forEach((el) => el.addEventListener('animationend', playNext, false));
progressContainer.addEventListener('click', clickHandler);
playNext();
