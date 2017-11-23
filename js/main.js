// navbar animation
$(window).scroll(function (e) {
    if ($(window).scrollTop() <= 0) {
        $(".navbar").addClass("at_top");
    }
    else {
        $(".navbar").removeClass("at_top");
    }
});

// a link animation
$(document).on("click", "a", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    if (target == '#carouselIndicators') return false
    $("html, body").animate({
        scrollTop: $(target).offset().top
    }, 500);
});

// svg controlling
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

// Slide in on Scroll
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    //滑一次執行一次 A
    return function () {
        // console.log('A() start');
        var context = this, args = arguments; //this = window object

        //最後一次滑動之後執行的內容
        var later = function () {
            // console.log('laterRun() start');
            timeout = null;//清掉等待執行數字
            if (!immediate) func.apply(context, args); //沒有要立即執行的就上了
            // console.log('laterRun() end');
        };

        var callNow = immediate && !timeout;
        //true = 立即 && 無等待執行(滑動停止，時間間隔到)(每次間隔切換一次)
        //false = 立即 && 有等待執行(連續滑動中)
        //false = 不立即 && 無等待執行(滑動停止，時間間隔到)
        //false = 不立即 && 有等待執行(連續滑動中)

        //連續滑動時，延遲等待執行
        clearTimeout(timeout);//時間還沒到的時候，就等待取消
        timeout = setTimeout(later, wait); //設定等待執行, 紀錄等待執行數字


        if (callNow) func.apply(context, args);//如果立即執行，就用像原本這樣執行
    };
}

const sliderImages = document.querySelectorAll('.album_pic');

function checkSlide() {
    sliderImages.forEach(sliderImage => {
        // 取得圖片 1/2 高度的定位點（卷軸垂直位移量 ＋ 視窗高度）- 1/2 圖片高度
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        // 取得圖片底部定位點（利用圖片頂部定位點 + 圖片高度取得）
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // 判斷視窗是否已經超過圖片高度一半
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        // 判斷滾動範圍是否已經超過圖片底部（卷軸垂直位移量）
        const isNotScrolledPast = window.scrollY < imageBottom;
        const isScrolledPast = window.scrollY > imageBottom;
        
        if (isHalfShown && isScrolledPast) {
            sliderImage.classList.add('show');
        } else {
            sliderImage.classList.remove('show');
        }
    });
}
window.addEventListener('scroll', debounce(checkSlide));