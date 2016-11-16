"use strict";
( function(){

    $( function () {

        $.each( $( '.not-found' ), function() {

            new NotFoundHeight ( $( this ) );

        } );

    } );

    var NotFoundHeight = function( obj ) {

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
                    'min-height': height - _header.innerHeight()
                } );

            };

        _init();
    };

} )();