/* global $ */

var twitchStatus = (function() {
  var placeholdImage = 'http://placehold.it/200x200';
  var twitchArray = ["freecodecamp", "storbeck", "terakilobyte", "habathcx",
    "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "ESL_SC2",
    "brunofin", "comster404"
  ];
  var urlBase = 'https://api.twitch.tv/kraken/';
  var undefPage = 'http://s.codepen.io/FreeCodeCamp/fullpage/undefined';
  /**
   * gets data concerning a certain channel using TwitchTV's API
   * @param {string} username username of twitch account to query
   * @param {string} opt is the type of twitch information to query:
   *        'stream' or 'channel'
   * @param {function} callback the function that handles the returned JSONP
   */
  function getData(username, opt, callback) {
    var url = urlBase + opt + '/' + username + '?callback=?';
    $.getJSON(url, function(result) {
      if (opt === 'streams' && result.stream === null) {
        getData(username, 'channels', setData);
      } else {
        callback(username, opt, result);
      }
    });
  }
  /**
   * Conditional to figure out how to set divs for each account
   * @param {string} username username of account to set
   * @param {string} opt how to interpret the JSON data
   * @param {JSON} data data to interpret
   */
  function setData(username, opt, data) {
    if (data.hasOwnProperty('error')) {
      setClosed(username);
    } else if (opt === 'channels') {
      setOffline(username, data);
    } else {
      setOnline(username, data);
    }
  }

  /**
   * sets div for a closed account
   * @param {string} username username of account to set
   */
  function setClosed(username) {
    var outputString = '';
    outputString += '<div class="row streamer-elt app-offline">' +
      '<div class="col-xs-2 col-sm-1"><img src="' + placeholdImage +
      '" alt="' + username + '"></div><div class="col-xs-10 col-sm-3">' +
      '<a href="' + undefPage + '">' + username + '</a></div>' +
      '<div class="col-xs-10 col-sm-8"><em>Account Closed</em></div></div>';
    $('#streamer-list').append(outputString);
  }

  /**
   * sets div for an account that is not currently streaming
   * @param {string} username username of account to set
   * @param {JSON} data data concerning the account
   */
  function setOffline(username, data) {
    var outputString = '';
    outputString += '<div class="row streamer-elt app-offline">' +
      '<div class="col-xs-2 col-sm-1"><img src="';
    if (data.logo === null) {
      outputString += placeholdImage;
    } else {
      outputString += data.logo;
    }
    outputString += '" alt="' + username + '"></div>' +
      '<div class="col-xs-10 col-sm-3"><a href="' + data.url + '">' +
      username + '</a></div><div class="col-xs-10 col-sm-8">' +
      '<em>Offline</em></div></div>';
    $('#streamer-list').append(outputString);
  }

  /**
   * sets div for an account that is currently streaming
   * @param {string} username username of account to set
   * @param {JSON} data data concerning the account
   */
  function setOnline(username, data) {
    var outputString = '';
    var image = '';
    var status = '';
    var d = data.stream.channel;
    if (d.logo === null) {
      image = placeholdImage;
    } else {
      image = d.logo;
    }
    if (d.status.length > 40) {
      status = d.status
        .slice(0, 37 - d.status.length) +
        '...';
    } else {
      status = d.status;
    }
    outputString += '<div class="row streamer-elt app-online">' +
      '<div class="col-xs-2 col-sm-1"><img src="' + image;
    outputString += '" alt="' + username + '"></div>' +
      '<div class="col-xs-10 col-sm-3"><a href="' + d.url +
      '">' + username + '</a></div><div class="col-xs-10 col-sm-8"><em>' +
      data.stream.game + '</em><em class="col-xs-hidden">: ' +
      status + '</em></div></div>';
    $('#streamer-list').prepend(outputString);
  }

  /**
   * Iterates through twitchArray to get JSON from each value
   * @param {array} arr Array of twitch accounts
   */
  function setTwitchStatuses(arr) {
    arr.forEach(function(elt) {
      getData(elt, 'streams', setData);
    });
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
