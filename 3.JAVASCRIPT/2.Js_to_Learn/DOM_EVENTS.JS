/* ============================================================
   NAVIGATION — switch visible topic section
   ============================================================ */
const navBtns = document.querySelectorAll(".nav-btn");
const topics = document.querySelectorAll(".topic");

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    navBtns.forEach(b => b.classList.remove("active"));
    topics.forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("collapsed");
});

/* ============================================================
   LIVE DEMOS (already wired, not editable — for illustration)
   ============================================================ */

// 1. Intro demo box
const introBox = document.getElementById("introDemoBox");
const introLog = document.getElementById("introDemoLog");
introBox.addEventListener("mouseover", () => introLog.textContent = "mouseover fired");
introBox.addEventListener("click", () => introLog.textContent = "click fired at " + new Date().toLocaleTimeString());

// 3. onclick property vs addEventListener demo
const propBtn = document.getElementById("propDemoBtn");
const listenerBtn = document.getElementById("listenerDemoBtn");
const ocLog = document.getElementById("ocDemoLog");
propBtn.onclick = () => ocLog.textContent = "Set via .onclick fired!";
propBtn.onclick = () => ocLog.textContent = "This OVERWROTE the previous .onclick handler.";
listenerBtn.addEventListener("click", () => ocLog.textContent = "Handler #1 (addEventListener) fired.");
listenerBtn.addEventListener("click", () => ocLog.textContent += " + Handler #2 also fired (both run)!");

// 4. this keyword demo
const thisLog = document.getElementById("thisDemoLog");
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", function () {
    thisLog.textContent = "this.dataset.name = " + this.dataset.name + " (this === the clicked tile)";
  });
});

// 5. Event object demo
const mouseBox = document.getElementById("mouseTrackBox");
const keyInput = document.getElementById("keyTrackInput");
const eventObjLog = document.getElementById("eventObjDemoLog");
mouseBox.addEventListener("mousemove", e => {
  eventObjLog.textContent = `mousemove — clientX: ${e.clientX}, clientY: ${e.clientY}`;
});
keyInput.addEventListener("keydown", e => {
  eventObjLog.textContent = `keydown — e.key: "${e.key}", e.code: "${e.code}"`;
});

// 6. Form demo
document.getElementById("demoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("demoName").value || "(empty)";
  document.getElementById("formDemoLog").textContent = "preventDefault() stopped the reload. Value: " + name;
});

// 7. Input & change demo
const counterInput = document.getElementById("counterInput");
const charCountLog = document.getElementById("charCountLog");
counterInput.addEventListener("input", e => {
  charCountLog.textContent = `${e.target.value.length} / 40 characters`;
});
const colorSelect = document.getElementById("colorSelect");
const selectDemoLog = document.getElementById("selectDemoLog");
colorSelect.addEventListener("change", e => {
  selectDemoLog.textContent = "change fired — selected: " + (e.target.value || "(none)");
  document.body.style.borderTop = e.target.value ? `4px solid ${e.target.value}` : "";
});

// 8. Bubbling demo
const bubbleDemoLog = document.getElementById("bubbleDemoLog");
let bubbleTrail = [];
["outerBox", "middleBox", "innerBox"].forEach(id => {
  document.getElementById(id).addEventListener("click", function (e) {
    bubbleTrail.push(id);
    if (id === "innerBox") bubbleTrail = ["innerBox"]; // reset trail on new click sequence start
    bubbleDemoLog.textContent = "Bubble order so far: " + bubbleTrail.join(" → ");
    if (id === "middleBox" && document.getElementById("stopPropToggle").checked) {
      e.stopPropagation();
      bubbleDemoLog.textContent += "  (stopped here by stopPropagation)";
    }
  });
});
document.getElementById("innerBox").addEventListener("click", () => { bubbleTrail = ["innerBox"]; }, true);

// 9. Delegation demo
const delegateList = document.getElementById("delegateList");
const delegateDemoLog = document.getElementById("delegateDemoLog");
delegateList.addEventListener("click", e => {
  if (e.target.classList.contains("ditem")) {
    e.target.classList.toggle("done");
    delegateDemoLog.textContent = "Delegated click handled for: " + e.target.textContent;
  }
});
let demoItemCount = 3;
document.getElementById("addDemoItem").addEventListener("click", () => {
  demoItemCount++;
  const li = document.createElement("li");
  li.className = "ditem";
  li.textContent = "Task " + demoItemCount;
  delegateList.appendChild(li);
});

// Pre-wired "+ Add task" button for the delegation exercise (always active,
// independent of the user's exercise code, so they can prove delegation
// works on elements added AFTER their listener was attached).
let practiceItemCount = 2;
function wireAddPracticeItem() {
  const addBtn = document.getElementById("addPracticeItem");
  if (!addBtn) return;
  addBtn.addEventListener("click", () => {
    practiceItemCount++;
    const li = document.createElement("li");
    li.className = "pitem";
    li.textContent = "Task " + practiceItemCount;
    document.getElementById("practiceList").appendChild(li);
  });
}
wireAddPracticeItem();

/* ============================================================
   PRACTICE EXERCISE ENGINE
   Each exercise has: starter code, and a snapshot of the
   sandbox's original HTML so "Reset" can restore it.
   ============================================================ */

const EXERCISES = {
  "ex-intro": `// Add a click listener to #introBtn
// that logs "Button was clicked!"

`,
  "ex-inline": `// Give #inlineBtn an inline-style handler via setAttribute
// The string you pass must call window.log(...)

`,
  "ex-color": `// Click #colorBox -> set a random rgb() background
// log the color string each time

`,
  "ex-this": `// Loop over .pick buttons, add a REGULAR function listener
// use "this" to style + read the clicked button

`,
  "ex-eventobj": `// Add click listeners to .fruit items
// log e.target.textContent and e.type

`,
  "ex-form": `// Add a submit listener to #practiceForm
// preventDefault(), validate #emailInput

`,
  "ex-inputchange": `// #previewInput -> live preview on 'input'
// log "Finalized: ..." on 'change'

`,
  "ex-bubble": `// Add click listeners to #pOuter, #pMiddle, #pInner
// log e.currentTarget.id in each

`,
  "ex-delegate": `// ONE listener on #practiceList
// toggle 'done' class on the clicked .pitem, log its text

`
};

// snapshot original sandbox HTML for each exercise, and pre-fill textareas
const sandboxSnapshots = {};
Object.keys(EXERCISES).forEach(id => {
  const sandbox = document.getElementById(id + "-output");
  if (sandbox) sandboxSnapshots[id] = sandbox.innerHTML;
  const codeEl = document.getElementById(id + "-code");
  if (codeEl) codeEl.value = EXERCISES[id];
});

function runExercise(id) {
  const codeEl = document.getElementById(id + "-code");
  const consoleEl = document.getElementById(id + "-console");
  consoleEl.textContent = "";

  const log = (...args) => {
    consoleEl.textContent += args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ") + "\n";
  };
  window.log = log; // exposed globally so inline-attribute exercise (setAttribute) can call it too

  try {
    const runner = new Function("log", codeEl.value);
    runner(log);
  } catch (err) {
    consoleEl.textContent += "⚠ Error: " + err.message;
  }
}

function resetExercise(id) {
  const sandbox = document.getElementById(id + "-output");
  const codeEl = document.getElementById(id + "-code");
  const consoleEl = document.getElementById(id + "-console");
  if (sandbox) sandbox.innerHTML = sandboxSnapshots[id];
  if (codeEl) codeEl.value = EXERCISES[id];
  if (consoleEl) consoleEl.textContent = "";
  if (id === "ex-delegate") { practiceItemCount = 2; wireAddPracticeItem(); }
}

document.querySelectorAll(".run-btn").forEach(btn => {
  btn.addEventListener("click", () => runExercise(btn.dataset.id));
});
document.querySelectorAll(".reset-btn").forEach(btn => {
  btn.addEventListener("click", () => resetExercise(btn.dataset.id));
});
document.querySelectorAll(".hint-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const hint = document.getElementById(btn.dataset.id + "-hint");
    hint.hidden = !hint.hidden;
  });
});