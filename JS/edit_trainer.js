var firestore  = firebase.firestore()
const db = firestore.collection("Online")
var docId = localStorage.getItem("TrainerId")
console.log(docId)

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user.uid)
        if (!user) {
            window.location.assign("https://phoneauth-dojo.netlify.app/")
        }

        else if(user && docId == 0){
            window.location.assign("https://phoneauth-dojo.netlify.app/trainer_data")
        }

        else{
            console.log(user.phoneNumber)
            usr.innerHTML = user.phoneNumber
        }

        if(docId == '' || docId == null){
            window.location.assign("https://phoneauth-dojo.netlify.app/trainer_data")
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

const sbtn2 = document.querySelector(".sub")

var nm = document.querySelector("#nam")
var gender = document.querySelector("#gender")
var email = document.querySelector("#email")
var ph = document.querySelector("#ph")
var pr = document.querySelector("#pr")
var rat = document.querySelector("#rat")
var spe = document.querySelector("#spe")
var cit = document.querySelector("#cit")
var ste = document.querySelector("#ste")
var exp = document.querySelector("#exp")
var tag = document.querySelector("#tag")
var tags
var cat = document.querySelector("#cat")
var inputs2 = document.querySelectorAll(".inp")
var fields2 = document.querySelectorAll(".field-2")
var errors2 = document.querySelectorAll(".er")
var storageRef,urls2

db.doc(`${docId}`).get().then((doc) => {
    console.log(doc.data())
    nm.value = doc.data().Name
    gender.value = doc.data().Gender
    email.value = doc.data().Email
    ph.value = doc.data().Phone
    pr.value = doc.data().Price
    rat.value = doc.data().Ratings
    spe.value = doc.data().Speciality
    cit.value = doc.data().City
    ste.value = doc.data().State
    exp.value = doc.data().Experience
    tag.value = doc.data().Tags
    cat.value = doc.data().Category
    urls2 = doc.data().DisplayPicture
    console.log(urls2)

}).catch((error) => {
    console.log("Error getting document:", error);
});

for(let i=0;i<fields2.length-1;i++){   
    inputs2[i].addEventListener("blur",function(e,n=i){
        blur2(e,n)
        console.log(e.target.value)
    })
}

function blur2(e,num){
    let ph = /\d[0-9]{9,}$/
    let rt = /\d[0-9]{0,}$/
    let email = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    if(inputs2[num].value == ''){
        errors2[num].classList.add("active")
        ers2("This field is required",num)
    }

    else if(num == 2){
        if(!inputs2[num].value.match(email)){
            errors2[num].classList.add("active")
            ers2("Enter valid Email",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
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

    else if(num == 5){
        if(inputs2[num].value > 5){
            errors2[num].classList.add("active")
            ers2("Rate out of 5",num)
        }

        else if(!inputs2[num].value.match(rt)){
            errors2[num].classList.add("active")
            ers2("Ratings not match",num)
        }

        else{
            errors2[num].classList.remove("active")
        }
    }

    else if(num == 10){
        tags = inputs2[num].value.split(',')
        console.log(tags)
        errors2[num].classList.remove("active")
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
    for(let i=0;i<fields2.length-1;i++){   
        blur2(0,n=i)
    }

    let namIn = nm.value
    let genIn = gender.value
    let emIn = email.value
    let phIn = ph.value
    let prIn = pr.value
    let ratIn = rat.value
    let speIn = spe.value
    let citIn = cit.value
    let steIn = ste.value
    let expIn = exp.value
    let tagIn = tags
    let catIn = cat.value
    let date = new Date()
    let year = date.getFullYear()
    var doclen,ndoc

    storageref = firebase.storage().ref()

    if(inputs2[12].value == ""){
         db.doc(`${docId}`).update({
                Name: namIn,
                Gender: genIn,
                Email: emIn,
                Phone: phIn,
                Price: prIn,
                Ratings: ratIn,
                Speciality: speIn,
                City: citIn,
                State: steIn,
                Experience: expIn,
                Tags: tagIn,
                Category: catIn,
                DisplayPicture: urls2,
                Timestamp: firebase.firestore.Timestamp.now()
            }).then(()=>{
                console.log("Data Saved.This is you id = > ",docId)
                console.log(namIn,genIn,emIn,phIn,prIn,ratIn,speIn,citIn,steIn,expIn,tagIn,catIn,urls2)
                form2.reset()
                localStorage.setItem("TrainerId",0)
                window.location.assign("https://phoneauth-dojo.netlify.app/trainer_data")
            })
    }

    else{
        var pic = document.getElementById("pic").files[0]
        let picName = pic.name
        const metadata2 = {
             contentType:pic.type
        }
        var uploadPic = storageref.child("images").child(picName)
        uploadPic.put(pic,metadata2)
        .then(snapshot =>{
             return uploadPic.getDownloadURL()
            .then(url => {
                 urls2 = url
                 console.log(urls2)
                 db.doc(`${docId}`).update({
                     Name: namIn,
                     Gender: genIn,
                     Email: emIn,
                     Phone: phIn,
                     Price: prIn,
                     Ratings: ratIn,
                     Speciality: speIn,
                     City: citIn,
                     State: steIn,
                     Experience: expIn,
                     Tags: tagIn,
                     Category: catIn,
                     DisplayPicture: urls2,
                     Timeestamp: firebase.firstore.Timestamp.now()
            }).then(()=>{
                console.log("Data Saved.This is you id = > ",docId)
                console.log(namIn,genIn,emIn,phIn,prIn,ratIn,speIn,citIn,steIn,expIn,tagIn,catIn,urls2)
                form2.reset()
                localStorage.setItem("TrainerId",0)
                window.location.assign("https://phoneauth-dojo.netlify.app/trainer_data")
            })
            .catch(function(error){
                console.log(error)
            })
        })
    }).catch(function(error){
        console.log(error)
    })
    } 
})

// Trainer Data

function data(){
    window.location.assign("https://phoneauth-dojo.netlify.app/trainer_data")
    localStorage.setItem("TrainerId",0)
}

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged") 
    localStorage.setItem("TrainerId",0)
}

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    localStorage.setItem("TrainerId",0)
    window.location.assign("https://phoneauth-dojo.netlify.app/")
}
