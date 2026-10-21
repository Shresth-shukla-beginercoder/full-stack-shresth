
  const consoleBody = document.getElementById('console-body');
  let lineCount = 0;

  function formatVal(v){
    if (typeof v === 'string') return v;
    try { return JSON.stringify(v); } catch(e){ return String(v); }
  }

  function printLine(type, args, sourceLabel){
    if (consoleBody.querySelector('.empty')) consoleBody.innerHTML = '';
    lineCount++;
    const row = document.createElement('div');
    row.className = 'line ' + type;
    const src = document.createElement('span');
    src.className = 'src';
    src.textContent = sourceLabel;
    const out = document.createElement('span');
    out.className = 'out';
    out.textContent = args.map(formatVal).join(' ');
    row.appendChild(src);
    row.appendChild(out);
    consoleBody.appendChild(row);
    consoleBody.scrollTop = consoleBody.scrollHeight;
  }

  function runDemo(codeString, sourceLabel){
    const sandboxConsole = {
      log:   (...args) => printLine('log', args, sourceLabel),
      warn:  (...args) => printLine('warn', args, sourceLabel),
      error: (...args) => printLine('error', args, sourceLabel)
    };
    try {
      const fn = new Function('console', codeString);
      fn(sandboxConsole);
    } catch (err) {
      printLine('error', ['Error: ' + err.message], sourceLabel);
    }
  }

  document.querySelectorAll('.demo').forEach((demoEl, i) => {
    const btn = demoEl.querySelector('.run-btn');
    const code = demoEl.getAttribute('data-code');
    const sectionId = demoEl.closest('section.topic').id;
    btn.addEventListener('click', () => runDemo(code, sectionId + '.js'));
  });

  document.getElementById('clear-console').addEventListener('click', () => {
    consoleBody.innerHTML = '<div class="empty">// output will appear here — press any Run button above</div>';
  });
