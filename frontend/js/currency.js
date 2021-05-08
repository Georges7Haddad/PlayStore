window.addEventListener("load", () => {
  document.getElementById("USD").addEventListener("click", changeToUSD);
  document.getElementById("LBP").addEventListener("click", changeToLBP);
});

function changeToUSD() {
  prices = document.getElementsByClassName("itemPrice");
  for (let i = 0; i < prices.length; i++) {
    let price = prices[i].innerText;
    if (price.includes("$")) break;
    if (price === "Free") continue;
    price = parseInt(price.match(/\d+/)) / 1500;
    prices[i].innerText = "$" + price;
  }
}

function changeToLBP(event) {
  prices = document.getElementsByClassName("itemPrice");
  for (let i = 0; i < prices.length; i++) {
    let price = prices[i].innerText;
    if (price.includes("LBP")) break;
    if (price === "Free") continue;
    price = parseInt(price.match(/\d+/)) * 1500;
    prices[i].innerText = price + "LBP";
  }
}
