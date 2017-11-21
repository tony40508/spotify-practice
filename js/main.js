$(window).scroll(function (e) {
    if ($(window).scrollTop() <= 0) {
        $(".navbar").addClass("at_top");
    }
    else {
        $(".navbar").removeClass("at_top");
    }
});

$(document).on("click", "a", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    if (target == '#carouselIndicators') return false
    $("html, body").animate({
        scrollTop: $(target).offset().top
    }, 500);
});

$(function () {
    $('img.svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
})