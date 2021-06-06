var wel = document.querySelector(".wel")
var usr = document.querySelector("#usr")
var lo = document.querySelector(".outbtn")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            location.replace("https://phoneauth-dojo.netlify.app/")
        } 
        else{
            console.log(user.phoneNumber)
            usr.innerHTML = user.phoneNumber
        }
    });
    loader()
}

function loader(){
    setTimeout(showPage, 3000);
}

function showPage(){
    document.getElementById("loads").style.display = "none"
}

wel.addEventListener("click",function(){
    lo.classList.toggle("active")
})

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    location.replace("https://phoneauth-dojo.netlify.app/")
}

// form tabs

const forms = document.querySelectorAll(".forms")
const tabs = document.querySelector(".tabs").children

for(let i=0;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(){
        for(let j=0;j<tabs.length;j++){
            tabs[j].classList.remove("active")
            forms[j].classList.remove("active")
        }
        forms[i].classList.add("active")
        tabs[i].classList.add("active")
    })
}