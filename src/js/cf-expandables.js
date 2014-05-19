/**
 * cf-expandables
 * https://github.com/cfpb/cf-expandables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

(function($) {

  $(function() {

      $('.expandable').on( 'click', '.expandable_header', function( ev ){

        var $header = $( this ),
            $expandable = $header.parent('.expandable'),
            $content = $expandable.find('.expandable_content'),
            $cta = $header.find('.expandable_text');

        ev.preventDefault();
        ev.stopPropagation();

        $expandable.toggleClass('expandable__open');
        $content.slideToggle();
        $cta.text( $expandable.hasClass('expandable__open') ? 'Hide' : 'Show' );

      });

  });

}(jQuery));