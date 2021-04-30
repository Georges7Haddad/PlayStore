import { fetchCountry } from "./footer.js";
function $(id) {
  return document.getElementById(id);
}

window.onload = () => {
  // fetchCountry(); // Turn on to fetch the country
  $("sidebarIconAnchor").addEventListener("click", openSideNav);
  $("sidebarCloseButton").addEventListener("click", closeSideNav);
  $("loginNavButton").addEventListener("click", openLoginDialog);
  $("signupNavButton").addEventListener("click", opensignupDialog);
  $("closeModal").addEventListener("click", closeUserFormDialog);
};

function openSideNav() {
  $("sidebar").style.width = "250px";
}
function closeSideNav() {
  $("sidebar").style.width = "0";
}

function openLoginDialog() {
  $("content").style.opacity = "0.5";
  document.getElementsByTagName("nav")[0].style.opacity = "0.5";
  $("userFormDiv").style.display = "block";
  $("loginExtrasDiv").style.display = "";
  $("userFormButton").innerText = "Login";
  $('userForm').action = "/login";
}

function opensignupDialog() {
  $("content").style.opacity = "0.5";
  document.getElementsByTagName("nav")[0].style.opacity = "0.5";
  $("userFormDiv").style.display = "block";
  $("userFormButton").innerText = "Sign Up";
  $("loginExtrasDiv").style.display = "none";
  $('userForm').action = "/register";
}

window.onclick = function (event) {
  var modal = $("userFormDiv");
  var isClickInside = modal.contains(event.target);

  if (
    !isClickInside &&
    event.target !== $("loginNavButton") &&
    event.target !== $("signupNavButton")
  ) {
    modal.style.display = "none";
    $("content").style.opacity = "1";
    document.getElementsByTagName("nav")[0].style.opacity = "1";
  }
};

function closeUserFormDialog() {
  var modal = $("userFormDiv");

  modal.style.display = "none";
  $("content").style.opacity = "1";
  document.getElementsByTagName("nav")[0].style.opacity = "1";
}
