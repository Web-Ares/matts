"use strict";
( function(){

    $( function () {

        $.each( $('.my-cart__product'), function () {

            new ProductsInCart( $(this) );

        } );

        $.each( $('.product-single__info'), function () {

            new AddProductsToCart( $(this) );

        } );

        $.each( $('.my-cart__promo-code'), function () {

            new AddCouponToCart( $(this) );

        } );

    } );

    var ProductsInCart = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find('.count-product__input'),
            _btnChangeCount = _obj.find('.count-product__btn'),
            _btnRemoveProduct = _obj.find('.my-cart__remove'),
            _request = new XMLHttpRequest(),
            _cart = $('.cart'),
            _totalPrice = $('.my-cart__total'),
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function() {

                        _setHeight();

                    },
                    resize: function () {

                        _setHeight();

                    }
                } );

                _input.on( {
                    keypress: function () {

                        if ( !(( event.which != 46 || $( this ).val().indexOf( '.' ) != -1 ) && ( event.which < 48 || event.which > 57 )) ) {

                            _requestCountChange( $(this).parents('.my-cart__product') );

                        }

                    }
                } );

                _btnChangeCount.on( {
                    click: function () {

                        _requestCountChange( $(this).parents('.my-cart__product') );

                    }
                } );

                _btnRemoveProduct.on( {
                    click: function () {

                        _requestProductRemove( $(this).parents('.my-cart__product') );

                        return false;

                    }
                } );

            },
            _removeProduct = function( elem ) {

                elem.addClass('hidden');

                setTimeout( function() {

                    elem.remove();

                }, 500 );

            },
            _requestProductRemove = function ( elem ) {

                _request.abort();
                _request = $.ajax( {
                    url: $('body').attr('data-action'),
                    data: {
                        action: 'remove_cart_item',
                        id: elem.attr('data-product-key'),
                        flag: 'remove'
                    },
                    dataType: 'json',
                    type: "get",
                    success: function (m) {

                        _removeProduct( elem );

                        if( parseInt(m.cartCountProducts) == 0 ) {

                            _cart.find('div').remove();
                            _cart.removeClass('cart_fill');
                            $('.site__header').removeClass('site__header_fill-cart');

                        } else {

                            _cart.find('div').html( m.cartCountProducts );

                        }
                        _totalPrice.find('span').html( m.subtotal );

                    },
                    error: function (XMLHttpRequest) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            alert("ERROR!!!");
                        }
                    }
                } );

            },
            _requestCountChange = function ( elem ) {

                _request.abort();
                _request = $.ajax( {
                    url: $('body').attr('data-action'),
                    data: {
                        action: 'cart_quantity_changes',
                        id: elem.attr('data-product-id'),
                        key: elem.attr('data-product-key'),
                        countProduct: elem.find('.count-product__input').val(),
                        flag: 'changeCount'
                    },
                    dataType: 'json',
                    type: "get",
                    success: function (m) {
                   
                        elem.find('.my-cart__total-price').html( m.total );
                        _totalPrice.find('span').html( m.subtotal );

                    },
                    error: function (XMLHttpRequest) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            alert("ERROR!!!");
                        }
                    }
                } );

            },
            _setHeight = function() {

                _obj.each( function() {

                    var curItem = $(this),
                        children = curItem.find('>div');

                    curItem.height( children.outerHeight(true) );

                } )

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var AddProductsToCart = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find('.count-product__input'),
            _price = _obj.find('.product-single__price'),
            _addToCartBtn = _obj.find('.product-single__add'),
            _request = new XMLHttpRequest(),
            _cart = $('.cart'),
            oldCount = 0,
            newCount = 0,
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _addToCartBtn.on( {
                    click: function ( event ) {

                        if( !( _addToCartBtn.hasClass('adding') ) ) {

                            _animatedAdding( event );
                            _requestProductAddToCart( $(this).parents('.product-single__info') );
                            _addToCartBtn.addClass('adding');

                        }

                        return false;

                    }
                } );

            },
            _animatedAdding = function( event ) {

                var pic = $('.gallery__top .slick-current').data('image'),

                e = event || window.event;

                var pageX = e.pageX,
                    pageY = e.pageY;

                $('body').append('<div class="site__product hidden" style="background-image:url('+ pic +')"></div>');
                $('.site__product').css( {
                    top: $('.gallery__top').offset().top ,
                    left: $('.gallery__top').offset().left,
                    width: $('.gallery__top').width(),
                    height: $('.gallery__top').height()
                } );

                setTimeout( function() {

                    $('.site__product').addClass('visible');
                    $('.site__product').css( {
                        top: _cart.offset().top + _cart.innerHeight()/2 - $('.site__product').height()/2 ,
                        left: _cart.offset().left + _cart.innerWidth()/2 - $('.site__product').width()/2
                    } );

                }, 100 );

                setTimeout( function() {

                    $('.site__product').removeClass('visible');
                    $('.site__product').css( {
                        '-webkit-transform': 'scale(0.2)',
                        'transform': 'scale(0.2)'
                    } );

                }, 500 );

                setTimeout( function() {


                    $('.site__product').remove();
                    _addToCartBtn.removeClass('adding');

                }, 700 );


                _writeInCart();

            },
            _writeInCart =  function() {


                if( !( _cart.hasClass('cart_fill') ) ) {

                    newCount = parseInt( _input.val() );

                    setTimeout( function() {

                        _cart.append('<div></div>');
                        _cart.addClass('cart_fill');
                        $('.site__header').addClass('site__header_fill-cart');

                        setTimeout( function() {

                            if( newCount == 1 ) {

                                _cart.find('div').html( newCount + ' item');

                            } else {

                                _cart.find('div').html( newCount + ' items');

                            }

                        }, 100 );

                    }, 600 );

                } else {

                    oldCount = parseInt( _cart.find('div').text() );
                    newCount = parseInt( _input.val() ) + oldCount;

                    setTimeout( function() {

                        _cart.find('div').html( newCount + ' items');

                    }, 700 );

                }

            },
            _requestProductAddToCart = function ( elem ) {

                _request.abort();
                _request = $.ajax( {
                    url: $('body').attr('data-action'),
                    data: {
                        action: 'single_add_product',
                        id: elem.attr('data-id'),
                        countProduct: _input.val(),
                        price: _price.text(),
                        flag: 'addToCart'
                    },
                    dataType: 'json',
                    type: "get",
                    success: function (m) {
                        
                        if ( parseInt( m.cartCountProducts ) != newCount ) {

                            _cart.find('div').html( m.cartCountProducts );
                           

                        }

                    },
                    error: function ( XMLHttpRequest, m ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {

                            if ( parseInt( m.cartCountProducts ) != newCount ) {

                                _cart.find('div').html( oldCount + 'items' );

                            }

                        }
                    }
                } );

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var AddCouponToCart = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _applyButton = obj.find('button'),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function () {

                _applyButton.on( {
                    click: function ( event ) {

                        if(_obj.find('#promo-code').val()){
                            _requestProductAddToCart( _obj );
                        } else {
                            console.log('empty code');
                        }


                        return false;

                    }
                } );

            },
            _requestProductAddToCart = function ( elem ) {

                _request.abort();
                _request = $.ajax( {
                    url: $('body').attr('data-action'),
                    data: {
                        action: 'apply_coupon_to_order',
                        coupon_name: elem.find('#promo-code').val()
                    },
                    dataType: 'json',
                    type: "get",
                    success: function (m) {

                        console.log(m);

                    },
                    error: function ( XMLHttpRequest, m ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {

                            console.log('error');

                        }
                    }
                } );

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

} )();