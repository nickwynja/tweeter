(function() {

  var lastTweetLoaded = 0;
  
  function loadTweets() {
    $.ajax({
      url: 'tweets.txt', 
      dataType: 'text',
      success: function(data) {
        
        var str = data;
        var tweets = $.parseJSON('[' + str + ']');
        var $list = $('#tweets');
        var startPrepending = false;
        $(tweets).each(function(idx, tweet) {

          if (lastTweetLoaded == 0 || tweet.id > lastTweetLoaded) {
            var li = '<li>' + tweet.text + '</li>';
            $list.prepend(li);
            startPrepending = true;
          }
          lastTweetLoaded = tweet.id;
        });
       },
      error: function(data) {
        console.log(data);
      }
    });
  }
  
  $(document).ready(function() {
      setInterval(loadTweets, 2000);
  });

})();