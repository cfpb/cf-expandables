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

  test('Verify initial default collapsed state', function() {
    expect(3);
    ok(
        !$('#test-subject-one .expandable_content').is(':visible'),
        'The content should be collapsed'
    );
    ok(
        $('#test-subject-one .expandable_cue-open').is(':visible'),
        'The open cue should be visible'
    );
    ok(
        !$('#test-subject-one .expandable_cue-close').is(':visible'),
        'The close cue should be hidden'
    );
  });

  test('Verify initial state when using the expanded modifier', function() {
    expect(3);
    ok(
        $('#test-subject-two .expandable_content').is(':visible'),
        'The content should be expanded'
    );
    ok(
        $('#test-subject-two .expandable_cue-close').is(':visible'),
        'The close cue should be visible'
    );
    ok(
        !$('#test-subject-two .expandable_cue-open').is(':visible'),
        'The open cue should be hidden'
    );
  });

}(jQuery));
