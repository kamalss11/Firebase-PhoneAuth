// While browser loads

var usr = document.querySelector("#usr")

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

// Welcome user 

var wel = document.querySelector(".wel")
var lo = document.querySelector(".outbtn")

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
var fields1 = document.querySelectorAll(".field-1")
var inputs = document.querySelectorAll(".inputs")
const errors = document.querySelectorAll(".error")

for(let i=0;i<fields1.length;i++){   
    inputs[i].addEventListener("blur",function(e,n=i){
        console.log(n)
        blur(e,n)
    })
}

function blur(e,num){
    if(e.target.value === ''){
        errors[num].classList.add("active")
        ers("This field is required",n)
    }

    else{
        errors[num].classList.remove("active")
    }
}

function ers(err,nu){
    console.log(err)
    errors[nu].innerHTML = err
}

var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")
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
    var urls 

    var storageref =  firebase.storage().ref()
    const metadata = {
        contentType:image.type
    }
    var uploadImg = storageref.child("images").child(imgname)
    uploadImg.put(image,metadata)
    .then(snapshot =>{
        return uploadImg.getDownloadURL()
        .then(url => {
            urls = url
            console.log(urls)
            db.add({
                Name: nameInput,
                Phone: phoneInput,
                Price: priceInput,
                Rate: rateInput,
                Service: serviceInput,
                Status: statusInput,
                Address: addInput,
                DisplayPicture: urls
            }).then((docRef)=>{
                console.log("Data Saved.This is you id = > ",docRef.id)
                console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
                form.reset()
            })
            .catch(function(error){
                console.log(error)
            })
        })
    }).catch(function(error){
        console.log(error)
    })
})