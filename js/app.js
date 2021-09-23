const cryptoTableData = document.getElementById("crypto");

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
      console.log(cryptoData);
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
    console.log(values);

    data += `
        <tr>
          <th cope="row">${values.cmc_rank} </th>
          <td>${values.name} (${values.symbol})</td>
          <td>${values.quote.USD.price} $</td>
          <td>${values.quote.USD.percent_change_24h} $</td>
          <td>${values.quote.USD.market_cap} $</td>
          <td>${values.quote.USD.volume_24h} $</td>
        </tr>
        `;
  });
  cryptoTableData.innerHTML = data;
}
