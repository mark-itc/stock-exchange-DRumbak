const stockList = document.getElementById("search-resultslist");
const spinner = document.getElementById("spinner");
let stocksArray = [];

export { getSingleStocks, stockList, spinner };

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
