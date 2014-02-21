/*!
 *              ad$$             $$
 *             d$"               $$
 *             $$                $$
 *   ,adPYba,  $$$$$ $b,dPYba,   $$,dPYba,
 *  aP'    '$: $$    $$P'   '$a  $$P'   '$a
 *  $(         $$    $$(     )$  $$(     )$
 *  "b,    ,$: $$    $$b,   ,$"  $$b,   ,$"
 *   `"Ybd$"'  $$    $$`YbdP"'   $$`Ybd$"'
 *                   $$
 *                   $$
 *                   ""
 *  cf-expandables - v0.2.0 - 2014-02-18
 *  https://github.com/cfpb/cf-expandables
 *  A public domain work of the Consumer Financial Protection Bureau
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