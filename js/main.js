$(document).on("click", "a", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    if (target == '#carouselIndicators') return false
    $("html, body").animate({
        scrollTop: $(target).offset().top
    }, 500);
});