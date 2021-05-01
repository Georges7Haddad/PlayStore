window.onload = () => {
  var ip;
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      ip = data.ip;
    })
    .then(() => {
      fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=9a59371247af4cefa7f1579232f415ba&ip=${ip}`
      )
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("country").innerText = data.country_name;
          document.getElementById("countryFlag").src = data.country_flag;
        });
    });
};
