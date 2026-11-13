/* The microGPT walk-through: what its pages need beside the specification reader's reader.js,
   which is used unchanged. Load this file before reader.js.
   1. The reader keeps notes and the place under keys that start with "fortress-spec.". Storage is
      shared by every page of the site, so these pages keep theirs under "fortress-microgpt.",
      apart from the notes on the specification.
   2. The reader writes its own address and title into the exported notes. On the notes page, this
      file puts the walk-through's address and title there, and names the saved file after it. */
(function () {
  'use strict';
  var FROM = 'fortress-spec.', TO = 'fortress-microgpt.';
  var SPEC = 'https://palimondo.github.io/fortress/specification/';
  var HERE = 'https://palimondo.github.io/fortress/microgpt/';
  function key(k) { k = String(k); return k.indexOf(FROM) === 0 ? TO + k.slice(FROM.length) : k; }
  try {
    var P = window.Storage && window.Storage.prototype;
    if (P && !P.__walkKeys) {
      var get = P.getItem, set = P.setItem, del = P.removeItem;
      P.getItem = function (k) { return get.call(this, key(k)); };
      P.setItem = function (k, v) { return set.call(this, key(k), v); };
      P.removeItem = function (k) { return del.call(this, key(k)); };
      P.__walkKeys = true;
    }
  } catch (e) { /* the pages work without storage */ }

  function fixExport() {
    var out = document.getElementById('export-text');
    if (!out || !out.value) return;
    var t = out.value.split(SPEC).join(HERE)
      .replace('Notes on the Fortress Language Specification', 'Notes on the microGPT walk-through');
    if (t !== out.value) out.value = t;
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (document.body.getAttribute('data-page') !== 'notes') return;
    var list = document.getElementById('notes-list');
    fixExport();
    if (list && window.MutationObserver) new MutationObserver(fixExport).observe(list, { childList: true });
    var status = document.getElementById('export-status');
    /* on the way down to the buttons, before the reader's own handlers run */
    document.addEventListener('click', function (e) {
      var id = e.target && e.target.id;
      if (id === 'copy-notes') { fixExport(); return; }
      if (id !== 'save-notes') return;
      /* the reader's own handler names the file after the specification: save here instead */
      e.stopPropagation();
      fixExport();
      var text = document.getElementById('export-text').value;
      if (!text) { if (status) status.textContent = 'There are no notes to save.'; return; }
      var a = document.createElement('a'), url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      a.href = url;
      a.download = 'microgpt-walk-notes-' + new Date().toISOString().slice(0, 10) + '.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      if (status) status.textContent = 'Saved as ' + a.download + '.';
    }, true);
  });
})();
