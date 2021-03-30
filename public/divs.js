function showForm(){
    document.getElementById("form").style.display = "block";
    document.getElementById("navform").style.display = "block";
     document.getElementById("nav").style.display = "none";
     document.getElementById("navlogged").style.display = "none";
     document.getElementById("login").style.display = "none";
     document.getElementById("register").style.display = "none";
     document.getElementById("navlz").style.display = "none";
     document.getElementById("charts").style.display = "none";
     document.getElementById("dok").style.display = "none";
}

function showLogin(){
    document.getElementById("form").style.display = "none";
    document.getElementById("navform").style.display = "none";
    document.getElementById("nav").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("navlz").style.display = "block";
    document.getElementById("charts").style.display = "none";
    document.getElementById("dok").style.display = "none";
}

function showRegister(){
    document.getElementById("form").style.display = "none";
    document.getElementById("navform").style.display = "none";
    document.getElementById("nav").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
    document.getElementById("navlz").style.display = "block";
    document.getElementById("charts").style.display = "none";
    document.getElementById("dok").style.display = "none";
}

function whichNav(){
    if(check()){
        document.getElementById("nav").style.display = "none";
        document.getElementById("navlogged").style.display = "block";
    }
    else{
        document.getElementById("nav").style.display = "block";
        document.getElementById("navlogged").style.display = "none";
    }           
}

function toMain(){
    whichNav();
    document.getElementById("form").style.display = "none";
    document.getElementById("navform").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("navlz").style.display = "none";
    document.getElementById("charts").style.display = "none";
    document.getElementById("dok").style.display = "block";
}