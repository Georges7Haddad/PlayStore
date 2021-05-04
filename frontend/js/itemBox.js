var uri = "http://localhost:8080";
window.addEventListener("load", () => {
  let bookmarkIcons = document.getElementsByClassName("bookmark");
  for (let i = 0; i < bookmarkIcons.length; i++) {
    bookmarkIcons[i].addEventListener("click", bookmark);
  }
  let itemTitles = Array.from(document.getElementsByClassName("itemTitle"));
  itemTitles = itemTitles.concat(
    Array.from(document.getElementsByClassName("itemTitleHome"))
  );
  for (let i = 0; i < itemTitles.length; i++) {
    itemTitles[i].parentElement.addEventListener("click", addLastVisited);
  }
});

function bookmark(event) {
  let target = event.target;
  let itemBox = target.parentElement.parentElement;
  let username = document.getElementById("userUsername").className;
  if (target.className === "fa fa-bookmark bookmark") {
    target.className = "fa fa-bookmark-o bookmark";
    fetch(`${uri}/user/${username}/wishlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemBox
          .getElementsByClassName("itemId")[0]
          .innerText.replace(/\s/g, ""),
      }),
    });
  } else {
    target.className = "fa fa-bookmark bookmark";
    fetch(`${uri}/user/${username}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemType: itemBox
          .getElementsByClassName("itemType")[0]
          .innerText.replace(/\s/g, ""),
        id: itemBox
          .getElementsByClassName("itemId")[0]
          .innerText.replace(/\s/g, ""),
      }),
    });
  }
}

function addLastVisited(event) {
  let target = event.target;
  let itemBox = target.parentElement.parentElement;
  let username = document.getElementById("userUsername").className;
  if (username) {
    console.log(username);
    console.log(
      itemBox.getElementsByClassName("itemId")[0].innerText.replace(/\s/g, "")
    );
    console.log(
      itemBox.getElementsByClassName("itemType")[0].innerText.replace(/\s/g, "")
    );
    fetch(`${uri}/user/${username}/last24VisitedItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemType: itemBox
          .getElementsByClassName("itemType")[0]
          .innerText.replace(/\s/g, ""),
        id: itemBox
          .getElementsByClassName("itemId")[0]
          .innerText.replace(/\s/g, ""),
      }),
    });
  }
}
