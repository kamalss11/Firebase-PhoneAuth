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

const formdiv = document.querySelectorAll(".forms")
const tabs = document.querySelector(".tabs").children

for(let i=0;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(){
        for(let j=0;j<tabs.length;j++){
            tabs[j].classList.remove("active")
            formdiv[j].classList.remove("active")
        }
        formdiv[i].classList.add("active")
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
const form = document.getElementById("form")

sbtn.addEventListener("click",function(e){
    e.preventDefault()
    let nameInput = nam.value
    let phoneInput = phone.value
    let priceInput = price.value
    let rateInput = rate.value
    let serviceInput = service.value
    let statusInput = sts.value
    let addInput = add.value
    var image = document.getElementById("img").files[0]
    var imgname = image.name

    var storageref =  firebase.storage.ref('images/'+imgname)
    var uploadImg = storageref.put(img)
    uploadImg.on('state_changed',function(snapshot){
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log("Uploaded file is "+progress+" done")
    }),function(error){
        console.log(error)
    },function(){
        uploadImg.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log(downloadURL)
        })
    }
    console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
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
        form.reset()
    })
    .catch(function(error){
        alert(error)
    })
})