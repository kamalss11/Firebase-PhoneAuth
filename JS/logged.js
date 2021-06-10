// While browser loads

var usr = document.querySelector("#usr")

// STUDIOS

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        docId1 = user.uid
        console.log(docId1)
        if (!user) {
            location.replace("https://phoneauth-dojo.netlify.app/")
        } 

        else if(user){
            db.doc(`${docId1}`).get().then((doc)=> {
                if(doc.exists){
                    location.replace("https://phoneauth-dojo.netlify.app/studio")
                }
                
                else{
                    console.log("No database found")
                }
            })
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