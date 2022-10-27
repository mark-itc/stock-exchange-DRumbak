const searchBtn = document.getElementById("button-addon2");
searchBtn.addEventListener("click", getStocks);
const stockList = document.getElementById("search-resultslist");
const spinner = document.getElementById("spinner");

async function getStocks() {
  stockList.innerHTML = "";
  spinner.classList.remove("d-none");
  const searchValue = document.getElementById("search-input").value;
  const baseURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3`;
  const apiSearchQuery = `/search?query=${searchValue}&limit=10&exchange=NASDAQ`;
  const fullURL = baseURL + apiSearchQuery;
  const response = await fetch(fullURL);
  const results = await response.json();
  spinner.classList.add("d-none");
  buildSearchResults(results);
  return results;
}

function buildSearchResults(results) {
  let searchResultList = "";
  for (let searchResultItem of results) {
    const companyName = searchResultItem.name;
    const tickerSymbol = searchResultItem.symbol;
    searchResultList += `<li class="list-group-item">  <a href="../HTML/company.html?symbol=${tickerSymbol}"> ${companyName} (${tickerSymbol})</a></li>`;
  }
  stockList.innerHTML += searchResultList;
}
