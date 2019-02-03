document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';

    //*********************************************************//
    //Lazy load for images
    //*********************************************************//
    var lazyLoad = new IntersectionObserver(

        function( entries ) {

            for ( var i = 0; i < entries.length; i++  ) {

                var entry = entries[ i ]
                var target = entry.target

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
    var lazyLoadElems = document.querySelectorAll( '[ data-lazy-load ]' );

    for ( var i = 0; i < lazyLoadElems.length; i++  ) {

        lazyLoad.observe( lazyLoadElems[ i ] );

        lazyLoadElems[ i ].style.opacity = 0;
        lazyLoadElems[ i ].style.transition = '1s';
    }
} );
