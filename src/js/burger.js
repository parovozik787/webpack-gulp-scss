function burger() {
    document.querySelector('.header__nav-btn').addEventListener('click', function () {
        this.classList.toggle('burger--active');
        $('body').toggleClass('menu-open');
        document.querySelector('.navbar').classList.toggle('navbar--active');
        let arr = [...document.querySelectorAll('.navbar__item')];
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.transitionDuration = "0." + i + "s";
        }
    });
    document.querySelector('.navbar').addEventListener('touchmove', e => e.preventDefault());
}