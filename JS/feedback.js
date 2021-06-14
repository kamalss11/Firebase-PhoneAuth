// var db = firebase.database()
// alert(db)

const dbRef = firebase.database().ref();
dbRef.child("Feedbacks").get().then((snapshot) => {
  if (snapshot.exists()) {
    alert(snapshot.val());
  } else {
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

var data = document.querySelector(".data")
// var fd = db.ref('dojo-c2657');
// data.innerHTML = fd

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged")
}
