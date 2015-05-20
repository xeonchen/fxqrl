'use strict';

exports.generateQR = generateQR;

const [ QR_VERSION_MIN, QR_VERSION_MAX ] = [ 1, 40 ];
const DEFAULT_ERROR_CORRECTION_LEVEL = 'L'; // 'L', 'M', 'Q', 'H'

let button = require('sdk/ui/button/action').ActionButton({
  id: "fxqrl",
  label: "Generate QR code",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function generateQR(text, cellSize=1, margin=0) {
  function calSize(level) {
    // according to qrcode.js
    return (level * 4 + 17) * cellSize + margin * 2;
  }

  let qrcode = require('./qrcode');
  for (let i = QR_VERSION_MIN; i <= QR_VERSION_MAX; ++i) {
    let qr = qrcode(i, DEFAULT_ERROR_CORRECTION_LEVEL);
    qr.addData(text);
    try {
      qr.make();
    } catch (e) {
      continue;
    }
    return {
      size: calSize(i) + 10,
      tag: qr.createImgTag(cellSize, margin)
    };
  }
  return {
    size: 0,
    tag: ""
  };
}

function handleClick(state) {
  let tabs = require("sdk/tabs");
  let { size, tag } = generateQR(tabs.activeTab.url, 4, 0);
  let { data } = require("sdk/self");
  let panel = require("sdk/panel").Panel({
    width: size,
    height: size,
    contentScriptFile: data.url("fxqrl.js"),
    contentStyleFile: data.url("fxqrl.css"),
    contentURL: data.url("fxqrl.html")
  });

  panel.port.emit('update_image', tag);
  panel.show();
}
