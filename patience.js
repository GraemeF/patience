var soon = function (assert, context, callback) {
  var attempts = 0;
  var isAsync = assert.length;

  var tryAssert = function (assert, context, callback) {
    try {
      if (isAsync) {
        assert.call(context, callback);
      }
      else {
        assert.call(context);
        callback();
      }
    }
    catch (error) {
      callback(error);
    }
  };

  var retryingCallback = function (error) {
    if (error) {
      if (attempts++ < 100) {
        setTimeout(function () {
          tryAssert(assert, context, retryingCallback);
        }, 10);
      }
      else {
        callback(error);
      }
    }
    else
      callback();
  };

  process.nextTick(function () {
    tryAssert(assert, context, retryingCallback);
  });
};

module.exports = {soon: soon};