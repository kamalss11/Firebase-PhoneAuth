var wel = document.querySelector("#usr")
var logout = document.querySelector(".outbtn")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            location.replace("https://phoneauth-dojo.netlify.app/")
        } 
        else{
            console.log(user.phoneNumber)
            wel.innerHTML = user.phoneNumber
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
    logout.classList.toggle("active")
})
// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    location.replace("https://phoneauth-dojo.netlify.app/")
}