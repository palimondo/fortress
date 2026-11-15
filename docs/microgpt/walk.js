/* The microGPT walk-through: what its pages need beside the specification reader's reader.js,
   which is used unchanged. Load this file before reader.js.
   1. The reader keeps notes and the place under keys that start with "fortress-spec.". Storage is
      shared by every page of the site, so these pages keep theirs under "fortress-microgpt.",
      apart from the notes on the specification.
   2. The reader writes its own address and title into the exported notes. On the notes page, this
      file puts the walk-through's address and title there, and names the saved file after it.
   3. The Select button's selection leaves out the formulas and the long boxes of numbers (below).
   4. The control of the three notations of the program's code (below).
   5. A note's first words hold each code word once (below). */
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

  /* 3. The Select button is for Speak. While its selection stands, the formulas and the long boxes of
        numbers are left out of it (walk.css, html.speak): Speak would read them glyph by glyph and digit by
        digit. A selection made by hand can still take them. */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.classList && t.classList.contains('sel')) document.documentElement.classList.add('speak');
  }, true);
  document.addEventListener('selectionchange', function () {
    var s = window.getSelection && window.getSelection();
    if (!s || s.isCollapsed) document.documentElement.classList.remove('speak');
  });

  /* 4. The notation of the program's code: typeset by Fortify, Unicode, or the ASCII as typed. One control
        for the page; the choice is kept in this browser. All three forms are in the page and walk.css shows
        one of them by the attribute data-notation on <html>, so nothing is done word by word. */
  var K_NOTE = 'fortress-microgpt.notation', FORMS = ['typeset', 'unicode', 'source'];
  var notationNow = 'typeset';
  try { var kept = localStorage.getItem(K_NOTE); if (FORMS.indexOf(kept) >= 0) notationNow = kept; } catch (e) { /* no storage */ }
  document.documentElement.setAttribute('data-notation', notationNow);
  function setNotation(form) {
    /* the text at the top of the window stays where it is while the blocks below and above change height */
    var bar = document.querySelector('nav.bar'), top = (bar ? bar.getBoundingClientRect().bottom : 0) + 44;
    var anchor = null, before = 0;
    var blocks = document.querySelectorAll('.page .nb');
    for (var i = 0; i < blocks.length; i++) {
      var r = blocks[i].getBoundingClientRect();
      if (r.bottom > top && r.height) { anchor = blocks[i]; before = r.top; break; }
    }
    notationNow = form;
    document.documentElement.setAttribute('data-notation', form);
    try { localStorage.setItem(K_NOTE, form); } catch (e) { /* no storage */ }
    document.querySelectorAll('.notation button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-n') === form));
    });
    if (anchor) window.scrollBy(0, anchor.getBoundingClientRect().top - before);
  }
  document.querySelectorAll('.notation button').forEach(function (b) {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-n') === notationNow));
    b.addEventListener('click', function () { setNotation(b.getAttribute('data-n')); });
  });
  var navBar = document.querySelector('nav.bar');
  if (navBar) document.documentElement.style.setProperty('--bar-h', navBar.getBoundingClientRect().height + 'px');

  /* 5. A paragraph holds each code word in its three forms, and the reader takes a note's first words from
        the paragraph's textContent. For these blocks, textContent gives the text with each code word once,
        as typed. */
  var textOf = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  document.querySelectorAll('.page .nb').forEach(function (b) {
    if (!b.querySelector('.fc')) return;
    Object.defineProperty(b, 'textContent', {
      configurable: true,
      get: function () {
        var c = b.cloneNode(true);
        c.querySelectorAll('.fc > .fr, .fc > .fu').forEach(function (e) { e.remove(); });
        return textOf.get.call(c);
      },
      set: function (v) { textOf.set.call(b, v); }
    });
  });

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
