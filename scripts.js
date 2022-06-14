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
const sliderContainer = document.querySelector('#industry .slider-container'),
  sliderContainerWidth = sliderContainer.offsetWidth, // pega o tamanho do container de todos os slides
  sliderItemWidth = document.querySelector('#industry .slide').offsetWidth, // Pega o tamanho do slide em pixels (ele é igual pra todos pois é o width dos slides são 100vw)
  lastSlideTranslatePosition = -sliderContainerWidth + sliderItemWidth;

//logica para arrastar slide
/* sliderContainer.onmousedown = dragStart; //mouse event
sliderContainer.onmouseup = dragEnd; //mouse event

//touch events
sliderContainer.addEventListener('touchstart', dragStart);
sliderContainer.addEventListener('touchend', dragEnd);
sliderContainer.addEventListener('touchmove', dragMove); */

sliderContainer.onpointerdown = dragStart;
sliderContainer.onpointerup = dragEnd;
let pointerLastPosition;
isDragging = false;

function dragStart(e) {
  isDragging = true;
  console.log('passei no dragstart - isdragging = true');
  pointerLastPosition = e.clientX;
  sliderContainer.onpointermove = dragMove;
  sliderContainer.setPointerCapture(e.pointerId);
}
function dragEnd(e) {
  isDragging = false;
  console.log('passei no dragend - isdragging = false');
  sliderContainer.onpointermove = null;
  sliderContainer.releasePointerCapture(e.pointerId);
}
function dragMove(e) {
  console.log(e.clientX);
  if (pointerLastPosition) {
    if (pointerLastPosition > e.clientX) {
      scrollRight();
      console.log('Posição anterior maior que a atual > rolei pra direita');
    } else {
      scrollToLeft();
      console.log('Posição anterior menor que a atual > rolei pra esquerda');
    }
  }
  pointerLastPosition = e.clientX;

  /* setNextSlideTranslatePosition(currentSlideTranslateX - e.clientX); */
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
function scrollToLeft() {
  let currentSlideTranslateX = findCurrentSlideTranslateX();

  if (currentSlideTranslateX == '0') {
    // verifica se é o primeiro slide da direita pra esquerda
    if (!isDragging) {
      setNextSlideTranslatePosition(lastSlideTranslatePosition);
    }
    // move para o ultimo slide
  } else {
    if (currentSlideTranslateX >= lastSlideTranslatePosition) {
      // verifica se o numero for maior ou igual a ultima posição
      currentSlideTranslateX = currentSlideTranslateX + sliderItemWidth;
      setNextSlideTranslatePosition(currentSlideTranslateX);
    }
  }
}
function scrollRight() {
  let currentSlideTranslateX = findCurrentSlideTranslateX();
  if (currentSlideTranslateX == lastSlideTranslatePosition) {
    // verifica se é o ultimo slide da direita pra esquerda
    if (!isDragging) {
      setNextSlideTranslatePosition(0); // move para o ultimo slide
    }
  } else {
    if (currentSlideTranslateX > lastSlideTranslatePosition) {
      // verifica se o numero for menor a ultima posição
      currentSlideTranslateX = currentSlideTranslateX - sliderItemWidth;
      setNextSlideTranslatePosition(currentSlideTranslateX);
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
