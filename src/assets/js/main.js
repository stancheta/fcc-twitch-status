/* global $ */

var twitchStatus = (function() {
  var placeholdImage ='http://placehold.it/200x200';
  var twitchArray = ["freecodecamp", "storbeck", "terakilobyte", "habathcx",
    "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "ESL_SC2"];
  var urlBase =  'https://api.twitch.tv/kraken/streams/';
  /**
   * gets data concerning a certain channel using TwitchTV's API
   * @param {string} url url of the twitch api endpoint
   * @param {function} callback the function that handles the returned JSONP
   */
  function getData(url, callback) {
    $.getJSON(url, function(result) {
      callback(result);
    });
  }
  /**
   *
   */
  function setData(data, opt) {

  }

  /**
   *
   */
  function setTwitchStatuses(arr) {

  }

  /**
   * Sets the events of the webpage
   */
  function setEvents() {
    $(".btn").click(function() {
      $(".btn").removeClass("active");
      var $this = $(this);
      $this.addClass("active");
      if (($this).html() === 'Online') {
        $('.app-offline').hide();
        $('.app-online').show();
      } else if (($this).html() === 'Offline') {
        $('.app-online').hide();
        $('.app-offline').show();
      } else {
        $('.app-online, app-offline').show();
      }
    });
  }

  /**
   * Initializes the starting state of the webpage
   */
  function init() {
    setTwitchStatuses(twitchArray);
    $('#all').addClass("active");
    setEvents();
  }
  return {
    init: init
  };
})();

twitchStatus.init();
