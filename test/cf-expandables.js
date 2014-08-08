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
      this.$testSubjectOne = $('#test-subject-one');
      this.$testSubjectTwo = $('#test-subject-two');
    }
  });

  test('Verify initial default collapsed state', function() {
    expect(6);
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
    ok(
        ($('#test-subject-one .expandable_target').attr('aria-pressed') === 'false'),
        'The target should have an aria-pressed attribute set to false'
    );
    ok(
        ($('#test-subject-one .expandable_target').attr('aria-controls') === $('#test-subject-one .expandable_content').attr('id')),
        'The target should have an aria-controls attribute set to the id attribute of the content'
    );
    ok(
        ($('#test-subject-one .expandable_content').attr('aria-expanded') === 'false'),
        'The content should have an aria-expanded attribute set to false'
    );
  });

  test('Verify initial state when using the expanded modifier', function() {
    expect(6);
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
    ok(
        ($('#test-subject-two .expandable_target').attr('aria-pressed') === 'true'),
        'The target should have an aria-pressed attribute that is true'
    );
    ok(
        ($('#test-subject-two .expandable_target').attr('aria-controls') === $('#test-subject-two .expandable_content').attr('id')),
        'The target should have an aria-controls attribute set to the id attribute of the content'
    );
    ok(
        ($('#test-subject-two .expandable_content').attr('aria-expanded') === 'true'),
        'The content should have an aria-expanded attribute set to true'
    );
  });

  asyncTest('Verify expandables can open after being closed by default', function() {
    expect(5);
    var $expandable = this.$testSubjectOne;
    $expandable.find('.expandable_target').trigger('click');
    setTimeout(function() {
      ok(
          $expandable.find('.expandable_content').is(':visible'),
          'The content should no longer be collapsed'
      );
      ok(
          $expandable.find('.expandable_cue-close').is(':visible'),
          'The close cue should be visible'
      );
      ok(
          !$expandable.find('.expandable_cue-open').is(':visible'),
          'The open cue should be hidden'
      );
      ok(
          ($expandable.find('.expandable_target').attr('aria-pressed') === 'true'),
          'The target should have an aria-pressed attribute that is true'
      );
      ok(
          ($expandable.find('.expandable_content').attr('aria-expanded') === 'true'),
          'The content should have an aria-expanded attribute set to true'
      );
      start();
    }, 900);
  });

  asyncTest('Verify expandables can close after being opened by a click', function() {
    expect(5);
    var $expandable = this.$testSubjectOne;
    // This expandable was opened in the previous test
    $expandable.find('.expandable_target').trigger('click');
    setTimeout(function() {
      ok(
          !$expandable.find('.expandable_content').is(':visible'),
          'The content should be collapsed'
      );
      ok(
          $expandable.find('.expandable_cue-open').is(':visible'),
          'The open cue should be visible'
      );
      ok(
          !$expandable.find('.expandable_cue-close').is(':visible'),
          'The close cue should be hidden'
      );
      ok(
          ($expandable.find('.expandable_target').attr('aria-pressed') === 'false'),
          'The target should have an aria-pressed attribute that is false'
      );
      ok(
          ($expandable.find('.expandable_content').attr('aria-expanded') === 'false'),
          'The content should have an aria-expanded attribute set to true'
      );
      start();
    }, 1800);
  });

  asyncTest('Verify expandables can close after being open by default', function() {
    expect(5);
    var $expandable = this.$testSubjectTwo;
    $expandable.find('.expandable_target').trigger('click');
    setTimeout(function() {
      ok(
          !$expandable.find('.expandable_content').is(':visible'),
          'The content should be collapsed'
      );
      ok(
          $expandable.find('.expandable_cue-open').is(':visible'),
          'The open cue should be visible'
      );
      ok(
          !$expandable.find('.expandable_cue-close').is(':visible'),
          'The close cue should be hidden'
      );
      ok(
          ($expandable.find('.expandable_target').attr('aria-pressed') === 'false'),
          'The target should have an aria-pressed attribute that is false'
      );
      ok(
          ($expandable.find('.expandable_content').attr('aria-expanded') === 'false'),
          'The content should have an aria-expanded attribute set to true'
      );
      start();
    }, 900);
  });

  asyncTest('Verify expandables can open after being closed by a click', function() {
    expect(5);
    var $expandable = this.$testSubjectTwo;
    // This expandable was opened in the previous test
    $expandable.find('.expandable_target').trigger('click');
    setTimeout(function() {
      ok(
          $expandable.find('.expandable_content').is(':visible'),
          'The content should no longer be collapsed'
      );
      ok(
          $expandable.find('.expandable_cue-close').is(':visible'),
          'The close cue should be visible'
      );
      ok(
          !$expandable.find('.expandable_cue-open').is(':visible'),
          'The open cue should be hidden'
      );
      ok(
          ($expandable.find('.expandable_target').attr('aria-pressed') === 'true'),
          'The target should have an aria-pressed attribute that is true'
      );
      ok(
          ($expandable.find('.expandable_content').attr('aria-expanded') === 'true'),
          'The content should have an aria-expanded attribute set to true'
      );
      start();
    }, 1800);
  });

  test('Verify dynamic duration based on height', function() {
    expect(2);
    $('#test-subject-one .expandable_content').height(200);
    ok(
        ($.fn.expandable.calculateExpandDuration($('#test-subject-one .expandable_content').height()) === 800),
        'The duration should be (height * 4) when expanding'
    );
    $('#test-subject-two .expandable_content').height(200).trigger('click');
    ok(
        ($.fn.expandable.calculateCollapseDuration($('#test-subject-one .expandable_content').height()) === 400),
        'The duration should be (height * 2) when collapsing'
    );
  });

}(jQuery));
