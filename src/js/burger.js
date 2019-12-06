function burger() {
    const burger = document.querySelector('.burger');
    const burgerLine = document.querySelector('.burger__line');
    const navMenu = document.querySelector('.header__nav');
    burger.addEventListener('click', function() {
        burgerLine.classList.toggle('burger__line--active');
        burger.classList.toggle('burger--active');
        navMenu.classList.toggle('header__nav--active')
    })
}