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
            $content = $expandable.find('.expandable_content');

        ev.preventDefault();
        ev.stopPropagation();

        $expandable.toggleClass('expandable__open');
        $content.slideToggle();

      });

  });

}(jQuery));