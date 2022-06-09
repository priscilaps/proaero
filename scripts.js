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

function scrollToLeft() {
  if (
    document.querySelector('#industry .wrapper-full').style.transform !=
    'initial' // se não for primeiro slide segue abaixo
  ) {
    numberValue = document
      .querySelector('#industry .wrapper-full')
      .style.transform.substr(11, 4);
    if (numberValue == null || numberValue == '') {
      document.querySelector('#industry .wrapper-full').style.transform =
        'translateX(-300vw)';
    } else {
      if (numberValue != -100) {
        numberValue = parseInt(numberValue) + 100;
        document.querySelector(
          '#industry .wrapper-full',
        ).style.transform = `translateX(${numberValue}vw)`;
      } else {
        document.querySelector(
          '#industry .wrapper-full',
        ).style.transform = `initial`;
      }
    }
  } else {
    document.querySelector('#industry .wrapper-full').style.transform =
      'translateX(-300vw)'; // se for o primeiro volta pro ultimo
  }
}

function scrollRight() {
  if (
    document.querySelector('#industry .wrapper-full').style.transform !=
    'initial'
  ) {
    numberValue = document
      .querySelector('#industry .wrapper-full')
      .style.transform.substr(11, 4);
    if (numberValue == null || numberValue == '') {
      document.querySelector('#industry .wrapper-full').style.transform =
        'translateX(-100vw)';
    } else {
      if (numberValue > -300) {
        numberValue = numberValue - 100;
        document.querySelector(
          '#industry .wrapper-full',
        ).style.transform = `translateX(${numberValue}vw)`;
      } else {
        document.querySelector(
          '#industry .wrapper-full',
        ).style.transform = `initial`;
      }
    }
  } else {
    document.querySelector('#industry .wrapper-full').style.transform =
      'translateX(-100vw)';
  }
}

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
