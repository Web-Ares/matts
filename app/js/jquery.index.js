"use strict";
( function() {

    $( function () {

        $.each( $( '.hero' ), function() {

            //new Hero ( $( this ) );

        } );

    } );

    var Hero = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _header = $('.site__header'),
            _globalWidth = 0,
            _slickSlider = null,
            _dom =  $( 'html, body'),
            _btnDown = _obj.find('.hero__down');

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
                _btnDown.on( {
                    click: function () {

                        if( _window.width() >= 1024 ) {

                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: $('.our-cookies').offset().top - 91  }, 300 );

                        } else {

                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: $('.our-cookies').offset().top - 64  }, 300 );

                        }

                        return false;

                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
                _initSlick();
            },
            _initSlick = function() {

                _slickSlider = _obj.find('.slick-container').slick( {
                    dots: true,
                    //autoplay: true,
                    //autoplaySpeed: 5000,
                    arrows: false
                } );

            },
            _setHeight = function() {

                var height = _window.height();

                if( _window.width() >= 1024 ) {

                    if( ( height - _header.innerHeight() ) > parseInt( _obj.css('min-height') ) ) {

                        _obj.find('.slick-list').css( {
                            height: height - _header.innerHeight()
                        } );

                    } else {

                        _obj.find('.slick-list').css( {
                            height: parseInt( _obj.css('min-height') )
                        } );

                    }



                } else {

                    if( height > parseInt( _obj.css('min-height') ) ) {

                        _obj.find('.slick-list').css( {
                            height: height
                        } );

                    } else {

                        _obj.find('.slick-list').css( {
                            height: parseInt( _obj.css('min-height') )
                        } );

                    }

                }

            };

        _init();
    };

} )();