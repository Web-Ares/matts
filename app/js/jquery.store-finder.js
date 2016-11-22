"use strict";
( function(){

    $( function () {

        $.each( $( '.store-finder' ), function() {

            new ReInitMap ( $( this ) );

        } );

    } );

    var ReInitMap = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnSearch = _obj.find('.store-finders__search');

        //private methods
        var _addEvents = function() {

                _btnSearch.on( {
                    click: function () {

                        setTimeout( function() {
                            mapZoom   = map.getZoom();
                            mapCenter = map.getCenter();

                            google.maps.event.trigger( map, "resize" );

                            map.setZoom( mapZoom );
                            map.setCenter( mapCenter );

                            fitBounds();

                        }, 50 );

                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            };

        _init();
    };

} )();