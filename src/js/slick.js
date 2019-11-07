function slick() {
  $('.sidebar__container').slick({
    dots: false,
    infinite: false,
    arrows: true,
    prevArrow: $('.leftArr'),
    nextArrow: $('.rightArr'),
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true
  });
  $('.sliderBox').slick({
    dots: false,
    infinite: true,
    prevArrow: $('.left'),
    nextArrow: $('.right'),
    speed: 500,
    slidesToShow: 4,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          centerMode: false,
        }
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
          arrows: false,
          dots: true
        }
      }
    ]
  });
}
