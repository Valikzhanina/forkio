console.log('Works!');

const btn = document.querySelector('.header-navbar__burger');
const icon = btn.querySelector('.fas');
const menu = document.querySelector('.menu');

btn.addEventListener('click', function () {
  icon.classList.toggle('fa-times');
  menu.classList.toggle('hidden');
});
