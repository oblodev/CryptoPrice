const cryptoTableData = document.getElementById("crypto");
//const showMarketCap = document.getElementById("marketcap");
const showMarketCapChange = document.getElementById("marketcap-change");
const theMarketCap = document.getElementById("marketcap-info");

function getCryptoMarketCap() {
  fetch(`https://api.coingecko.com/api/v3/global`)
    .then((response) => response.json())
    .then((data) => {
      const marketCap = data.data.total_market_cap.usd;
      const marketCapChange = data.data.market_cap_change_percentage_24h_usd;

      const formatter = new Intl.NumberFormat("en");
      const formatedMarketCap = formatter.format(marketCap);
      const formatedMarketCapChange = formatter.format(marketCapChange);
      //showMarketCap.textContent = `${formatedMarketCap} T`;
      //showMarketCapChange.textContent = ` ${formatedMarketCapChange}% `;

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
                                <p>A <span class="${colorMC} f-s-20">${formatedMarketCapChange}%</span> change in the last 24 hours</p>
                                </div>
                                `;

      if (formatedMarketCapChange < 0) {
        showMarketCapChange.classList.add("red");
      } else if (formatedMarketCapChange > 0) {
        showMarketCapChange.classList.add("green");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

getCryptoMarketCap();

function getCryptoData() {
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const cryptoData = data;
      //console.log(cryptoData);

      getData(cryptoData);
    })
    .catch((err) => {
      console.error(err);
    });
}

getCryptoData();

function getData(cryptoPriceData) {
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

    const formatter = new Intl.NumberFormat("en");
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
          <td class="table__t-a-r p-16"> $${formattedCryptoPrice}</td>
          <td class="${color1H} table__t-a-r p-16">${values.price_change_percentage_1h_in_currency.toFixed(
      2
    )}%</td>
          <td class="${color24} table__t-a-r p-16">${values.price_change_percentage_24h.toFixed(
      2
    )}%</td>
          <td class="${color7D} table__t-a-r p-16">${values.price_change_percentage_7d_in_currency.toFixed(
      2
    )}%</td>
          <td class="table__t-a-r p-16">$${formattedVolume24}</td>
          <td class="table__t-a-r p-16">$${formattedMarketCap}</td>
        </tr>
        `;
  });
  cryptoTableData.innerHTML = data;
}
