var soon = function (assert, context, callback) {
    var attempts = 0;

    var tryAssert = function (assert, context, callback) {
        try {
            assert.call(context);
            callback();
        }
        catch (error) {
            callback(error);
        }
    };

    var retryingCallback = function (error) {
        if (error) {
            if (attempts++ < 100) {
                console.log(error);
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

module.exports = {soon:soon};