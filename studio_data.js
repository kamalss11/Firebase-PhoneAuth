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

// Fetching datas

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(doc.data().DocumentId){
            let name = document.createElement("p")
            name.innerHTML = doc.data().Name
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