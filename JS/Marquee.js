class Marquee {
  constructor(url, parentHtml) {
    this.url = url;
    this.parentHtml = parentHtml;
  }

  async getTop100NASDAQCompaniesAndChange() {
    try {
      const urlTop100NAS = this.url;
      const response = await fetch(urlTop100NAS);
      const result = await response.json();

      let tickerPriceList = "";
      for (let { symbol: coSymbol, price: coPrice } of result) {
        tickerPriceList += `<span class="me-3">${coSymbol}</span><span class="percentage-change-GREEN me-3">$${coPrice}</span>`;
      }
      this.parentHtml.innerHTML += tickerPriceList;
    } catch {
      console.log("Error");
    }
  }
}

const initializeMarquee = new Marquee(
  `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`,
  document.getElementById("marquee")
);
initializeMarquee.getTop100NASDAQCompaniesAndChange();
