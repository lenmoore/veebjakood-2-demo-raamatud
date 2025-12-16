const searchForm = document.querySelector("#searchForm")
const searchInput = document.querySelector("#searchInput")
const resultsEl = document.querySelector("#results")

const historyListEl = document.querySelector("#historyList")
const favouritesListEl = document.querySelector("#favouritesList")

const clearHistoryBtn = document.querySelector("#clearHistoryBtn")
const clearFavouritesBtn = document.querySelector("#clearFavouritesBtn")

const STORAGE_KEYS = {
  history: "demo_search_history",
  favourites: "demo_favourites",
}

let lastResults = []



// saving and writing stuff to localStorage

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))   
}

function loadFromStorage(key) {
  const dataStr = localStorage.getItem(key)
  if (dataStr) {
    return JSON.parse(dataStr)
  } else {
    return []
  }
}
function readFromStorage(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}





// API stuff 

async function searchBooks(query) {

  const url = "https://openlibrary.org/search.json?q=" + encodeURIComponent(query);
  console.log("Fetch URL:", url)

  const response = await fetch(url)
  console.log("Response status:", response.status)

  const data = await response.json()
  console.log("Raw data:", data)

  const docs = Array.isArray(data.docs) ? data.docs : []

  const usable = docs.slice(0, 12).map(doc => {
    const title = doc.title || "Pealkiri puudub"
    const author = Array.isArray(doc.author_name) ? doc.author_name[0] : "Autor puudub"
    const year = doc.first_publish_year || "—"
    const id = doc.key || `${title}-${author}-${year}`

    return { id, title, author, year }
  })

  console.log("Usable data:", usable);
}


searchBooks("hobbit");


function renderResults(items) {
  lastResults = items
  resultsEl.innerHTML = ""

  if (items.length === 0) {
    resultsEl.innerHTML = `<p class="small">Tulemusi ei leitud.</p>`
    return
  }

  items.forEach(item => {
    const fav = isFavourite(item.id)

    resultsEl.innerHTML += `
      <div class="card" data-id="${item.id}">
        <h3>${item.title}</h3>
        <p class="meta">${item.author} • ${item.year}</p>
        <div class="row">
          <span class="small">ID: ${item.id}</span>
          <button class="favBtn" data-id="${item.id}">
            ${fav ? "Eemalda lemmikutest" : "Lisa lemmikuks"}
          </button>
        </div>
      </div>
    `
  })
}

async function runSearch(query) {
  const cleaned = query.trim()
  if (!cleaned) return

  addToHistory(cleaned)

  resultsEl.innerHTML = `<p class="small">Laen andmeid...</p>`
  const items = await searchBooks(cleaned)
  renderResults(items)
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  runSearch(searchInput.value)
})

historyListEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".repeatSearchBtn")
  if (!btn) return
  const q = btn.dataset.query
  searchInput.value = q
  runSearch(q)
})

resultsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".favBtn")
  if (!btn) return
  toggleFavouriteById(btn.dataset.id)
})

favouritesListEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".removeFavBtn")
  if (!btn) return
  removeFavourite(btn.dataset.id)
})

clearHistoryBtn.addEventListener("click", () => {
  writeToStorage(STORAGE_KEYS.history, [])
  renderHistory()
})

clearFavouritesBtn.addEventListener("click", () => {
  writeToStorage(STORAGE_KEYS.favourites, [])
  renderFavourites()
  renderResults(lastResults)
})
