document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';

    const $window = $( window );

    /*******************************************************/
    //WINDOW HORISONTAL RESIZE
    /*******************************************************/
    // $window.on( 'resize', function() {
    //     const newWindowWidth = $window.width();
    //
    //     if ( windowWidth !== newWindowWidth ) {
    //
    //         windowWidth = newWindowWidth;
    //
    //         //MENU MOBILE
    //         $menu.removeClass( 'active' );
    //         $buttonMenu.removeClass( 'active' );
    //
    //         //SIDE NAV MOBILE ACCORDION
    //         $accordion.removeClass( 'active' );
    //     }
    // });

    //*********************************************************//
    //Lazy load for images
    //*********************************************************//
    const lazyLoad = new IntersectionObserver(

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

                    lazyLoad.unobserve( target );

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
    const lazyLoadElems = document.querySelectorAll( '[ data-lazy-load ]' );

    for ( let i = 0; i < lazyLoadElems.length; i++  ) {

        lazyLoad.observe( lazyLoadElems[ i ] );

        lazyLoadElems[ i ].style.opacity = 0;
        lazyLoadElems[ i ].style.transition = '1s';
    }

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
    if ( ( typeof ymaps === 'object' ) && $( '#map' ).length ) {

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
            $window.on( 'resize load', function() {
                $window.width() <= 992 ? myMap.behaviors.disable( 'drag' ) : myMap.behaviors.enable('drag')
            });

            //перерисуем карту после инициализации
            myMap.container.fitToViewport();

        });
    }

} );
