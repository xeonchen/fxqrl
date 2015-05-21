'use strict';

let main = require("./main");

exports["test main"] = function(assert) {
  assert.ok("Unit test running!");
};

exports["test main async"] = function(assert, done) {
  assert.ok("async Unit test running!");
  done();
};

function randomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=";

    for (let i = 0; i < length; ++i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

exports["test generateQR"] = function(assert) {
  for (let i = 0; i < 10; ++i) {
    let { tag } = main.generateQR(randomString(2048));
    assert.notEqual(tag.length, 0, "tag should not be empty");
  }
};


require("sdk/test").run(exports);
