/**
 * cf-expandables
 * https://github.com/cfpb/cf-expandables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

(function( $ ) {

  $.fn.expandable = function( userSettings ) {

    return $( this ).each(function() {

      var $this = $( this ),
          $target = $this.find('.expandable_target').not( $this.find('.expandable .expandable_target') ),
          $content = $this.find('.expandable_content').not( $this.find('.expandable .expandable_content') ),
          $groupParent = $this.parents('.expandable-group'),
          accordion = $groupParent.length > 0 && $groupParent.data('accordion');

      if (accordion) {
        var $siblings = $this.siblings('.expandable');
      }

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

        var duration;
        ev.preventDefault();
        ev.stopPropagation();

        if ( $target.attr('aria-pressed') === 'true' ) {
          $content.attr( 'aria-expanded', 'false' );
          $target.attr( 'aria-pressed', 'false' );
          duration = $.fn.expandable.calculateCollapseDuration( $content.height() );
        } else {
          if (accordion) {
            $siblings.children('.expandable_content').attr( 'aria-expanded', 'false' );
            $siblings.children('.expandable_target').attr( 'aria-pressed', 'false' );
            $siblings.removeClass('expandable__expanded');
            $siblings.children('.expandable_content').slideUp({
              duration: 500,
              easing: 'easeOutExpo'
            });
          }
          $content.attr( 'aria-expanded', 'true' );
          $target.attr( 'aria-pressed', 'true' );
          duration = $.fn.expandable.calculateExpandDuration( $content.height() );
        }

        $this.toggleClass('expandable__expanded');
        $content.slideToggle({
          duration: duration,
          easing: 'easeOutExpo'
        });

      });

    });

  };

  $.fn.expandable.calculateExpandDuration = function( height ) {
    return $.fn.expandable.constrainValue( 450, 900, height * 4 );
  };

  $.fn.expandable.calculateCollapseDuration = function( height ) {
    return $.fn.expandable.constrainValue( 350, 900, height * 2 );
  };

  $.fn.expandable.constrainValue = function( min, max, duration ) {
    if ( duration > max ) {
        return max;
    } else if ( duration < min ) {
        return min;
    } else {
        return duration;
    }
  };

  // Auto init
  $('.expandable').expandable();

}(jQuery));
