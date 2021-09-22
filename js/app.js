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
    })
    .catch((err) => {
      console.error(err);
    });
}

getCryptoData();

/*
function getData(leagueData) {

  let data = "";
  leagueData.map((values) => {
    if (values.rank == "1") {
      primary = "table-primary";
    } else if (values.rank >= "2" && values.rank <= "4") {
      primary = "table-success";
    } else if (values.rank >= "18" && values.rank <= "20") {
      primary = "table-danger";
    } else if (values.rank == "5") {
      primary = "table-warning";
    } else {
      primary = "";
    }
    data += `
        <tr class=${primary}>
          <th cope="row">${values.rank}</th>
          <td class="logo-width"><img src="${values.team.logo}" /> ${values.team.name} </td>
          <td>${values.all.played}</td>
          <td>${values.all.win}</td>
          <td>${values.all.draw}</td>
          <td>${values.all.lose}</td>
          <td>${values.all.goals.for}:${values.all.goals.against}</td>
          <td>${values.goalsDiff}</td>
          <td>${values.points}</td>
        </tr>
        `;
  });
  ranking.innerHTML = data;
}
*/
