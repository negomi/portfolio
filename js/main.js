// Initial load of page
$(document).ready(function() {

    // Make sure nav is always vertically centered
    function repositionNav() {
        var $windowHeight = $(window).height();
        var $halfNavHeight = $('#nav').height() / 2;
        var $windowCenter = ($windowHeight / 2);
        var newTop = $windowCenter - $halfNavHeight;
        $('#nav').css({"top": newTop});
    }

    // Dynamically assign welcome height
    function sizeContent() {
        var $welcomeHeight = $('#welcome').height() + 'px';
        $('#work').add('#bg').css('top', $welcomeHeight);
    }

    // Scroll to all internal links
    function smoothScroll() {
        $('a[href^="#"]').on('click',function(event) {
            event.preventDefault();

            var target = this.hash,
            $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 600, 'swing', function () {
                window.location.hash = target;
            });
        });
    }

    // Assign nav classes based on section visibility
    function checkVisible(section, navLink) {
        $(section).bind('inview', function(event, visible) {
            if (visible) {
                if ($(navLink).hasClass('fa-circle-o')) {
                    $(navLink).addClass('fa-circle').removeClass('fa-circle-o');
                }
            } else {
                if ($(navLink).hasClass('fa-circle')) {
                    $(navLink).addClass('fa-circle-o').removeClass('fa-circle');
                }
            }
        });
    }

    // Open/close relevant modal on click
    function handleModal() {
        $('.grid').on('click', 'a', function(event) {
            event.preventDefault();

            var $activeModal = $(this).attr('href');
            var $anyModal = $('.modal');
            var $modalBg = $('.modal-bg');

            if (!($anyModal.is(':visible'))) {
                $($activeModal).add($modalBg).fadeIn('fast', function() {
                    $('.close').on('click', 'a', function(event) {
                        event.preventDefault();
                        $($activeModal).add($modalBg).fadeOut('fast');
                    });
                });
            }
        });
    }

    // Masonry options
    $(function(){
        var $container = $('.grid');
        $container.imagesLoaded(function() {
            $container.masonry({
                columnWidth: 320,
                itemSelector: '.item',
                gutter: 10
            });
        });
    });

    // Lazyload images
    $(function() {
        $('img.lazy').add('#welcome').lazyload({
            effect : 'fadeIn'
        });
    });

    repositionNav();
    sizeContent();
    smoothScroll();
    handleModal();

    // Recalculate nav and welcome on window resize
    $(window).resize(function() {
        repositionNav();
        sizeContent();
    });

    // Check if a section is in viewport on scroll
    $(window).scroll(function() {
        checkVisible('#welcome', '#wel-btn');
        checkVisible('#developer', '#dev-btn');
        checkVisible('#creative', '#cre-btn');
        checkVisible('#technologist', '#tech-btn');
    });

});
