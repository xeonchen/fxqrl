'use strict';

var buttons = require('sdk/ui/button/action');
var button = buttons.ActionButton({
  id: "fxqrl",
  label: "Generate QR code",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

var data = require("sdk/self").data;
var panel = require("sdk/panel").Panel({
  width: 160,
  height: 160,
  contentScriptFile: data.url("fxqrl.js"),
  contentStyleFile: data.url("fxqrl.css"),
  contentURL: data.url("fxqrl.html")
});

var qrcode = require('./qrcode');
var tabs = require("sdk/tabs");

function handleClick(state) {
  var qr = qrcode(4, 'M');
  qr.addData(tabs.activeTab.url);
  qr.make();
  panel.port.emit('update_image', qr.createImgTag(4, 0));
  panel.show();
}
