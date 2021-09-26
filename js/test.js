const theGainer = document.getElementById("gainer-wrapper");
const theLoser = document.getElementById("loser-wrapper");

function getTestData() {
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const cryptoData = data;
      //console.log(cryptoData);

      workTestData(cryptoData);
    })
    .catch((err) => {
      console.error(err);
    });
}

getTestData();

function workTestData(testData) {
  const strings = testData.map((values) => {
    //console.log(values);
    //console.log(Object.entries(values));
    const arrValues = Object.entries(values);
    //console.log(arrValues[11][1]);
    const changes24 = [
      arrValues[2][1],
      arrValues[12][1],
      arrValues[3][1],
      arrValues[1][1],
      arrValues[4][1],
    ];
    console.log(arrValues);
    return changes24;
  });

  let newValues = Object.values(strings);
  let maxI = 0;
  let minI = 0;
  console.log(newValues);

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
                          <div id="gainer-logo"><img src="${gainerLogo}" style="width: 52px;"></div>
                          <div id="gainer-name" class="bold gainer-name">${nameGainer} <span class="gray">(${gainerSymbol.toUpperCase()})</span></div>
                          <div id="gainer-price" class="gainer-price"><span class="m-r-40">$${gainerPrice}</span>  <span class="green">${maxI.toFixed(
    2
  )}%</span>   </div>`;
  theLoser.innerHTML = ` <p class="bold">Biggest Loser (24h)</p>
                          <div id="gainer-logo"><img src="${loserLogo}" style="width: 52px;"></div>
                          <div id="gainer-name" class="bold loser-name">${nameLoser} <span class="gray">(${loserSymbol.toUpperCase()})</span></div>
                          <div id="loser-price" class="loser-price"><span class="m-r-40">$${loserPrice}</span>  <span class="red">${minI.toFixed(
    2
  )}% </span>  </div>`;
}
