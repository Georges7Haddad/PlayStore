function $(id) {
  return document.getElementById(id);
}

window.addEventListener("load", () => {
  isAuth();
  $("sidebarIconAnchor").addEventListener("click", openSideNav);
  $("sidebarCloseButton").addEventListener("click", closeSideNav);
  $("loginNavButton").addEventListener("click", openLoginDialog);
  $("signupNavButton").addEventListener("click", opensignupDialog);
  $("closeModal").addEventListener("click", closeUserFormDialog);
  $("closeModal").addEventListener("click", closeUserFormDialog);
  $("forgotPassword").addEventListener("click", openForgotPasswordDialog);
  $("navSearch").addEventListener("keyup", search);
});

function isAuth() {
  fetch("http://localhost:8080/auth", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  }).then(function (response) {
    response.json().then(function (data) {
      authenticated = data.isAuth;
      if (authenticated === "true") {
        user = data.user;
        $("pp").src="../media/pics/" + data.pic
        $("pp").style.display = "";
        $("signupNavButton").style.display = "none";
        $("loginNavButton").style.display = "none";
        $("logoutNavButton").style.display = "";
      } else {
        $("pp").style.display = "none";
        $("signupNavButton").style.display = "";
        $("loginNavButton").style.display = "";
        $("logoutNavButton").style.display = "none";
      }
    });
  });
}

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
  $("userForm").action = "/login";
  $("RegisterExtrasDiv").style.display = "none";
  $("registerLoginDiv").style.display = "";
  $("forgotPasswordDiv").style.display = "none";
}

function opensignupDialog() {
  $("content").style.opacity = "0.5";
  document.getElementsByTagName("nav")[0].style.opacity = "0.5";
  $("userFormDiv").style.display = "block";
  $("userFormButton").innerText = "Sign Up";
  $("loginExtrasDiv").style.display = "none";
  $("userForm").action = "/register";
  $("userForm").enctype="multipart/form-data";
  $("RegisterExtrasDiv").style.display = "";
  $("registerLoginDiv").style.display = "";
  $("forgotPasswordDiv").style.display = "none";
}

function openForgotPasswordDialog() {
  $("content").style.opacity = "0.5";
  document.getElementsByTagName("nav")[0].style.opacity = "0.5";
  $("userFormDiv").style.display = "block";
  $("registerLoginDiv").style.display = "none";
  $("forgotPasswordDiv").style.display = "";
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

function search(event) {
  if (event.keyCode === 13) {
    window.location.href = `/search?q=${event.target.value}`;
  }
}
