function search() {
    const searchBtn = document.querySelector('.search__btn');
    searchBtn.addEventListener('click', () => searchBtn.classList.toggle('search__btn--active'));
}
