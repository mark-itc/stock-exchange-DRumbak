window.onload = () => {
  const companyImage = document.getElementById("companyImage");
  const companyName = document.getElementById("companyName");
  const companyDescription = document.getElementById("companyDescription");
  const companyLink = document.getElementById("companyLink");
  const companyPrice = document.getElementById("price");
  const companyChangesInPrice = document.getElementById("changesInPrice");

  let params = new URL(document.location).searchParams;
  let symbol = params.get("symbol");

  const urlCompanyProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
  getCompanyProfile(urlCompanyProfile);
  const urlPriceHistory = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;

  async function getCompanyProfile(url) {
    const response = await fetch(url);
    const result = await response.json();
    populateCompanyProfile(result);
    getStockPriceHistory(urlPriceHistory);
  }

  async function getStockPriceHistory(url) {
    spinner.classList.remove("d-none");
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.historical);
    const stockPriceHistArray = result.historical;

    let dArray = [];
    let cArray = [];

    for (let i = 1; i < stockPriceHistArray.length; i += 365) {
      dArray.push(stockPriceHistArray[i].date);
      cArray.push(stockPriceHistArray[i].close);
    }

    dArray = dArray.reverse();
    cArray = cArray.reverse();

    spinner.classList.add("d-none");
    buildStockPriceHistoryChart(dArray, cArray);
  }

  function populateCompanyProfile(result) {
    const changeInPriceValue = parseInt(result.profile.changesPercentage);
    companyImage.src = result.profile.image;
    companyName.innerHTML = result.profile.companyName;
    companyDescription.innerHTML = result.profile.description;
    companyLink.href = result.profile.website;
    companyPrice.innerHTML = "Price: $" + result.profile.price;
    companyChangesInPrice.innerHTML = Math.round(changeInPriceValue) + "%";

    if (Math.sign(changeInPriceValue) === 1) {
      companyChangesInPrice.style.color = "green";
    } else {
      companyChangesInPrice.style.color = "red";
    }
  }

  function buildStockPriceHistoryChart(dArray, cArray) {
    let myChart = document.getElementById("myChart").getContext("2d");

    let historicalStockPrices = new Chart(myChart, {
      type: "line",
      data: {
        labels: dArray,
        datasets: [
          {
            label: "Stock Price History",
            data: cArray,
            backgroundColor: "#FF2F7B",
            fill: true,
          },
        ],
      },
    });
  }
};
