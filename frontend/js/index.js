function $(id) {
  return document.getElementById(id);
}

window.addEventListener("load", () => {
  $("sidebarIconAnchor").addEventListener("click", openSideNav);
  $("sidebarCloseButton").addEventListener("click", closeSideNav);
  $("loginNavButton").addEventListener("click", openLoginDialog);
  $("signupNavButton").addEventListener("click", opensignupDialog);
  $("closeModal").addEventListener("click", closeUserFormDialog);
  $("closeModal").addEventListener("click", closeUserFormDialog);
  isAuth(); 
  $("logoutNavButton").addEventListener("click", logout);
});

var flag;

function isAuth(){
  fetch('http://localhost:8080/auth',{
    method : 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    })
    .then(function(response){ //This is the response from server
        response.json().then(
            function (data) { //data from response
              flag = data['isAuth']
              if(flag == "true")
              {
                $('pp').style.display = "";
                $("signupNavButton").style.display = "none";
                $("loginNavButton").style.display = "none";
                $("logoutNavButton").style.display = "";
                alert(data["username"]);
              }
              else{
                $('pp').style.display = "none";
                $("signupNavButton").style.display = "";
                $("loginNavButton").style.display = "";
                $("logoutNavButton").style.display = "none";
              }
      })
    })
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
}

function opensignupDialog() {
  $("content").style.opacity = "0.5";
  document.getElementsByTagName("nav")[0].style.opacity = "0.5";
  $("userFormDiv").style.display = "block";
  $("userFormButton").innerText = "Sign Up";
  $("loginExtrasDiv").style.display = "none";
  $("userForm").action = "/register";
}

function logout() {
  fetch('http://localhost:8080/logout',{
    method : 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    })
  location.reload();
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
