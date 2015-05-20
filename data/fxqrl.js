'use strict';

self.port.on('update_image', function onUpdate(image) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(image, 'text/html');
  var node = doc.firstChild;
  document.getElementById('qrcode').appendChild(node);
});
