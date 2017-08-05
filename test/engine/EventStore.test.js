var assert = require('assert');
var sinon = require('sinon');

var EventStore = require('../../app/engine/EventStore.js');

describe('EventStore', function() {
  describe('add', function() {

    it('should store events under index', function() {
      var store =  new EventStore();
      var event1 = {data: 183.4};
      store.add("index8", event1);

      var events = store.get("index8");
      assert.equal(183.4, events[0].data);
      assert.equal(1, events.length);
    });

    it('should store multiple events under index', function() {
      var store =  new EventStore();
      var event1 = {data: 26};
      var event2 = {data: 62};
      store.add("index2", event1);
      store.add("index2", event1);
      store.add("index2", event2);

      var events = store.get("index2");
      assert.equal(26, events[0].data);
      assert.equal(26, events[1].data);
      assert.equal(62, events[2].data);
      assert.equal(3, events.length);
    });

    it('should segregate events basing on index', function() {
      var store =  new EventStore();
      var event1 = {whatever: "x"};
      var event2 = {whatever: "y"};
      store.add("a", event1);
      store.add("b", event1);
      store.add("a", event2);

      var eventsA = store.get("a");
      var eventsB = store.get("b");
      assert.equal("x", eventsA[0].whatever);
      assert.equal("y", eventsA[1].whatever);
      assert.equal("x", eventsB[0].whatever);
      assert.equal(2, eventsA.length);
      assert.equal(1, eventsB.length);
    });
  });

  describe('get', function() {

    it('should return empty array if index doesn\'t exist', function() {
      var store =  new EventStore();

      assert.equal(0, store.get("someindex").length);
    });

  });

  describe('clear', function() {

    it('should remove all events', function() {
      var store =  new EventStore();
      store.add("a", {data: 9});
      store.add("b", {data: -39});
      store.add("b", {data: 54});
      store.add(3, {data: 0.3});
      store.add(3, {data: 452});
      store.add(3, {data: 5});
      store.add(3, {data: 1});

      store.clear();

      assert.equal(0, store.get("someindex").length);
      assert.equal(0, store.get("a").length);
      assert.equal(0, store.get("b").length);
      assert.equal(0, store.get(3).length);
    });

  });
});
