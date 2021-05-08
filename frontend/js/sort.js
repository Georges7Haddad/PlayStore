window.addEventListener("load", () => {
  if (document.getElementById("sortDiv")) {
    let sortButtons = document
      .getElementById("sortDiv")
      .getElementsByTagName("a");
    sortButtons[0].addEventListener("click", sortByRating);
    sortButtons[1].addEventListener("click", sortByTopSelling);
    sortButtons[2].addEventListener("click", sortByRelease);
    sortButtons[3].addEventListener("click", sortByPrice);
  }
  if (document.getElementById("filterDiv")) {
    let sortButtons = document
      .getElementById("filterDiv")
      .getElementsByTagName("a");
    sortButtons[0].addEventListener("click", test);
    sortButtons[1].addEventListener("click", sortByTopSelling);
    sortButtons[2].addEventListener("click", sortByRelease);
    sortButtons[3].addEventListener("click", sortByPrice);
  }
});



function sortByRating() {
  sort("itemRating");
}
function sortByTopSelling() {
  sort("itemCopies");
}
function sortByRelease() {
  sort("itemDate");
}
function sortByPrice() {
  sort("itemPrice");
}
function sort(type) {
  let items = document.getElementsByClassName("itemBox");
  let itemsRating = document.getElementsByClassName(type);
  let results = [];
  if (type === "itemPrice") {
    for (let i = 0; i < items.length; i++) {
      price = itemsRating[i].innerHTML.includes("Free")
        ? 0
        : parseFloat(itemsRating[i].innerHTML);
      results.push([items[i], price]);
    }
    results = sortArrayOfArrays(results, true);
  } else if (type === "itemDate") {
    for (let i = 0; i < items.length; i++) {
      results.push([items[i], Date.parse(itemsRating[i].innerHTML)]);
    }
    results = sortArrayOfArrays(results, false);
  } else {
    for (let i = 0; i < items.length; i++) {
      results.push([items[i], parseFloat(itemsRating[i].innerHTML)]);
    }
    results = sortArrayOfArrays(results, false);
  }
  for (let i = 0; i < items.length; i++) {
    results[i][0].parentNode.insertBefore(
      results[i][0],
      results[i][0].parentNode.children[i]
    );
  }
  results = sortArrayOfArrays(results, false);
}

function sortArrayOfArrays(results, increasing) {
  if (increasing) {
    results.sort(function (a, b) {
      return a[1] - b[1];
    });
  } else {
    results.sort(function (a, b) {
      return b[1] - a[1];
    });
  }
  return results;
}