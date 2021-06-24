var firestore  = firebase.firestore()
const db = firestore.collection("Studios")
var docId = localStorage.getItem("StudioId")
console.log(docId)

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user.uid)
        if (!user) {
            window.location.assign("https://phoneauth-dojo.netlify.app/")
        }

        else if(user && docId == 0){
            window.location.assign("https://phoneauth-dojo.netlify.app/studio_data")
        }

        else{
            console.log(user.phoneNumber)
            usr.innerHTML = user.phoneNumber
        }

        if(docId == '' || docId == null){
            window.location.assign("https://phoneauth-dojo.netlify.app/studio_data")
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

var sbtn = document.querySelector(".submit")
var na = document.querySelector("#name")
var phone = document.querySelector("#phone")
var price = document.querySelector("#price")
var rate = document.querySelector("#rate")
var service = document.querySelector("#service")
var sts = document.querySelector("#sts")
var add = document.querySelector("#add")
var fields1 = document.querySelectorAll(".field-1")
var inputs = document.querySelectorAll(".inputs")
const errors = document.querySelectorAll(".error")
const form = document.getElementById("form")
var urls

db.doc(`${docId}`).get().then((doc) => {
    console.log(doc.data())
    na.value = doc.data().Name
    phone.value = doc.data().Phone
    price.value = doc.data().Price
    rate.value = doc.data().Ratings
    service.value = doc.data().Service
    sts.value = doc.data().Status
    add.value = doc.data().Address
    urls = doc.data().DisplayPicture
    console.log(urls)

}).catch((error) => {
    console.log("Error getting document:", error);
});

// Form Submit

for(let i=0;i<fields1.length-1;i++){
    inputs[i].addEventListener("blur",function(e,n=i){
        blur(e,n)
        console.log(e.target.value)
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
    for(let i=0;i<fields1.length-1;i++){
        blur(0,n=i)
    }

    var image,imgname

    let nameInput = na.value
    let phoneInput = phone.value
    let priceInput = price.value
    let rateInput = rate.value
    let serviceInput = service.value
    let statusInput = sts.value
    let addInput = add.value
    storageref = firebase.storage().ref()

    if(inputs[7].value == ""){
        image = urls
        db.doc(`${docId}`).update({
            Name: nameInput,
            Phone: phoneInput,
            Price: priceInput,
            Ratings: rateInput,
            Service: serviceInput,
            Status: statusInput,
            Address: addInput,
            DisplayPicture: urls,
            Timestamp: firebase.firestore.Timestamp.now()
        }).then(()=>{
            console.log("Data Saved.This is you id = > ",docId)
            console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
            form.reset()
            window.location.assign("https://phoneauth-dojo.netlify.app/studio_data")
            localStorage.setItem("StudioId",0)
        }).catch(function(error){
            console.log(error)
        })
    }

    else{
        image = document.getElementById("img").files[0]
        imgname = image.name
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
                db.doc(`${docId}`).update({
                    Name: nameInput,
                    Phone: phoneInput,
                    Price: priceInput,
                    Ratings: rateInput,
                    Service: serviceInput,
                    Status: statusInput,
                    Address: addInput,
                    DisplayPicture: urls,
                    Timestamp: firebase.firestore.Timestamp.now()
                }).then(()=>{
                    console.log("Data Saved.This is you id = > ",docId)
                    console.log(nameInput,phoneInput,priceInput,rateInput,serviceInput,statusInput,addInput,imgname)
                    form.reset()
                    window.location.assign("https://phoneauth-dojo.netlify.app/studio_data")
                    localStorage.setItem("StudioId",0)
                }).catch(function(error){
                    console.log(error)
                })
            })
        }).catch(function(error){
            console.log(error)
        })
    }
})

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged")
    localStorage.setItem("StudioId",0)
}

// Form Page
 
function frm(){
    window.location.assign("https://phoneauth-dojo.netlify.app/studio_data")
    localStorage.setItem("StudioId",0)
}

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    localStorage.setItem("StudioId",0)
    window.location.assign("https://phoneauth-dojo.netlify.app/")
}
