"use strict";
( function(){

    $( function () {

        $.each( $( '.checkout' ), function() {

            new BillingShipping ( $( this ) );

        } );

    } );

    var BillingShipping = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _dom =  $( 'html, body'),
            _showCheckbox = _obj.find('.checkout__show-billing input[type="checkbox"]'),
            _billingInfo = _obj.find('.checkout__info-billing');

        //private methods
        var _addEvents = function() {

                _showCheckbox.on( {
                    change: function () {

                        if( _showCheckbox.prop('checked') == false ) {

                            _billingInfo.height( _billingInfo.find('>.checkout__info').outerHeight(true) );
                            _billingInfo.addClass('visible');
                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: _billingInfo.offset().top - 100 }, 300 );

                        } else {

                            _billingInfo.height( 0 );
                            _billingInfo.removeClass('visible');
                            _dom.stop( true, false );
                            _dom.animate( { scrollTop: _obj.offset().top - 100  }, 300 );

                        }

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