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
