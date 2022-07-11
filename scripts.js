window.addEventListener('scroll', onScroll);
setScrollbarWidth();

function onScroll() {
  showNavOnScroll();
  backToTopOnScroll();
  activateMenuAtCurrentSection(home);
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(industry);
  activateMenuAtCurrentSection(services);
  activateMenuAtCurrentSection(systems);
  activateMenuAtCurrentSection(team);
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

    switch (sectionId) {
      case 'about':
        currentSection.children[0].innerText = 'Quem Somos';
        break;
      case 'industry':
        currentSection.children[0].innerText = 'Atuação';
        break;
      case 'services':
        currentSection.children[0].innerText = 'Serviços';
        break;
      case 'systems':
        currentSection.children[0].innerText = 'Sistemas';
        break;
      case 'team':
        currentSection.children[0].innerText = 'Equipe';
        break;
      case 'contact':
        currentSection.children[0].innerText = 'Contato';
        break;
      default:
        currentSection.children[0].innerText = sectionId;
    }
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
}

function closeMenu() {
  document.querySelector('body').classList.remove('menu-expanded');
}
function setScrollbarWidth() {
  root = document.documentElement;
  root.style.setProperty(
    '--scrollbar-width',
    window.innerWidth - document.documentElement.clientWidth + 'px',
  );
  return;
}

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
  #team,
  #contact,
  #contact > .wrapper,
  #contact img,
  #contact .social-links,
  #contact .infos
`);
