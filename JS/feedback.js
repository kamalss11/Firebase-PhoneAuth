var db = firebase.database()

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
var fd = db.ref('dojo-c2657');
data.innerHTML = fd
/*fd.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      alert(childSnapshot.val())
    });
});*/

function mainpage(){
    window.location.assign("https://phoneauth-dojo.netlify.app/logged")
}
