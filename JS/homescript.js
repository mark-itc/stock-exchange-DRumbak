const searchBtn = document.getElementById("button-addon2");
searchBtn.addEventListener("click", getStocks);
const stockList = document.getElementById("search-resultslist");
const spinner = document.getElementById("spinner");
const marquee = document.getElementById("marquee");
let stocksArray = [];

async function getStocks() {
  try {
    stockList.innerHTML = "";
    spinner.classList.remove("d-none");
    stocksArray = [];
    const searchValue = document.getElementById("search-input").value;
    const fullURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`;
    const response = await fetch(fullURL);
    const result = await response.json();
    getSingleStocks(result);
  } catch {
    console.log("Error");
  }
}

async function getSingleStocks(stocks) {
  try {
    for (let currentStock of stocks) {
      const urlCompanyProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${currentStock.symbol}`;
      const response = await fetch(urlCompanyProfile);
      const result = await response.json();
      stocksArray.push(result);
    }
    spinner.classList.add("d-none");
    buildSearchResults(stocksArray);
  } catch {
    console.log("Error");
  }
}

function buildSearchResults(results) {
  let searchResultList = "";

  for (let {
    symbol: coSymbol,
    profile: { image },
    profile: { companyName },
    profile: { changesPercentage },
  } of results) {
    searchResultList += `<li class="list-group-item"> <img src="${image}" class="image-gallery" alt=""> <a href="../HTML/company.html?symbol=${coSymbol}" class="company-atag"> ${companyName}</a><span class"me-3">(${coSymbol})(</span><span class="percentage-change">${changesPercentage}</span>%)</li>`;
  }
  stockList.innerHTML += searchResultList;

  const priceChanger = document.getElementsByClassName("percentage-change");
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

async function getTop100NASDAQCompaniesAndChange() {
  try {
    const urlTop100NAS = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`;
    const response = await fetch(urlTop100NAS);
    const result = await response.json();

    const companyNameArray = [];
    const companyPriceArray = [];

    let tickerPriceList = "";
    for (let { symbol: coSymbol, price: coPrice } of result) {
      tickerPriceList += `<span class="me-3">${coSymbol}</span><span class="percentage-change-GREEN me-3">$${coPrice}</span>`;
    }
    marquee.innerHTML += tickerPriceList;
  } catch {
    console.log("Error");
  }
}

getTop100NASDAQCompaniesAndChange();
