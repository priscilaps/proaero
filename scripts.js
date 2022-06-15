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
    navigation.classList.add('scroll');
  } else {
    navigation.classList.remove('scroll');
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
    .setAttribute('src', './assets/logo_proaero_branco.svg');
}

//-------------SLIDER-BEGIN----------------//
const sliderContainer = document.querySelector(
    '#industry .wrapper-full .slider-container',
  ),
  qtdSlide = sliderContainer.childElementCount;

sliderContainer.style.width = `${qtdSlide * 100}vw`;

const sliderContainerWidth = sliderContainer.offsetWidth, // pega o tamanho do container de todos os slides
  sliderItemWidth = document.querySelector('#industry .slide').offsetWidth, // Pega o tamanho do slide em pixels (ele é igual pra todos pois é o width dos slides são 100vw)
  lastSlideTranslatePosition = -sliderContainerWidth + sliderItemWidth;

sliderContainer.onpointerdown = dragStart;
sliderContainer.onpointerup = dragEnd;

let currentSlideTranslateX = 0,
  pointerFirstPosition = 0,
  pointerCurrentPosition = 0,
  isDragging = false,
  triggeredByClick = false,
  animationID,
  transitioningTranslateX;

document
  .querySelector('.scrollbar div.esquerda')
  .addEventListener('pointerdown', isItClick);
document
  .querySelector('.scrollbar div.direita')
  .addEventListener('pointerdown', isItClick);

function isItClick(e) {
  triggeredByClick = true;
  console.log('click');
}
function dragStart(e) {
  e.preventDefault();
  triggeredByClick = false;
  pointerFirstPosition = e.clientX;
  currentSlideTranslateX = findCurrentSlideTranslateX();
  transitioningTranslateX = currentSlideTranslateX;

  sliderContainer.onpointermove = dragMove;
  sliderContainer.setPointerCapture(e.pointerId);
  sliderContainer.classList.add('grabbing');
}
function dragEnd(e) {
  if (isDragging) {
    shiftSlide(defineDirection(), currentSlideTranslateX);
  }
  isDragging = false;
  cancelAnimationFrame(animation);
  sliderContainer.onpointermove = null;
  sliderContainer.releasePointerCapture(e.pointerId);
  sliderContainer.classList.remove('grabbing');
}
function dragMove(e) {
  isDragging = true;
  pointerCurrentPosition = e.clientX;
  animationID = requestAnimationFrame(animation);
}
function animation() {
  sliderIsTransitioning = document.querySelector('.grabbing');
  if (sliderIsTransitioning) {
    if (defineDirection() == 'right') {
      if (transitioningTranslateX > lastSlideTranslatePosition) {
        transitioningTranslateX = transitioningTranslateX - 1;
        sliderIsTransitioning.style.transform = `translateX(${transitioningTranslateX}px)`;
      }
    } else if (defineDirection() == 'left') {
      if (transitioningTranslateX > 0) {
        transitioningTranslateX = transitioningTranslateX + 1;
        sliderIsTransitioning.style.transform = `translateX(${transitioningTranslateX}px)`;
      }
    }
  } else {
    return;
  }
  requestAnimationFrame(animation);
}
function findCurrentSlideTranslateX() {
  numberValue = sliderContainer.style.transform
    .replace('translateX(', '')
    .replace('px)', '');
  // separa apenas o valor numérico contidos na propriedade transform
  return parseInt(numberValue);
}
function setNextSlideTranslatePosition(translateNumber) {
  sliderContainer.style.transform = `translateX(${translateNumber}px)`;
}
function defineDirection() {
  if (pointerFirstPosition) {
    if (pointerFirstPosition > pointerCurrentPosition) {
      return 'right';
    } else {
      return 'left';
    }
  }
}
function shiftSlide(dir, currentSlideTranslateX) {
  if (!currentSlideTranslateX && triggeredByClick == true) {
    currentSlideTranslateX = findCurrentSlideTranslateX();
  }
  if (dir == 'left') {
    if (currentSlideTranslateX == '0') {
      // verifica se é o primeiro slide da direita pra esquerda
      setNextSlideTranslatePosition(lastSlideTranslatePosition);
      // move para o ultimo slide
    } else {
      if (currentSlideTranslateX >= lastSlideTranslatePosition) {
        // verifica se o numero for maior ou igual a ultima posição
        currentSlideTranslateX = currentSlideTranslateX + sliderItemWidth;
        setNextSlideTranslatePosition(currentSlideTranslateX);
      }
    }
  } else if (dir == 'right') {
    if (currentSlideTranslateX == lastSlideTranslatePosition) {
      // verifica se é o ultimo slide da direita pra esquerda
      lastSlideToRight = true;
      setNextSlideTranslatePosition(0); // move para o primeiro slide
    } else {
      lastSlideToRight = false;
      if (currentSlideTranslateX > lastSlideTranslatePosition) {
        // verifica se o numero for menor a ultima posição
        currentSlideTranslateX = currentSlideTranslateX - sliderItemWidth;
        setNextSlideTranslatePosition(currentSlideTranslateX); // move para o próximo
      }
    }
  }
}

//-------------SLIDER-END----------------//
ScrollReveal({
  origin: 'top',
  distance: '50px',
}).reveal(`
  #home,
  #home img,
  #home .stats,
  #services,
  #services .card,
  #about,
  #about img,
  #contact,
  #contact img
`);
