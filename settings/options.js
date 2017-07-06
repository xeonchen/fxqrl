"use strict";

const [ DEFAULT_CELL_SIZE ] = [ 4 ];

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    cellSize: document.querySelector("#cellSize").value
  });
}

function restoreOptions() {
  browser.storage.local.get("cellSize").then(result => {
    document.querySelector("#cellSize").value = result.cellSize || DEFAULT_CELL_SIZE;
  }, error => {
    console.log(error);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
