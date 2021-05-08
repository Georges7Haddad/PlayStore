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
  deleteIcons = document.getElementsByClassName("fa-trash");
  for (let i = 0; i < deleteIcons.length; i++) {
    deleteIcons[i].addEventListener("click", deleteReview);
  }
  if (document.getElementById("addReviewButton"))
    document
      .getElementById("addReviewButton")
      .addEventListener("click", addReview);
});

function like(event) {
  let target = event.target;
  let review = target.parentElement.parentElement.parentElement;
  let reviewLikes = review.getElementsByClassName("reviewLikes")[0];
  reviewLikes.innerText = parseInt(reviewLikes.innerText) + 1;
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
  let review = target.parentElement.parentElement.parentElement;
  let reviewLikes = review.getElementsByClassName("reviewLikes")[0];
  reviewLikes.innerText = parseInt(reviewLikes.innerText) - 1;
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

function addReview() {
  let ratingInput = document.getElementById("ratingInput").value;
  document.getElementById("ratingInput").value = "";
  let reviewTextArea = document.getElementById("reviewTextArea").value;
  document.getElementById("reviewTextArea").value = "";
  let itemId = window.location.href.split("itemId=")[1];
  fetch(`${uri}/item/${itemId}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reviewText: reviewTextArea,
      reviewRating: ratingInput,
    }),
  });
  window.location.reload();
}

function deleteReview(event) {
  let target = event.target;
  let review = target.parentElement.parentElement.parentElement;
  let reviewId = review
    .getElementsByClassName("reviewId")[0]
    .innerText.replace(/\s/g, "");
  let itemId = window.location.href.split("itemId=")[1].slice(0, -1);
  fetch(`${uri}/item/${itemId}/review/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: [],
  });
  window.location.reload();
}
