window.addEventListener('scroll', onScroll);

function onScroll() {
  showNavOnScroll();
  backToTopOnScroll();
  activateMenuAtCurrentSection(home);
  activateMenuAtCurrentSection(services);
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionStartReachOrPassedTargeLine = targetLine >= sectionTop;
  const sectionEndPassedTargetLine = sectionTop + sectionHeight <= targetLine;

  const sectionId = section.getAttribute('id');
  const currentMenu = document.querySelector(`nav a[href*=${sectionId}]`);

  currentMenu.classList.remove('active');
  if (sectionStartReachOrPassedTargeLine && !sectionEndPassedTargetLine) {
    currentMenu.classList.add('active');
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    document.getElementById('navigation').classList.add('scroll');
  } else {
    document.getElementById('navigation').classList.remove('scroll');
  }
}

function backToTopOnScroll() {
  if (scrollY > 550) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

function openMenu() {
  document.querySelector('body').classList.add('menu-expanded');
  document
    .querySelector('body.menu-expanded nav .wrapper .logo img')
    .setAttribute('src', './assets/Logo-PRO-AERO-principal-sem-sombras.svg');
}

function closeMenu() {
  document.querySelector('body').classList.remove('menu-expanded');
  document
    .querySelector('nav .wrapper .logo img')
    .setAttribute('src', './assets/Logo-PRO-AERO-principal-sem-sombras.svg');
}
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
//-------------SLIDER-BEGIN----------------//
let slidesContainer,
  posX1 = 0,
  posX2 = 0,
  posInitial,
  posFinal,
  threshold = 100,
  slideSize,
  slidesLength,
  direction,
  index = 0,
  allowShift = true,
  root;

function checkScreenSize() {
  if (window.outerWidth < 1024) {
    // se for menor que 1024 deve ativar o slider adicionando a class slider-active
    document.getElementById('industry').classList.add('slider-active');
    document.getElementById('services').classList.add('slider-active');

    // se for menor que 1024 deve ativar o slider adicionando a class slider-active
    const listeningSliders = document.querySelectorAll(
      '.slider-active .slider',
    );
    listeningSliders.forEach((slider) => {
      // Touch events
      slider.addEventListener('touchstart', dragStart);
      slider.addEventListener('mousedown', dragStart);
      slider.addEventListener('touchend', dragEnd);
      slider.addEventListener('touchmove', dragAction);

      // Mouse events
      slider.onmousedown = dragStart;
      // Transition events
      slider.addEventListener('transitionend', checkIndex);
      // Click events
      slider.querySelector('.prev').addEventListener('click', function () {
        shiftSlide(-1);
      });
      slider.querySelector('.next').addEventListener('click', function () {
        shiftSlide(1);
      });
    });
  } else {
    document.getElementById('industry').classList.remove('slider-active');
    document.getElementById('services').classList.remove('slider-active');
  }

  root = document.documentElement;
  root.style.setProperty('--scrollbar-width', getScrollbarWidth() + 'px');
}
function dragStart(e) {
  e = e || window.event;
  e.preventDefault();
  setUpSelectedSlide(e.target.closest('.slider-active')); //identifica qual slide estamos interagindo para inicializar
  posInitial = slidesContainer[0].offsetLeft;
  if (e.type == 'touchstart') {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;
    document.onmouseup = dragEnd;
    document.onmousemove = dragAction;
  }
}
function dragEnd(e) {
  posFinal = slidesContainer[0].offsetLeft;
  if (posFinal - posInitial < -threshold) {
    shiftSlide(1, 'drag');
  } else if (posFinal - posInitial > threshold) {
    shiftSlide(-1, 'drag');
  } else {
    slidesContainer[0].style.left = posInitial + 'px';
  }

  document.onmouseup = null;
  document.onmousemove = null;
}
function dragAction(e) {
  e = e || window.event;

  if (e.type == 'touchmove') {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  }
  slidesContainer[0].style.left = slidesContainer[0].offsetLeft - posX2 + 'px';
}
function setUpSelectedSlide(selectedSlideSection) {
  slidesContainer = selectedSlideSection.getElementsByClassName('slides');
  slideSize =
    selectedSlideSection.getElementsByClassName('slide')[0].offsetWidth;
  let slides = selectedSlideSection.getElementsByClassName('slide');
  slidesLength = slides.length;
  let firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true);

  // Clone first and last slide
  if (
    !selectedSlideSection
      .getElementsByClassName('slider')[0]
      .classList.contains('loaded')
  ) {
    slidesContainer[0].appendChild(cloneFirst);
    slidesContainer[0].insertBefore(cloneLast, firstSlide);
    selectedSlideSection
      .getElementsByClassName('slider')[0]
      .classList.add('loaded');
    slidesContainer[0].style.left = -(1 * slideSize) + 'px';
    index = 1; // posiciona o primeiro slider de volta no começo (ele ia pro clone do ultimo apos clonar)
  }
}
function shiftSlide(dir, action) {
  slidesContainer[0].classList.add('shifting');

  if (allowShift) {
    if (!action) {
      posInitial = slidesContainer[0].offsetLeft;
    }

    if (dir == 1) {
      direction = 1;
      slidesContainer[0].style.left = posInitial - slideSize + 'px';
      index++;
    } else if (dir == -1) {
      direction = -1;
      slidesContainer[0].style.left = posInitial + slideSize + 'px';
      index--;
    }
  }

  allowShift = false;
}
function checkIndex() {
  slidesContainer[0].classList.remove('shifting');

  if (index == 0) {
    slidesContainer[0].style.left = -((slidesLength - 2) * slideSize) + 'px'; // - 2 clones na qtd de slides
    index = slidesLength - 1;
  } else if (index == slidesLength - 1) {
    slidesContainer[0].style.left = -(1 * slideSize) + 'px';
    index = 1;
  }
  allowShift = true;
}

//-------------SLIDER-END----------------//
ScrollReveal({
  origin: 'top',
  distance: '50px',
}).reveal(`
  #home,
  #home img,
  #home .stats,
  #about,
  #about img,
  #industry,
  #services,
  #services .card,
  #systems,
  #contact,
  #contact > .wrapper,
  #contact img,
  #contact .social-links,
  #contact .infos
`);
