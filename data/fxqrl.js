'use strict';

self.port.on('update_image', function onUpdate(image) {
  document.getElementById('qrcode').innerHTML = image;
});
