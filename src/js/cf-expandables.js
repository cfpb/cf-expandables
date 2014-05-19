/**
 * cf-expandables
 * https://github.com/cfpb/cf-expandables
 *
 * A public domain work of the Consumer Financial Protection Bureau
 */

(function($) {
  $(function() {

      $('.expandable').each(function(){

        var $this = $( this ),
            $header = $this.find('.expandable_header'),
            $content = $this.find('.expandable_content');

        if ($this.hasClass('expandable__expanded')) {
            $content.css('display','block');
        } else {
            $content.css('display','none');
        }

        $header.on( 'click', function( ev ){

          ev.preventDefault();
          ev.stopPropagation();

          $this.toggleClass('expandable__expanded');
          $content.slideToggle();

        });

      });

  });
}(jQuery));