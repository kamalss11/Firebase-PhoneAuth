// var db = firebase.database()
// alert(db)

var data = document.querySelector(".data")
const dbRef = firebase.database().ref("Feedbacks");
dbRef.get().then((snapshot) => {
     alert(snapshot.val())
     data.innerHTML += snapshot.val()
  /*if (snapshot.exists()) {
    alert("Hi")
    data.innerHTML = snapshot.val()
  } else {
    alert("No data available");
  }*/
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

// var fd = db.ref('dojo-c2657');
// data.innerHTML = fd

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged")
}
