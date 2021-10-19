const cryptoTableData = document.getElementById("crypto");
const showMarketCapChange = document.getElementById("marketcap-change");
const theMarketCap = document.getElementById("marketcap-info");
const euros = document.getElementById("euro");
const usds = document.getElementById("usd");
const theGainer = document.getElementById("gainer-wrapper");
const theLoser = document.getElementById("loser-wrapper");
const usdollar = "usd";
const eureur = "eur";
const euro = 0.86;
const de = "de";
const en = "en";
const euroSign = "€";
const dollarSign = "$";

function getData(cryptoPriceData, formatCurrency, sign) {
  let data = "";
  cryptoPriceData.map((values) => {
    //console.log(values);

    if (values.price_change_percentage_24h < 0) {
      color24 = "red";
    } else if (values.price_change_percentage_24h > 0) {
      color24 = "green";
    } else {
      color24 = "";
    }

    if (values.price_change_percentage_1h_in_currency < 0) {
      color1H = "red";
    } else if (values.price_change_percentage_1h_in_currency > 0) {
      color1H = "green";
    } else {
      color1H = "";
    }

    if (values.price_change_percentage_7d_in_currency < 0) {
      color7D = "red";
    } else if (values.price_change_percentage_7d_in_currency > 0) {
      color7D = "green";
    } else {
      color7D = "";
    }

    const formatter = new Intl.NumberFormat(formatCurrency);
    const cryptoPrice = values.current_price;
    const marketCap = values.market_cap;
    const volume24 = values.total_volume;
    const formattedCryptoPrice = formatter.format(cryptoPrice);
    const formattedMarketCap = formatter.format(marketCap);
    const formattedVolume24 = formatter.format(volume24);

    const cryptoLogo = values.image;

    data += `
    <tr>
      <th cope="row" class="p-16 bold">${values.market_cap_rank} </th>
      <td class="p-16 bold"> <img src="${cryptoLogo}" class="img-size"> ${
      values.name
    } (${values.symbol.toUpperCase()})</td>
      <td class="table__t-a-r p-16"> ${sign}${formattedCryptoPrice}</td>
      <td class="${color1H} table__t-a-r p-16 hide">${values.price_change_percentage_1h_in_currency.toFixed(
      2
    )}%</td>
      <td class="${color24} table__t-a-r p-16">${values.price_change_percentage_24h.toFixed(
      2
    )}%</td>
      <td class="${color7D} table__t-a-r p-16 hide">${values.price_change_percentage_7d_in_currency.toFixed(
      2
    )}%</td>
      <td class="table__t-a-r p-16 hide">${sign}${formattedVolume24}</td>
      <td class="table__t-a-r p-16 hide">${sign}${formattedMarketCap}</td>
    </tr>
    `;
  });
  cryptoTableData.innerHTML = data;
}

function workStatData(gainerLoserData, currSign) {
  console.log(gainerLoserData);
  const strings = gainerLoserData.map((values) => {
    //console.log(values);

    const arrValues = Object.entries(values);
    //console.log(arrValues);
    const changes24 = [
      arrValues[2][1],
      arrValues[12][1],
      arrValues[3][1],
      arrValues[1][1],
      arrValues[4][1],
    ];
    //console.log(arrValues);
    return changes24;
  });

  let newValues = Object.values(strings);
  let maxI = 0;
  let minI = 0;
  console.log(currSign);
  //console.log(currency);

  for (let i = 0; i < newValues.length; i++) {
    if (newValues[i][1] > maxI) {
      maxI = newValues[i][1];
      gainerPrice = newValues[i][4];
      nameGainer = newValues[i][0];
      gainerLogo = newValues[i][2];
      gainerSymbol = newValues[i][3];
    } else if (newValues[i][1] < minI) {
      minI = newValues[i][1];
      loserPrice = newValues[i][4];
      nameLoser = newValues[i][0];
      loserLogo = newValues[i][2];
      loserSymbol = newValues[i][3];
    }
  }

  theGainer.innerHTML = ` <p class="bold">Biggest Gainer (24h)</p>
                        <div id="gainer-logo">
                        </div>
                        <div id="gainer-name" class="bold gainer-name"><img src="${gainerLogo}">${nameGainer} <span class="gray">(${gainerSymbol.toUpperCase()})</span>
                        </div>
                        <div id="gainer-price" class="gainer-price"><span class="m-r-40">${currSign}${gainerPrice}</span>  <span class="green bold">${maxI.toFixed(
    2
  )}%</span>   </div>`;
  theLoser.innerHTML = ` <p class="bold">Biggest Loser (24h)</p>
                        <div id="gainer-logo"></div>
                        <div id="gainer-name" class="bold loser-name"><img src="${loserLogo}">${nameLoser} <span class="gray">(${loserSymbol.toUpperCase()})</span></div>
                        <div id="loser-price" class="loser-price"><span class="m-r-40">${currSign}${loserPrice}</span>  <span class="red bold">${minI.toFixed(
    2
  )}% </span>  </div>`;
}

function getStatData(currency, sign) {
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const cryptoData = data;
      //console.log(cryptoData);

      workStatData(cryptoData, sign);
    })
    .catch((err) => {
      console.error(err);
    });
}

function newStart() {
  function getCryptoMarketCapUSD() {
    fetch(`https://api.coingecko.com/api/v3/global`)
      .then((response) => response.json())
      .then((data) => {
        const marketCap = data.data.total_market_cap.usd;
        const marketCapChange = data.data.market_cap_change_percentage_24h_usd;

        const formatter = new Intl.NumberFormat("en");
        const formatedMarketCap = formatter.format(marketCap);
        const formatedMarketCapChange = formatter.format(marketCapChange);

        if (formatedMarketCapChange < 0) {
          colorMC = "red";
        } else if (formatedMarketCapChange > 0) {
          colorMC = "green";
        } else {
          colorMC = "";
        }

        theMarketCap.innerHTML = `<p class="bold">Global Crypto Marketcap</p>
                                <div class="blue bold p-t-10 f-s-20"><p>${formatedMarketCap} T</p></div>
                                <div class="p-t-10">
                                <p>A <span class="${colorMC} f-s-20 bold">${formatedMarketCapChange}%</span> change in the last 24 hours</p>
                                </div>
                                `;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCryptoMarketCapUSD();

  function getCryptoDataUSD() {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const cryptoDataUSD = data;

        getData(cryptoDataUSD, en, dollarSign);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCryptoDataUSD();

  //startGainerLoser();
  getStatData(usdollar, dollarSign);
  setInterval(getStatData, 600000);
}

newStart();
const loadUSD = setInterval(newStart, 20000);

euros.addEventListener("click", function () {
  clearInterval(loadUSD);
  console.log("stop interval");

  getStatData(eureur, euroSign);

  function newEuros() {
    function getCryptoMarketCapEUR() {
      fetch(`https://api.coingecko.com/api/v3/global`)
        .then((response) => response.json())
        .then((data) => {
          const marketCap = data.data.total_market_cap.eur;

          const marketCapChange =
            data.data.market_cap_change_percentage_24h_usd * euro;

          const formatter = new Intl.NumberFormat(de);
          const formattedMarketCap = formatter.format(marketCap);
          const formattedMarketCapChange = formatter.format(marketCapChange);

          if (marketCapChange < 0) {
            colorMC = "red";
          } else if (marketCapChange > 0) {
            colorMC = "green";
          } else {
            colorMC = "";
          }

          theMarketCap.innerHTML = `<p class="bold">Global Crypto Marketcap</p>
                                  <div class="blue bold p-t-10 f-s-20"><p>${formattedMarketCap} T</p></div>
                                  <div class="p-t-10">
                                  <p>A <span class="${colorMC} f-s-20 bold">${formattedMarketCapChange}%</span> change in the last 24 hours</p>
                                  </div>
                                  `;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    getCryptoMarketCapEUR();

    function getCryptoDataEUR() {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          const cryptoDataEUR = data;

          getData(cryptoDataEUR, de, euroSign);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    getCryptoDataEUR();
  }

  // Get Euro Crypto Prices for Table and Market Cap
  newEuros();
  // Get Stats for Gainer and Loser with Euros
  //getStatData(eureur, euroSign);
  const loadEuros = setInterval(newEuros, 20000);

  // Eventlistner on USD Button to change to USD prices
  usds.addEventListener("click", function () {
    clearInterval(loadEuros);
    newStart();
    setInterval(newStart, 20000);
  });
});

// Sticky Nav
const header = document.querySelector(".header");
const obsCrypto = document.querySelector(".obsCrypto");
//const navHeight = obsCrypto.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) header.classList.add("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(obsCrypto);
