"use strict";
( function(){

    $( function () {

        $.each( $('.products-cookies__items'), function () {

            new ProductsCookiesSlider( $(this) );

        } );

        $.each( $( '.shop' ), function() {

            new ShopHeight ( $( this ) );

        } );

    } );

    var ProductsCookiesSlider = function ( obj ) {

        var _self = this,
            _obj = obj,
            _window = $( window ),
            _swiperInit = false,
            _swiper;

        var _addEvents = function () {

                _window.on( {
                    resize: function() {

                        if( _window.width() < 768 ) {

                            if( !_swiperInit ) {

                                _initSwiper();
                                _swiperInit = true;

                            }


                        } else {

                            if( _swiperInit ) {

                                _destroySwiper();
                                _swiperInit = false;
                            }

                        }


                    }
                } );

            },
            _initSwiper = function() {

                _swiper = new Swiper( _obj.find( '.swiper-container' ), {
                    slidesPerView: 1,
                    loop: true,
                    autoplay: 3000,
                    speed: 500,
                    nextButton: _obj.find('.swiper-button-next'),
                    prevButton:  _obj.find('.swiper-button-prev')
                } );

            },
            _destroySwiper = function() {

                _swiper.destroy( true, true);

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                if( _window.width() < 768 ) {

                    if( !_swiperInit ) {

                        _initSwiper();
                        _swiperInit = true;
                    }

                }

            };

        _init();
    };

    var ShopHeight = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _header = $('.site__header'),
            _globalWidth = 0;

        //private methods
        var _addEvents = function() {

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();
                        _setHeight();

                    },
                    resize: function () {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width() + 1;

                            _setHeight();

                        }

                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            },
            _setHeight = function() {

                var height = _window.height();

                _obj.css( {
                    'min-height': height - _header.innerHeight() - parseInt( _obj.css('padding-bottom') ) - parseInt( _obj.css('padding-top') ) - $('.site__main-title').outerHeight(true)
                } );

            };

        _init();
    };

} )();