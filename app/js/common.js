document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';



    /*******************************************************/
    //MENU
    /*******************************************************/
    ( function() {

        let windowWidth = window.innerWidth;

        const elemNav = document.querySelector('.nav'),
            buttonNav = document.querySelector('.header__nav-button');

        buttonNav.addEventListener( 'click', function( e ) {
            e.stopPropagation();
            if ( buttonNav.classList.contains( 'active' ) ) {
                buttonNav.classList.remove('active');
                // elemNav.style.display = '';
                elemNav.classList.remove('active');
            } else {
                buttonNav.classList.add( 'active' );
                // elemNav.style.display = 'block';
                elemNav.classList.add('active');
            }
        } );

        window.addEventListener( 'resize', function() {

            const newWindowWidth = window.innerWidth;

            if ( windowWidth !== newWindowWidth ) {

                windowWidth = newWindowWidth;

                buttonNav.classList.remove('active');
                // elemNav.style.display = '';
                elemNav.classList.remove('active');
            }
        } );

    } () );


    //*********************************************************//
    //Lazy load for images
    //*********************************************************//
    ( function() {

        const lazyLoadImg = new IntersectionObserver(

            function( entries ) {

                for ( let i = 0; i < entries.length; i++  ) {

                    const entry = entries[ i ];
                    const target = entry.target;

                    if ( entry.isIntersecting && target.hasAttribute( 'data-lazy-load' ) ) {

                        if ( target.nodeName === 'IMG' ) {
                            target.setAttribute( 'src', target.getAttribute( 'data-lazy-load' ) );
                        } else if ( target.nodeName === 'SOURCE' ) {
                            target.setAttribute( 'srcset', target.getAttribute( 'data-lazy-load' ) );
                        } else {
                            target.style.backgroundImage = 'url(' + target.getAttribute( 'data-lazy-load' ) + ')';
                        }

                        target.removeAttribute( 'data-lazy-load' )

                        lazyLoadImg.unobserve( target );

                        target.style.opacity = 1;
                    }
                }
            },
            {
                root: null,
                rootMargin: ( window.innerHeight / 2 ) + 'px ' + ( window.innerWidth / 2 ) + 'px',
                threshold: [ 0 ],
            }
        );

        // Start observing an element
        const lazyLoadImgElems = document.querySelectorAll( '[ data-lazy-load ]' );

        for ( let i = 0; i < lazyLoadImgElems.length; i++  ) {

            lazyLoadImg.observe( lazyLoadImgElems[ i ] );

            lazyLoadImgElems[ i ].style.opacity = 0;
            lazyLoadImgElems[ i ].style.transition = '1s';
        }
        
    } () );

    //*********************************************************//
    //SLIDER ABOUT
    //*********************************************************//
    $( '.about__box' ).addClass( 'owl-carousel' ).owlCarousel( {
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        dots: false,
        // autoplayTimeout: 10000,
        // autoplay: true,
        smartSpeed: 1200,
        onInitialize: function( event ) {
            $( event.target ).find( '.about__item' ).each( function() {
                $( this ).attr( 'data-item-counter', $( this ).index() + 1 )
            } );
        },
        onInitialized: function( event ) {
            $( event.target ).append( '<div class="about__counter"><div class="about__counter-current">' + $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) + '</div><div class="about__counter-amount">' + ( $( event.target ).find( '.owl-item:not( .cloned )' ).length ) + '</div></div>' );
        },
        onTranslated: function( event ) {
            $( event.target ).find( '.about__counter-current' ).text( $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) )
        }
    } );

    //*********************************************************//
    //YANDEX MAP
    //*********************************************************//
    ( function() {

        const mapElem = document.querySelector( '#map' );

        const lazyLoadMap = new IntersectionObserver(

            function( entries ) {

                for ( let i = 0; i < entries.length; i++  ) {

                    const entry = entries[ i ];
                    const target = entry.target;

                    if ( entry.isIntersecting && ( typeof ymaps === 'object' ) ) {

                        ymaps.ready( function() {

                            const myMap = new ymaps.Map( 'map', {
                                center: [ 55.769833, 37.426492 ],
                                zoom: 16,
                                controls: [],
                                behaviors: [ 'drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch' ]
                            }, {
                                searchControlProvider: 'yandex#search'
                            });

                            //Элементы управления
                            myMap.controls.add( 'zoomControl', {
                                size: 'small',
                                position: {
                                    top: 'auto',
                                    right: 10,
                                    bottom: 50
                                }
                            } );

                            myMap.geoObjects.add( new ymaps.Placemark(
                                [ 55.769833, 37.426492 ],
                                {
                                    hintContent: 'Адрес: г. Москва, ул. Крылатская, д.15',
                                    balloonContent: 'Адрес: г. Москва, ул. Крылатская, д.15',
                                },
                                {
                                    iconLayout: 'default#image',
                                    iconImageHref: 'img/icon-mark.svg',
                                    iconImageSize: [ 53, 62 ],
                                    iconImageOffset: [- 26, -62 ],
                                }
                            ) );

                            //Вкл/Выкл драг карты при адаптиве
                            const manageDrag = function() {
                                window.innerWidth <= 992 ? myMap.behaviors.disable( 'drag' ) : myMap.behaviors.enable( 'drag' )
                            };
                            window.onload = manageDrag
                            window.onresize = manageDrag

                            //перерисуем карту по ресайзу
                            typeof ResizeObserver === 'object' && new ResizeObserver( function( entries ) {
                                myMap.container.fitToViewport()
                            } ).observe( mapElem );

                            //перерисуем карту после инициализации
                            myMap.container.fitToViewport();

                        } );

                        lazyLoadMap.unobserve( target );
                    }
                }
            },
            {
                root: null,
                rootMargin: ( window.innerHeight / 2 ) + 'px ' + ( window.innerWidth / 2 ) + 'px',
                threshold: [ 0 ],
            }
        );

        // Start observing an element
        lazyLoadMap.observe( mapElem );

    } () );


} );
