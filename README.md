# Patience
## A little something to help your asserts chill out

Sometimes end-to-end tests talk to external processes and/or servers. Sometimes those external things take a little while to do their stuff. Sometimes you need to assert that stuff happens, eventually.

## Installation
    npm install patience

## Usage
When you want to make sure something happens within a short time period, call `soon(assert, context, callback)`. This will repeatedly check the `assert` until it passes, or gives up trying.
 
## Example
Here's something that hopefully gets the idea across. Say I have an assert that looks like this:

```javascript
this.browser.users().should.include(name);
callback();
```

That's great if the users list is updated synchronously. But say I'm testing my code in a child process, and using socket.io to send users back to a zombie browser when they log in? The test will only pass if the assert happens to run after all that communication has finished.

Instead, I can give it a short while to happen:

```javascript
soon(function () {
    this.browser.users().should.include(name);
}, this, callback);
```

This makes my test pass reliably, and as quickly as possible.