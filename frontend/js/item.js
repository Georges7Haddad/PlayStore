var uri = "http://localhost:8080";
window.addEventListener("load", () => {
  let likeIcons = document.getElementsByClassName("like");
  for (let i = 0; i < likeIcons.length; i++) {
    likeIcons[i].addEventListener("click", like);
  }
  likeIcons = document.getElementsByClassName("dislike");
  for (let i = 0; i < likeIcons.length; i++) {
    likeIcons[i].addEventListener("click", dislike);
  }
});

function like(event) {
  let target = event.target;
  let review = target.parentElement.parentElement;
  let reviewId = review
    .getElementsByClassName("reviewId")[0]
    .innerText.replace(/\s/g, "");
  target.className = "fa fa-thumbs-up dislike";
  fetch(`${uri}/item/${reviewId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: [],
  });
}
function dislike(event) {
  let target = event.target;
  let review = target.parentElement.parentElement;
  let reviewId = review
    .getElementsByClassName("reviewId")[0]
    .innerText.replace(/\s/g, "");
  target.className = "fa fa-thumbs-up like";
  fetch(`${uri}/item/${reviewId}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: [],
  });
}
