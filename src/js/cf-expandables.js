/**
 * cf-expandables
 * https://github.com/cfpb/cf-expandables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

(function($) {

  $(function() {

      $('.expandable').on( 'click', '.expandable-header', function( ev ){

        var $header = $( this ),
            $container = $header.parent('.expandable'),
            $button = $header.children('.expandable-button');

        ev.preventDefault();
        ev.stopPropagation();

        $container.toggleClass('open');
        $header.next('.expandable-content').slideToggle();
        $button.toggleClass('open');
        $button.children('.expandable-text').text( $container.hasClass('open') ? 'Hide' : 'Show' );

      });

  });

}(jQuery));