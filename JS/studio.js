const sbtn = document.querySelector(".submit")
const usr = document.querySelector("#usr")

var nam = document.querySelector("#name")
var phone = document.querySelector("#phone")
var price = document.querySelector("#price")
var rate = document.querySelector("#rate")
var service = document.querySelector("#service")
var sts = document.querySelector("#sts")
var tag = document.querySelector("#tag")
var tags
var add = document.querySelector("#add")
var fields1 = document.querySelectorAll(".field-1")
var inputs = document.querySelectorAll(".inputs")
const errors = document.querySelectorAll(".error")
const form = document.getElementById("form")

var firestore  = firebase.firestore()
const db = firestore.collection("Studios")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user.uid)
        if (!user) {
            window.location.assign("https://phoneauth-dojo.netlify.app/")
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

// Form Submit

for(let i=0;i<fields1.length;i++){
    inputs[i].addEventListener("blur",function(e,n=i){
        blur(e,n)
    })
}

function blur(e,num){
    let ph = /\d[0-9]{9,}$/
    let rt = /\d[0-9]{0,}$/

    if(inputs[num].value == ''){
        errors[num].classList.add("active")
        ers("This field is required",num)
    }

    else if(num == 1){
        if(!inputs[num].value.match(ph)){
            errors[num].classList.add("active")
            ers("Enter valid number",num)
        }

        else{
            errors[num].classList.remove("active")
        }
    }

    else if(num == 3){
        if(inputs[num].value > 5){
            errors[num].classList.add("active")
            ers("Rate out of 5",num)
        }

        else if(!inputs[num].value.match(rt)){
            errors[num].classList.add("active")
            ers("Ratings not match",num)
        }

        else{
            errors[num].classList.remove("active")
        }
    }

    else if(num == 6){
        tags = inputs[num].value.split(',')
        console.log(tags)
        errors[num].classList.remove("active")
    }

    else{
        errors[num].classList.remove("active")
    }

    submitbtn()
}

function submitbtn(){
    for(let i=0;i<fields1.length;i++){
        if(errors[i].classList.contains("active")){
            sbtn.classList.add("hide")
            break
        }

        else{
            sbtn.classList.remove("hide")
        }
    }
}

function ers(err,nu){
    errors[nu].innerHTML = err
}

sbtn.addEventListener("click",function(e){
    e.preventDefault()
    for(let i=0;i<fields1.length;i++){
        blur(0,n=i)
    }

    let nameInput = nam.value
    let phoneInput = `+91` + phone.value
    let priceInput = price.value
    let rateInput = rate.value
    let serviceInput = service.value
    let statusInput = sts.value
    let addInput = add.value
    let tagInput = tags
    var image = document.getElementById("img").files[0]
    var imgname = image.name
    storageref =  firebase.storage().ref()

    const metadata = {
        contentType:image.type
    }

    storageref = firebase.storage().ref()
    var urls
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
                Rating: rateInput,
                Services: serviceInput,
                Status: statusInput,
                Tags: tagInput,
                Address: addInput,
                DisplayPicture: urls,
                Timestamp: firebase.firestore.Timestamp.now()
            }).then((docRef)=>{
                db.doc(`${docRef.id}`).update({
                    DocumentId: docRef.id
                })
                console.log("Data Saved.This is you id = > ",docRef.id)
                console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
                form.reset()
                window.location.assign("https://phoneauth-dojo.netlify.app/studio_data")
            }).catch(function(error){
                console.log(error)
            })
        })
    }).catch(function(error){
        console.log(error)
    })
})

// Welcome user

var wel = document.querySelector(".wel")
var lo = document.querySelector(".outbtn")

wel.addEventListener("click",function(){
    lo.classList.toggle("active")
})

// Studio data

function data(){
    window.location.assign("https://phoneauth-dojo.netlify.app/studio_data")
}

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged") 
    localStorage.setItem("StudioId",0)
}

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    window.location.assign("https://phoneauth-dojo.netlify.app/")
}
