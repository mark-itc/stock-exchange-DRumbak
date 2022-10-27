const searchBtn = document.getElementById("button-addon2");
searchBtn.addEventListener("click", getStocks);
const stockList = document.getElementById("search-resultslist");
const spinner = document.getElementById("spinner");

async function getStocks() {
  stockList.innerHTML = "";
  spinner.classList.remove("d-none");
  stocksArray = [];
  const searchValue = document.getElementById("search-input").value;
  const fullURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`;
  const response = await fetch(fullURL);
  const result = await response.json();
  getSingleStocks(result);
}
let stocksArray = [];

async function getSingleStocks(stocks) {
  for (let currentStock of stocks) {
    const urlCompanyProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${currentStock.symbol}`;
    const response = await fetch(urlCompanyProfile);
    const result = await response.json();
    stocksArray.push(result);
  }
  spinner.classList.add("d-none");
  buildSearchResults(stocksArray);
}

function buildSearchResults(results) {
  let searchResultList = "";
  for (let searchResultItem of results) {
    const companyImage = searchResultItem.profile.image;
    const companyName = searchResultItem.profile.companyName;
    const companySymbol = searchResultItem.symbol;
    const changeInPriceValue = searchResultItem.profile.changesPercentage;
    searchResultList += `<li class="list-group-item"> <img src="${companyImage}" class="image-gallery" alt=""> <a href="../HTML/company.html?symbol=${companySymbol}" class="company-atag"> ${companyName}</a><span class"me-3">(${companySymbol})(</span><span class="percentage-change">${changeInPriceValue}</span>%)</li>`;
  }
  stockList.innerHTML += searchResultList;

  const priceChanger = document.getElementsByClassName("percentage-change");
  console.log(priceChanger);
  for (let prices of priceChanger) {
    const PriceElemToInt = parseInt(prices.innerHTML);
    if (Math.sign(PriceElemToInt) === 1) {
      prices.classList.remove("percentage-change-RED");
      prices.classList.add("percentage-change-GREEN");
    } else {
      prices.classList.remove("percentage-change-GREEN");
      prices.classList.add("percentage-change-RED");
    }
  }
}
