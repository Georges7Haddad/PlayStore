var uri = "http://localhost:8080";
window.addEventListener("load", () => {
  let bookmarkIcons = document.getElementsByClassName("bookmark");
  for (let i = 0; i < bookmarkIcons.length; i++) {
    bookmarkIcons[i].addEventListener("click", bookmark);
  }
});

function bookmark(event) {
  let target = event.target;
  let itemBox = target.parentElement.parentElement;
  if (target.className === "fa fa-bookmark bookmark") {
    target.className = "fa fa-bookmark-o bookmark";
    fetch(`${uri}/user/Bleast/wishlist`, {
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
    fetch(`${uri}/user/Bleast/wishlist`, {
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
