// ---------- 1. Lesson data: each topic = explanation points + runnable example ----------
const topics = [
{ id: 'callbacks', title: 'Callbacks', points: [
  'A <b>callback</b> is a function you pass into another function as an argument.',
  'The receiving function decides <b>when</b> to call it.',
  'Sync callbacks run right away (<code>forEach</code>, <code>map</code>). Async callbacks run later (<code>setTimeout</code>).',
  'Pass the function itself: <code>greet</code>, not <code>greet()</code>.'],
  code: `function greet(name) { console.log('Hi ' + name); }
function welcome(user, callback) {
  console.log('welcome starts');
  callback(user);
  console.log('welcome ends');
}
welcome('Shresth', greet);` },

{ id: 'foreach', title: 'forEach', points: [
  'Calls your callback <b>once per element</b>, in order.',
  'Callback gets <code>(element, index, array)</code>.',
  'Returns <code>undefined</code>, so you cannot chain it or collect results.',
  'Cannot be stopped with <code>break</code>. Use it for side effects like logging or updating the page.'],
  code: `const fruits = ['apple', 'mango', 'kiwi'];
const result = fruits.forEach(function (fruit, index, arr) {
  console.log(index, fruit, 'of', arr.length);
});
console.log('forEach returned:', result);` },

{ id: 'map', title: 'map', points: [
  'Builds a <b>new array</b> of the same length. The original is untouched.',
  'Whatever the callback <code>return</code>s becomes the new element.',
  'Forgot <code>return</code>? You get an array of <code>undefined</code>.',
  'Use it to transform every item (prices to taxed prices, users to names).'],
  code: `const nums = [1, 2, 3, 4];
const doubled = nums.map(function (n, i) {
  console.log('step', i, ':', n, '->', n * 2);
  return n * 2;
});
console.log('doubled', doubled);
console.log('original', nums);` },

{ id: 'arrow', title: 'Arrow functions', points: [
  'Short syntax: <code>(params) => { body }</code>.',
  'One parameter: the parentheses are optional. Zero parameters: <code>()</code> is required.',
  'Arrows are anonymous. Store them in a <code>const</code> to name them.',
  'With <code>{ }</code> braces you must write <code>return</code> yourself.'],
  code: `const add = (a, b) => { return a + b; };
const square = n => { return n * n; };
const hello = () => { console.log('hello!'); };
console.log(add(2, 3), square(4));
hello();` },

{ id: 'implicit', title: 'Implicit return', points: [
  'Drop the braces and the <b>expression value is returned automatically</b>.',
  'Returning an object literal? Wrap it in parentheses: <code>() => ({ a: 1 })</code>.',
  'Braces + no <code>return</code> = <code>undefined</code>. This is the most common arrow bug.'],
  code: `const add = (a, b) => a + b;
const square = n => n * n;
const makeUser = name => ({ name: name, active: true });
const broken = n => { n * 2 };
console.log(add(2, 3), square(4));
console.log(makeUser('Asha'));
console.log('braces, no return:', broken(5));` },

{ id: 'wrapup', title: 'Arrow wrap-up', points: [
  'Same job, four spellings: full function, arrow with braces, arrow with one param, implicit return.',
  'Best for short callbacks passed to <code>map</code>, <code>filter</code>, <code>reduce</code>.',
  'Arrows have no own <code>this</code> or <code>arguments</code>, and cannot be used with <code>new</code>.',
  'Need a constructor or an object method? Use a regular function.'],
  code: `const nums = [1, 2, 3];
console.log(nums.map(function (n) { return n * 2; }));
console.log(nums.map((n) => { return n * 2; }));
console.log(nums.map(n => { return n * 2; }));
console.log(nums.map(n => n * 2));
try { new (() => {})(); }
catch (e) { console.log('Arrow with new:', e.message); }` },

{ id: 'settimeout', title: 'setTimeout', points: [
  'Runs a callback <b>once</b> after at least <code>delay</code> milliseconds.',
  'It does not pause your code. Lines after it run first (watch the order).',
  'Returns an id. <code>clearTimeout(id)</code> cancels it before it fires.',
  'Extra arguments after the delay are passed into the callback.',
  'Watch the grey ms counter in the output to see the real timing.'],
  code: `console.log('1. start');
setTimeout(() => console.log('4. after 1000ms'), 1000);
setTimeout(name => console.log('3. hello', name), 500, 'Asha');
const cancelled = setTimeout(() => console.log('never printed'), 200);
clearTimeout(cancelled);
console.log('2. end of script');` },

{ id: 'setinterval', title: 'setInterval', points: [
  'Runs a callback <b>repeatedly</b> every <code>delay</code> ms.',
  'It never stops by itself. Save the id and call <code>clearInterval(id)</code>.',
  'Forgetting to clear it keeps running forever in the background.',
  'Each tick is a separate call of the same callback, so keep state outside it.'],
  code: `let count = 0;
const id = setInterval(() => {
  count++;
  console.log('tick', count);
  if (count === 4) {
    clearInterval(id);
    console.log('stopped');
  }
}, 500);` },

{ id: 'filter', title: 'filter', points: [
  'Returns a <b>new array</b> with only the elements where the callback returns a truthy value.',
  'The result can be shorter, or empty <code>[]</code>. Never <code>undefined</code>.',
  'Original array is unchanged. Elements are not modified, only kept or dropped.'],
  code: `const ages = [12, 18, 25, 9, 40];
const adults = ages.filter((age, i) => {
  console.log('check', age, age >= 18);
  return age >= 18;
});
console.log('adults', adults);
console.log('none over 100:', ages.filter(a => a > 100));` },

{ id: 'somevery', title: 'some and every', points: [
  '<code>some</code>: <code>true</code> if <b>at least one</b> element passes. Stops at the first pass.',
  '<code>every</code>: <code>true</code> only if <b>all</b> elements pass. Stops at the first failure.',
  'Both return a boolean, not an array.',
  'Empty array: <code>some</code> is <code>false</code>, <code>every</code> is <code>true</code>.'],
  code: `const marks = [45, 72, 88, 30];
const hasTopper = marks.some(m => { console.log('some checks', m); return m > 80; });
const allPass = marks.every(m => { console.log('every checks', m); return m >= 40; });
console.log('some > 80:', hasTopper, '| every >= 40:', allPass);
console.log('empty:', [].some(x => true), [].every(x => false));` },

{ id: 'reduce', title: 'reduce', points: [
  'Folds the whole array into <b>one value</b>: a number, string, object, or even another array.',
  'Callback gets <code>(accumulator, current, index, array)</code> and must <code>return</code> the next accumulator.',
  'The 2nd argument of <code>reduce</code> is the starting value. Skip it and the first element is used (empty array then throws).',
  'Read the log: the accumulator carries the result from one step to the next.'],
  code: `const nums = [10, 20, 30];
const sum = nums.reduce((acc, n) => {
  console.log('acc', acc, '+ n', n, '=', acc + n);
  return acc + n;
}, 0);
console.log('sum', sum);
const words = ['a', 'b', 'a', 'c', 'a'];
console.log(words.reduce((counts, w) => ({ ...counts, [w]: (counts[w] || 0) + 1 }), {}));` },

{ id: 'this', title: 'Arrows and this', points: [
  'A regular function\'s <code>this</code> depends on <b>how it is called</b>. Inside a plain callback it is lost.',
  'An arrow has no <code>this</code> of its own. It <b>borrows it from the surrounding code</b> (lexical <code>this</code>).',
  'So arrows are ideal callbacks inside methods: <code>this</code> stays the object.',
  'But an arrow used <i>as</i> the method gets the outer <code>this</code>, not the object. Use a normal method there.'],
  code: `'use strict';
const team = {
  name: 'Blue',
  players: ['Ravi', 'Mia'],
  showRegular() {
    this.players.forEach(function (p) { console.log(p, 'regular:', this?.name); });
  },
  showArrow() {
    this.players.forEach(p => console.log(p, 'arrow:', this.name));
  },
  arrowMethod: () => console.log('arrow as method:', this?.name)
};
team.showRegular();
team.showArrow();
team.arrowMethod();` }
];

// ---------- 2. Helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const fmt = v => (typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v));
const timers = {}; // active timer ids per topic, so Run/Reset can cancel them

// ---------- 3. Render nav + topics from the data ----------
$('#nav').innerHTML = topics.map(t => `<a href="#${t.id}">${t.title}</a>`).join('');
$('#topics').innerHTML = topics.map(t => `
  <section class="topic" id="${t.id}">
    <h2>${t.title}</h2>
    <div class="cols">
      <ul>${t.points.map(p => `<li>${p}</li>`).join('')}</ul>
      <div>
        <textarea spellcheck="false" aria-label="${t.title} example code" rows="${t.code.split('\n').length}">${esc(t.code)}</textarea>
        <div class="bar"><button data-run>Run</button><button data-reset>Reset</button></div>
        <div class="out" aria-live="polite"></div>
      </div>
    </div>
  </section>`).join('');

// ---------- 4. Run the code with a captured console and tracked timers ----------
const stop = id => { (timers[id] || []).forEach(t => { clearTimeout(t); clearInterval(t); }); timers[id] = []; };

function run(id) {
  const box = $('#' + id), out = $('.out', box), start = performance.now();
  stop(id);
  out.textContent = '';
  const log = (...args) => {
    const row = document.createElement('div');
    row.innerHTML = '<span></span><small>' + Math.round(performance.now() - start) + 'ms</small>';
    row.firstChild.textContent = args.map(fmt).join(' ');
    out.append(row);
  };
  const track = fn => (...a) => { const t = fn(...a); timers[id].push(t); return t; };
  try {
    new Function('console', 'setTimeout', 'setInterval', $('textarea', box).value)({ log }, track(setTimeout), track(setInterval));
  } catch (e) { log('Error:', e.message); }
}

// ---------- 5. Events (one delegated listener) ----------
$('#topics').addEventListener('click', e => {
  const box = e.target.closest('.topic');
  if (!box) return;
  if (e.target.matches('[data-run]')) run(box.id);
  if (e.target.matches('[data-reset]')) {
    stop(box.id);
    $('textarea', box).value = topics.find(t => t.id === box.id).code;
    $('.out', box).textContent = '';
  }
});
$('#topics').addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'Enter' && e.target.matches('textarea')) run(e.target.closest('.topic').id);
});