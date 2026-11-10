/* The reader of the Fortress specification: the Select buttons, the place where the
   reader stopped, notes along the text, and their export and import.
   Everything is kept in this browser's localStorage; the pages work without it. */
(function () {
  'use strict';
  var BASE = 'https://palimondo.github.io/fortress/specification/';
  var K_NOTES = 'fortress-spec.notes.v1', K_PLACE = 'fortress-spec.place.v1', K_CODE = 'fortress-spec.code.v1';
  var body = document.body, kind = body.getAttribute('data-page'), slug = body.getAttribute('data-slug');
  var chapterTitle = body.getAttribute('data-chapter');

  /* ---------- storage, with a fallback in memory ---------- */
  var mem = {}, storageOK = true;
  try {
    window.localStorage.setItem('fortress-spec.probe', '1');
    window.localStorage.removeItem('fortress-spec.probe');
  } catch (e) { storageOK = false; }
  function load(key, dflt) {
    if (storageOK) {
      try {
        var s = window.localStorage.getItem(key);
        if (s != null) return JSON.parse(s);
      } catch (e) { /* fall through to memory */ }
    }
    return key in mem ? mem[key] : dflt;
  }
  function save(key, value) {
    mem[key] = value;
    if (!storageOK) return false;
    try { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }
  function notes() { var n = load(K_NOTES, []); return Array.isArray(n) ? n : []; }
  function saveNotes(list) { var ok = save(K_NOTES, list); updateCount(); return ok; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function words(text, n) {
    var w = text.replace(/\u2060/g, '').replace(/\s+/g, ' ').trim().split(' ');
    return w.length > n ? w.slice(0, n).join(' ') + ' …' : w.join(' ');
  }
  function updateCount() {
    var link = document.querySelector('nav.bar .notes-link');
    if (!link) return;
    var c = link.querySelector('.count'), n = notes().length;
    if (!n) { if (c) c.remove(); return; }
    if (!c) { c = el('span', 'count'); link.appendChild(c); }
    c.textContent = n;
  }
  function storageWarning(target) {
    if (storageOK || !target || target.firstChild) return;
    var w = el('div', 'warn');
    w.textContent = 'This browser does not let the page keep anything (private browsing, or storage switched off). ' +
      'Notes and your place last only until you leave this page: export your notes before you go.';
    target.appendChild(w);
  }

  /* ---------- the Select button, as on the revival page ---------- */
  document.querySelectorAll('section.sec').forEach(function (sec) {
    var h = sec.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4');
    if (!h || sec.classList.contains('fns')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'sel';
    b.setAttribute('aria-label', 'Select this section to have it read aloud');
    h.appendChild(b);
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var r = document.createRange();
      r.setStart(h, 0);
      /* up to the first subsection, which has its own button; the list of sections and
         the reader's own notes are not selectable (user-select: none), so Speak skips them */
      var sub = sec.querySelector(':scope > section.sec');
      if (sub) r.setEndBefore(sub); else r.setEnd(sec, sec.childNodes.length);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    });
  });

  /* ---------- code examples: rendered, or the source that a person types ---------- */
  var codePref = load(K_CODE, 'rendered') === 'source' ? 'source' : 'rendered';
  document.documentElement.setAttribute('data-code', codePref);
  function setCode(pref, anchorEl) {
    var before = anchorEl ? anchorEl.getBoundingClientRect().top : 0;
    codePref = pref;
    document.documentElement.setAttribute('data-code', pref);
    save(K_CODE, pref);
    document.querySelectorAll('.fx-bar .seg button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.classList.contains(pref === 'source' ? 's' : 'r')));
    });
    if (anchorEl) window.scrollBy(0, anchorEl.getBoundingClientRect().top - before);
  }
  document.querySelectorAll('.fx').forEach(function (fx) {
    var bar = el('div', 'fx-bar');
    if (fx.classList.contains('both')) {
      var seg = el('span', 'seg');
      [['r', 'rendered', 'Show the examples as the specification renders them'],
       ['s', 'source', 'Show the examples as Fortress source']].forEach(function (d) {
        var b = el('button', d[0]);
        b.type = 'button';
        b.setAttribute('aria-label', d[2]);
        b.setAttribute('aria-pressed', String(codePref === d[1]));
        b.addEventListener('click', function () { setCode(d[1], bar); });
        seg.appendChild(b);
      });
      bar.appendChild(seg);
    } else {
      bar.appendChild(el('span'));
    }
    fx.insertBefore(bar, fx.firstChild);
  });

  /* ---------- a target of a link flashes once ---------- */
  function flash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var t = id && document.getElementById(id);
    if (!t) return;
    t.classList.remove('flash');
    void t.offsetWidth;
    t.classList.add('flash');
  }
  window.addEventListener('hashchange', flash);

  /* ---------- notes: the text form that is exported and imported ---------- */
  function chapterNum(n) { var m = /^([0-9]+|[A-Z])\./.exec(n.chapter || ''); return m ? m[1] : ''; }
  function sortKey(n) {
    var c = chapterNum(n), parts = [c === '' ? -1 : (/^\d+$/.test(c) ? +c : 1000 + c.charCodeAt(0))];
    (n.secNum || '').split('.').slice(1).forEach(function (p) { parts.push(+p || 0); });
    return parts;
  }
  function sorted(list) {
    return list.slice().sort(function (a, b) {
      var x = sortKey(a), y = sortKey(b);
      for (var i = 0; i < Math.max(x.length, y.length); i++) {
        var d = (x[i] || 0) - (y[i] || 0);
        if (d) return d;
      }
      return (a.created || '') < (b.created || '') ? -1 : 1;
    });
  }
  function linkOf(n) { return BASE + n.page + '.html#' + n.anchor; }
  function sectionLine(n) {
    if (n.secNum && n.secNum.indexOf('.') < 0) return "(the chapter's opening)";
    return ((n.secNum ? n.secNum + ' ' : '') + (n.secTitle || '')).trim() || "(the chapter's opening)";
  }
  function exportText(list) {
    list = sorted(list);
    var out = ['Notes on the Fortress Language Specification', 'Exported: ' + new Date().toISOString(),
               'Reader: ' + BASE, 'Notes: ' + list.length, ''];
    list.forEach(function (n, i) {
      out.push('=== Note ' + (i + 1) + ' of ' + list.length + ' ===');
      out.push('Chapter: ' + (n.chapter || n.page));
      out.push('Section: ' + sectionLine(n));
      out.push('Link: ' + linkOf(n));
      out.push('Passage (' + (n.kind || 'paragraph') + '): ' + (n.excerpt || ''));
      out.push('Written: ' + (n.updated || n.created || ''));
      out.push('Id: ' + n.id);
      out.push('Note:');
      String(n.text).split('\n').forEach(function (l) { out.push('  ' + l); });
      out.push('');
    });
    return out.join('\n');
  }
  function parseExport(text) {
    var chunks = text.replace(/\r\n?/g, '\n').split(/^=== Note \d+ of \d+ ===[ \t]*$/m).slice(1), out = [];
    chunks.forEach(function (chunk) {
      var lines = chunk.replace(/^\n/, '').split('\n'), f = {}, i = 0, m;
      for (; i < lines.length; i++) {
        if (/^Note:\s*$/.test(lines[i])) { i++; break; }
        m = /^([A-Za-z]+)(?: \(([^)]*)\))?: ?(.*)$/.exec(lines[i]);
        if (m) { f[m[1]] = m[3]; if (m[2]) f[m[1] + 'Kind'] = m[2]; }
      }
      var bodyLines = lines.slice(i).map(function (l) { return l.replace(/^ {1,2}/, ''); });
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();
      var link = /([^\/#?]+)\.html#(.+)$/.exec(f.Link || '');
      if (!link || !bodyLines.length) return;
      var sec = /^((?:\d+|[A-Z])(?:\.\d+)+)\s+(.*)$/.exec(f.Section || '');
      var chap = /^((?:\d+|[A-Z]))\.\s+(.*)$/.exec(f.Chapter || '');
      out.push({
        id: f.Id || '', page: link[1], anchor: link[2].trim(), chapter: f.Chapter || link[1],
        secNum: sec ? sec[1] : (chap ? chap[1] : ''), secTitle: sec ? sec[2] : (chap ? chap[2] : ''),
        kind: f.PassageKind || 'paragraph', excerpt: f.Passage || '', text: bodyLines.join('\n'),
        created: f.Written || new Date().toISOString(), updated: f.Written || new Date().toISOString()
      });
    });
    return out;
  }
  function newId() { return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function mergeNotes(incoming) {
    var list = notes(), added = 0, updated = 0, same = 0;
    incoming.forEach(function (n) {
      var old = null;
      list.forEach(function (o) {
        if ((n.id && o.id === n.id) || (o.page === n.page && o.anchor === n.anchor && o.text === n.text)) old = o;
      });
      if (!old) { if (!n.id) n.id = newId(); list.push(n); added++; return; }
      if (old.text === n.text) { same++; return; }
      if ((n.updated || '') > (old.updated || '')) { old.text = n.text; old.updated = n.updated; updated++; }
      else same++;
    });
    saveNotes(list);
    return { added: added, updated: updated, same: same };
  }

  /* ---------- a note's card and its editor (chapter pages and the notes page) ---------- */
  function editor(note, onSave, onCancel) {
    var box = el('div', 'note-edit'), ta = el('textarea');
    ta.rows = 4;
    ta.value = note ? note.text : '';
    ta.setAttribute('aria-label', 'Your note on this passage');
    ta.placeholder = 'Your note on this passage';
    var row = el('p', 'actions'), ok = el('button', 'act primary', 'Save the note'), no = el('button', 'act', 'Cancel');
    ok.type = no.type = 'button';
    ok.addEventListener('click', function () { var t = ta.value.trim(); if (t) onSave(t); else onCancel(); });
    no.addEventListener('click', onCancel);
    row.appendChild(ok);
    row.appendChild(no);
    box.appendChild(ta);
    box.appendChild(row);
    if (!storageOK) box.appendChild(el('p', 'excerpt', 'This browser keeps nothing: the note lasts until you leave the page.'));
    setTimeout(function () { ta.focus(); }, 0);
    return box;
  }
  function card(note, rerender, withPlace) {
    var c = el('div', 'note-card');
    c.setAttribute('data-note', note.id);
    if (withPlace) {
      var w = el('p', 'where'), a = el('a', null, sectionLine(note));
      a.href = note.page + '.html#' + note.anchor;
      w.appendChild(a);
      c.appendChild(w);
      c.appendChild(el('p', 'excerpt', '“' + note.excerpt + '”'));
    }
    c.appendChild(el('p', 'text', note.text));
    var meta = el('div', 'meta'), ed = el('button', null, 'Edit'), del = el('button', 'danger', 'Delete');
    ed.type = del.type = 'button';
    ed.addEventListener('click', function () {
      var box = editor(note, function (text) {
        var list = notes();
        list.forEach(function (n) { if (n.id === note.id) { n.text = text; n.updated = new Date().toISOString(); } });
        saveNotes(list);
        rerender();
      }, rerender);
      c.replaceWith(box);
    });
    del.addEventListener('click', function () {
      if (!window.confirm('Delete this note?')) return;
      saveNotes(notes().filter(function (n) { return n.id !== note.id; }));
      rerender();
    });
    meta.appendChild(ed);
    meta.appendChild(del);
    c.appendChild(meta);
    return c;
  }

  /* ---------- a chapter page ---------- */
  function chapterPage() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('.page .nb[id]'));
    var tail = {};      /* block id -> the element after which its notes go */

    function sectionOf(b) {
      var s = b.closest('section.sec');
      return s ? { num: s.getAttribute('data-num') || '', title: s.getAttribute('data-title') || '' } : { num: '', title: '' };
    }
    function kindOf(b) {
      if (/^H\d$/.test(b.tagName)) return 'heading';
      return b.getAttribute('data-kind') || 'paragraph';
    }
    function excerptOf(b) {
      var src = b.querySelector(':scope > .fx-s'), r = b.querySelector(':scope > .fx-r');
      var t = src ? src.textContent : (r ? r.textContent : b.textContent);
      return words(t, 14);
    }

    blocks.forEach(function (b) {
      /* in a paragraph the control is an inline span, so that it never wraps alone onto a line */
      var inPar = b.tagName === 'P';
      var btn = el(inPar ? 'span' : 'button', 'addnote');
      if (inPar) { btn.setAttribute('role', 'button'); btn.tabIndex = 0; } else btn.type = 'button';
      btn.setAttribute('aria-label', 'Write a note on this ' + kindOf(b));
      btn.addEventListener('click', function (e) { e.preventDefault(); openEditor(b); });
      btn.addEventListener('keydown', function (e) {
        if (inPar && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openEditor(b); }
      });
      tail[b.id] = b;
      if (b.classList.contains('fx')) b.querySelector(':scope > .fx-bar').appendChild(btn);
      else if (b.tagName === 'P') { b.appendChild(document.createTextNode('\u2060')); b.appendChild(btn); }
      else if (/^H\d$/.test(b.tagName)) b.appendChild(btn);
      else {
        var tools = el('div', 'nb-tools');
        tools.appendChild(btn);
        b.insertAdjacentElement('afterend', tools);
        tail[b.id] = tools;
      }
    });

    function openEditor(b) {
      var open = document.querySelector('.note-edit');
      if (open) open.remove();
      var box = editor(null, function (text) {
        var s = sectionOf(b), now = new Date().toISOString(), list = notes();
        list.push({ id: newId(), page: slug, chapter: chapterTitle, anchor: b.id, secNum: s.num, secTitle: s.title,
                    kind: kindOf(b), excerpt: excerptOf(b), text: text, created: now, updated: now });
        saveNotes(list);
        render();
      }, render);
      var after = tail[b.id];
      while (after.nextElementSibling && after.nextElementSibling.classList.contains('note-card')) after = after.nextElementSibling;
      after.insertAdjacentElement('afterend', box);
    }

    function render() {
      document.querySelectorAll('.note-card, .note-edit').forEach(function (n) { n.remove(); });
      document.querySelectorAll('.has-note').forEach(function (n) { n.classList.remove('has-note'); });
      var mine = sorted(notes().filter(function (n) { return n.page === slug; }));
      var box = document.getElementById('chapter-notes');
      box.textContent = '';
      storageWarning(box);
      var lost = [];
      mine.forEach(function (n) {
        var b = document.getElementById(n.anchor);
        if (!b || !tail[n.anchor]) { lost.push(n); return; }
        b.classList.add('has-note');
        var after = tail[n.anchor];
        while (after.nextElementSibling && after.nextElementSibling.classList.contains('note-card')) after = after.nextElementSibling;
        after.insertAdjacentElement('afterend', card(n, render, false));
      });
      if (!mine.length) return;
      var d = el('details', 'chapter-notes'), s = el('summary', null, 'Your notes in this chapter: ' + mine.length);
      var ol = el('ol');
      mine.forEach(function (n) {
        var li = el('li'), a = el('a', null, sectionLine(n));
        if (lost.indexOf(n) < 0) a.href = '#' + n.anchor;
        li.appendChild(a);
        li.appendChild(document.createTextNode(': ' + words(n.text, 12)));
        if (lost.indexOf(n) >= 0) {
          li.appendChild(el('div', 'excerpt', 'The passage of this note has changed since it was written: “' + n.excerpt + '”'));
          li.appendChild(card(n, render, false));
        }
        ol.appendChild(li);
      });
      d.appendChild(s);
      d.appendChild(ol);
      if (lost.length) d.open = true;
      box.appendChild(d);
    }
    render();

    /* where the reader stopped */
    var place = load(K_PLACE, { last: '', pages: {} });
    if (!place || typeof place !== 'object' || !place.pages) place = { last: '', pages: {} };
    var saved = place.pages[slug], moved = false;
    function barHeight() { var n = document.querySelector('nav.bar'); return n ? n.getBoundingClientRect().height : 0; }
    function current() {
      var top = barHeight() + 6, lo = 0, hi = blocks.length - 1, ans = blocks.length - 1;
      while (lo <= hi) {
        var mid = (lo + hi) >> 1;
        if (blocks[mid].getBoundingClientRect().bottom > top) { ans = mid; hi = mid - 1; } else lo = mid + 1;
      }
      return blocks[ans];
    }
    function remember() {
      if (!moved || !blocks.length) return;
      var b = window.scrollY < 80 ? blocks[0] : current(), s = sectionOf(b);
      place = load(K_PLACE, place);
      if (!place || !place.pages) place = { last: '', pages: {} };
      place.last = slug;
      place.pages[slug] = { page: slug, chapter: chapterTitle, anchor: b.id, secNum: s.num, secTitle: s.title,
                            excerpt: words(excerptOf(b), 10), at: new Date().toISOString() };
      save(K_PLACE, place);
    }
    var timer = null;
    window.addEventListener('scroll', function () {
      moved = true;
      if (timer) return;
      timer = setTimeout(function () { timer = null; remember(); }, 400);
    }, { passive: true });
    window.addEventListener('pagehide', remember);
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') remember(); });

    var resume = document.getElementById('resume');
    if (saved && saved.anchor && saved.anchor !== 'top' && !location.hash && document.getElementById(saved.anchor)) {
      var box = el('div', 'resume'), p = el('p'), a = el('a', 'act', 'Continue there'), x = el('button', 'act', 'Dismiss');
      p.appendChild(document.createTextNode('You stopped at '));
      p.appendChild(el('span', 'where', (saved.secNum ? saved.secNum + ' ' : '') + saved.secTitle));
      box.appendChild(p);
      box.appendChild(el('p', 'excerpt', '“' + saved.excerpt + '”'));
      a.href = '#' + saved.anchor;
      a.style.textDecoration = 'none';
      a.style.display = 'inline-flex';
      a.style.alignItems = 'center';
      x.type = 'button';
      var row = el('p', 'actions');
      row.appendChild(a);
      row.appendChild(x);
      box.appendChild(row);
      a.addEventListener('click', function () { box.remove(); });
      x.addEventListener('click', function () { box.remove(); });
      resume.appendChild(box);
    }
    if (location.hash) setTimeout(flash, 50);
  }

  /* ---------- the contents page ---------- */
  function indexPage() {
    var place = load(K_PLACE, null), target = document.getElementById('continue');
    storageWarning(target);
    if (!place || !place.last || !place.pages || !place.pages[place.last]) return;
    var p = place.pages[place.last];
    var box = el('div', 'resume'), line = el('p'), a = el('a', 'act primary', 'Continue reading');
    line.appendChild(document.createTextNode('You stopped in '));
    line.appendChild(el('span', 'where', p.chapter + (p.secNum && p.secNum.indexOf('.') > 0 ? ', ' + p.secNum + ' ' + p.secTitle : '')));
    box.appendChild(line);
    if (p.excerpt) box.appendChild(el('p', 'excerpt', '“' + p.excerpt + '”'));
    a.href = p.page + '.html' + (p.anchor && p.anchor !== 'top' ? '#' + p.anchor : '');
    a.style.textDecoration = 'none';
    a.style.display = 'inline-flex';
    a.style.alignItems = 'center';
    var row = el('p', 'actions');
    row.appendChild(a);
    box.appendChild(row);
    target.appendChild(box);
    var li = document.querySelector('ul.chapters li[data-slug="' + p.page + '"]');
    if (li) li.classList.add('here');
  }

  /* ---------- the notes page ---------- */
  function notesPage() {
    var listEl = document.getElementById('notes-list'), out = document.getElementById('export-text');
    var status = document.getElementById('export-status'), istatus = document.getElementById('import-status');
    storageWarning(document.getElementById('storage-warning'));
    function render() {
      var list = sorted(notes());
      out.value = list.length ? exportText(list) : '';
      listEl.textContent = '';
      if (!list.length) {
        listEl.appendChild(el('p', 'empty', 'No notes yet. In a chapter, the pencil at the end of a paragraph, a code example or a heading attaches a note to it.'));
        return;
      }
      var group = null, title = null;
      list.forEach(function (n) {
        if (n.chapter !== title) {
          title = n.chapter;
          group = el('div', 'note-group');
          var h = el('h3'), a = el('a', null, title);
          a.href = n.page + '.html';
          h.appendChild(a);
          group.appendChild(h);
          listEl.appendChild(group);
        }
        group.appendChild(card(n, render, true));
      });
    }
    render();
    document.getElementById('copy-notes').addEventListener('click', function () {
      var text = out.value;
      if (!text) { status.textContent = 'There are no notes to copy.'; return; }
      function done(ok) { status.textContent = ok ? 'Copied: ' + notes().length + ' notes. Paste them into the chat.' : 'The browser refused the copy. Select the text below and copy it.'; }
      function fallback() {
        out.focus();
        out.select();
        out.setSelectionRange(0, text.length);
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        done(ok);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
      else fallback();
    });
    document.getElementById('save-notes').addEventListener('click', function () {
      var text = out.value;
      if (!text) { status.textContent = 'There are no notes to save.'; return; }
      var a = document.createElement('a'), url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      a.href = url;
      a.download = 'fortress-spec-notes-' + new Date().toISOString().slice(0, 10) + '.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      status.textContent = 'Saved as ' + a.download + '.';
    });
    function importText(text) {
      var found = parseExport(text);
      if (!found.length) { istatus.textContent = 'No notes found in that text. It must be a file that this page saved.'; return; }
      var r = mergeNotes(found);
      istatus.textContent = 'Imported: ' + r.added + ' new, ' + r.updated + ' updated, ' + r.same + ' already here.';
      render();
    }
    document.getElementById('import-file').addEventListener('change', function (e) {
      var f = e.target.files && e.target.files[0];
      if (!f) return;
      var rd = new FileReader();
      rd.onload = function () { importText(String(rd.result)); e.target.value = ''; };
      rd.onerror = function () { istatus.textContent = 'The file could not be read.'; };
      rd.readAsText(f);
    });
    document.getElementById('import-paste').addEventListener('click', function () {
      var ta = document.getElementById('import-text');
      importText(ta.value);
    });
  }

  updateCount();
  if (kind === 'chapter') chapterPage();
  else if (kind === 'index') indexPage();
  else if (kind === 'notes') notesPage();
  else if (location.hash) setTimeout(flash, 50);
})();
