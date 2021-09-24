const cryptoTableData = document.getElementById("crypto");
const showMarketCap = document.getElementById("marketcap");

function getCryptoLogo() {
  fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info`, {
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": "32170971-f51f-4e5b-9cc3-aabb55b197be",
    },
  })
    .then((response) => response.json())
    .then((data2) => {
      console.log(data2.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

getCryptoLogo();

function getCryptoData() {
  fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": "32170971-f51f-4e5b-9cc3-aabb55b197be",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      cryptoData = data.data;
      console.log(data.data);

      getData(cryptoData);
    })
    .catch((err) => {
      console.error(err);
    });
}

getCryptoData();

function getCryptoMarketCap() {
  fetch(`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`, {
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": "32170971-f51f-4e5b-9cc3-aabb55b197be",
    },
  })
    .then((response) => response.json())
    .then((data1) => {
      const marketCap = data1.data.quote.USD.total_market_cap.toFixed(2);
      const formatter = new Intl.NumberFormat("en");
      const formatedMarketCap = formatter.format(marketCap);
      /*
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      const showCap = numberWithCommas(marketCap);
      */
      showMarketCap.textContent = `${formatedMarketCap}T`;
    })
    .catch((err) => {
      console.error(err);
    });
}

getCryptoMarketCap();

function getData(cryptoPriceData) {
  let data = "";
  cryptoPriceData.map((values) => {
    //console.log(values);
    //console.log(values.quote.USD.price);
    if (values.quote.USD.percent_change_24h < 0) {
      color = "red";
    } else if (values.quote.USD.percent_change_24h > 0) {
      color = "green";
    } else {
      color = "";
    }
    const formatter = new Intl.NumberFormat("en");
    const cryptoPrice = values.quote.USD.price.toFixed(2);
    const marketCap = values.quote.USD.market_cap.toFixed(0);
    const volume24 = values.quote.USD.volume_24h.toFixed(0);
    const formattedCryptoPrice = formatter.format(cryptoPrice);
    const formattedMarketCap = formatter.format(marketCap);
    const formattedVolume24 = formatter.format(volume24);

    data += `
        <tr>
          <th cope="row">${values.cmc_rank} </th>
          <td>${values.name} (${values.symbol})</td>
          <td class="table__t-a-r"> $${formattedCryptoPrice}</td>
          <td class="${color} table__t-a-r">${values.quote.USD.percent_change_24h.toFixed(
      2
    )}%</td>
    <td class="${color} table__t-a-r">${values.quote.USD.percent_change_7d.toFixed(
      2
    )}%</td>
          <td class="table__t-a-r">$${formattedMarketCap}</td>
          <td class="table__t-a-r">$${formattedVolume24}</td>
        </tr>
        `;
  });
  cryptoTableData.innerHTML = data;
}
