/* ============================================================
   Sidebar toggle (mobile)
   ============================================================ */
const sidebar = document.getElementById("sidebar");
document.getElementById("navToggle").addEventListener("click", () => sidebar.classList.toggle("open"));
document.querySelectorAll(".sidebar a").forEach(a => a.addEventListener("click", () => sidebar.classList.remove("open")));

/* ============================================================
   1. Intro
   ============================================================ */
document.getElementById("introBtn").addEventListener("click", () => {
  document.getElementById("introText").textContent = "The DOM just changed me!";
});

/* ============================================================
   2. getElementById
   ============================================================ */
document.getElementById("idBtn").addEventListener("click", () => {
  document.getElementById("idBox").style.background = "orange";
});

/* ============================================================
   3. getElementsByTagName / ClassName
   ============================================================ */
document.getElementById("tagBtn").addEventListener("click", () => {
  const fruits = document.getElementsByClassName("fruit");
  for (let i = 0; i < fruits.length; i++) fruits[i].style.color = "limegreen";
});

/* ============================================================
   4. querySelector / All
   ============================================================ */
document.getElementById("qsBtn").addEventListener("click", () => {
  document.querySelectorAll(".card").forEach(card => (card.style.border = "2px solid #6c5ce7"));
});

/* ============================================================
   5. innerHTML / textContent
   ============================================================ */
document.querySelectorAll("[data-mode]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById("contentTarget");
    if (btn.dataset.mode === "html") target.innerHTML = "<strong>Bold via innerHTML</strong>";
    else target.textContent = "<strong>Not bold — shown as text</strong>";
  });
});

/* ============================================================
   6. Attributes
   ============================================================ */
document.getElementById("attrBtn").addEventListener("click", () => {
  document.getElementById("attrImg").setAttribute("src", "https://placehold.co/80x80/6c5ce7/fff");
});

/* ============================================================
   7. Changing styles
   ============================================================ */
document.getElementById("styleBtn").addEventListener("click", () => {
  const box = document.getElementById("styleBox");
  box.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
  box.style.borderRadius = Math.random() * 50 + "px";
});

/* ============================================================
   8. classList
   ============================================================ */
document.getElementById("classBtn").addEventListener("click", () => {
  document.getElementById("classBox").classList.toggle("active");
});

/* ============================================================
   9. Traversal
   ============================================================ */
document.getElementById("travBtn").addEventListener("click", () => {
  const parent = document.getElementById("parentLi");
  [...parent.querySelector("ul").children].forEach(c => (c.style.color = "crimson"));
});

/* ============================================================
   10. append / remove
   ============================================================ */
document.getElementById("addBtn").addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = "New task " + (Date.now() % 1000);
  document.getElementById("taskList").appendChild(li);
});
document.getElementById("removeLastBtn").addEventListener("click", () => {
  document.getElementById("taskList").lastElementChild?.remove();
});

/* ============================================================
   Generic practice-exercise engine
   Every .exercise block gets a Run button (executes the code)
   and a Check button (validates the resulting DOM state).
   ============================================================ */
const colorMatches = (el, cssColor, prop = "color") => {
  const tmp = document.createElement("div");
  tmp.style[prop] = cssColor;
  document.body.appendChild(tmp);
  const expected = getComputedStyle(tmp)[prop];
  document.body.removeChild(tmp);
  return getComputedStyle(el)[prop] === expected;
};

const checks = {
  idbox: () => document.getElementById("exId1").textContent.trim() === "Selected!",
  tagclass: () => [...document.querySelectorAll("#exList1 li")].every(li => colorMatches(li, "#ffe28a", "backgroundColor")),
  qsa: () => [...document.querySelectorAll(".dot")].every(d => colorMatches(d, "red")),
  content: () => document.getElementById("exContent").querySelector("strong")?.textContent.toLowerCase().includes("bold"),
  attr: () => document.getElementById("exBtnAttr").hasAttribute("disabled"),
  style: () => {
    const b = document.getElementById("exStyleBox");
    return colorMatches(b, "teal", "backgroundColor") && getComputedStyle(b).width === "150px";
  },
  classlist: () => document.getElementById("exClassBox").classList.contains("active"),
  traversal: () => document.getElementById("exLast").textContent.trim() === "Reached!",
  appendremove: () => {
    const list = document.getElementById("exList2");
    return list.children.length > 1 && list.lastElementChild.textContent.trim() === "Practice item";
  },
};

document.querySelectorAll(".exercise").forEach(block => {
  const key = block.dataset.exercise;
  const textarea = block.querySelector(".code-input");
  const result = block.querySelector(".ex-result");

  block.querySelector(".run-btn").addEventListener("click", () => {
    try {
      new Function(textarea.value)();
      result.textContent = "Code ran — now click Check.";
      result.className = "ex-result";
    } catch (err) {
      result.textContent = "Error: " + err.message;
      result.className = "ex-result fail";
    }
  });

  block.querySelector(".check-btn").addEventListener("click", () => {
    const passed = checks[key] ? checks[key]() : false;
    result.textContent = passed ? "✔ Correct!" : "✘ Not quite — try again.";
    result.className = "ex-result " + (passed ? "pass" : "fail");
  });
});

/* ============================================================
   11. Final demo — Mini Pokédex
   Combines: createElement, appendChild/append, setAttribute,
   classList, textContent, querySelector, traversal via closest.
   ============================================================ */
const pokeList = [
  { id: 1, name: "bulbasaur" }, { id: 4, name: "charmander" }, { id: 7, name: "squirtle" },
  { id: 25, name: "pikachu" }, { id: 39, name: "jigglypuff" }, { id: 52, name: "meowth" },
  { id: 54, name: "psyduck" }, { id: 58, name: "growlithe" }, { id: 74, name: "geodude" },
  { id: 92, name: "gastly" }, { id: 104, name: "cubone" }, { id: 133, name: "eevee" },
];

const pokeGrid = document.getElementById("pokeGrid");

pokeList.forEach(p => {
  const card = document.createElement("div");
  card.className = "poke-card";
  card.setAttribute("data-name", p.name);

  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
  img.alt = p.name;

  const name = document.createElement("p");
  name.textContent = p.name;

  card.append(img, name);
  card.addEventListener("click", () => card.classList.toggle("caught"));
  pokeGrid.appendChild(card);
});

document.getElementById("pokeSearch").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll(".poke-card").forEach(card => {
    const match = card.dataset.name.includes(q);
    card.classList.toggle("hidden", !match);
  });
});