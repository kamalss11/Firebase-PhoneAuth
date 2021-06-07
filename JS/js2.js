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

// Form tabs

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

// Forms

const sbtn = document.querySelector(".submit")

var nam = document.querySelector("#name")
var phone = document.querySelector("#phone")
var price = document.querySelector("#price")
var rate = document.querySelector("#rate")
var service = document.querySelector("#service")
var sts = document.querySelector("#sts")
var add = document.querySelector("#add")

console.log(sts)

var firestore  = firebase.firestore()
const db = firestore.collection("Studios")

sbtn.addEventListener("click",function(e){
    e.preventDefault()
    let nameInput = nam.value
    let phoneInput = phone.value
    let priceInput = price.value
    let rateInput = rate.value
    let serviceInput = service.value
    let statusInput = sts.value
    let addInput = add.value
    console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput)
    db.add({
        Name: nameInput,
        Phone: phoneInput,
        Price: priceInput,
        Rate: rateInput,
        Service: serviceInput,
        Status: statusInput,
        Address: addInput
    }).then((docRef)=>{
        console.log("Data Saved.This is you id = > ",docRef.id)
    })
    .catch(function(error){
        alert(error)
    })
})