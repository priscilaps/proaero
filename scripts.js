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
    .setAttribute('src', './assets/Logo-PRO-AERO-principal-sem-sombras.svg');
}
//-------------SLIDER-BEGIN novo----------------//
let posX1 = 0,
  posX2 = 0,
  posInitial,
  posFinal,
  threshold = 100,
  selectedSliderContainer,
  selectedSliderItems,
  slides,
  slidesLength,
  slideSize,
  firstSlide,
  lastSlide,
  cloneFirst,
  cloneLast,
  index = 0,
  allowShift = true;

function activateSlider(slider) {
  console.log('ativando o slider secionado');
  selectedSliderContainer = document.querySelector(`${slider} .slider`);
  selectedSliderItems = document.querySelector(
    `${slider} .slider .wrapper-full .slides`,
  );
  slides = selectedSliderItems.getElementsByClassName('slide');
  slidesLength = slides.length;
  slideSize =
    selectedSliderItems.getElementsByClassName('slide')[0].offsetWidth;
  firstSlide = slides[0];
  lastSlide = slides[slidesLength - 1];
  cloneFirst = firstSlide.cloneNode(true);
  cloneLast = lastSlide.cloneNode(true);

  prev = document.querySelector(`${slider} .scrollbar .prev`);
  next = document.querySelector(`${slider} .scrollbar .next`);

  // Clone first and last slide
  selectedSliderItems.appendChild(cloneFirst);
  selectedSliderItems.insertBefore(cloneLast, firstSlide);
  selectedSliderContainer.classList.add('loaded');
}
function setInicialDeviceSize() {
  prepareEventsForSlideMobile();
}
function prepareEventsForSlideMobile() {
  console.log('verificando se a opção de slides será permitida');
  if (window.outerWidth < 1024) {
    console.log('slide permitido');
    document.querySelector('#industry').classList.add('.slide-active');
    document.querySelector('#services').classList.add('.slide-active');

    // Mouse events
    const sliderIndustry = document.querySelector(`#industry .slider`),
      sliderIndustryItems = sliderIndustry.querySelector(`.slides`);
    sliderIndustryItems.onpointerdown = dragStart;

    const sliderServices = document.querySelector(`#industry .slider`),
      sliderServicesItems = sliderServices.querySelector(`.slides`);
    sliderServicesItems.onpointerdown = dragStart;

    // Touch events
    sliderIndustryItems.addEventListener('touchstart', dragStart);
    sliderIndustryItems.addEventListener('touchend', dragEnd);
    sliderIndustryItems.addEventListener('touchmove', dragAction);

    sliderServicesItems.addEventListener('touchstart', dragStart);
    sliderServicesItems.addEventListener('touchend', dragEnd);
    sliderServicesItems.addEventListener('touchmove', dragAction);

    // Click events
    sliderIndustry
      .querySelector('.wrapper-full .scrollbar .prev')
      .addEventListener('click', function () {
        shiftSlide(-1);
      });
    sliderIndustry
      .querySelector('.wrapper-full .scrollbar .next')
      .addEventListener('click', function () {
        shiftSlide(1);
      });
    sliderServices
      .querySelector('.wrapper-full .scrollbar .prev')
      .addEventListener('click', function () {
        shiftSlide(-1);
      });
    sliderServices
      .querySelector('.wrapper-full .scrollbar .next')
      .addEventListener('click', function () {
        shiftSlide(1);
      });

    // Transition events
    sliderIndustryItems.addEventListener('transitionend', checkIndex);
    sliderServicesItems.addEventListener('transitionend', checkIndex);

    console.log('Ativei todos os eventos');

    function dragStart(e) {
      console.log('iniciei dragStart');
      e = e || window.event;
      e.preventDefault();
      activateSlider(`#${e.currentTarget.parentNode.parentNode.parentNode.id}`);

      posInitial = selectedSliderItems.offsetLeft;

      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onpointerup = dragEnd;
        document.onpointermove = dragAction;
      }
      console.log(`terminei do dragStart, posX1 = ${posX1}`);
    }

    function dragAction(e) {
      console.log('iniciei dragAction');
      e = e || window.event;

      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      selectedSliderItems.style.left =
        selectedSliderItems.offsetLeft - posX2 + 'px';
      console.log(`Terminei dragAction | posX1: ${posX1} | posX2: ${posX2}`);
    }

    function dragEnd(e) {
      console.log(`Iniciei o dragEnd`);
      posFinal = selectedSliderItems.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, 'drag');
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, 'drag');
      } else {
        selectedSliderItems.style.left = posInitial + 'px';
      }

      document.onpointerup = null;
      document.onpointermove = null;
      console.log(
        `Terminei dragEnd | posFinal: ${posFinal} | posInitial: ${posInitial} | threshold: ${threshold}`,
      );
    }

    function shiftSlide(dir, action) {
      console.log(
        `Iniciei a troca de slides | dir: ${dir} | action: ${action} | allowShift: ${allowShift} `,
      );
      selectedSliderItems.classList.add('shifting');
      console.log(
        `selectedSliderItems: ${selectedSliderItems} | classes: ${selectedSliderItems.classList}`,
      );
      if (allowShift) {
        if (!action) {
          console.log(
            `se não estiver arrastando a posição inicial é configurada como selectedSliderItems.offsetLeft: ${selectedSliderItems.offsetLeft}`,
          );
          posInitial = selectedSliderItems.offsetLeft;
        }

        if (dir == 1) {
          selectedSliderItems.style.left = posInitial - slideSize + 'px';
          index++;
        } else if (dir == -1) {
          selectedSliderItems.style.left = posInitial + slideSize + 'px';
          index--;
        }
      }

      allowShift = false;
    }

    function checkIndex() {
      selectedSliderItems.classList.remove('shifting');

      if (index == -1) {
        selectedSliderItems.style.left = -(slidesLength * slideSize) + 'px';
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        selectedSliderItems.style.left = -(1 * slideSize) + 'px';
        index = 0;
      }

      allowShift = true;
    }
  } else {
    console.log('slide desabilitado');
    document.querySelector('#industry').classList.remove('.slide-active');
    document.querySelector('#services').classList.remove('.slide-active');
  }
}
prepareEventsForSlideMobile();
//-------------SLIDER-BEGIN----------------//
/* let sliderContainer,
  sliderContainerWidth,
  sliderItemWidth,
  lastSlideTranslatePosition,
  currentSlideTranslateX = 0,
  pointerFirstPosition = 0,
  pointerCurrentPosition = 0,
  isDragging = false,
  triggeredByClick = false,
  animationID,
  transitioningTranslateX;

function setSlider(slider) {
  sliderContainer = document.querySelector(
    `${slider} .wrapper-full .slider-container`,
  );
  let qtdSlide = sliderContainer.childElementCount;

  sliderContainer.style.width = `${qtdSlide * 100}vw`;

  sliderContainerWidth = sliderContainer.offsetWidth; // pega o tamanho do container de todos os slides
  sliderItemWidth = document.querySelector('#industry .slide').offsetWidth; // Pega o tamanho do slide em pixels (ele é igual pra todos pois é o width dos slides são 100vw)
  lastSlideTranslatePosition = -sliderContainerWidth + sliderIteonmousemWidth;
}
function setInicialDeviceSize() {
  prepareEventsForSlideMobile();
}
function prepareEventsForSlideMobile() {
  if (window.outerWidth < 1024) {
    document.querySelector(
      `#industry .wrapper-full .slider-container`,
    ).onpointerdown = dragStart;
    document.querySelector(
      `#industry .wrapper-full .slider-container`,
    ).onpointerup = dragEnd;
    document.querySelector(
      `#services .wrapper-full .slider-container`,
    ).onpointerdown = dragStart;
    document.querySelector(
      `#services .wrapper-full .slider-container`,
    ).onpointerup = dragEnd;

    document
      .querySelector('#industry .scrollbar div.esquerda')
      .addEventListener('pointerdown', isItClick);
    document
      .querySelector('#industry .scrollbar div.direita')
      .addEventListener('pointerdown', isItClick);
    document
      .querySelector('#services .scrollbar div.esquerda')
      .addEventListener('pointerdown', isItClick);
    document
      .querySelector('#services .scrollbar div.direita')
      .addEventListener('pointerdown', isItClick);
  }
}

function isItClick(e) {
  triggeredByClick = true;
}
function dragStart(e) {
  e.preventDefault();
  triggeredByClick = false;
  setSlider(`#${e.currentTarget.parentNode.parentNode.id}`);
  pointerFirstPosition = e.clientX;
  currentSlideTranslateX = findCurrentSlideTranslateX();
  transitioningTranslateX = currentSlideTranslateX;

  sliderContainer.onpointermove = dragMove;
  sliderContainer.setPointerCapture(e.pointerId);
  sliderContainer.classList.add('grabbing');
}
function dragEnd(e) {
  if (isDragging) {
    shiftSlide(
      `#${e.currentTarget.parentNode.parentNode.id}`,
      defineDirection(),
      currentSlideTranslateX,
    );
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
function shiftSlide(slider, dir, currentSlideTranslateX) {
  setSlider(slider);
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
 */
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
