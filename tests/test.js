var test = require("tap").test;
var soon = require('..').soon;

test('Assert passes first time', function (t) {
  soon(function () {
    // doesn't throw
  }, this, function (error) {
    t.notOk(error, "There should not be an error.");
    t.end();
  });
});

test('Assert passes after a few attempts', function (t) {
  var attempt = 0;

  soon(function () {
    if (attempt++ < 5)
      throw new Error("Oh dear!");
  }, this, function (error) {
    t.notOk(error, "There should not be an error.");
    t.end();
  });
});

test("Assert doesn't pass within 100 attempts", function (t) {
  var attempt = 0;

  soon(function () {
    if (attempt++ < 101)
      throw new Error("Oh dear!");
  }, this, function (error) {
    t.ok(error, "There should be an error.");
    t.end();
  });
});

function successfulAsyncFunction(callback) {
  process.nextTick(function () {
    callback();
  });
}

test('Async assert passes first time', function (t) {
  soon(successfulAsyncFunction, this, function (error) {
    t.notOk(error, "There should not be an error.");
    t.end();
  });
});

function failingAsyncFunction(callback) {
  process.nextTick(function () {
    callback('Oops');
  });
}

test("Async assert fails", function (t) {
  soon(failingAsyncFunction, this, function (error) {
    t.ok(error, "There should be an error.");
    t.end();
  });
});