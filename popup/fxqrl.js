'use strict';

const [ QR_VERSION_MIN, QR_VERSION_MAX ] = [ 1, 40 ];
const DEFAULT_ERROR_CORRECTION_LEVEL = 'L'; // 'L', 'M', 'Q', 'H'

function generateQR(text, cellSize=1, margin=0) {
  for (let i = QR_VERSION_MIN; i <= QR_VERSION_MAX; ++i) {
    let qr = qrcode(i, DEFAULT_ERROR_CORRECTION_LEVEL);
    qr.addData(text);
    try {
      qr.make();
    } catch (e) {
      continue;
    }
    return qr.createImgTag(cellSize, margin);
  }
  throw "QR code not available";
}

browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
  let tag = generateQR(tabs[0].url, 4, 0);
  let doc = new DOMParser().parseFromString(tag, 'text/html');
  let img_el = doc.getElementsByTagName('img')[0];
  document.getElementById('qrcode_img').src = img_el.src;
});
