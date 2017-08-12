casper.test.begin('Links in documentation works', function suite(test) {
  var BASE_URL = 'http://127.0.0.1:8070/docs/';
  var allLinks = [];
  var linkQueue = [{
    url: BASE_URL,
    parent: '/'
  }];
  var loopCount = 0;

  casper
    .start(BASE_URL)
    .then(function() {
      processLinkQueue(this, test);
    })
    .then(function() {
      test.assertEquals(linkQueue.length, 0, "There is no more URLs to visit");
    })
    .run(function() {
        test.done();
    });



  function processLinkQueue(self, test) {
    self.each(linkQueue, function(self,link) {
      self
        .thenOpen(link.url)
        .waitForResource(
          /\.md/,
          function() {
            test.pass("When visiting " + link.parent + " following link is working: " + link.url)
          },
          function() {
            test.fail("When visiting " + link.parent + " following link is not working: " + link.url)
          }
        )
        .then(function(){
          var newLinkQueue = [];
          for(var i in linkQueue) {
            if(linkQueue[i].url != link.url) {
              newLinkQueue.push(linkQueue[i]);
            }
          }
          linkQueue = newLinkQueue;
          fetchLinks(this);
        })
    })
    .then(function() {
      self.then(function() {
        loopCount++;
        if(loopCount < 10 && linkQueue.length > 0) {
          processLinkQueue(this, test);
        }
      })

    })
  }

  function fetchLinks(self) {
    var result = self.evaluate(function(){
      var items = document.getElementsByTagName('a');
      items = Array.prototype.map.call(items,function(link){
        var url = link.getAttribute('href');
        var pos = url.indexOf('?');
        url = (pos != -1) ? url.substring(0, pos) : url;
        return url;
      });
      items = Array.prototype.filter.call(items,function(value, index, self){
        return self.indexOf(value) === index;
      });
      items = Array.prototype.filter.call(items,function(value, index, self){
        return value.charAt(0) == '#'
      });
      return items;
    });
    result = Array.prototype.map.call(result,function(url){
      return {
        url: BASE_URL + url,
        parent: self.getCurrentUrl()
      };
    });
    result = Array.prototype.filter.call(result,function(value, index, self){
        return allLinks.indexOf(value.url) == -1;
    });
    for(var i in result) {
      linkQueue.push(result[i]);
      allLinks.push(result[i].url);
    }
  }

})
