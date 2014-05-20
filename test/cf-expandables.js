(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('cf-expandables', {
    // This will run before each test in this module.
    setup: function() {
      this.$expandables = $('.expandable');
    }
  });

  test('Verify initial state', function() {
    expect( 4 );
    ok( !$('.one').find('.expandable_content').is( ':visible' ), 'content should be closed' );
    ok( $('.two').find('.expandable_content').is( ':visible' ), 'content should be open' );
    ok( $('.one').find('.expandable_button-open').is( ':visible' ), 'open icon should be visible' );
    ok( $('.two').find('.expandable_button-close').is( ':visible' ), 'close icon should be visible' );
  });

  asyncTest('Verify modules can open or close', function() {
    expect( 6 );
    this.$expandables.each(function(){
      $( this ).find('.expandable_target').click();
    });
    setTimeout(function() {
      ok( $('.one').find('.expandable_content').is( ':visible' ), 'content should be visible' );
      ok( !$('.two').find('.expandable_content').is( ':visible' ), 'content should be closed' );
      ok( $('.one').hasClass('expandable__expanded'), 'expandable should have expanded class' );
      ok( !$('.two').hasClass('expandable__expanded'), 'expandable should not have expanded class' );
      ok( $('.one').find('.expandable_button-close').is( ':visible' ), 'close icon should be visible' );
      ok( $('.two').find('.expandable_button-open').is( ':visible' ), 'open icon should be visible' );
      start();
    }, 900);
  });

  asyncTest('Verify modules can toggle', function() {
    expect( 6 );
    this.$expandables.each(function(){
      $( this ).find('.expandable_target').click();
    });
    setTimeout(function() {
      ok( !$('.one').find('.expandable_content').is( ':visible' ), 'content should be closed' );
      ok( $('.two').find('.expandable_content').is( ':visible' ), 'content should be visible' );
      ok( !$('.one').hasClass('expandable__expanded'), 'expandable should not have expanded class' );
      ok( $('.two').hasClass('expandable__expanded'), 'expandable should have expanded class' );
      ok( $('.one').find('.expandable_button-open').is( ':visible' ), 'open icon should be visible' );
      ok( $('.two').find('.expandable_button-close').is( ':visible' ), 'close icon should be visible' );
      start();
    }, 900);
  });

}(jQuery));
