function search() {
    let searchBtn = document.querySelector('.search__btn');
    let searchInput = document.querySelector('.search__input');
    let searchForm = document.querySelector('.search');
    searchBtn.addEventListener('click', () => searchForm.classList.toggle('search--active') && searchInput.focus());
}
