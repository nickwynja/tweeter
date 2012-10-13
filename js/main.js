(function() {
  // Prototype to style tweet parts
  String.prototype.style_tweet = function() {
    var tweet = this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g);
    tweet = tweet.replace(/(^|\s)@(\w+)/g, '$1<span class="username">@$2</span>');
    return tweet.replace(/(^|\s)#(\w+)/g, '$1<span class="hashtag">#$2</span>');
 };

  var lastTweetLoaded = 0;
  
  function loadTweets() {
    $.ajax({
      url: 'tweets.txt', 
      dataType: 'text',
      success: function(data) {
        var str = data,
            tweets = $.parseJSON('[' + str + ']'),
            $list = $('#tweets'),
            startPrepending = false;

        $(tweets).each(function(idx, tweet) {
          if (lastTweetLoaded == 0 || tweet.id > lastTweetLoaded) {
            var str = tweet.text;

            $('<li style="display: none;">' + str.style_tweet(str) + '</li>')
              .prependTo($list)
              .fadeIn(1000);
              
           startPrepending = true;
          }
          lastTweetLoaded = tweet.id;
        });
      },
      error: function(data) { console.log('An error has occured: ' + data); }
    });
  }
  
  $(document).ready(function() {
    // Load on start
    loadTweets();
    // Check for new tweets every 2 seconds
    setInterval(loadTweets, 2000);
  });
})();