(() => {
  'use strict';

  const root = document.getElementById('tableGame');
  const rows = window.TABLE_ROWS || [];
  const structures = (window.STUDY && window.STUDY.structures || []).filter(s => s.image && s.pubchemCid);
  const labels = [
    { tr: 'Alkaloit grubu / köken', en: 'Alkaloid group / origin' },
    { tr: 'Kaynak bitki (Latince, Türkçe, İngilizce)', en: 'Source plant (Latin, Turkish, English)' },
    { tr: 'Familya', en: 'Family' },
    { tr: 'Drog adı ve kullanılan kısım', en: 'Crude drug and part used' },
    { tr: 'Başlıca alkaloitler / bileşikler', en: 'Major alkaloids / compounds' },
    { tr: 'Etki, mekanizma ve tıbbi kullanım', en: 'Action, mechanism and medical use' },
    { tr: 'Notlar ve Türkiye durumu', en: 'Notes and occurrence in Türkiye' }
  ];
  const words = {
    tr: {
      title: 'Tabloyu kur, molekülü çiz', intro: 'Bitki–familya–drog–bileşik–etki bağlantılarını satır satır hatırla. Her turda sütunların sırası ve boşlukların yeri değişir.',
      table: 'Tabloyu doldur', draw: 'Molekül çiz', count: 'Bu oyun', rows: 'iki dilli kaynak satırı', structures: 'doğrulanmış yapı görseli',
      settings: 'Tablo turunu ayarla', group: 'Konu / alkaloit grubu', any: 'Tüm gruplar', blanks: 'Her satırda kaç boşluk?', random: 'Her tur rastgele (2–5)', mode: 'Yanıtlama biçimi', choose: 'Seçeneklerden doldur', write: 'Yaz ve kendin karşılaştır', rounds: 'Tur uzunluğu', five: '5 satır', ten: '10 satır', twenty: '20 satır', all: 'Filtredeki tüm satırlar', start: 'Turu başlat', settingsHint: 'Boşluklar ve sütun sırası her satırda yeniden karıştırılır.',
      notesTitle: 'Nasıl oynanır?', notes: 'Tabloda dolu hücreleri ipucu olarak kullan; boş hücreleri bitki, familya, drog, bileşik veya etki bağlantılarıyla tamamla. Seçenekli mod puanlanır. Yazılı modda uzun açıklamaların anlamını sistem otomatik puanlamaz; cevabı açıp kendin değerlendirirsin.',
      sourceNote: 'Bu oyunda ek PDF’deki yedi sütunlu düzen örnek alındı. Yanıt havuzu daha önce kaynak notları ve düzeltmeleriyle hazırlanmış iki dilli çalışma tablosundan gelir. Bir iddianın belirsiz olduğu yerde kaynak notunu kontrol et; çizimlerin bilimsel doğruluğunu otomatik puanladığını varsayma.',
      saved: 'Bu tarayıcıdaki ilerleme', top: 'doğru boşluk', played: 'tamamlanan tablo turu', sketch: 'kaydedilmiş çizim',
      round: 'Satır', points: 'Puan', of: '/', check: 'Yanıtı kontrol et', reveal: 'Yanıtları göster', next: 'Sonraki satır', quit: 'Turdan çık', back: 'Yeni tur ayarla', selectPrompt: 'Boşluğu seç…', typePrompt: 'Yanıtını buraya yaz…',
      correct: 'Doğru', review: 'Yanıtı tekrar et', key: 'Beklenen yanıt', knew: 'Bunu hatırladım', missed: 'Bunu tekrar etmeliyim', allGrade: 'Her boşluk için kendini değerlendir.', exact: 'Yazdığın yanıt hücreyle aynı görünüyor; yine de anlamını kontrol et.',
      result: 'Tur tamamlandı', resultText: 'Bu turda', correctCells: 'boşluğu doğru tamamladın.', retry: 'Yanlış satırları tekrar çöz', complete: 'Yeni tur kur', noMisses: 'Bu turda tekrar işaretlediğin satır yok.',
      drawTitle: 'Molekülü hafızandan çiz', drawIntro: 'Bir yapı adı seç veya rastgele kart aç. İskeleti boş tuvale çiz; bitirince yerel 2B referans görselini açıp halka bağlantılarını, heteroatomları, fonksiyonel grupları ve stereokimyayı karşılaştır.',
      molecule: 'Molekül / yapı', randomMolecule: 'Rastgele yeni yapı', drawTools: 'Çizim araçları', clear: 'Temizle', undo: 'Geri al', savePng: 'PNG indir', showRef: 'Doğru 2B yapıyı göster', hideRef: 'Referansı gizle', formula: 'Molekül formülü', ref: 'Yapı referansı', clues: 'Yapı tanıma ipuçları', pubchem: 'PubChem kaydını aç',
      notAuto: 'Çizim el çalışmasıdır; sistem bağları, izomerliği veya stereokimyayı otomatik puanlamaz. Referansı açınca kendi çizimini tek tek karşılaştır.',
      identify: 'Şekilden tanı', drawTab: 'Adından çiz', startIdentify: 'Yeni tanıma kartı', pickMolecule: 'Bu yapının adı hangisi?', checkChoice: 'Yanıtı kontrol et', rightStructure: 'Doğru yapı', wrongStructure: 'Tekrar bak', structureSource: 'Tabloda ilişkili kaynak örneği', noSource: 'Bu çekirdek/yapı için çalışma tablosunda tek bir bitki kaynağı eşlemesi yok. Bileşik adını ve iskelet sınıfını tanımaya odaklan.',
      footer: 'İlerleme ve çizimler bu tarayıcıda saklanır.', footerDraw: 'Çizim görselleri otomatik puanlanmaz; referansla karşılaştırılır.', dataError: 'Çalışma verisi yüklenemedi. Bu sayfayı oyun klasörünün içinden aç.'
    },
    en: {
      title: 'Complete the table, draw the molecule', intro: 'Recall the links between plant, family, crude drug, compounds and action. Column order and blank positions change each round.',
      table: 'Fill the table', draw: 'Draw a molecule', count: 'This game', rows: 'bilingual study rows', structures: 'verified structure images',
      settings: 'Set up a table round', group: 'Topic / alkaloid group', any: 'All groups', blanks: 'Blanks in each row', random: 'Random each round (2–5)', mode: 'Answer mode', choose: 'Choose from options', write: 'Write and self-check', rounds: 'Round length', five: '5 rows', ten: '10 rows', twenty: '20 rows', all: 'All filtered rows', start: 'Start round', settingsHint: 'Blank cells and column order are reshuffled for each row.',
      notesTitle: 'How to play', notes: 'Use the visible cells as clues and fill the gaps by recalling the plant, family, drug, constituent or action. Choice mode is scored automatically. In written mode, long explanations are not semantically auto-graded; reveal the answer and assess your own response.',
      sourceNote: 'The attached PDF supplies the seven-column layout. The answer bank comes from the previously prepared bilingual study table with source notes and corrections. Check source notes where claims are uncertain; drawing accuracy is not automatically graded.',
      saved: 'Progress in this browser', top: 'correct cells', played: 'completed table rounds', sketch: 'saved sketches',
      round: 'Row', points: 'Score', of: '/', check: 'Check answers', reveal: 'Reveal answers', next: 'Next row', quit: 'Leave round', back: 'Set up a new round', selectPrompt: 'Choose an answer…', typePrompt: 'Type your answer here…',
      correct: 'Correct', review: 'Review this answer', key: 'Expected answer', knew: 'I recalled this', missed: 'I need to review this', allGrade: 'Self-assess every blank.', exact: 'Your wording matches the cell; still check that you understand it.',
      result: 'Round complete', resultText: 'You completed', correctCells: 'correct cells in this round.', retry: 'Retry missed rows', complete: 'Set up another round', noMisses: 'No rows were marked for review.',
      drawTitle: 'Draw from memory', drawIntro: 'Choose a structure or open a random card. Draw on the blank canvas; then reveal the bundled 2D reference and compare ring connections, heteroatoms, functional groups and stereochemistry.',
      molecule: 'Molecule / scaffold', randomMolecule: 'Random new structure', drawTools: 'Drawing tools', clear: 'Clear', undo: 'Undo', savePng: 'Download PNG', showRef: 'Reveal the correct 2D structure', hideRef: 'Hide reference', formula: 'Molecular formula', ref: 'Structure reference', clues: 'Structure-recognition cues', pubchem: 'Open PubChem record',
      notAuto: 'This is a manual drawing exercise. Bonds, isomerism and stereochemistry are not auto-graded; compare your drawing with the reference after revealing it.',
      identify: 'Identify from structure', drawTab: 'Draw from name', startIdentify: 'New recognition card', pickMolecule: 'Which molecule is shown?', checkChoice: 'Check answer', rightStructure: 'Correct structure', wrongStructure: 'Review the structure', structureSource: 'Related source example in the table', noSource: 'The study table does not assign this scaffold to a single plant source. Focus on recognizing the compound name and structural class.',
      footer: 'Progress and drawings are stored in this browser.', footerDraw: 'Drawings are not auto-graded; compare them with the reference.', dataError: 'Study data could not be loaded. Open this page from the game folder.'
    }
  };

  let lang = localStorage.getItem('fg-table-lang') === 'en' ? 'en' : 'tr';
  let tab = 'table';
  let screen = 'home';
  let quiz = null;
  let structureId = structures[0] && structures[0].id;
  let structureMode = 'draw';
  let refVisible = false;
  let recognition = null;
  let recognitionSelection = null;
  let canvasUndo = [];
  let drawing = false;
  let previousPoint = null;

  const ui = () => words[lang];
  const shuffle = list => {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  function safeHtml(value) {
    return String(value ?? '').replace(/<(?!\/?(?:br|i|b|em|strong|sub|sup)\b)[^>]*>/gi, '');
  }
  function plain(value) {
    const t = document.createElement('template');
    t.innerHTML = safeHtml(value);
    return (t.content.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function normalize(value) {
    return plain(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en')
      .replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  }
  function truncate(value, max = 100) {
    const text = plain(value);
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }
  function setTab(next) {
    tab = next;
    screen = next === 'draw' ? 'structure' : (quiz && quiz.round ? 'round' : 'home');
    document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === next));
    render();
  }
  function savedStats() {
    try { return JSON.parse(localStorage.getItem('fg-table-stats') || '{"correct":0,"possible":0,"rounds":0,"sketches":0}'); }
    catch { return { correct: 0, possible: 0, rounds: 0, sketches: 0 }; }
  }
  function saveStats(stats) { localStorage.setItem('fg-table-stats', JSON.stringify(stats)); }
  function render() {
    const toggle = document.getElementById('languageToggle');
    toggle.textContent = lang === 'tr' ? 'English' : 'Türkçe';
    toggle.setAttribute('aria-label', lang === 'tr' ? 'Switch to English' : 'Türkçeye geç');
    const tableNav = document.querySelector('[data-tab="table"]');
    const drawNav = document.querySelector('[data-tab="draw"]');
    const backNav = document.querySelector('.table-back');
    if (tableNav) tableNav.textContent = ui().table;
    if (drawNav) drawNav.textContent = ui().draw;
    if (backNav) backNav.textContent = lang === 'tr' ? 'Ana oyuna dön' : 'Back to main game';
    const footer = document.querySelectorAll('footer span');
    if (footer[0]) footer[0].textContent = ui().footer;
    if (footer[1]) footer[1].textContent = ui().footerDraw;
    if (!rows.length || !structures.length) {
      root.innerHTML = `<section class="tg-panel tg-empty"><h1>${escapeHtml(ui().dataError)}</h1><a class="btn" href="index.html">${escapeHtml(ui().back)}</a></section>`;
      return;
    }
    if (tab === 'draw') renderStructure();
    else if (screen === 'round' && quiz && quiz.round) renderRound();
    else if (screen === 'results' && quiz) renderResults();
    else renderHome();
  }
  function renderHome() {
    const t = ui();
    const groups = [...new Set(rows.map(r => plain(r[lang][0])).filter(Boolean))].sort((a, b) => a.localeCompare(b, lang));
    const stats = savedStats();
    const percent = stats.possible ? Math.round(stats.correct / stats.possible * 100) : 0;
    root.innerHTML = `<div class="table-game-wrap">
      <section class="table-intro">
        <div><div class="table-kicker">Pharmacognosy · recall practice</div><h1>${escapeHtml(t.title)}</h1><p>${escapeHtml(t.intro)}</p>
          <div class="table-badges"><span>${rows.length} ${escapeHtml(t.rows)}</span><span>${structures.length} ${escapeHtml(t.structures)}</span><span>7 ${lang === 'tr' ? 'sütun' : 'columns'}</span></div></div>
        <div class="table-hero-card"><strong>${escapeHtml(t.notesTitle)}</strong><p>${escapeHtml(t.notes)}</p></div>
      </section>
      <section class="tg-panel"><h2>${escapeHtml(t.settings)}</h2><div class="tg-controls">
        <div class="tg-control"><label for="groupFilter">${escapeHtml(t.group)}</label><select id="groupFilter"><option value="">${escapeHtml(t.any)}</option>${groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('')}</select></div>
        <div class="tg-control"><label for="blankCount">${escapeHtml(t.blanks)}</label><select id="blankCount"><option value="random">${escapeHtml(t.random)}</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="7">7 · ${lang === 'tr' ? 'tüm hücreler' : 'all cells'}</option></select><p class="tg-help">${escapeHtml(t.settingsHint)}</p></div>
        <div class="tg-control"><label for="answerMode">${escapeHtml(t.mode)}</label><select id="answerMode"><option value="choice">${escapeHtml(t.choose)}</option><option value="write">${escapeHtml(t.write)}</option></select></div>
        <div class="tg-control"><label for="roundLength">${escapeHtml(t.rounds)}</label><select id="roundLength"><option value="5">${escapeHtml(t.five)}</option><option value="10">${escapeHtml(t.ten)}</option><option value="20">${escapeHtml(t.twenty)}</option><option value="all">${escapeHtml(t.all)} (${rows.length})</option></select></div>
      </div><div class="tg-actions"><button class="btn primary" data-action="start-table">${escapeHtml(t.start)}</button><button class="soft-btn" data-action="open-draw">${escapeHtml(t.drawTitle)}</button></div>
      <div class="tg-notice">${escapeHtml(t.sourceNote)}</div></section>
      <section class="tg-panel"><h2>${escapeHtml(t.saved)}</h2><div class="tg-progress-cards"><div class="tg-progress-card"><b>${percent}%</b><span>${stats.correct} / ${stats.possible} ${escapeHtml(t.top)}</span></div><div class="tg-progress-card"><b>${stats.rounds}</b><span>${escapeHtml(t.played)}</span></div><div class="tg-progress-card"><b>${stats.sketches}</b><span>${escapeHtml(t.sketch)}</span></div></div></section>
    </div>`;
  }
  function makeRound(entry) {
    const blankSetting = quiz.blankSetting;
    const requested = blankSetting === 'random' ? 2 + Math.floor(Math.random() * 4) : Number(blankSetting);
    const blankCount = Math.max(1, Math.min(7, requested));
    return { entry, hidden: shuffle([0,1,2,3,4,5,6]).slice(0, blankCount), order: shuffle([0,1,2,3,4,5,6]), answers: {}, grades: {}, checked: false, scored: false };
  }
  function makeOptions(col, targetIndex) {
    const targetText = rows[targetIndex][lang][col];
    const targetNorm = normalize(targetText);
    const seen = new Set([targetNorm]);
    const distractors = [];
    shuffle(rows.map((r, idx) => ({ idx, text: r[lang][col] }))).forEach(item => {
      const key = normalize(item.text);
      if (item.idx === targetIndex || !key || seen.has(key)) return;
      seen.add(key);
      distractors.push(item);
    });
    return shuffle([{ idx: targetIndex, text: targetText }, ...distractors.slice(0, 3)]);
  }
  function cellMarkup(round, col) {
    const t = ui(), record = rows[round.entry.index], expected = record[lang][col], hidden = round.hidden.includes(col);
    if (!hidden) return `<td data-label="${escapeHtml(labels[col][lang])}">${safeHtml(expected)}</td>`;
    let body = '';
    if (quiz.answerMode === 'choice') {
      const options = makeOptions(col, round.entry.index);
      body = `<select class="tg-cell-select" data-select-col="${col}" ${round.checked ? 'disabled' : ''} aria-label="${escapeHtml(labels[col][lang])}"><option value="">${escapeHtml(t.selectPrompt)}</option>${options.map(o => `<option value="${o.idx}" title="${escapeHtml(plain(o.text))}" ${String(round.answers[col] ?? '') === String(o.idx) ? 'selected' : ''}>${escapeHtml(truncate(o.text, 112))}</option>`).join('')}</select>`;
      if (round.checked) {
        const ok = round.grades[col];
        body += `<div class="tg-result ${ok ? 'tg-correct' : 'tg-wrong'}">${escapeHtml(ok ? t.correct : t.review)}</div><div class="tg-answer-reveal"><strong>${escapeHtml(t.key)}:</strong><br>${safeHtml(expected)}</div>`;
      }
    } else {
      body = `<textarea class="tg-cell-input" data-write-col="${col}" placeholder="${escapeHtml(t.typePrompt)}" ${round.checked ? 'disabled' : ''}>${escapeHtml(round.answers[col] || '')}</textarea>`;
      if (round.checked) {
        const grade = round.grades[col];
        const exact = normalize(round.answers[col] || '') === normalize(expected);
        body += `<div class="tg-answer-reveal"><strong>${escapeHtml(t.key)}:</strong><br>${safeHtml(expected)}</div>${exact ? `<div class="tg-result tg-correct">${escapeHtml(t.exact)}</div>` : ''}<div class="tg-cell-grade"><button class="tg-mini ${grade === true ? 'selected' : ''}" data-action="grade-cell" data-col="${col}" data-value="yes">${escapeHtml(t.knew)}</button><button class="tg-mini ${grade === false ? 'selected' : ''}" data-action="grade-cell" data-col="${col}" data-value="no">${escapeHtml(t.missed)}</button></div>`;
      }
    }
    return `<td class="tg-blank-cell" data-label="${escapeHtml(labels[col][lang])}">${body}</td>`;
  }
  function checkReady() {
    const b = root.querySelector('[data-action="check-table"]');
    if (!b || !quiz || !quiz.round || quiz.round.checked) return;
    const h = quiz.round.hidden;
    if (quiz.answerMode === 'choice') b.disabled = !h.every(c => quiz.round.answers[c] !== undefined && String(quiz.round.answers[c]) !== '');
    else b.disabled = !h.every(c => String(quiz.round.answers[c] || '').trim().length > 0);
  }
  function renderRound() {
    const t = ui(), round = quiz.round, entry = round.entry, filled = round.hidden.length;
    const pct = Math.round(quiz.current / quiz.entries.length * 100);
    const body = round.order.map(col => cellMarkup(round, col)).join('');
    const complete = round.scored;
    const button = round.checked
      ? (complete ? `<button class="btn primary" data-action="next-row">${escapeHtml(t.next)}</button>` : `<span class="tg-footnote">${escapeHtml(t.allGrade)}</span>`)
      : `<button class="btn primary" data-action="check-table" disabled>${escapeHtml(quiz.answerMode === 'write' ? t.reveal : t.check)}</button>`;
    root.innerHTML = `<div class="table-game-wrap"><div class="tg-round-top"><div><div class="table-kicker">${escapeHtml(lang === 'tr' ? 'Karışık satır çalışması' : 'Mixed row practice')}</div><h1 class="tg-round-title">${escapeHtml(t.round)} ${quiz.current + 1} ${escapeHtml(t.of)} ${quiz.entries.length}</h1></div><div class="tg-stats"><span class="tg-stat"><strong>${quiz.score}</strong>${escapeHtml(t.points)}</span><span class="tg-stat"><strong>${quiz.possible}</strong>${escapeHtml(t.top)}</span></div></div>
      <div class="tg-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>
      <section class="tg-panel"><p class="tg-footnote">${escapeHtml(t.settingsHint)} ${lang === 'tr' ? `${filled} hücre boş bırakıldı; sütun başlıkları da satırla birlikte yer değiştirdi.` : `${filled} cells are blank; the column headers move with the row.`}</p>
        <div class="tg-table-scroll"><table class="tg-table"><thead><tr>${round.order.map(c => `<th scope="col">${escapeHtml(labels[c][lang])}</th>`).join('')}</tr></thead><tbody><tr>${body}</tr></tbody></table></div>
        <div class="tg-actions">${button}<button class="soft-btn" data-action="leave-round">${escapeHtml(t.quit)}</button><button class="soft-btn" data-action="go-home">${escapeHtml(t.back)}</button></div>
        ${round.checked && quiz.answerMode === 'choice' ? `<div class="tg-feedback ${round.grades && Object.values(round.grades).every(Boolean) ? '' : 'bad'}">${escapeHtml(Object.values(round.grades).filter(Boolean).length)} / ${filled} ${escapeHtml(t.top)}</div>` : ''}
      </section></div>`;
    checkReady();
  }
  function recordRound() {
    const round = quiz.round;
    if (round.scored) return;
    const good = Object.values(round.grades).filter(Boolean).length;
    quiz.score += good;
    quiz.possible += round.hidden.length;
    quiz.completed += 1;
    if (good !== round.hidden.length) quiz.missed.push(round.entry.index);
    round.scored = true;
    const stats = savedStats();
    stats.correct += good;
    stats.possible += round.hidden.length;
    saveStats(stats);
  }
  function checkTable() {
    const round = quiz && quiz.round;
    if (!round || round.checked) return;
    round.checked = true;
    if (quiz.answerMode === 'choice') {
      round.hidden.forEach(col => { round.grades[col] = String(round.answers[col]) === String(round.entry.index); });
      recordRound();
    } else {
      round.hidden.forEach(col => {
        if (normalize(round.answers[col] || '') === normalize(rows[round.entry.index][lang][col])) round.grades[col] = true;
      });
      if (Object.keys(round.grades).length === round.hidden.length) recordRound();
    }
    renderRound();
  }
  function gradeCell(col, yes) {
    const round = quiz && quiz.round;
    if (!round || !round.checked || round.scored) return;
    round.grades[col] = yes;
    if (round.hidden.every(c => typeof round.grades[c] === 'boolean')) recordRound();
    renderRound();
  }
  function nextRow() {
    if (!quiz || !quiz.round || !quiz.round.scored) return;
    quiz.current += 1;
    if (quiz.current >= quiz.entries.length) {
      screen = 'results';
      tab = 'table';
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === 'table'));
      const stats = savedStats(); stats.rounds += 1; saveStats(stats);
      render();
      return;
    }
    quiz.round = makeRound(quiz.entries[quiz.current]);
    renderRound();
  }
  function renderResults() {
    const t = ui(), misses = [...new Set(quiz.missed)];
    const pct = quiz.possible ? Math.round(quiz.score / quiz.possible * 100) : 0;
    root.innerHTML = `<div class="table-game-wrap"><section class="tg-panel tg-empty"><div class="table-kicker">${escapeHtml(t.result)}</div><h1 class="tg-structure-name">${pct}%</h1><p>${escapeHtml(t.resultText)} <strong>${quiz.score} / ${quiz.possible}</strong> ${escapeHtml(t.correctCells)}</p><div class="tg-progress-cards"><div class="tg-progress-card"><b>${quiz.entries.length}</b><span>${escapeHtml(t.played)}</span></div><div class="tg-progress-card"><b>${quiz.score}</b><span>${escapeHtml(t.top)}</span></div><div class="tg-progress-card"><b>${misses.length}</b><span>${escapeHtml(t.review)}</span></div></div><div class="tg-actions" style="justify-content:center">${misses.length ? `<button class="btn primary" data-action="retry-missed">${escapeHtml(t.retry)}</button>` : `<span class="tg-footnote">${escapeHtml(t.noMisses)}</span>`}<button class="soft-btn" data-action="go-home">${escapeHtml(t.complete)}</button><button class="soft-btn" data-action="open-draw">${escapeHtml(t.draw)}</button></div></section></div>`;
  }

  function structureForId(id) { return structures.find(s => s.id === id) || structures[0]; }
  function randomStructure(exclude) {
    const pool = structures.filter(s => s.id !== exclude);
    return (pool.length ? pool : structures)[Math.floor(Math.random() * (pool.length || structures.length))];
  }
  function rowSourceExamples(s) {
    const keys = {
      hyoscyamine: ['hyoscyamine', 'hiyosiyamin'], scopolamine: ['scopolamine', 'skopolamin'], cocaine: ['cocaine', 'kokain'],
      codeine: ['codeine', 'kodein'], thebaine: ['thebaine', 'tebain'], colchicine: ['colchicine', 'kolşisin'],
      quinine: ['quinine', 'kinin'], lysergic: ['ergotamine', 'ergotamine'], pelletierine: ['pelletierine', 'pelletierin']
    }[s.id];
    if (!keys) return [];
    return rows.filter(r => keys.some(k => normalize(r.en[4] + ' ' + r.tr[4]).includes(normalize(k))))
      .map(r => ({ plant: r.tr[1], group: r.tr[0] }));
  }
  function renderStructure() {
    const t = ui();
    const s = structureForId(structureId);
    const activeTab = structureMode === 'draw' ? 'draw' : 'identify';
    root.innerHTML = `<div class="table-game-wrap"><section class="table-intro"><div><div class="table-kicker">Structure practice · offline images</div><h1>${escapeHtml(t.drawTitle)}</h1><p>${escapeHtml(t.drawIntro)}</p></div><div class="table-hero-card"><strong>${escapeHtml(t.notAuto)}</strong></div></section>
      <div class="tg-panel"><div class="tg-tabs"><button class="tg-tab ${activeTab === 'draw' ? 'active' : ''}" data-action="structure-mode" data-mode="draw">${escapeHtml(t.drawTab)}</button><button class="tg-tab ${activeTab === 'identify' ? 'active' : ''}" data-action="structure-mode" data-mode="identify">${escapeHtml(t.identify)}</button></div>
      ${structureMode === 'draw' ? renderDrawPanel(s,t) : renderIdentifyPanel(t)}</div></div>`;
    if (structureMode === 'draw') initCanvas(s.id);
  }
  function renderDrawPanel(s,t) {
    return `<div class="tg-structure-layout"><section><div class="tg-control"><label for="structureSelect">${escapeHtml(t.molecule)}</label><select id="structureSelect">${structures.map(x => `<option value="${escapeHtml(x.id)}" ${x.id === s.id ? 'selected' : ''}>${escapeHtml(x.name)} · ${escapeHtml(x.group)}</option>`).join('')}</select></div><h2 class="tg-structure-name">${escapeHtml(s.name)}</h2><p class="tg-structure-meta">${escapeHtml(s.group)} · ${escapeHtml(t.formula)}: <strong>${escapeHtml(s.formula)}</strong></p><div class="tg-draw-toolbar"><button class="btn" data-action="random-structure">${escapeHtml(t.randomMolecule)}</button><button class="soft-btn" data-action="undo-sketch">${escapeHtml(t.undo)}</button><button class="soft-btn" data-action="clear-sketch">${escapeHtml(t.clear)}</button><button class="soft-btn" data-action="download-sketch">${escapeHtml(t.savePng)}</button></div><div class="tg-canvas-frame"><canvas id="sketchCanvas" width="1000" height="560" aria-label="${escapeHtml(t.drawTitle)}"></canvas></div><p class="tg-footnote">${escapeHtml(t.notAuto)}</p></section><aside><div class="tg-draw-toolbar"><button class="btn primary" data-action="toggle-reference">${escapeHtml(refVisible ? t.hideRef : t.showRef)}</button></div>${refVisible ? `<img class="tg-structure-image" src="${escapeHtml(s.image)}" alt="${escapeHtml(s.name)} chemical structure"><div class="tg-panel"><h3>${escapeHtml(t.ref)} · ${escapeHtml(s.name)}</h3><p><strong>${escapeHtml(t.formula)}:</strong> ${escapeHtml(s.formula)}</p><h3>${escapeHtml(t.clues)}</h3><ul class="tg-clues">${(s.clues || []).map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul><p class="tg-answer-note">${escapeHtml(s.source || '')}</p><div class="tg-links"><a href="https://pubchem.ncbi.nlm.nih.gov/compound/${encodeURIComponent(s.pubchemCid)}" target="_blank" rel="noopener">${escapeHtml(t.pubchem)} ↗</a></div>${renderSourceExamples(s,t)}</div>` : `<div class="tg-notice">${escapeHtml(lang === 'tr' ? 'Görseli ancak çizimini tamamladıktan sonra aç. Yapılar oyuna yerel dosya olarak eklenmiştir.' : 'Reveal the image after completing your sketch. Structure images are bundled locally.')}</div>`}</aside></div>`;
  }
  function renderSourceExamples(s,t) {
    const matches = rowSourceExamples(s);
    if (!matches.length) return `<p class="tg-answer-note">${escapeHtml(t.noSource)}</p>`;
    const unique = [...new Map(matches.map(m => [normalize(m.plant), m])).values()];
    return `<h3>${escapeHtml(t.structureSource)} <span class="tg-answer-note">(${lang === 'tr' ? 'örnek; tek kaynak olmayabilir' : 'examples; not necessarily exclusive'})</span></h3><ul>${unique.map(m => `<li>${safeHtml(m.plant)} <span class="tg-answer-note">· ${safeHtml(m.group)}</span></li>`).join('')}</ul>`;
  }
  function renderIdentifyPanel(t) {
    if (!recognition) return `<div class="tg-panel"><h2>${escapeHtml(t.identify)}</h2><p>${escapeHtml(lang === 'tr' ? 'İsim etiketi kapalı olan yapı görseline bakıp bileşiği seç.' : 'Identify the compound from an unlabeled structure image.')}</p><button class="btn primary" data-action="start-identify">${escapeHtml(t.startIdentify)}</button></div>`;
    const s = recognition.target;
    const choiceButtons = recognition.choices.map(c => `<button class="tg-choice ${recognitionSelection === c.id ? 'selected' : ''} ${recognition.checked && c.id === s.id ? 'correct' : ''} ${recognition.checked && recognitionSelection === c.id && c.id !== s.id ? 'incorrect' : ''}" data-action="select-structure" data-id="${escapeHtml(c.id)}" ${recognition.checked ? 'disabled' : ''}>${escapeHtml(c.name)}</button>`).join('');
    const source = recognition.checked ? renderSourceExamples(s,t) : '';
    const feedback = recognition.checked ? `<div class="tg-feedback ${recognitionSelection === s.id ? '' : 'bad'}"><strong>${escapeHtml(recognitionSelection === s.id ? t.rightStructure : t.wrongStructure)}:</strong> ${escapeHtml(s.name)}<br>${escapeHtml(s.group)} · ${escapeHtml(s.formula)}<ul class="tg-clues">${(s.clues || []).map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul>${source}<p class="tg-answer-note">${escapeHtml(s.source || '')}</p><a href="https://pubchem.ncbi.nlm.nih.gov/compound/${encodeURIComponent(s.pubchemCid)}" target="_blank" rel="noopener">${escapeHtml(t.pubchem)} ↗</a></div>` : '';
    return `<div class="tg-structure-layout"><section><img class="tg-structure-image" src="${escapeHtml(s.image)}" alt="Unlabelled chemical structure question"><div class="tg-actions"><button class="btn primary" data-action="check-structure" ${recognition.checked || !recognitionSelection ? 'disabled' : ''}>${escapeHtml(t.checkChoice)}</button><button class="soft-btn" data-action="start-identify">${escapeHtml(t.startIdentify)}</button></div>${feedback}</section><aside class="tg-panel"><h2>${escapeHtml(t.pickMolecule)}</h2><div class="tg-choice-grid">${choiceButtons}</div><p class="tg-footnote">${escapeHtml(t.notAuto)}</p></aside></div>`;
  }
  function startRecognition() {
    const target = randomStructure(recognition && recognition.target.id);
    const choices = shuffle([target, ...shuffle(structures.filter(s => s.id !== target.id)).slice(0, 3)]);
    recognition = { target, choices, checked: false };
    recognitionSelection = null;
    renderStructure();
  }
  function initCanvas(id) {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function grid() {
      ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle = '#edf0ea'; ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += 32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
      for (let y = 0; y <= canvas.height; y += 32) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
    }
    function restore(dataUrl) {
      grid();
      if (!dataUrl) return;
      const image = new Image(); image.onload = () => ctx.drawImage(image,0,0,canvas.width,canvas.height); image.src = dataUrl;
    }
    let saved = null;
    try { saved = localStorage.getItem(`fg-table-sketch:${id}`); } catch {}
    restore(saved);
    canvasUndo = [];
    const point = e => { const r = canvas.getBoundingClientRect(); return { x:(e.clientX-r.left)*canvas.width/r.width, y:(e.clientY-r.top)*canvas.height/r.height }; };
    canvas.onpointerdown = e => {
      e.preventDefault(); canvas.setPointerCapture(e.pointerId); canvasUndo.push(canvas.toDataURL('image/png')); if(canvasUndo.length>15)canvasUndo.shift();
      drawing = true; previousPoint = point(e); ctx.strokeStyle = '#173b38'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(previousPoint.x,previousPoint.y);
    };
    canvas.onpointermove = e => { if(!drawing)return; e.preventDefault(); const p=point(e); ctx.lineTo(p.x,p.y); ctx.stroke(); previousPoint=p; };
    const end = e => { if(!drawing)return; drawing=false; previousPoint=null; try { localStorage.setItem(`fg-table-sketch:${id}`,canvas.toDataURL('image/png')); refreshSketchCount(); } catch {} };
    canvas.onpointerup = end; canvas.onpointercancel = end;
  }
  function refreshSketchCount() {
    const stats = savedStats();
    stats.sketches = structures.reduce((n,s) => n + (localStorage.getItem(`fg-table-sketch:${s.id}`) ? 1 : 0), 0);
    saveStats(stats);
  }
  function clearCanvas() {
    const c = document.getElementById('sketchCanvas'); if (!c) return;
    const ctx=c.getContext('2d'); ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle='#edf0ea';ctx.lineWidth=1;
    for(let x=0;x<=c.width;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,c.height);ctx.stroke();}
    for(let y=0;y<=c.height;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(c.width,y);ctx.stroke();}
    try{localStorage.removeItem(`fg-table-sketch:${structureId}`);}catch{} refreshSketchCount();
  }
  function undoCanvas() {
    const c=document.getElementById('sketchCanvas');if(!c||!canvasUndo.length)return;
    const data=canvasUndo.pop(),ctx=c.getContext('2d'),im=new Image();im.onload=()=>{ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(im,0,0);try{localStorage.setItem(`fg-table-sketch:${structureId}`,c.toDataURL('image/png'));}catch{}};im.src=data;
  }
  function startTable() {
    const group = document.getElementById('groupFilter').value;
    const filtered = rows.map((row,index)=>({row,index})).filter(x=>!group||plain(x.row[lang][0])===group);
    const entries = shuffle(filtered);
    const length = document.getElementById('roundLength').value;
    const count = length === 'all' ? entries.length : Math.min(entries.length,Number(length));
    quiz = { entries: entries.slice(0,count), current:0, score:0, possible:0, completed:0, missed:[], blankSetting:document.getElementById('blankCount').value, answerMode:document.getElementById('answerMode').value, round:null };
    quiz.round = makeRound(quiz.entries[0]);
    screen='round';tab='table';
    document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab==='table'));
    renderRound();
  }
  function retryMissed() {
    const ids=[...new Set(quiz.missed)];
    if(!ids.length){screen='home';quiz=null;render();return;}
    quiz={entries:shuffle(ids.map(index=>({row:rows[index],index}))),current:0,score:0,possible:0,completed:0,missed:[],blankSetting:'random',answerMode:'choice',round:null};
    quiz.round=makeRound(quiz.entries[0]);screen='round';tab='table';renderRound();
  }

  root.addEventListener('change', e => {
    const sel=e.target.closest('[data-select-col]');
    if(sel&&quiz&&quiz.round&&!quiz.round.checked){quiz.round.answers[Number(sel.dataset.selectCol)]=sel.value;checkReady();}
    if(e.target.id==='structureSelect'){structureId=e.target.value;refVisible=false;canvasUndo=[];renderStructure();}
  });
  root.addEventListener('input', e => {
    const input=e.target.closest('[data-write-col]');
    if(input&&quiz&&quiz.round&&!quiz.round.checked){quiz.round.answers[Number(input.dataset.writeCol)]=input.value;checkReady();}
  });
  root.addEventListener('click', e => {
    const button=e.target.closest('[data-action]'); if(!button)return;
    const action=button.dataset.action;
    if(action==='start-table'){startTable();return;}
    if(action==='check-table'){checkTable();return;}
    if(action==='grade-cell'){gradeCell(Number(button.dataset.col),button.dataset.value==='yes');return;}
    if(action==='next-row'){nextRow();return;}
    if(action==='leave-round'||action==='go-home'){quiz=null;screen='home';tab='table';document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab==='table'));render();return;}
    if(action==='retry-missed'){retryMissed();return;}
    if(action==='open-draw'){setTab('draw');structureMode='draw';renderStructure();return;}
    if(action==='structure-mode'){structureMode=button.dataset.mode;refVisible=false;if(structureMode==='identify')recognition=null;renderStructure();return;}
    if(action==='random-structure'){structureId=randomStructure(structureId).id;refVisible=false;renderStructure();return;}
    if(action==='toggle-reference'){refVisible=!refVisible;renderStructure();return;}
    if(action==='clear-sketch'){clearCanvas();return;}
    if(action==='undo-sketch'){undoCanvas();return;}
    if(action==='download-sketch'){const c=document.getElementById('sketchCanvas');if(c){const a=document.createElement('a');a.href=c.toDataURL('image/png');a.download=`farmakognozi-cizim-${structureId}.png`;a.click();}return;}
    if(action==='start-identify'){startRecognition();return;}
    if(action==='select-structure'&&!recognition?.checked){recognitionSelection=button.dataset.id;renderStructure();return;}
    if(action==='check-structure'&&recognition&&!recognition.checked){recognition.checked=true;const stats=savedStats();if(recognitionSelection===recognition.target.id)stats.correct+=1;stats.possible+=1;saveStats(stats);renderStructure();return;}
  });
  document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>setTab(button.dataset.tab)));
  document.getElementById('languageToggle').addEventListener('click',()=>{lang=lang==='tr'?'en':'tr';localStorage.setItem('fg-table-lang',lang);render();});
  if(rows.length&&structures.length)refreshSketchCount();
  render();
})();
