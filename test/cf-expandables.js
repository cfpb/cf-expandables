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

  test('Verify modules are closed on DOM load', function() {
    expect( 4 );
    ok( !$('.one').find('.expandable_content').is( ':visible' ), 'should be closed' );
    ok( !$('.two').find('.expandable_content').is( ':visible' ), 'should be closed' );
    ok( $('.one').find('.expandable_text').text() === 'Show', 'should have show text' );
    ok( $('.two').find('.expandable_text').text() === 'Show', 'should have show text' );
  });

  asyncTest('Verify modules can open', function() {
    expect( 6 );
    this.$expandables.each(function(){
      $( this ).find('.expandable_header').click();
    });
    setTimeout(function() {
      ok( $('.one').find('.expandable_content').is( ':visible' ), 'should be visible' );
      ok( $('.two').find('.expandable_content').is( ':visible' ), 'should be visible' );
      ok( $('.one').hasClass('expandable__open'), 'should have open class' );
      ok( $('.two').hasClass('expandable__open'), 'should have open class' );
      ok( $('.one').find('.expandable_text').text() === 'Hide', 'should have hide text' );
      ok( $('.two').find('.expandable_text').text() === 'Hide', 'should have hide text' );
      start();
    }, 900);
  });

  asyncTest('Verify modules can close', function() {
    expect( 6 );
    this.$expandables.each(function(){
      $( this ).find('.expandable_header').click();
    });
    setTimeout(function() {
      ok( !$('.one').find('.expandable_content').is( ':visible' ), 'should be hidden' );
      ok( !$('.two').find('.expandable_content').is( ':visible' ), 'should be hidden' );
      ok( !$('.one').hasClass('expandable__open'), 'should not have open class' );
      ok( !$('.two').hasClass('expandable__open'), 'should not have open class' );
      ok( $('.one').find('.expandable_text').text() === 'Show', 'should have show text' );
      ok( $('.two').find('.expandable_text').text() === 'Show', 'should have show text' );
      start();
    }, 900);
  });

}(jQuery));
