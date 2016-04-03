/* global $ */

var twitchStatus = (function() {
  /**
   * Sets the events of the webpage
   */
  function setEvents() {
    $(".btn-group > .btn").click(function() {
      $(".btn-group > .btn").removeClass("active");
      $(this).addClass("active");
    });
  }

  /**
   * Initializes the
   */
  function init() {
    setEvents();
  }
  return {
    init: init
  };
})();

twitchStatus.init();
