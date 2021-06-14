var data = document.querySelector(".datas")
// var docs = 0
const dbRef = firebase.database().ref("Feedbacks");
// var i = document.querySelector(".in")
dbRef.get().then((snapshot) => {
     if (snapshot.exists()) {
          console.log(snapshot.val())
          snapshot.forEach((doc)=>{
               console.log(doc.val())
               // ++docs
               let tr = document.createElement("tr")
               data.appendChild(tr)
               let id = document.createElement("td")
               id.innerHTML = doc.val().User_ID
               let ud = document.createElement("td")
               ud.innerHTML = doc.val().User_Device
               let udv = document.createElement("td")
               udv.innerHTML = doc.val().User_Device_Version
               let fd = document.createElement("td")
               fd.innerHTML = doc.val().Feedback
               let tm = document.createElement("td")
               tm.innerHTML = doc.val().Timestamp.toDate()
               tr.append(id,ud,udv,fd,tm)
          })
     } 
     else {
          alert("No data available");
     }
}).catch((error) => {
  console.error(error);
});

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

// Welcome user

var wel = document.querySelector(".wel")
var lo = document.querySelector(".outbtn")

wel.addEventListener("click",function(){
    lo.classList.toggle("active")
})

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged")
}

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    window.location.assign("https://phoneauth-dojo.netlify.app/")
}
