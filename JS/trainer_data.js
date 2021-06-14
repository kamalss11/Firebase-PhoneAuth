var firestore  = firebase.firestore()
const db = firestore.collection("Trainers")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId = user.uid
        console.log(docId)
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

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged")
}

var datas = document.querySelector(".datas")

// Fetching datas

var data,dalen,docs = 0

let ids = document.querySelector("#i")

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(doc.data().DocumentId){
            ++docs
            let data = document.createElement("tr")
            data.className = "data"
            data.id = `${doc.data().DocumentId}`
            datas.appendChild(data)
            let id = document.createElement("td")
            id.innerHTML = doc.data().ID
            let name = document.createElement("td")
            name.innerHTML = doc.data().Name
            let gender = document.createElement("td")
            gender.innerHTML = doc.data().Gender
            let email = document.createElement("td")
            email.innerHTML = doc.data().Email
            let phone = document.createElement("td")
            phone.innerHTML = doc.data().Phone
            let price = document.createElement("td")
            price.innerHTML = doc.data().Price
            let ratings = document.createElement("td")
            ratings.innerHTML = doc.data().Ratings
            let exp = document.createElement("td")
            exp.innerHTML = doc.data().Experience
            let cat = document.createElement("td")
            cat.innerHTML = doc.data().Category
            let spe = document.createElement("td")
            spe.innerHTML = doc.data().Speciality
            let cit = document.createElement("td")
            cit.innerHTML = doc.data().City
            let sta = document.createElement("td")
            sta.innerHTML = doc.data().State
            let picture = document.createElement("td")
            let img = document.createElement("img")
            img.src = doc.data().DisplayPicture
            picture.appendChild(img)
            let time = document.createElement("td")
            time.innerHTML = doc.data().Timestamp.toDate()
            data.append(id,name,gender,email,phone,price,ratings,exp,cat,spe,cit,sta,picture,time)
            console.log(doc.data())
        }
    })
    
    if(docs == 'null' || docs == 'undefined' || docs == ''){
        let di = document.createElement("span")
        di.innerHTML = "Document Id"
        ids.innerHTML = `No Documents are not matched with ` 
        ids.appendChild(di)
    }
    
    data = document.querySelectorAll(".data")
    dalen = data.length
    console.log(dalen)

    for(let i=0;i<dalen;i++){
        data[i].addEventListener("click",function(){
            data[i].classList.toggle("active")
            localStorage.setItem("TrainerId", data[i].id);
            console.log(data[i].id)
            window.location.assign("https://phoneauth-dojo.netlify.app/edit_trainer")
        })
    }
}).catch(function(error){
    console.log(error)
})


//  Trainer form

function frm(){
    window.location.assign("https://phoneauth-dojo.netlify.app/trainer")
}

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    localStorage.setItem("TrainerId",0)
    window.location.assign("https://phoneauth-dojo.netlify.app/")
}

