function popup() {
    setTimeout(function () {
        $(".cookie").addClass('open').delay(400);
        $(".follow").addClass('open').delay(400);
    }, 2000);
    $(".close").click(function () {
        $(".cookie").removeClass('open');
        $(".follow").removeClass('open');
    });
}