/**
 * cf-expandables
 * https://github.com/cfpb/cf-expandables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

(function( $ ) {
  $.fn.expandable = function( userSettings ) {

    function calculateExpandDuration( height ) {
        return height * 4;
    }

    function calculateCollapseDuration( height ) {
        return height * 2;
    }

    return $( this ).each(function() {

      var $this = $( this ),
          $target = $this.find('.expandable_target'),
          $content = $this.find('.expandable_content');

      $target.attr( 'aria-controls', $content.attr('id') );

      if ( $this.hasClass('expandable__expanded') ) {
        $content.css( 'display', 'block' );
        $content.attr( 'aria-expanded', 'true' );
        $target.attr( 'aria-pressed', 'true' );
      } else {
        $content.css( 'display', 'none' );
        $content.attr( 'aria-expanded', 'false' );
        $target.attr( 'aria-pressed', 'false' );
      }

      $target.on( 'click', function( ev ) {

        var duration = calculateExpandDuration( $content.height() );
        ev.preventDefault();
        ev.stopPropagation();

        if ( $target.attr('aria-pressed') === 'true' ) {
          $content.attr( 'aria-expanded', 'false' );
          $target.attr( 'aria-pressed', 'false' );
          duration = calculateCollapseDuration( $content.height() );
        } else {
          $content.attr( 'aria-expanded', 'true' );
          $target.attr( 'aria-pressed', 'true' );
          duration = calculateExpandDuration( $content.height() );
        }

        $this.toggleClass('expandable__expanded');
        $content.slideToggle({
          duration: duration,
          easing: 'easeOutExpo'
        });

      });

    });

  };

  // Auto init
  $('.expandable').expandable();

}(jQuery));