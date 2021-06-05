const ph = document.getElementById("ph")
const code = document.getElementById("code")
const errors = document.querySelectorAll(".er")
const form = document.querySelector("#form")
const otp = document.querySelector(".otp")
const login = document.querySelector(".login")

code.style.display = "none"
login.style.display = "none"

form.addEventListener("submit",function(e){
        e.preventDefault()
    }
)

ph.addEventListener("blur",function(){
    console.log(ph.value)
    let val = /\d[0-9]{9,}$/
    if(ph.value === ''){
        error("This field is required",0)
        otp.style.pointerEvents = "none"
    }

    else if(ph.value.length < 13){
        error("Please enter valid number",0)
        otp.style.pointerEvents = "none"
    }

    else if(!ph.value.match(val)){
        error("Enter only numbers",0)
        otp.style.pointerEvents = "none"
    }

    else{
        errors[0].classList.remove("active")
        otp.style.pointerEvents = "auto"
    }
})

code.addEventListener("blur",function(){
    if(code.value === ''){
        error("Enter your OTP",1)
        login.style.pointerEvents = "none"
    }

    else{
        errors[1].classList.remove("active")
        login.style.pointerEvents = "auto"
    }
})

function error(err,n){
    errors[n].innerHTML = err
    errors[n].classList.add("active")
}

// Phone Auth
   
const recaptcha = document.querySelector("#recaptcha-container")

window.onload = function(){
    render()
    loader()
}

function loader(){
    setTimeout(showPage, 3000);
}

function showPage(){
    document.getElementsByClassName("loads").style.display = "none"
    document.getElementById("bl").style.display = "block"
}

function render(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptcha)
    recaptchaVerifier.render()
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user,user.phoneNumber)
            location.replace("https://phoneauth-dojo.netlify.app/logged.html")
        } 
        else {
            console.log("No user is logged in.")
        }
    });
}

function phoneAuth(){
    var number = document.getElementById("ph").value
    // phone number authentication

    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function(confirmationResult){
        window.confirmationResult = confirmationResult
        coderesult = confirmationResult
        console.log(coderesult)
        alert("Message Sent")
        code.style.display = "block"
        login.style.display = "block"
        ph.style.display = "none"
        otp.style.display = "none"
        recaptcha.style.display = "none"
    }).catch(function (error){
        alert(error.message)
        code.style.display = "none"
        login.style.display = "none"
        recaptcha.style.display = "block"
    })
}

function verification(){
    coderesult.confirm(code.value).then(function (result){
        alert("Successfully Verified")
        var user = result.user
        console.log(user)
    }).catch(function (error){
        alert(error.message)
    })
}

// Signout

function logout(){
    firebase.auth().signOut()
    let u = firebase.auth().currentUser
    console.log(u,"logged out")
    location.replace("https://phoneauth-dojo.netlify.app/")
}