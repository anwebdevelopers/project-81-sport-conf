document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';

    // function animate( options ) {
    //     const start = performance.now()
    //     requestAnimationFrame( function animate( time ) {
    //         // timeFraction от 0 до 1
    //         let timeFraction = ( time - start ) / options.duration
    //         if ( timeFraction > 1 ) timeFraction = 1
    //         // текущее состояние анимации
    //         const progress = options.timing( timeFraction )
    //
    //         options.draw( progress )
    //
    //         if ( timeFraction < 1 ) {
    //             requestAnimationFrame( animate )
    //         }
    //     })
    // }



    //*********************************************************//
    //Lazy load for images
    //*********************************************************//
    var lazyLoad = new IntersectionObserver(

        function( entries ) {

            for ( var i = 0; i < entries.length; i++  ) {

                var entry = entries[ i ]
                var target = entry.target

                 if ( entry.isIntersecting && target.hasAttribute( 'data-lazy-load' ) ) {

                     // target.style.opacity = 0
                     //
                     // animate({
                     //     duration: 400,
                     //     timing: timeFraction => {
                     //         return 1 - Math.sin( Math.acos( timeFraction ) )
                     //         // return Math.pow( timeFraction, 5 )
                     //     },
                     //     draw: progress => {
                     //         target.style.opacity = progress
                     //         console.log(progress);
                     //     }
                     // })

                    if ( target.nodeName === 'IMG' ) {
                        target.setAttribute( 'src', target.getAttribute( 'data-lazy-load' ) );
                    } else if ( target.nodeName === 'SOURCE' ) {
                        target.setAttribute( 'srcset', target.getAttribute( 'data-lazy-load' ) );
                    } else {
                        target.style.backgroundImage = 'url(' + target.getAttribute( 'data-lazy-load' ) + ')';
                    }

                    target.removeAttribute( 'data-lazy-load' )

                    lazyLoad.unobserve( target );
                }
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: [0],
        }
    );

    // Start observing an element
    var lazyLoadElems = document.querySelectorAll( '[ data-lazy-load ]' );

    for ( var i = 0; i < lazyLoadElems.length; i++  ) {
        lazyLoad.observe( lazyLoadElems[ i ] );
    }
} );
