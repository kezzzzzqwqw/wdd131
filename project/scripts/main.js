/* ============================================================
   COSMIC HORIZONS – main.js
   Author: Kezia Aparri  |  WDD 131
   Features: DOM interaction, events, conditionals,
             objects/arrays/array methods, template literals,
             localStorage, multiple functions
   ============================================================ */

"use strict";

/* ─── 1. NAV HAMBURGER ─────────────────────────────────────── */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav when a link is clicked (mobile)
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Set active link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.querySelectorAll("a").forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ─── 2. SPACE FACTS TICKER ────────────────────────────────── */
const spaceFacts = [
  "The Sun accounts for 99.86% of the total mass of our solar system.",
  "One million Earths could fit inside the Sun.",
  "A year on Mercury is just 88 Earth days.",
  "The Great Red Spot on Jupiter has been raging for over 350 years.",
  "Neutron stars can spin at 600 rotations per second.",
  "The Milky Way contains an estimated 100–400 billion stars.",
  "Light takes about 8 minutes and 20 seconds to travel from the Sun to Earth.",
  "The largest known star, UY Scuti, is about 1,700 times wider than the Sun.",
  "There are more stars in the universe than grains of sand on all Earth's beaches.",
  "The Voyager 1 spacecraft, launched in 1977, is now in interstellar space.",
];

let currentFactIndex = 0;

function showFact(index) {
  const display = document.getElementById("fact-display");
  const counter = document.getElementById("fact-counter");
  if (!display) return;

  display.style.opacity = "0";
  setTimeout(() => {
    display.textContent = `✦ ${spaceFacts[index]}`;
    display.style.opacity = "1";
    if (counter) counter.textContent = `${index + 1} / ${spaceFacts.length}`;
  }, 300);
}

function nextFact() {
  currentFactIndex = (currentFactIndex + 1) % spaceFacts.length;
  showFact(currentFactIndex);
}

function prevFact() {
  currentFactIndex = (currentFactIndex - 1 + spaceFacts.length) % spaceFacts.length;
  showFact(currentFactIndex);
}

function initFactTicker() {
  const wrap = document.querySelector(".fact-ticker-wrap");
  if (!wrap) return;

  showFact(currentFactIndex);

  const nextBtn = document.getElementById("fact-next");
  const prevBtn = document.getElementById("fact-prev");
  if (nextBtn) nextBtn.addEventListener("click", nextFact);
  if (prevBtn) prevBtn.addEventListener("click", prevFact);

  // Auto-advance every 8 seconds
  setInterval(nextFact, 8000);
}

/* ─── 3. NEWSLETTER FORM ────────────────────────────────────── */
function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput  = form.querySelector("#sub-name");
    const emailInput = form.querySelector("#sub-email");
    const feedback   = document.getElementById("form-feedback");

    const name  = nameInput  ? nameInput.value.trim()  : "";
    const email = emailInput ? emailInput.value.trim() : "";

    if (!name || !email) {
      feedback.textContent = "Please fill in both fields.";
      feedback.style.color = "#eb5757";
      return;
    }

    // Save to localStorage
    const subscribers = getSubscribers();
    const alreadySubscribed = subscribers.some(s => s.email === email);

    if (alreadySubscribed) {
      feedback.textContent = `You are already subscribed, ${name}!`;
      feedback.style.color = "var(--color-gold)";
    } else {
      subscribers.push({ name, email, date: new Date().toLocaleDateString() });
      localStorage.setItem("ch_subscribers", JSON.stringify(subscribers));
      feedback.textContent = `Thanks, ${name}! You're now signed up for cosmic updates.`;
      feedback.style.color = "var(--color-gold)";
      form.reset();
    }
  });
}

function getSubscribers() {
  try {
    return JSON.parse(localStorage.getItem("ch_subscribers")) || [];
  } catch {
    return [];
  }
}

/* ─── 4. EXPLORE PAGE – FILTER ─────────────────────────────── */
const spaceObjects = [
  {
    id: 1, category: "planet", name: "Jupiter", icon: "🪐",
    desc: "The largest planet in the solar system, a gas giant with a Great Red Spot storm larger than Earth.",
    stats: [
      { label: "Type",       val: "Gas Giant"     },
      { label: "Moons",      val: "95"            },
      { label: "Diameter",   val: "139,820 km"    },
      { label: "Orbit",      val: "11.9 years"    },
    ],
  },
  {
    id: 2, category: "planet", name: "Saturn", icon: "🪐",
    desc: "Known for its stunning ring system, Saturn is a gas giant composed mainly of hydrogen and helium.",
    stats: [
      { label: "Type",       val: "Gas Giant"  },
      { label: "Moons",      val: "146"        },
      { label: "Diameter",   val: "116,460 km" },
      { label: "Orbit",      val: "29.5 years" },
    ],
  },
  {
    id: 3, category: "planet", name: "Mars", icon: "🔴",
    desc: "The Red Planet — a terrestrial world with the tallest volcano and deepest canyon in the solar system.",
    stats: [
      { label: "Type",       val: "Terrestrial" },
      { label: "Moons",      val: "2"           },
      { label: "Diameter",   val: "6,779 km"    },
      { label: "Orbit",      val: "687 days"    },
    ],
  },
  {
    id: 4, category: "planet", name: "Neptune", icon: "🔵",
    desc: "The farthest planet from the Sun, an ice giant with supersonic winds reaching 2,100 km/h.",
    stats: [
      { label: "Type",       val: "Ice Giant"  },
      { label: "Moons",      val: "16"         },
      { label: "Diameter",   val: "49,244 km"  },
      { label: "Orbit",      val: "165 years"  },
    ],
  },
  {
    id: 5, category: "star", name: "The Sun", icon: "☀️",
    desc: "Our home star — a G-type main-sequence star at the center of the solar system, about 4.6 billion years old.",
    stats: [
      { label: "Type",       val: "G-type star" },
      { label: "Radius",     val: "696,340 km"  },
      { label: "Temp",       val: "5,778 K"     },
      { label: "Age",        val: "4.6 Gyr"     },
    ],
  },
  {
    id: 6, category: "star", name: "Betelgeuse", icon: "⭐",
    desc: "A red supergiant in Orion, one of the largest stars visible to the naked eye, expected to go supernova.",
    stats: [
      { label: "Type",       val: "Red Supergiant" },
      { label: "Distance",   val: "700 ly"          },
      { label: "Radius",     val: "~1,400 R☉"       },
      { label: "Mass",       val: "~20 M☉"          },
    ],
  },
  {
    id: 7, category: "star", name: "Sirius", icon: "✨",
    desc: "The brightest star in Earth's night sky, located in Canis Major at only 8.6 light-years away.",
    stats: [
      { label: "Type",       val: "A-type star"  },
      { label: "Distance",   val: "8.6 ly"       },
      { label: "Luminosity", val: "25× Sun"      },
      { label: "System",     val: "Binary"       },
    ],
  },
  {
    id: 8, category: "galaxy", name: "Milky Way", icon: "🌌",
    desc: "Our home galaxy — a barred spiral galaxy containing our solar system among 200–400 billion stars.",
    stats: [
      { label: "Type",     val: "Barred Spiral" },
      { label: "Diameter", val: "~100,000 ly"   },
      { label: "Stars",    val: "200–400 billion"},
      { label: "Age",      val: "~13.6 Gyr"     },
    ],
  },
  {
    id: 9, category: "galaxy", name: "Andromeda", icon: "🌀",
    desc: "The nearest large galaxy to the Milky Way, on a collision course with us in about 4.5 billion years.",
    stats: [
      { label: "Type",     val: "Spiral"        },
      { label: "Distance", val: "2.537 Mly"     },
      { label: "Stars",    val: "~1 trillion"   },
      { label: "Diameter", val: "220,000 ly"    },
    ],
  },
  {
    id: 10, category: "exploration", name: "Apollo 11", icon: "🚀",
    desc: "The 1969 NASA mission that landed the first humans on the Moon — Neil Armstrong and Buzz Aldrin.",
    stats: [
      { label: "Agency",  val: "NASA"        },
      { label: "Date",    val: "July 20, 1969" },
      { label: "Crew",    val: "3 astronauts" },
      { label: "Landing", val: "Sea of Tranquility" },
    ],
  },
  {
    id: 11, category: "exploration", name: "James Webb Telescope", icon: "🔭",
    desc: "Launched in 2021, JWST observes the universe in infrared, revealing galaxies formed just after the Big Bang.",
    stats: [
      { label: "Agency",  val: "NASA/ESA/CSA" },
      { label: "Launch",  val: "Dec 25, 2021"  },
      { label: "Orbit",   val: "L2 Lagrange"   },
      { label: "Mirror",  val: "6.5 m"         },
    ],
  },
  {
    id: 12, category: "exploration", name: "Voyager 1", icon: "🛸",
    desc: "Launched in 1977, it is the farthest human-made object, now traveling through interstellar space.",
    stats: [
      { label: "Agency",   val: "NASA"            },
      { label: "Launch",   val: "Sep 5, 1977"     },
      { label: "Distance", val: ">23 billion km"  },
      { label: "Status",   val: "Interstellar"    },
    ],
  },
];

function buildObjectCard(obj) {
  const statsHTML = obj.stats.map(s =>
    `<li><strong>${s.label}</strong>${s.val}</li>`
  ).join("");

  return `
    <article class="object-card" data-category="${obj.category}" data-id="${obj.id}">
      <div class="object-card-header">
        <span class="object-icon" aria-hidden="true">${obj.icon}</span>
        <div>
          <h3>${obj.name}</h3>
          <span class="category-tag">${obj.category}</span>
        </div>
      </div>
      <div class="object-card-body">
        <p>${obj.desc}</p>
        <ul class="object-stat-list" aria-label="Stats for ${obj.name}">
          ${statsHTML}
        </ul>
      </div>
    </article>`;
}

function renderObjects(filter = "all") {
  const grid = document.getElementById("objects-grid");
  if (!grid) return;

  const filtered = filter === "all"
    ? spaceObjects
    : spaceObjects.filter(o => o.category === filter);

  grid.innerHTML = filtered.map(buildObjectCard).join("");
}

function initExploreFilter() {
  const filterBar = document.querySelector(".filter-bar");
  if (!filterBar) return;

  // Read URL query param for deep-linking from home page cards
  const params = new URLSearchParams(window.location.search);
  const initialFilter = params.get("filter") || "all";

  // Set active button to match initial filter
  filterBar.querySelectorAll(".filter-btn").forEach(btn => {
    const isActive = btn.dataset.filter === initialFilter;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  renderObjects(initialFilter);

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filterBar.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    const filter = btn.dataset.filter;
    renderObjects(filter);
  });
}

/* ─── 5. QUIZ ───────────────────────────────────────────────── */
const quizQuestions = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correct: 1,
  },
  {
    question: "How long does light from the Sun take to reach Earth?",
    options: ["30 seconds", "2 minutes", "About 8 minutes", "1 hour"],
    correct: 2,
  },
  {
    question: "Which spacecraft was the first to land humans on the Moon?",
    options: ["Apollo 13", "Gemini 7", "Apollo 11", "Saturn V"],
    correct: 2,
  },
  {
    question: "What type of star is the Sun?",
    options: ["Red dwarf", "Blue giant", "G-type main-sequence", "White dwarf"],
    correct: 2,
  },
  {
    question: "Approximately how many stars does the Milky Way contain?",
    options: ["1 billion", "50 billion", "200–400 billion", "Over 1 trillion"],
    correct: 2,
  },
  {
    question: "Which planet has the most moons in our solar system?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1,
  },
  {
    question: "What does 'JWST' stand for?",
    options: [
      "James Webb Space Telescope",
      "Jupiter Wide-Scan Telescope",
      "Joint Worldwide Space Tracker",
      "Joint Webb Star Telescope",
    ],
    correct: 0,
  },
  {
    question: "Which star is the brightest in Earth's night sky?",
    options: ["Betelgeuse", "Polaris", "Sirius", "Vega"],
    correct: 2,
  },
];

let quizState = {
  currentQ: 0,
  score: 0,
  answered: false,
};

function renderQuestion() {
  const q = quizQuestions[quizState.currentQ];
  const qEl     = document.getElementById("quiz-question");
  const optWrap = document.getElementById("quiz-options");
  const numEl   = document.getElementById("quiz-question-num");
  const feedback = document.getElementById("quiz-feedback");
  const bar     = document.getElementById("quiz-progress-bar");

  if (!qEl) return;

  quizState.answered = false;
  feedback.textContent = "";
  feedback.style.color = "";

  const progress = (quizState.currentQ / quizQuestions.length) * 100;
  bar.style.width = `${progress}%`;
  numEl.textContent = `Question ${quizState.currentQ + 1} of ${quizQuestions.length}`;
  qEl.textContent = q.question;

  optWrap.innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" data-index="${i}">${opt}</button>`
  ).join("");

  optWrap.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", handleAnswer);
  });

  updateScoreDisplay();
}

function handleAnswer(e) {
  if (quizState.answered) return;
  quizState.answered = true;

  const chosen = parseInt(e.currentTarget.dataset.index, 10);
  const correct = quizQuestions[quizState.currentQ].correct;
  const feedback = document.getElementById("quiz-feedback");
  const opts = document.querySelectorAll(".quiz-option");

  opts.forEach(btn => btn.disabled = true);

  if (chosen === correct) {
    quizState.score += 1;
    e.currentTarget.classList.add("correct");
    feedback.textContent = "✓ Correct! Well done.";
    feedback.style.color = "#6fcf97";
  } else {
    e.currentTarget.classList.add("incorrect");
    opts[correct].classList.add("correct");
    feedback.textContent = `✗ Not quite. The answer is: "${quizQuestions[quizState.currentQ].options[correct]}"`;
    feedback.style.color = "#eb5757";
  }

  updateScoreDisplay();
}

function updateScoreDisplay() {
  const el = document.getElementById("quiz-score-display");
  if (el) el.textContent = `Score: ${quizState.score} / ${quizQuestions.length}`;
}

function nextQuestion() {
  if (!quizState.answered) return;
  quizState.currentQ += 1;

  if (quizState.currentQ >= quizQuestions.length) {
    showQuizResult();
  } else {
    renderQuestion();
  }
}

function showQuizResult() {
  const quizMain = document.getElementById("quiz-main");
  const resultEl = document.getElementById("quiz-result");
  const scoreEl  = document.getElementById("result-score");
  const msgEl    = document.getElementById("result-msg");
  const bar      = document.getElementById("quiz-progress-bar");

  if (!resultEl) return;

  bar.style.width = "100%";
  if (quizMain) quizMain.hidden = true;
  resultEl.hidden = false;

  const pct = Math.round((quizState.score / quizQuestions.length) * 100);
  scoreEl.textContent = `${quizState.score} / ${quizQuestions.length}`;

  let msg;
  if (pct === 100) {
    msg = "Perfect score! You are a true cosmic explorer. 🌌";
  } else if (pct >= 75) {
    msg = "Great work! The universe holds few secrets from you.";
  } else if (pct >= 50) {
    msg = "Good effort! Keep exploring and you'll ace it next time.";
  } else {
    msg = "Keep studying the stars — every journey begins somewhere!";
  }
  msgEl.textContent = msg;

  // Save to localStorage
  saveQuizResult(quizState.score, quizQuestions.length);
  renderQuizHistory();
}

function saveQuizResult(score, total) {
  const history = getQuizHistory();
  const entry = {
    score,
    total,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  history.unshift(entry);
  const trimmed = history.slice(0, 5); // keep last 5
  localStorage.setItem("ch_quiz_history", JSON.stringify(trimmed));
}

function getQuizHistory() {
  try {
    return JSON.parse(localStorage.getItem("ch_quiz_history")) || [];
  } catch {
    return [];
  }
}

function renderQuizHistory() {
  const listEl = document.getElementById("history-list");
  if (!listEl) return;

  const history = getQuizHistory();
  if (history.length === 0) {
    listEl.innerHTML = `<li style="color:var(--color-light-accent);font-style:italic">No attempts yet.</li>`;
    return;
  }

  listEl.innerHTML = history.map((h, i) =>
    `<li>
      <span>${i === 0 ? "Latest" : h.date} — ${h.time}</span>
      <span class="hist-score">${h.score}/${h.total}</span>
    </li>`
  ).join("");
}

function resetQuiz() {
  quizState = { currentQ: 0, score: 0, answered: false };
  const quizMain = document.getElementById("quiz-main");
  const resultEl = document.getElementById("quiz-result");
  if (quizMain) quizMain.hidden = false;
  if (resultEl) resultEl.hidden = true;
  renderQuestion();
}

function initQuiz() {
  if (!document.getElementById("quiz-question")) return;

  renderQuestion();
  renderQuizHistory();

  const nextBtn  = document.getElementById("quiz-next");
  const resetBtn = document.getElementById("quiz-reset");
  const retryBtn = document.getElementById("quiz-retry");

  if (nextBtn)  nextBtn.addEventListener("click",  nextQuestion);
  if (resetBtn) resetBtn.addEventListener("click",  resetQuiz);
  if (retryBtn) retryBtn.addEventListener("click",  resetQuiz);
}

/* ─── 6. LAZY LOAD IMAGES ──────────────────────────────────── */
function initLazyLoad() {
  const lazyImgs = document.querySelectorAll("img[loading='lazy']");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => observer.observe(img));
  }
}

/* ─── 7. CURRENT YEAR IN FOOTER ────────────────────────────── */
function setFooterYear() {
  document.querySelectorAll(".footer-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ─── INIT ──────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFactTicker();
  initNewsletterForm();
  initExploreFilter();
  initQuiz();
  initLazyLoad();
  setFooterYear();
});