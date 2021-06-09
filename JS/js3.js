var docId
var firestore  = firebase.firestore()
const db = firestore.collection("STUDIOS")
const db2 = firestore.collection("Trainers")
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

db.get().then((querySnapShot)=>{
    querySnapShot.forEach((doc)=>{
        if(docId){
            console.log(doc.data())
        }
    })
}).catch(function(error){
    console.log(error)
})