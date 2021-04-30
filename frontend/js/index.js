function $(id) {
  return document.getElementById(id);
}

window.addEventListener("load", () => {
  $("sidebarIconAnchor").addEventListener("click", openSideNav);
  $("sidebarCloseButton").addEventListener("click", closeSideNav);
  $("loginNavButton").addEventListener("click", openLoginDialog);
  $("signupNavButton").addEventListener("click", opensignupDialog);
  $("closeModal").addEventListener("click", closeUserFormDialog);
});

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
}

function opensignupDialog() {
  $("content").style.opacity = "0.5";
  document.getElementsByTagName("nav")[0].style.opacity = "0.5";
  $("userFormDiv").style.display = "block";
  $("userFormButton").innerText = "Sign Up";
  $("loginExtrasDiv").style.display = "none";
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
