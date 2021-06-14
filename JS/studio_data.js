var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId = user.uid
        console.log(docId)
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
            let name = document.createElement("td")
            name.innerHTML = doc.data().Name
            let phone = document.createElement("td")
            phone.innerHTML = doc.data().Phone
            let price = document.createElement("td")
            price.innerHTML = doc.data().Price
            let ratings = document.createElement("td")
            ratings.innerHTML = doc.data().Ratings
            let service = document.createElement("td")
            service.innerHTML = doc.data().Service
            let status = document.createElement("td")
            status.innerHTML = doc.data().Status
            let address = document.createElement("td")
            address.innerHTML = doc.data().Address
            let picture = document.createElement("td")
            let img = document.createElement("img")
            img.src = doc.data().DisplayPicture
            picture.appendChild(img)
            data.append(name,phone,price,ratings,service,status,address,picture)
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
            localStorage.setItem("StudioId", data[i].id);
            console.log(data[i].id)
            window.location.assign("https://phoneauth-dojo.netlify.app/edit_studio")
        })
    }
}).catch(function(error){
    console.log(error)
})

var tot = document.querySelector(".tt")

db.get().then((snapshot) =>{
    alert(snapshot.docs.data().DocumentId)
})

// Form Page
 
function frm(){
    window.location.assign("https://phoneauth-dojo.netlify.app/studio")
}

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    window.location.assign("https://phoneauth-dojo.netlify.app/")
}
