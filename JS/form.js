import { getSingleStocks, stockList, spinner } from "./results.js";

const searchBtn = document.getElementById("button-addon2");

class SearchForm {
  constructor() {}

  async getStocks() {
    try {
      stockList.innerHTML = "";
      spinner.classList.remove("d-none");
      const searchValue = document.getElementById("search-input").value;
      const fullURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`;
      const response = await fetch(fullURL);
      const result = await response.json();
      getSingleStocks(result);
    } catch {
      console.log("Error");
    }
  }
}

const initializeSearchInstance = new SearchForm();

searchBtn.addEventListener("click", initializeSearchInstance.getStocks);

//Milestone 7 incomplete.
