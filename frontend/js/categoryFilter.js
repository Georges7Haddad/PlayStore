window.addEventListener("load", () => {
  document
    .getElementById("filterApplications")
    .addEventListener("click", filterApplications);
  document
    .getElementById("filterMovies")
    .addEventListener("click", filterMovies);
  document.getElementById("filterGames").addEventListener("click", filterGames);
  document.getElementById("filterBooks").addEventListener("click", filterBooks);
});

function filterApplications() {
  items = document.getElementsByClassName("itemType");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.style.display = "";
    if (
      items[i].innerText === "Game" ||
      items[i].innerText === "Movie" ||
      items[i].innerText === "Book"
    )
      items[i].parentElement.style.display = "none";
  }
}

function filterGames() {
  items = document.getElementsByClassName("itemType");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.style.display = "";
    if (
      items[i].innerText === "Application" ||
      items[i].innerText === "Movie" ||
      items[i].innerText === "Book"
    )
      items[i].parentElement.style.display = "none";
  }
}

function filterBooks() {
  items = document.getElementsByClassName("itemType");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.style.display = "";
    if (
      items[i].innerText === "Game" ||
      items[i].innerText === "Movie" ||
      items[i].innerText === "Application"
    )
      items[i].parentElement.style.display = "none";
  }
}

function filterMovies() {
  items = document.getElementsByClassName("itemType");
  for (let i = 0; i < items.length; i++) {
    items[i].parentElement.style.display = "";
    if (
      items[i].innerText === "Game" ||
      items[i].innerText === "Application" ||
      items[i].innerText === "Book"
    ) {
      items[i].parentElement.style.display = "none";
    }
  }
}
