var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")

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
    location.replace("https://phoneauth-dojo.netlify.app/logged")
}

var datas = document.querySelector(".datas")

// Fetching datas

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(doc.data().DocumentId){
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
            picture.innerHTML = doc.data().DisplayPicture
            data.append(name,phone,price,ratings,service,status,address,picture)
            console.log(doc.data())
        }
    })
}).catch(function(error){
    console.log(error)
})

// Form Page
 
function frm(){
    location.replace("https://phoneauth-dojo.netlify.app/studio")
}

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    location.replace("https://phoneauth-dojo.netlify.app/")
}