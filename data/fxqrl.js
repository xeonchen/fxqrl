'use strict';

self.port.on('update_image', function onUpdate(image) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(image, 'text/html');
  var img_el = doc.getElementsByTagName('img')[0];
  document.getElementById('qrcode_dl').href = img_el.src;
  document.getElementById('qrcode_img').src = img_el.src;
});
