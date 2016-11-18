"use strict";
( function(){

    $( function () {

        $.each( $('.my-cart__product'), function () {

            new ProductsInCart( $(this) );

        } );

        $.each( $('.product-single__info'), function () {

            new AddProductsToCart( $(this) );

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
                        id: elem.attr('data-id'),
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
                        id: elem.attr('data-id'),
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
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _addToCartBtn.on( {
                    click: function ( event ) {

                        if( !( _addToCartBtn.hasClass('adding') ) ) {

                            _animatedAdding( event );
                            _requestProductAddToCart( event, $(this).parents('.product-single__info') );
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

                console.log(pic);

                $('body').append('<div class="site__product hidden"><img src="'+ pic +'" alt=""></div>');
                $('.site__product').css( {
                    top: $('.gallery__top').offset().top + $('.gallery__top').innerHeight()/2 - $('.site__product').height()/2 ,
                    left: $('.gallery__top').offset().left + $('.gallery__top').innerWidth()/2 - $('.site__product').width()/2
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

                }, 500 );

                setTimeout( function() {

                    $('.site__product').remove();
                    _addToCartBtn.removeClass('adding');

                }, 700 );


            },
            _infoAdding = function() {

                var itemText = '';

                if( parseInt( _input.val() ) == 1 ) {

                    itemText = ' item';

                } else {

                    itemText = ' items';

                }

                $('.product-single').append('<div class="product-single__info-message hidden">'+ _input.val() + itemText +' added to cart</div>');
                $('.product-single__info-message ').css( {
                    top: _addToCartBtn.offset().top + _addToCartBtn.innerHeight() + 10,
                    left: _addToCartBtn.offset().left
                } );

                setTimeout( function() {

                    $('.product-single__info-message').addClass('visible');

                }, 200 );

                setTimeout( function() {

                    $('.product-single__info-message').remove();
                    _addToCartBtn.removeClass('adding');

                }, 3000 );


            },
            _requestProductAddToCart = function ( elem ) {

                _request.abort();
                _request = $.ajax( {
                    url: $('body').attr('data-action'),
                    data: {
                        id: elem.attr('data-id'),
                        countProduct: _input.val(),
                        price: _price.text(),
                        flag: 'addToCart'
                    },
                    dataType: 'json',
                    type: "get",
                    success: function (m) {

                        if( !( _cart.hasClass('cart_fill') ) ) {

                            setTimeout( function() {

                                _cart.append('<div></div>');
                                _cart.addClass('cart_fill');
                                $('.site__header').addClass('site__header_fill-cart');

                                setTimeout( function() {

                                    _cart.find('div').html(m.cartCountProducts);

                                }, 100 );

                            }, 600 );

                        } else {



                        }

                    },
                    error: function (XMLHttpRequest) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            alert("ERROR!!!");
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