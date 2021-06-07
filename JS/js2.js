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

// Forms - form(studios)

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
        blur(e,n)
    })
}

function blur(e,num){
    let ph = /\d[0-9]{9,}$/

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

var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")
const form = document.getElementById("form")
var storageref

sbtn.addEventListener("click",function(e){
    e.preventDefault()
    for(let i=0;i<fields1.length;i++){   
        blur(0,n=i)
    }
    
    let nameInput = nam.value
    let phoneInput = phone.value
    let priceInput = price.value
    let rateInput = rate.value
    let serviceInput = service.value
    let statusInput = sts.value
    let addInput = add.value
    var image = document.getElementById("img").files[0]
    var imgname = image.name
    storageref =  firebase.storage().ref()
        
    const metadata = {
        contentType:image.type
    }

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

//Forms - form(trainer)

const sbtn2 = document.querySelector(".sub")

var name = document.querySelector("#nam")
var gender = document.querySelector("#gender")
var email = document.querySelector("email")
var ph = document.querySelector("#ph")
var pr = document.querySelector("#pr")
var rat = document.querySelector("#rat")
var ser = document.querySelector("#ser")
var sta = document.querySelector("#sat")
var spe = document.querySelector("#spe")
var cit = document.querySelector("#cit")
var ste = document.querySelector("#ste")
var exp = document.querySelector("#exp")
var tag = document.querySelector("#tag")
var cat = document.querySelector("#cat")
var pic = document.querySelector("#pic")
var inputs2 = document.querySelectorAll(".inp")
var fields2 = document.querySelectorAll(".fields")
var errors2 = document.querySelectorAll(".er")
var form2 = document.querySelector("#form2")

for(let i=0;i<fields2.length;i++){   
    inputs2[i].addEventListener("blur",function(e,n=i){
        blur2(e,n)
    })
}

function blur2(e,num){
    let ph = /\d[0-9]{9,}$/
    let email = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    if(inputs2[num].value == ''){
        errors2[num].classList.add("active")
        ers2("This field is required",num)
    }

    else if(num == 3){
        if(!inputs2[num].value.match(ph)){
            errors2[num].classList.add("active")
            ers2("Enter valid number",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
    }

    else if(num == 4){
        if(!inputs2[num].value.match(email)){
            errors2[num].classList.add("active")
            ers2("Enter valid Email",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
    }

    else if(num == 5){
        if(inputs2[num].value > 5){
            errors2[num].classList.add("active")
            ers2("Rate out of 5",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
    }

    else{
        errors2[num].classList.remove("active")
    }

    submitbtn2()
}

function submitbtn2(){
    for(let i=0;i<fields2.length;i++){
        if(errors2[i].classList.contains("active")){
            sbtn2.classList.add("hide")
            break
        }

        else{
            sbtn2.classList.remove("hide")
        }
    }
}

function ers2(err,nu){
    errors2[nu].innerHTML = err
}

sbtn2.addEventListener("click",function(e){
    e.preventDefault()
    for(let i=0;i<fields2.length;i++){   
        blur2(0,n=i)
    }

    let namIn = nam.value
    let genIn = gender.value
    let emIn = email.value
    let phIn = ph.value
    let prIn = pr.value
    let ratIn = rat.value
    let serIn = ser.value
    let staIn = sta.value
    let speIn = spe.value
    let citIn = cit.value
    let steIn = ste.value
    let expIn = exp.value
    let tagIn = tag.value
    let catIn = cat.value
    let picName = pic.name

    const metadata2 = {
        contentType:image.type
    }

    var urls2

    var uploadPic = storageref.child("images").child(picName)
    uploadPic.put(pic,metadata2)
    .then(snapshot =>{
        return uploadPic.getDownloadURL()
        .then(url => {
            urls2 = url
            console.log(urls)
            db.add({
                Name: namIn,
                Gender: genIn,
                Email: emIn,
                Phone: phIn,
                Price: prIn,
                Rate: ratIn,
                Service: serIn,
                Status: staIn,
                Speaciality: speIn,
                City: citIn,
                State: steIn,
                Experience: expIn,
                Tags: tagIn,
                Category: catIn,
                DisplayPicture: urls2
            }).then((docRef)=>{
                console.log("Data Saved.This is you id = > ",docRef.id)
                console.log(namIn,genIn,emIn,phIn,prIn,ratIn,serIn,staIn,staIn,speIn,citIn,steIn,expIn,tagIn,catIn,urls2)
                form2.reset()
            })
            .catch(function(error){
                console.log(error)
            })
        })
    }).catch(function(error){
        console.log(error)
    })
})