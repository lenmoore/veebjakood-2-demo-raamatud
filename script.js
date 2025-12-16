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
