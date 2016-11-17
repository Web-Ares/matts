"use strict";
( function(){

    $( function () {

        $.each( $('.product-single__gallery' ), function () {

            new SwiperGallery( $(this) );

        } );

    } );

    var SwiperGallery = function (obj) {

        //private properties
        var _self = this,
            _galleryTop = obj.find('.gallery__top'),
            _galleryThumbs = obj.find('.gallery__thumbs');

        //private methods
        var _initSwiper = function(){

                //var galleryTop = new Swiper(_galleryTop, {
                //    spaceBetween: 10,
                //    breakpoints: {
                //        1024: {
                //            effect: 'fade',
                //            fade: {
                //                crossFade: false
                //            }
                //        }
                //    },
                //    onSlideChangeStart: function(swiper){
                //        var activeIndex = swiper.activeIndex;
                //        $(galleryThumbs.slides).removeClass('is-selected');
                //        $(galleryThumbs.slides).eq(activeIndex).addClass('is-selected');
                //        galleryThumbs.slideTo(activeIndex, 300, true);
                //
                //    }
                //} );
                //var galleryThumbs = new Swiper(_galleryThumbs, {
                //    touchRatio: 0.2,
                //    slidesPerView: 2,
                //    slideToClickedSlide: true,
                //    onClick: function (swiper, event){
                //        var clicked = swiper.clickedIndex;
                //        swiper.activeIndex = clicked;
                //        swiper.updateClasses();
                //        $(swiper.slides).removeClass('is-selected');
                //        $(swiper.clickedSlide).addClass('is-selected');
                //        galleryTop.slideTo(clicked, 300, false);
                //
                //    }
                //} );
                //
                //galleryTop.params.control = galleryThumbs;
                //galleryThumbs.params.control = galleryTop;

                _galleryTop.slick( {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.gallery__thumbs'
                } );
                _galleryThumbs.slick( {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    asNavFor: '.gallery__top',
                    dots: true,
                    centerMode: true,
                    focusOnSelect: true
                } );

            },
            _init = function () {
                _initSwiper();
            };

        _init();
    };

} )();