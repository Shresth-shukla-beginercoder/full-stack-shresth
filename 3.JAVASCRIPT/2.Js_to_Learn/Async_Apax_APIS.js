/* ================= Helpers used by demos AND available to practice code ================= */

// Fake "network" request using a callback (topic 4)
function fakeRequest(url, callback) {
  setTimeout(() => {
    callback({ url, status: 200, body: "fake data for " + url });
  }, 700);
}

// Fake "network" request using a Promise (topic 5+). URLs containing "bad" reject.
function fakeRequestPromise(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.toLowerCase().includes("bad")) {
        reject("Could not reach " + url + " (simulated 404)");
      } else {
        resolve({ url, status: 200, body: "fake data for " + url });
      }
    }, 700);
  });
}

// Simple dice roll promise, used as a fallback for topic 10 if the user
// didn't finish (or wants to reuse) the topic 7 practice question.
function rollDice() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.floor(Math.random() * 6) + 1;
      if (n >= 4) resolve(n);
      else reject("Rolled a " + n + " — too low, try again.");
    }, 500);
  });
}

/* ================= Output formatting ================= */

function formatArg(a) {
  if (typeof a === "string") return a;
  if (a instanceof Error) return a.message;
  try {
    const s = JSON.stringify(a, null, 2);
    return s && s.length > 800 ? s.slice(0, 800) + " …(truncated)" : s;
  } catch (e) {
    return String(a);
  }
}

function appendLine(outputEl, args, cls) {
  const line = document.createElement("div");
  line.className = cls === "err" ? "err-line" : cls === "ok" ? "ok-line" : "log-line";
  line.textContent = args.map(formatArg).join(" ");
  outputEl.appendChild(line);
}

/* ================= Demo implementations (topic id -> function(outputEl)) ================= */

const DEMOS = {

  stack1(out) {
    function multiply(a, b) {
      appendLine(out, ["→ push multiply(" + a + "," + b + ")"], "log");
      const r = a * b;
      appendLine(out, ["← pop multiply, returns " + r], "ok");
      return r;
    }
    function square(n) {
      appendLine(out, ["→ push square(" + n + ")"], "log");
      const r = multiply(n, n);
      appendLine(out, ["← pop square, returns " + r], "ok");
      return r;
    }
    function printSquare(n) {
      appendLine(out, ["→ push printSquare(" + n + ")"], "log");
      const result = square(n);
      appendLine(out, ["printSquare logs: " + result], "ok");
      appendLine(out, ["← pop printSquare, stack now empty"], "log");
    }
    printSquare(5);
  },

  webapi1(out) {
    appendLine(out, ["1: start"], "log");
    setTimeout(() => {
      appendLine(out, ["2: this runs later (handled by the browser's timer API)"], "ok");
    }, 1000);
    appendLine(out, ["3: end (runs before the timeout, even though written after)"], "log");
  },

  eventloop1(out) {
    appendLine(out, ["1"], "log");
    setTimeout(() => appendLine(out, ["2 (from queue, after stack emptied)"], "ok"), 0);
    appendLine(out, ["3"], "log");
  },

  cbrequest1(out) {
    appendLine(out, ["Requesting: /movies/123"], "log");
    fakeRequest("/movies/123", (data) => {
      appendLine(out, ["Got data:", data], "ok");
    });
  },

  cbhell1(out) {
    appendLine(out, ["Requesting: /user"], "log");
    fakeRequest("/user", (user) => {
      appendLine(out, ["Requesting: /user/" + user.url + "/orders"], "log");
      fakeRequest("/user/" + user.url + "/orders", (orders) => {
        appendLine(out, ["Requesting: /orders/" + orders.url + "/items"], "log");
        fakeRequest("/orders/" + orders.url + "/items", (items) => {
          appendLine(out, ["Finally got items:", items], "ok");
        });
      });
    });
  },

  promreq1(out) {
    appendLine(out, ["Requesting: /movies/123"], "log");
    fakeRequestPromise("/movies/123").then((data) => {
      appendLine(out, ["Got data:", data], "ok");
    });
  },

  promchain1(out) {
    fakeRequestPromise("/user")
      .then((user) => fakeRequestPromise("/user/" + user.url + "/orders"))
      .then((orders) => fakeRequestPromise("/orders/" + orders.url + "/items"))
      .then((items) => appendLine(out, ["Finally got items:", items], "ok"));
  },

  promisemagic1(out) {
    fakeRequestPromise("/good-url")
      .then((data) => appendLine(out, ["Success:", data], "ok"))
      .catch((err) => appendLine(out, ["Error:", err], "err"))
      .finally(() => appendLine(out, ["Request finished (always runs)"], "log"));
  },

  promiseall1(out) {
    appendLine(out, ["Requesting /a, /b, /c in parallel..."], "log");
    Promise.all([
      fakeRequestPromise("/a"),
      fakeRequestPromise("/b"),
      fakeRequestPromise("/c")
    ]).then((results) => appendLine(out, ["All done:", results], "ok"));
  },

  ownpromise1(out) {
    function flipCoin() {
      return new Promise((resolve, reject) => {
        const result = Math.random() < 0.5 ? "heads" : "tails";
        setTimeout(() => {
          if (result === "heads") resolve("You got heads! 🪙");
          else reject("You got tails — try again.");
        }, 600);
      });
    }
    appendLine(out, ["Flipping..."], "log");
    flipCoin()
      .then((msg) => appendLine(out, [msg], "ok"))
      .catch((msg) => appendLine(out, [msg], "err"));
  },

  asynckw1(out) {
    async function greet() { return "Hello!"; }
    greet().then((msg) => appendLine(out, [msg], "ok"));

    async function willThrow() { throw "Oops!"; }
    willThrow().catch((err) => appendLine(out, ["Caught:", err], "err"));
  },

  awaitkw1(out) {
    async function getOrderItems() {
      appendLine(out, ["Requesting /user..."], "log");
      const user = await fakeRequestPromise("/user");
      appendLine(out, ["Requesting /user/" + user.url + "/orders..."], "log");
      const orders = await fakeRequestPromise("/user/" + user.url + "/orders");
      appendLine(out, ["Requesting /orders/" + orders.url + "/items..."], "log");
      const items = await fakeRequestPromise("/orders/" + orders.url + "/items");
      appendLine(out, ["Finally got items:", items], "ok");
    }
    getOrderItems();
  },

  asyncerr1(out) {
    async function safeLoad(url) {
      try {
        const data = await fakeRequestPromise(url);
        appendLine(out, ["Success:", data], "ok");
      } catch (err) {
        appendLine(out, ["Something went wrong:", err], "err");
      } finally {
        appendLine(out, ["Done trying, either way."], "log");
      }
    }
    safeLoad("/bad-url");
  },

  introapi1(out) {
    appendLine(out, ["Fetching https://api.tvmaze.com/search/shows?q=girls ..."], "log");
    fetch("https://api.tvmaze.com/search/shows?q=girls")
      .then((res) => res.json())
      .then((data) => appendLine(out, ["First result name:", data[0].show.name], "ok"))
      .catch((err) => appendLine(out, ["Request failed:", err.message], "err"));
  },

  json1(out) {
    const user = { name: "Shresth", course: "Engineering", active: true };
    const jsonString = JSON.stringify(user);
    appendLine(out, ["jsonString =", jsonString], "log");
    appendLine(out, ["typeof jsonString =", typeof jsonString], "log");
    const parsedBack = JSON.parse(jsonString);
    appendLine(out, ["parsedBack.name =", parsedBack.name], "ok");
  },

  status1(out) {
    fetch("https://api.tvmaze.com/shows/1")
      .then((res) => {
        appendLine(out, ["Status code:", res.status], "log");
        appendLine(out, ["Was it ok?", res.ok], "log");
        return res.json();
      })
      .then((data) => appendLine(out, ["Show name:", data.name], "ok"))
      .catch((err) => appendLine(out, ["Request failed:", err.message], "err"));
  },

  querystring1(out) {
    const params = new URLSearchParams({ q: "the office", page: "1" });
    appendLine(out, ["params.toString() =", params.toString()], "log");
    const url = "https://api.tvmaze.com/search/shows?" + params.toString();
    appendLine(out, ["Full URL:", url], "log");
    const parsed = new URLSearchParams("?q=girls&page=2");
    appendLine(out, ["parsed.get('q') =", parsed.get("q")], "ok");
    appendLine(out, ["parsed.get('page') =", parsed.get("page")], "ok");
  },

  headers1(out) {
    fetch("https://api.tvmaze.com/shows/1", { headers: { "Accept": "application/json" } })
      .then((res) => {
        appendLine(out, ["Content-Type header:", res.headers.get("content-type")], "log");
        return res.json();
      })
      .then((data) => appendLine(out, ["Show:", data.name], "ok"))
      .catch((err) => appendLine(out, ["Request failed:", err.message], "err"));
  },

  xhr1(out) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.tvmaze.com/shows/1");
    xhr.onload = () => appendLine(out, ["Show name (via XHR):", JSON.parse(xhr.responseText).name], "ok");
    xhr.onerror = () => appendLine(out, ["Request failed"], "err");
    xhr.send();
  },

  fetch1(out) {
    async function loadShow() {
      const res = await fetch("https://api.tvmaze.com/shows/1");
      const data = await res.json();
      appendLine(out, ["Show name (via fetch):", data.name], "ok");
    }
    loadShow().catch((err) => appendLine(out, ["Request failed:", err.message], "err"));
  },

  axios1(out) {
    axios.get("https://api.tvmaze.com/shows/1")
      .then((response) => appendLine(out, ["Show name (via axios):", response.data.name], "ok"))
      .catch((err) => appendLine(out, ["Request failed:", err.message], "err"));
  },

  axiosheaders1(out) {
    axios.get("https://api.tvmaze.com/search/shows", {
      params: { q: "girls" },
      headers: { "Accept": "application/json" }
    }).then((response) => {
      appendLine(out, ["First result:", response.data[0].show.name], "ok");
    }).catch((err) => appendLine(out, ["Request failed:", err.message], "err"));
  }
};

/* ================= Practice code runner ================= */

function runUserCode(code, outputEl) {
  outputEl.innerHTML = "";
  const sandboxConsole = {
    log: (...a) => appendLine(outputEl, a, "log"),
    error: (...a) => appendLine(outputEl, a, "err"),
    warn: (...a) => appendLine(outputEl, a, "log"),
    info: (...a) => appendLine(outputEl, a, "log")
  };
  try {
    const fn = new Function(
      "console", "fakeRequest", "fakeRequestPromise", "rollDice", "fetch", "axios", "URLSearchParams",
      code
    );
    fn(sandboxConsole, fakeRequest, fakeRequestPromise, rollDice, window.fetch.bind(window), window.axios, window.URLSearchParams);
  } catch (err) {
    appendLine(outputEl, ["⚠ " + err.message], "err");
  }
}

/* ================= Wiring up buttons ================= */

document.addEventListener("DOMContentLoaded", () => {

  // Run-demo buttons
  document.querySelectorAll(".run-demo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const demoName = btn.dataset.demo;
      const out = document.getElementById("out-demo-" + demoName);
      out.innerHTML = "";
      const demoFn = DEMOS[demoName];
      if (demoFn) demoFn(out);
    });
  });

  // Hint toggles
  document.querySelectorAll(".hint-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hint = btn.nextElementSibling;
      hint.classList.toggle("show");
      btn.textContent = hint.classList.contains("show") ? "Hide Hint" : "Show Hint";
    });
  });

  // Run-practice buttons
  document.querySelectorAll(".run-practice").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".practice");
      const textarea = container.querySelector(".practice-code");
      const output = container.querySelector(".output");
      runUserCode(textarea.value, output);
    });
  });

  // Mobile sidebar toggle
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  sidebar.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => sidebar.classList.remove("open"));
  });

  // Topic 22: TV Show Search App
  const form = document.getElementById("tvSearchForm");
  const input = document.getElementById("tvSearchInput");
  const resultsDiv = document.getElementById("tvResults");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    resultsDiv.innerHTML = "<p style='color:#94a3b8'>Searching…</p>";
    try {
      const response = await axios.get("https://api.tvmaze.com/search/shows", {
        params: { q: query }
      });
      if (response.data.length === 0) {
        resultsDiv.innerHTML = "<p style='color:#94a3b8'>No results found.</p>";
        return;
      }
      resultsDiv.innerHTML = response.data.slice(0, 10).map((result) => {
        const img = result.show.image ? result.show.image.medium : "";
        return `<div class="tv-card">${img ? `<img src="${img}" alt="${result.show.name}">` : ""}<h4>${result.show.name}</h4></div>`;
      }).join("");
    } catch (err) {
      resultsDiv.innerHTML = "<p style='color:#f87171'>Search failed: " + err.message + "</p>";
    }
  });
});